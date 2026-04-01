import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { AudioPlayerActions } from '../audio-player/types';

type UseAudioPlayerSliderOptions = {
  currentTime: number;
  callDuration: number;
  isStream?: boolean;
  sliderMax?: number;
  emitAction: (action: { type: AudioPlayerActions; value?: any }) => void;
};

export const useAudioPlayerSlider = ({
  currentTime,
  callDuration,
  isStream = false,
  sliderMax = 100,
  emitAction,
}: UseAudioPlayerSliderOptions) => {
  const [progress, setProgress] = useState(0);
  const wasPlayingRef = useRef(false);

  const normalizedDuration = useMemo(() => Math.max(callDuration, 0), [callDuration]);

  useEffect(() => {
    if (!normalizedDuration || isStream) {
      return;
    }
    setProgress((currentTime / normalizedDuration) * sliderMax);
  }, [currentTime, normalizedDuration, sliderMax, isStream]);

  const seekToTime = useCallback(
    (sliderValue: number) => {
      setProgress(sliderValue);
      if (!normalizedDuration) {
        return;
      }
      const clampedValue = Math.max(0, Math.min(sliderValue, sliderMax));
      const seekedTime = (clampedValue / sliderMax) * normalizedDuration;
      if (!isStream && Math.floor(seekedTime) !== Math.floor(currentTime)) {
        emitAction({ type: AudioPlayerActions.seek, value: seekedTime });
      }
    },
    [currentTime, emitAction, normalizedDuration, isStream, sliderMax]
  );

  const sliderChange = useCallback(
    (value: number) => {
      if (!isStream && wasPlayingRef.current) {
        emitAction({ type: AudioPlayerActions.pause });
      }
      seekToTime(value);
    },
    [emitAction, isStream, seekToTime]
  );

  const progressChanged = useCallback(
    () => {
      if (!isStream && wasPlayingRef.current) {
        emitAction({ type: AudioPlayerActions.play });
        wasPlayingRef.current = false;
      }
    },
    [emitAction, isStream]
  );

  const handleSlideLeft = useCallback(() => {
    seekToTime(progress - 5);
  }, [progress, seekToTime]);

  const handleSlideRight = useCallback(() => {
    seekToTime(progress + 5);
  }, [progress, seekToTime]);

  const handleSlideConfirm = useCallback(
    (isPlaying: boolean) => {
      emitAction({ type: isPlaying ? AudioPlayerActions.pause : AudioPlayerActions.play });
    },
    [emitAction]
  );

  const handleSlideNumber = useCallback(
    (value: number) => {
      if (value === 0) {
        seekToTime(0);
      } else {
        seekToTime(value * 10);
      }
    },
    [seekToTime]
  );

  return {
    progress,
    sliderMax,
    sliderChange,
    progressChanged,
    handleSlideLeft,
    handleSlideRight,
    handleSlideConfirm,
    handleSlideNumber,
    seekToTime,
    setWasPlayingBeforeSliderChange: (value: boolean) => {
      wasPlayingRef.current = value;
    },
  };
};
