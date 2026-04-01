import classNames from 'classnames';
import { memo, useCallback, useEffect, useMemo, useRef, useState, type MutableRefObject } from 'react';
import { createPortal } from 'react-dom';
import { UniDivider } from '../../divider/UniDivider';
import { ScreenRecordingMode } from '../../screen-recording/constants';
import { AudioPlayerActions, AudioPlayerAdvancedControl, UniAudioAnnotation } from '../types';
import { useWaveSurfer } from '../useWaveSurfer';
import AudioPlayerControls from './AudioPlayerControls';
import { AnnotationIcon } from './ExpandedPlayerHeader';
import InfoIcon from './InfoIcon';

type ExpandedPlayerProps = {
  agentName?: string;
  audioSrc?: string;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  peaks?: [Float32Array, Float32Array];
  annotations?: UniAudioAnnotation[];
  showTopBanner: boolean;
  callDuration: number;
  currentTime: number;
  playing: boolean;
  canInteract: boolean;
  isStream?: boolean;
  showScreenRecording: boolean;
  hasScreenRecording: boolean;
  volume: number;
  leftVolume?: number;
  rightVolume?: number;
  playbackRate?: number;
  advancedControls: AudioPlayerAdvancedControl[];
  onAction: (action: AudioPlayerActions, value?: any) => void;
  onSpeedChange?: (value: number) => void;
  onZoomChange?: (value: number) => void;
  onVolumeChange?: (value: number) => void;
  onLeftVolumeChange?: (value: number) => void;
  onRightVolumeChange?: (value: number) => void;
  zoom?: number;
  videoContent?: React.ReactNode;
  videoWrapperRef?: MutableRefObject<HTMLDivElement | null>;
  screenRecordingMode?: ScreenRecordingMode;
};

export const ExpandedPlayer = memo(
  ({
    agentName,
    audioSrc,
    audioRef,
    peaks,
    annotations = [],
    showTopBanner,
    callDuration,
    currentTime,
    playing,
    canInteract,
    isStream = false,
    showScreenRecording,
    hasScreenRecording,
    volume,
    leftVolume,
    rightVolume,
    playbackRate = 1,
    advancedControls,
    onAction,
    onSpeedChange,
    onZoomChange,
    onVolumeChange,
    onLeftVolumeChange,
    onRightVolumeChange,
    zoom: zoomProp = 1,
    videoContent,
    videoWrapperRef,
    screenRecordingMode,
  }: ExpandedPlayerProps) => {
    const [zoom, setZoom] = useState(zoomProp);
    const waveContainerRef = useRef<HTMLDivElement | null>(null);
    const minimapContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (zoomProp !== zoom) {
        setZoom(zoomProp);
      }
    }, [zoomProp]);

    const showTopBannerLocal = showTopBanner && annotations.length > 0;
    const waveHeight = useMemo(() => (showTopBannerLocal ? 35.5 : 39.5), [showTopBannerLocal, annotations.length]);

    const {
      setZoom: setWaveZoom,
      annotationPortals,
      isReady,
      setTime,
    } = useWaveSurfer({
      containerRef: waveContainerRef,
      minimapContainerRef,
      audioRef,
      audioSrc,
      peaks,
      duration: callDuration,
      interact: canInteract,
      height: waveHeight,
      annotations,
      onAction,
      isStream,
    });

    // Sync WaveSurfer time with audio element/prop
    useEffect(() => {
      if (isReady && setTime) {
        // For streams, we need manual sync since we use a dummy audio element
        // For static audio, WaveSurfer v7 syncs automatically with the media element,
        // so we only need to call setTime if the change is significant (external seek).
        if (
          isStream ||
          (typeof currentTime === 'number' && Math.abs(currentTime - (audioRef.current?.currentTime || 0)) > 0.2)
        ) {
          setTime(currentTime);
        }
      }
    }, [currentTime, isReady, setTime, isStream, audioRef]);

    useEffect(() => {
      if (isReady) {
        setWaveZoom(zoom);
      }
    }, [zoom, setWaveZoom, isReady, callDuration]);

    const soloChannel = useCallback(
      (channel: 'left' | 'right') => {
        if (channel === 'left') {
          onLeftVolumeChange?.(leftVolume === 0 ? 1 : 0);
          onRightVolumeChange?.(0);
        } else {
          onRightVolumeChange?.(rightVolume === 0 ? 1 : 0);
          onLeftVolumeChange?.(0);
        }
        onAction(AudioPlayerActions.play);
      },
      [onAction, onLeftVolumeChange, onRightVolumeChange, leftVolume, rightVolume]
    );

    const onSeek = useCallback(
      (time: number) => {
        if (!canInteract) return;
        onAction(AudioPlayerActions.seek, time);
        onAction(AudioPlayerActions.play);
      },
      [onAction, canInteract]
    );
    return (
      <div className="flex flex-col gap-4 h-full relative">
        <div className="relative flex h-full">
          {/* Left Column: Waveform & Controls */}
          <div
            className={classNames('relative flex h-full grow flex-col overflow-visible pl-6', {
              'mr-10': screenRecordingMode === ScreenRecordingMode.Preview,
            })}
          >
            {/* Annotation Spacer */}
            {showTopBannerLocal && <div className="absolute left-6 right-6 top-0 w-full" style={{ height: 24 }}></div>}
            {/* Waveform Area */}
            <div className="flex h-full grow">
              {/* Icon Column */}
              <div
                className={classNames('flex flex-col justify-end', {
                  'mt-6': showTopBannerLocal,
                  'mt-4': !showTopBannerLocal,
                })}
              >
                <div
                  className="flex items-center border-0 border-t border-solid"
                  style={{ height: waveHeight, borderColor: 'var(--ut-color-border-muted)' }}
                >
                  <InfoIcon
                    iconName="headset_mic"
                    tooltip="Agent"
                    className="my-auto mr-2"
                    onClick={() => soloChannel('left')}
                  />
                </div>
                <UniDivider className="m-0 h-[1px] p-0 border-bgray-tertiary" />
                <div
                  className="flex items-center border-0 border-b border-solid"
                  style={{ height: waveHeight, borderColor: 'var(--ut-color-border-muted)' }}
                >
                  <InfoIcon
                    iconName="person"
                    tooltip="Other Party"
                    className="my-auto mr-2"
                    onClick={() => soloChannel('right')}
                  />
                </div>
              </div>

              {/* WaveSurfer Container */}
              <div className="flex h-full grow">
                <div
                  ref={waveContainerRef}
                  className={classNames('wave-container w-0 grow bg-white', {
                    'no-interaction': !canInteract,
                    'no-header': !showTopBannerLocal,
                  })}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="py-4">
              <AudioPlayerControls
                agentName={agentName}
                currentTime={currentTime}
                duration={callDuration}
                playing={playing}
                isStream={isStream}
                canInteract={canInteract}
                volume={volume}
                leftVolume={leftVolume}
                rightVolume={rightVolume}
                speed={playbackRate}
                onAction={onAction}
                onSpeedChange={onSpeedChange}
                zoom={zoom}
                onZoomChange={value => {
                  setZoom(value);
                  onZoomChange?.(value);
                }}
                onVolumeChange={onVolumeChange}
                onLeftVolumeChange={onLeftVolumeChange}
                onRightVolumeChange={onRightVolumeChange}
                advancedControls={advancedControls}
                showAnnotations={showTopBannerLocal}
                annotations={annotations as any}
                showScreenRecording={showScreenRecording}
                hasScreenRecording={hasScreenRecording}
                minimapRef={minimapContainerRef}
                fullScreenElement={videoWrapperRef?.current}
              />
            </div>
          </div>

          {/* Right Column: Video (Must stay in DOM for PIP) */}
          {videoContent && (
            <div
              className={classNames('iframe-container mt-4 transition-all duration-300', {
                'opacity-100 w-[233px]': screenRecordingMode === ScreenRecordingMode.Preview,
                'opacity-0 w-0 pointer-events-none overflow-hidden':
                  screenRecordingMode !== ScreenRecordingMode.Preview,
              })}
            >
              {videoContent}
            </div>
          )}
        </div>

        {/* Render Annotation Portals to preserve React Context */}
        {annotationPortals.map(portal =>
          createPortal(
            <AnnotationIcon
              key={portal.id}
              item={{
                id: portal.id,
                header: portal.annotation.header ?? portal.annotation.label ?? '',
                text: portal.annotation.text ?? portal.annotation.label,
                offsetInSeconds:
                  portal.annotation.offsetInSeconds ??
                  (typeof portal.annotation.timestamp === 'string'
                    ? parseFloat(portal.annotation.timestamp)
                    : portal.annotation.timestamp) ??
                  0,
              }}
              durationFormat={callDuration > 3599 ? 'HH:mm:ss' : 'mm:ss'}
              onSeek={onSeek}
            />,
            portal.container
          )
        )}
      </div>
    );
  }
);

ExpandedPlayer.displayName = 'ExpandedPlayer';

export default ExpandedPlayer;
