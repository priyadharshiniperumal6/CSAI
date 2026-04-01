import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

import { AudioPlayerActions } from './types';

type UseAudioPlayerOptions = {
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  videoRef?: MutableRefObject<HTMLVideoElement | null>;
  audioContextRef?: MutableRefObject<AudioContext | null>;
  isStream?: boolean;
  onAction?: (action: { type: AudioPlayerActions; value?: any }) => void;
};

export const useAudioPlayer = ({ audioRef, videoRef, audioContextRef, isStream = false, onAction }: UseAudioPlayerOptions) => {
  const [playing, setPlaying] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [playbackRate, setPlaybackRateState] = useState(1);
  const [muted, setMuted] = useState(false);

  const play = useCallback(async () => {
    if (!audioRef.current) return;
    
    try {
      if (audioContextRef?.current?.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      await audioRef.current.play();
      if (videoRef?.current) {
        await videoRef.current.play();
      }
      setPlaying(true);
    } catch (error) {
      console.error('Audio playback failed:', error);
      setPlaying(false);
    }
  }, [audioRef, videoRef, audioContextRef]);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    videoRef?.current?.pause();
    setPlaying(false);
  }, [audioRef, videoRef]);

  const seek = useCallback(
    (time: number) => {
      if (!audioRef.current) return;
      const next = Math.max(0, Math.min(time, audioRef.current.duration || time));
      
      // Avoid redundant seeks to prevent lag/stutter
      if (Math.abs(audioRef.current.currentTime - next) > 0.05) {
        audioRef.current.currentTime = next;
      }
      
      setCurrentTime(next);
      if (videoRef?.current && Math.abs(videoRef.current.currentTime - next) > 0.05) {
        videoRef.current.currentTime = next;
      }
    },
    [audioRef, videoRef]
  );

  const setVolume = useCallback(
    (value: number) => {
      if (!audioRef.current) return;
      const next = Math.max(0, Math.min(value, 1));
      audioRef.current.volume = next;
      setVolumeState(next);
    },
    [audioRef]
  );

  const setPlaybackRate = useCallback(
    (value: number) => {
      if (!audioRef.current) return;
      audioRef.current.playbackRate = value;
      setPlaybackRateState(value);
      if (videoRef?.current) {
        videoRef.current.playbackRate = value;
      }
    },
    [audioRef, videoRef]
  );

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setMuted(audioRef.current.muted);
  }, [audioRef]);

  const replay = useCallback(async () => {
    if (!audioRef.current) return;
    try {
      if (audioContextRef?.current?.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      if (videoRef?.current) {
        videoRef.current.currentTime = 0;
      }
      await audioRef.current.play();
      if (videoRef?.current) {
        await videoRef.current.play();
      }
      setPlaying(true);
    } catch (error) {
      console.error('Replay failed:', error);
    }
  }, [audioRef, videoRef, audioContextRef]);

  const forward = useCallback(
    (seconds = 10) => {
      if (!audioRef.current) return;
      seek(audioRef.current.currentTime + seconds);
    },
    [audioRef, seek]
  );

  const rewind = useCallback(
    (seconds = 10) => {
      if (!audioRef.current) return;
      seek(audioRef.current.currentTime - seconds);
    },
    [audioRef, seek]
  );

  const setSrc = useCallback(
    (src?: string | null) => {
      if (!audioRef.current) return;

      setPlaying(false);
      setCanPlay(false);
      setCurrentTime(0);
      setDuration(0);

      if (!src) {
        audioRef.current.removeAttribute('src');
        audioRef.current.load();
        return;
      }

      if (isStream) {
        audioRef.current.preload = 'none';
        setCanPlay(true);
      } else {
        audioRef.current.preload = 'auto';
      }

      audioRef.current.src = src;
      audioRef.current.load();
    },
    [audioRef, isStream]
  );

  const playingRef = useRef(playing);
  const onActionRef = useRef(onAction);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    onActionRef.current = onAction;
  }, [onAction]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const handleCanPlay = () => {
      setCanPlay(true);
    };

    const handleMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      if (audio.seeking) return;
      setPlaying(false);
      onActionRef.current?.({ type: AudioPlayerActions.isPlaying, value: false });
    };

    const handlePlay = () => {
      setPlaying(true);
      onActionRef.current?.({ type: AudioPlayerActions.isPlaying, value: true });
    };

    const handlePause = () => {
      setPlaying(false);
      onActionRef.current?.({ type: AudioPlayerActions.isPlaying, value: false });
    };

    const handleDurationChange = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleVolumeChange = () => {
      setVolumeState(audio.volume);
      setMuted(audio.muted);
    };

    const handleStalled = () => console.warn('[AudioPlayer] Audio stalled');
    const handleWaiting = () => console.log('[AudioPlayer] Audio waiting');
    const handleError = (e: any) => console.error('[AudioPlayer] Audio error:', audio.error || e);

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadedmetadata', handleMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('volumechange', handleVolumeChange);
    audio.addEventListener('stalled', handleStalled);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('error', handleError);

    const video = videoRef?.current;
    let handleVideoPlay: any;
    let handleVideoPause: any;

    if (video) {
      handleVideoPlay = () => {
        if (!playingRef.current) {
          audio.play().catch(err => console.error('Video sync play failed:', err));
        }
      };
      handleVideoPause = () => {
        if (playingRef.current) {
          audio.pause();
        }
      };

      video.addEventListener('play', handleVideoPlay);
      video.addEventListener('pause', handleVideoPause);
    }

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadedmetadata', handleMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('volumechange', handleVolumeChange);
      audio.removeEventListener('stalled', handleStalled);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('error', handleError);
      if (video) {
        video.removeEventListener('play', handleVideoPlay);
        video.removeEventListener('pause', handleVideoPause);
      }
    };
  }, [audioRef, videoRef?.current]); // Only run when refs change (rare)

  return {
    audio: audioRef,
    playing,
    canPlay,
    audioCurrentTime: currentTime,
    duration,
    volume,
    playbackRate,
    muted,
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
  };
};
