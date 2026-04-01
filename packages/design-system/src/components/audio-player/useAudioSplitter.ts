import { useEffect, useRef, useState } from 'react';

export const useAudioSplitter = (audioElement: HTMLAudioElement | null, audioCtx: AudioContext | null) => {
  const leftGainRef = useRef<GainNode | null>(null);
  const rightGainRef = useRef<GainNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  const [leftVolume, setLeftVolumeState] = useState(1);
  const [rightVolume, setRightVolumeState] = useState(1);

  useEffect(() => {
    if (!audioElement || !audioCtx) {
      return;
    }
    const splitter = audioCtx.createChannelSplitter(2);
    const merger = audioCtx.createChannelMerger(2);
    const leftGain = audioCtx.createGain();
    const rightGain = audioCtx.createGain();
    leftGain.gain.value = 1;
    rightGain.gain.value = 1;

    splitter.connect(leftGain, 0);
    splitter.connect(rightGain, 1);
    leftGain.connect(merger, 0, 0);
    rightGain.connect(merger, 0, 1);
    merger.connect(audioCtx.destination);

    const source = audioCtx.createMediaElementSource(audioElement);
    source.connect(splitter);

    leftGainRef.current = leftGain;
    rightGainRef.current = rightGain;
    sourceRef.current = source;

    return () => {
      try {
        source.disconnect();
        splitter.disconnect();
        leftGain.disconnect();
        rightGain.disconnect();
        merger.disconnect();
      } catch {
        // no-op
      }
      leftGainRef.current = null;
      rightGainRef.current = null;
      sourceRef.current = null;
    };
  }, [audioElement, audioCtx]);

  const setLeftVolume = (value: number) => {
    const clamped = Math.max(0, Math.min(value, 1));
    setLeftVolumeState(clamped);
    if (leftGainRef.current) {
      leftGainRef.current.gain.value = clamped;
    }
  };

  const setRightVolume = (value: number) => {
    const clamped = Math.max(0, Math.min(value, 1));
    setRightVolumeState(clamped);
    if (rightGainRef.current) {
      rightGainRef.current.gain.value = clamped;
    }
  };

  return { leftVolume, rightVolume, setLeftVolume, setRightVolume };
};
