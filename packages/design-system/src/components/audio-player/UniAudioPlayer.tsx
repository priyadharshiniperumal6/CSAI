import { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { Spin } from 'antd';

import { UniScreenRecording } from '../screen-recording/UniScreenRecording';
import { ScreenRecordingMode } from '../screen-recording/constants';

import { useAudioPlayer } from './useAudioPlayer';
import { useAudioSplitter } from './useAudioSplitter';
import { MiniPlayer } from './components/MiniPlayer';
import { ExpandedPlayer } from './components/ExpandedPlayer';
import {
  AudioPlayerActions,
  AudioPlayerAdvancedControl,
  AudioPlayerSizeType,
  type UniAudioPlayerProps,
} from './types';

import './UniAudioPlayer.scss';

export const UniAudioPlayer = ({
  isMediaLoading = false,
  audioSrc,
  currentTime,
  aDuration,
  peaks,
  annotations = [],
  agentFullName = 'Support Agent',
  expandDisabled = false,
  isStream = false,
  advancedControls = [AudioPlayerAdvancedControl.toggleSize],
  defaultPlayer = AudioPlayerSizeType.expanded,
  defaultScreenRecordingMode = ScreenRecordingMode.Preview,
  screenRecordingLink,
  defaultShowScreenRecording = false,
  defaultShowTopBanner = false,
  theatreVideoEl,
  onAction,
  onToggleExpanded,
  onToggleScreenRecording,
  onToggleTopBanner,
  onCurrentTimeChange,
  onDurationChange,
  zoom,
  playbackRate: playbackRateProp,
  className,
}: UniAudioPlayerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoWrapperRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  if (typeof window !== 'undefined') {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.crossOrigin = 'anonymous';
      audio.controls = false;
      audioRef.current = audio;
    }
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
  }

  const [isExpanded, setIsExpanded] = useState(defaultPlayer === AudioPlayerSizeType.expanded);
  const [showScreenRecording, setShowScreenRecording] = useState(defaultShowScreenRecording);
  const [showTopBanner, setShowTopBanner] = useState(defaultShowTopBanner);
  const [screenRecordingMode, setScreenRecordingMode] = useState(defaultScreenRecordingMode);

  const {
    playing,
    canPlay,
    audioCurrentTime,
    duration,
    volume,
    playbackRate,
    play,
    pause,
    seek,
    setVolume,
    setPlaybackRate,
    toggleMute,
    replay,
    forward,
    rewind,
    setSrc,
  } = useAudioPlayer({
    audioRef,
    videoRef: screenRecordingMode === ScreenRecordingMode.Theatre ? ({ current: theatreVideoEl } as any) : videoRef,
    audioContextRef,
    isStream,
    onAction,
  });

  useEffect(() => {
    if (typeof playbackRateProp === 'number' && playbackRateProp !== playbackRate) {
      setPlaybackRate(playbackRateProp);
    }
  }, [playbackRateProp, playbackRate, setPlaybackRate]);

  const { leftVolume, rightVolume, setLeftVolume, setRightVolume } = useAudioSplitter(audioRef.current, audioContextRef.current);

  const callDuration = useMemo(() => {
    if (isStream) {
      return Math.max(audioCurrentTime, aDuration ?? 0);
    }
    if (aDuration && aDuration > 0) {
      return aDuration;
    }
    return duration;
  }, [aDuration, duration, audioCurrentTime, isStream]);

  const mediaLoading = isMediaLoading || !canPlay;

  useEffect(() => {
    if (audioSrc) {
      setSrc(audioSrc);
    } else {
      setSrc(undefined);
    }
  }, [audioSrc, setSrc]);

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(err => console.error('Failed to close AudioContext:', err));
        audioContextRef.current = null;
      }
    };
  }, []);

  const prevPropTimeRef = useRef(currentTime);
  useEffect(() => {
    // Only seek if the prop changed from outside, not from internal updates
    // And ensure we don't seek if the difference is negligible (prevents stuttering during playback)
    if (typeof currentTime === 'number' && currentTime !== prevPropTimeRef.current) {
        if (Math.abs(currentTime - audioCurrentTime) > 0.5) {
             seek(currentTime);
        }
      prevPropTimeRef.current = currentTime;
    }
  }, [currentTime, audioCurrentTime, seek]);

  const lastEmittedTimeRef = useRef(0);
  useEffect(() => {
    // Throttle parent updates to every ~200ms to avoid render bottlenecks
    if (Math.abs(audioCurrentTime - lastEmittedTimeRef.current) >= 0.2 || audioCurrentTime === 0 || (duration > 0 && Math.abs(audioCurrentTime - duration) < 0.1)) {
        onCurrentTimeChange?.(audioCurrentTime);
        lastEmittedTimeRef.current = audioCurrentTime;
    }
  }, [audioCurrentTime, onCurrentTimeChange, duration]);

  useEffect(() => {
    onDurationChange?.(callDuration);
  }, [callDuration, onDurationChange]);

  // Sync video time when mode changes (e.g. to Theatre mode)
  useEffect(() => {
    const video = screenRecordingMode === ScreenRecordingMode.Theatre ? theatreVideoEl : videoRef?.current;
    if (video) {
        if (Math.abs(video.currentTime - audioCurrentTime) > 0.2) {
            video.currentTime = audioCurrentTime;
        }
        if (playing && video.paused) {
            video.play().catch(() => {});
        } else if (!playing && !video.paused) {
            video.pause();
        }
    }
  }, [screenRecordingMode, videoRef, theatreVideoEl, audioCurrentTime, playing]);

  const toggleExpanded = (value: boolean) => {
    if (expandDisabled) return;
    setIsExpanded(value);
    onToggleExpanded?.(value);
  };

  const toggleScreenRecording = (value: boolean) => {
    setShowScreenRecording(value);
    onToggleScreenRecording?.(value);
  };

  const toggleTopBanner = (value: boolean) => {
    setShowTopBanner(value);
    onToggleTopBanner?.(value);
  };

  const emitAction = (type: AudioPlayerActions, value?: any) => {
    onAction?.({ type, value });
    switch (type) {
      case AudioPlayerActions.play:
        play();
        break;
      case AudioPlayerActions.pause:
        pause();
        break;
      case AudioPlayerActions.seek:
        if (typeof value === 'number') {
          seek(value);
        }
        break;
      case AudioPlayerActions.setVolume:
        if (typeof value === 'number') {
          setVolume(value);
          setLeftVolume(value);
          setRightVolume(value);
        }
        break;
      case AudioPlayerActions.setLeftVolume:
        if (typeof value === 'number') {
          setLeftVolume(value);
        }
        break;
      case AudioPlayerActions.setRightVolume:
        if (typeof value === 'number') {
          setRightVolume(value);
        }
        break;
      case AudioPlayerActions.setPlaybackRate:
        if (typeof value === 'number') {
          setPlaybackRate(value);
        } else {
          setPlaybackRate(playbackRate === 1 ? 1.25 : 1);
        }
        break;
      case AudioPlayerActions.toggleMute:
        toggleMute();
        break;
      case AudioPlayerActions.replay:
        replay();
        break;
      case AudioPlayerActions.forward:
        forward();
        break;
      case AudioPlayerActions.rewind:
        rewind();
        break;
      case AudioPlayerActions.expand:
        toggleExpanded(true);
        break;
      case AudioPlayerActions.minimize:
        toggleExpanded(false);
        break;
      case AudioPlayerActions.toggleScreenRec:
        if (showScreenRecording && screenRecordingMode === ScreenRecordingMode.Theatre) {
           setScreenRecordingMode(ScreenRecordingMode.Preview);
        } else {
           toggleScreenRecording(!showScreenRecording);
           if (!showScreenRecording) {
             setScreenRecordingMode(ScreenRecordingMode.Preview);
           }
        }
        break;
      case AudioPlayerActions.toggleAnnotations:
        toggleTopBanner(!showTopBanner);
        break;
      case AudioPlayerActions.reset:
        setSrc(undefined);
        break;
      case AudioPlayerActions.setZoom:
        // Local state in ExpandedPlayer handles this, but we keep it for action tracking
        break;
    }
  };

  const changeScreenRecordingMode = (mode?: ScreenRecordingMode) => {
    if (!mode) {
      setScreenRecordingMode(defaultScreenRecordingMode);
      onToggleScreenRecording?.(false);
      return;
    }

    if (mode === ScreenRecordingMode.PIP) {
      if (videoRef.current) {
        setScreenRecordingMode(mode);
        videoRef.current.requestPictureInPicture().catch(err => {
          console.error('Failed to enter PIP mode:', err);
        });
        
        const handleLeavePIP = () => {
          setScreenRecordingMode(ScreenRecordingMode.Preview);
          videoRef.current?.removeEventListener('leavepictureinpicture', handleLeavePIP);
        };
        videoRef.current.addEventListener('leavepictureinpicture', handleLeavePIP);
      }
      return;
    }

    setScreenRecordingMode(mode);
  };

  const renderVideo = () => {
    if (!advancedControls.includes(AudioPlayerAdvancedControl.screenRec) || !showScreenRecording || !screenRecordingLink) {
      return null;
    }

    return (
      <div
        className={classNames('video-container', {
          'w-full md:w-[233px] md:min-w-[233px]': isExpanded && screenRecordingMode === ScreenRecordingMode.Preview,
          'aspect-auto h-[267px] w-full': !isExpanded && screenRecordingMode === ScreenRecordingMode.Preview,
          'hidden': screenRecordingMode === ScreenRecordingMode.PIP || screenRecordingMode === ScreenRecordingMode.Theatre,
        })}
        ref={videoWrapperRef}
      >
        <UniScreenRecording
          src={screenRecordingLink}
          mode={screenRecordingMode}
          callDuration={callDuration}
          currentTime={audioCurrentTime}
          playing={playing}
          volume={volume}
          leftVolume={leftVolume}
          rightVolume={rightVolume}
          agentName={agentFullName}
          fullScreenElement={videoWrapperRef.current}
          videoRef={videoRef}
          playbackRate={playbackRate}
          onChangeMode={changeScreenRecordingMode}
          onAction={({ type, value }) => emitAction(type, value)}
        />
      </div>
    );
  };

  const renderPlayer = () =>
    isExpanded ? (
      <ExpandedPlayer
        agentName={agentFullName}
        audioSrc={audioSrc}
        audioRef={audioRef}
        peaks={peaks}
        annotations={annotations}
        showTopBanner={showTopBanner}
        callDuration={callDuration}
        currentTime={audioCurrentTime}
        playing={playing}
        canInteract={canPlay && !isStream}
        isStream={isStream}
        showScreenRecording={showScreenRecording}
        hasScreenRecording={Boolean(screenRecordingLink)}
        volume={volume}
        leftVolume={leftVolume}
        rightVolume={rightVolume}
        playbackRate={playbackRate}
        advancedControls={advancedControls}
        zoom={zoom}
        onAction={emitAction}
        onSpeedChange={value => emitAction(AudioPlayerActions.setPlaybackRate, value)}
        onZoomChange={value => emitAction(AudioPlayerActions.setZoom, value)}
        onVolumeChange={(value: number) => emitAction(AudioPlayerActions.setVolume, value)}
        onLeftVolumeChange={(value: number) => emitAction(AudioPlayerActions.setLeftVolume, value)}
        onRightVolumeChange={(value: number) => emitAction(AudioPlayerActions.setRightVolume, value)}
        videoWrapperRef={videoWrapperRef}
        videoContent={renderVideo() ?? undefined}
        screenRecordingMode={screenRecordingMode}
      />
    ) : (
      <div className="flex flex-col gap-4">
        {renderVideo()}
        <MiniPlayer
          agentName={agentFullName}
          callDuration={callDuration}
          currentTime={audioCurrentTime}
          playing={playing}
          canInteract={canPlay && !isStream}
          isStream={isStream}
          showAnnotations={showTopBanner}
          annotations={annotations as any}
          showScreenRecording={showScreenRecording}
          hasScreenRecording={Boolean(screenRecordingLink)}
          advancedControls={advancedControls}
          onAction={emitAction}
          playbackRate={playbackRate}
        />
      </div>
    );

  return (
    <div
      className={classNames('uni-audio-player rounded-lg bg-white', className, {
        'player-drop-shadow pr-6': isExpanded && !expandDisabled,
        flex: mediaLoading,
      })}
      ref={containerRef}
    >
      {mediaLoading ? (
        <div className="m-auto flex h-full items-center justify-center py-10">
          <Spin />
        </div>
      ) : null}
      {!mediaLoading && !audioSrc ? (
        <div className="flex h-full items-center justify-center py-10 text-sm italic text-neutral-400">
          {isStream ? 'No Audio' : 'No Recordings'}
        </div>
      ) : null}
      {!mediaLoading && audioSrc ? (
        <div className={classNames('flex flex-col gap-4')}>
          <div className={classNames('flex-1')}>{renderPlayer()}</div>
        </div>
      ) : null}
    </div>
  );
};

export default UniAudioPlayer;
