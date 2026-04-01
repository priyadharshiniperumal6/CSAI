import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';

import { UniSliderProgress } from '../slider/UniSliderProgress';
import { UniButton } from '../button/UniButton';
import { UniTooltip } from '../tooltip/UniTooltip';
import { UniPopover } from '../popover/UniPopover';
import { AudioPlayerActions } from '../audio-player/types';

import { VolumeControl } from './VolumeControl';
import { useAudioPlayerSlider } from './useAudioPlayerSlider';
import { ScreenRecordingMode, SCREEN_RECORDING_MODE_BUTTONS, ScreenRecordingAction } from './constants';
import { SPEED_MENU_ITEMS } from '../audio-player/constants/speedOptions';

import './UniScreenRecording.scss';

export type ScreenRecordingActionPayload = {
  type: AudioPlayerActions;
  value?: any;
};

export type UniScreenRecordingProps = {
  src?: string;
  mode: ScreenRecordingMode;
  callDuration: number;
  playing: boolean;
  volume: number;
  agentName?: string;
  currentTime: number;
  fullScreenElement?: HTMLElement | null;
  leftVolume?: number;
  rightVolume?: number;
  overlayTrigger?: 'click' | 'hover';
  onChangeMode?: (mode?: ScreenRecordingMode) => void;
  onAction?: (payload: ScreenRecordingActionPayload) => void;
  videoRef?: React.MutableRefObject<HTMLVideoElement | null>;
  playbackRate?: number;
};

const formatOffsetTime = (seconds: number, format: 'mm:ss' | 'HH:mm:ss') => {
  const safeSeconds = Math.max(0, seconds);
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const secs = Math.floor(safeSeconds % 60);

  const pad = (value: number) => value.toString().padStart(2, '0');
  if (format === 'HH:mm:ss') {
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
  }
  const mm = hours > 0 ? pad(hours * 60 + minutes) : pad(minutes);
  return `${mm}:${pad(secs)}`;
};

export const UniScreenRecording = ({
  src,
  mode,
  callDuration,
  playing,
  volume,
  agentName,
  currentTime,
  fullScreenElement,
  leftVolume,
  rightVolume,
  videoRef,
  onChangeMode,
  onAction,
  playbackRate = 1,
}: UniScreenRecordingProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const popoverContainerRef = useRef<HTMLDivElement | null>(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [volumePopoverOpen, setVolumePopoverOpen] = useState(false);

  const [masterVolume, setMasterVolume] = useState(volume);
  const [leftChannelVolume, setLeftChannelVolume] = useState(leftVolume ?? volume);
  const [rightChannelVolume, setRightChannelVolume] = useState(rightVolume ?? volume);

  const {
    progress,
    sliderMax,
    sliderChange,
    progressChanged,
    handleSlideLeft,
    handleSlideRight,
    handleSlideConfirm,
    handleSlideNumber,
  } = useAudioPlayerSlider({
    currentTime,
    callDuration,
    emitAction: action => onAction?.(action),
  });

  const isFullScreen = mode === ScreenRecordingMode.FullScreen;
  const screenRecButtons = useMemo(() => SCREEN_RECORDING_MODE_BUTTONS(mode), [mode]);
  const timeFormat = callDuration > 3599 ? 'HH:mm:ss' : 'mm:ss';
  const formattedCurrentTime = formatOffsetTime(currentTime, timeFormat);

  useEffect(() => {
    setMasterVolume(volume);
    setLeftChannelVolume(leftVolume ?? volume);
    setRightChannelVolume(rightVolume ?? volume);
  }, [leftVolume, rightVolume, volume]);

  useEffect(() => {
    const container = fullScreenElement ?? containerRef.current;
    if (!container) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const showOverlay = () => {
      setOverlayVisible(true);
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      timeoutId = setTimeout(hideOverlay, isFullScreen ? 5000 : 3000);
    };

    const hideOverlay = () => setOverlayVisible(false);

    container.addEventListener('mousemove', showOverlay);
    container.addEventListener('mouseout', hideOverlay);

    return () => {
      container.removeEventListener('mousemove', showOverlay);
      container.removeEventListener('mouseout', hideOverlay);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [fullScreenElement, isFullScreen]);

  const performAction = useCallback(
    (action: ScreenRecordingAction) => {
      switch (action) {
        case ScreenRecordingAction.exitPIP:
          onChangeMode?.(ScreenRecordingMode.Preview);
          return;
        case ScreenRecordingAction.enterPIP:
          onChangeMode?.(ScreenRecordingMode.PIP);
          return;
        case ScreenRecordingAction.enterTheatreMode:
          if (mode === ScreenRecordingMode.PIP) {
            onChangeMode?.(ScreenRecordingMode.Preview);
          }
          onChangeMode?.(ScreenRecordingMode.Theatre);
          return;
        case ScreenRecordingAction.enterFullScreen:
          toggleFullScreen();
          return;
      }
    },
    [mode, onChangeMode]
  );

  const play = useCallback(() => {
    onAction?.({ type: AudioPlayerActions.play });
  }, [onAction]);

  const pause = useCallback(() => {
    onAction?.({ type: AudioPlayerActions.pause });
  }, [onAction]);

  useEffect(() => {
    const handleFullScreenChange = () => {
      const isCurrentlyFullScreen = !!document.fullscreenElement;
      if (isCurrentlyFullScreen && mode !== ScreenRecordingMode.FullScreen) {
        onChangeMode?.(ScreenRecordingMode.FullScreen);
        setOverlayVisible(true);
      } else if (!isCurrentlyFullScreen && mode === ScreenRecordingMode.FullScreen) {
        onChangeMode?.(ScreenRecordingMode.Preview);
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
    };
  }, [mode, onChangeMode]);

  const toggleFullScreen = useCallback(() => {
    const target = fullScreenElement ?? containerRef.current;
    if (!target) return;

    if (mode === ScreenRecordingMode.FullScreen) {
      if (document.fullscreenElement) {
        document.exitFullscreen?.();
      }
      onChangeMode?.(ScreenRecordingMode.Preview);
      return;
    }

    target.requestFullscreen?.()
      .then(() => {
        onChangeMode?.(ScreenRecordingMode.FullScreen);
      })
      .catch(err => {
        console.error('Error attempting to enable full-screen mode:', err);
      });
  }, [fullScreenElement, mode, onChangeMode]);



  return (
    <div className="uni-screen-recording group" ref={containerRef}>
      <div className="relative h-full w-full">
        <div className="h-full w-full">
          {src ? (
            <video
              ref={videoRef}
              src={src}
              className="h-full w-full bg-black"
              muted
              playsInline
            />
          ) : null}
        </div>
        <div
          className={classNames(
            'uni-screen-recording__overlay absolute top-0 h-full w-full rounded-lg opacity-0 transition-opacity ease-in-out',
            {
              '!opacity-100': overlayVisible,
              'bg-black-gradient h-screen': isFullScreen,
              'bg-black/45': !isFullScreen,
            }
          )}
        >
          <div
            className={classNames('flex h-full w-full flex-col justify-between px-4 text-white', {
              'py-2': !isFullScreen,
              'py-4': isFullScreen,
            })}
          >
            {isFullScreen ? (
              <div className={classNames('font-medium', { 'text-sm': !isFullScreen, 'text-xl': isFullScreen })}>
                Screen Recording {agentName ? `| ${agentName}` : ''}
              </div>
            ) : null}
            <div
              className={classNames({
                'm-auto': mode === ScreenRecordingMode.PIP || mode === ScreenRecordingMode.Preview,
              })}
            >
              {isFullScreen && (
                <UniSliderProgress
                  className="mx-0 mb-1 mt-1 px-0 pb-2 pt-2"
                  value={progress}
                  min={0}
                  max={sliderMax}
                  tooltip={{ open: false }}
                  onChange={sliderChange}
                  onAfterChange={progressChanged}
                  onSlideLeft={handleSlideLeft}
                  onSlideRight={handleSlideRight}
                  onSlideConfirm={() => handleSlideConfirm(playing)}
                  onSlideNumber={handleSlideNumber}
                />
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isFullScreen && (
                    <>
                      {!playing ? (
                        <UniButton
                          type="text"
                          shape="circle"
                          iconOnly
                          materialIcon={{ iconName: 'play_arrow', colorClass: 'text-white', size: 32 }}
                          onClick={play}
                        />
                      ) : (
                        <UniButton
                          type="text"
                          shape="circle"
                          iconOnly
                          materialIcon={{ iconName: 'pause', colorClass: 'text-white', size: 32 }}
                          onClick={pause}
                        />
                      )}
                    </>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  {screenRecButtons?.map(button => (
                    <UniTooltip key={button.action} title={button.tooltip} placement="top">
                      <UniButton
                        type="text"
                        shape="circle"
                        iconOnly
                        className="!text-white"
                        materialIcon={button.materialIcon ? { iconName: button.materialIcon, colorClass: 'text-white' } : undefined}
                        uniIcon={button.uIcon ? { iconName: button.uIcon, colorClass: 'text-white' } : undefined}
                        onClick={() => performAction(button.action)}
                      />
                    </UniTooltip>
                  ))}
                  {isFullScreen && (
                    <>
                      <UniPopover
                        placement="topRight"
                        open={volumePopoverOpen}
                        onOpenChange={setVolumePopoverOpen}
                        trigger="click"
                        showArrow
                        getPopupContainer={() => popoverContainerRef.current ?? document.body}
                        content={
                          <div className="flex w-64 flex-col gap-1">
                            {leftVolume !== undefined ? (
                              <VolumeControl
                                label="Agent"
                                value={leftChannelVolume}
                                onChange={val => {
                                  setLeftChannelVolume(val);
                                  onAction?.({ type: AudioPlayerActions.setLeftVolume, value: val });
                                }}
                              />
                            ) : null}
                            {rightVolume !== undefined ? (
                              <VolumeControl
                                label="Other Party"
                                value={rightChannelVolume}
                                onChange={val => {
                                  setRightChannelVolume(val);
                                  onAction?.({ type: AudioPlayerActions.setRightVolume, value: val });
                                }}
                              />
                            ) : null}
                            <VolumeControl
                              label="Master volume"
                              value={masterVolume}
                              onChange={val => {
                                setMasterVolume(val);
                                onAction?.({ type: AudioPlayerActions.setVolume, value: val });
                              }}
                            />
                          </div>
                        }
                      >
                        <UniButton
                          type="text"
                          shape="circle"
                          iconOnly
                          materialIcon={{ iconName: 'volume_up', colorClass: 'text-white' }}
                        />
                      </UniPopover>
                      <UniPopover
                        placement="topRight"
                        trigger="click"
                        getPopupContainer={() => popoverContainerRef.current ?? document.body}
                        content={
                          <div className="flex flex-col">
                            {SPEED_MENU_ITEMS.map(item => (
                              <div
                                key={item.value}
                                className={classNames('cursor-pointer px-4 py-2 hover:bg-neutral-100 text-black', {
                                  'font-bold text-primary-600': Number(item.value) === playbackRate
                                })}
                                onClick={() => onAction?.({ type: AudioPlayerActions.setPlaybackRate, value: Number(item.value) })}
                              >
                                {item.label}
                              </div>
                            ))}
                          </div>
                        }
                      >
                        <UniButton
                          type="text"
                          shape="circle"
                          iconOnly
                          materialIcon={{ iconName: 'speed', colorClass: 'text-white' }}
                        />
                      </UniPopover>
                      <span className="text-sm font-medium">{formattedCurrentTime}</span>
                      <span
                        className="material-symbols-outlined scale-125 cursor-pointer"
                        onClick={toggleFullScreen}
                      >
                        fullscreen_exit
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="popover-container" ref={popoverContainerRef} />
    </div>
  );
};
