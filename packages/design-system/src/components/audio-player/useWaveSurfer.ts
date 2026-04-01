import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import Minimap from 'wavesurfer.js/plugins/minimap';
import RegionsPlugin from 'wavesurfer.js/plugins/regions';
import { generateRandomPeaks } from '../../helpers/duration';
import { AudioPlayerActions, UniAudioAnnotation } from './types';

export type AnnotationPortal = {
  id: string;
  container: HTMLElement;
  annotation: UniAudioAnnotation;
};

type UseWaveSurferOptions = {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  minimapContainerRef?: MutableRefObject<HTMLDivElement | null>;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  audioSrc?: string;
  peaks?: [Float32Array, Float32Array];
  duration?: number;
  interact?: boolean;
  height?: number;
  annotations?: UniAudioAnnotation[];
  onAction?: (type: AudioPlayerActions, value?: any) => void;
  isStream?: boolean;
};

export const useWaveSurfer = ({
  containerRef,
  minimapContainerRef,
  audioRef,
  audioSrc,
  peaks,
  duration,
  interact = true,
  height = 160,
  annotations = [],
  onAction,
  isStream = false,
}: UseWaveSurferOptions) => {
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const regionsRef = useRef<ReturnType<typeof RegionsPlugin.create> | null>(null);
  const [isReady, setIsReady] = useState(false);
  const isReadyRef = useRef(false);
  const [annotationPortals, setAnnotationPortals] = useState<AnnotationPortal[]>([]);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    isReadyRef.current = isReady;
  }, [isReady]);

  const durationRef = useRef(duration);
  const onActionRef = useRef(onAction);

  useEffect(() => {
    durationRef.current = duration;
  }, [duration]);

  useEffect(() => {
    onActionRef.current = onAction;
  }, [onAction]);

  const dummyAudioRef = useRef<HTMLAudioElement | null>(null);
  if (typeof window !== 'undefined' && !dummyAudioRef.current) {
    dummyAudioRef.current = new Audio();
  }

  useEffect(() => {
    const container = containerRef.current;
    const audioEl = audioRef.current;
    if (!container || !audioEl) return;

    const regions = RegionsPlugin.create();
    regionsRef.current = regions;

    const waveSurfer = WaveSurfer.create({
      container,
      media: isStream ? dummyAudioRef.current! : audioEl,
      height,
      waveColor: interact ? '#C3C3C4' : '#424242',
      progressColor: '#15808C',
      cursorColor: '#449CA7',
      cursorWidth: 2,
      barWidth: 3,
      barGap: 3,
      barRadius: 3,
      barHeight: 0.8,
      splitChannels: [],
      interact,
      dragToSeek: true,
      hideScrollbar: true,
      autoCenter: false,
    });

    waveSurfer.registerPlugin(regions);

    if (minimapContainerRef?.current) {
      waveSurfer.registerPlugin(
        Minimap.create({
          container: minimapContainerRef.current,
          height: 32,
          waveColor: '#C3C3C4',
          progressColor: '#15808C',
          cursorColor: '#449CA7',
          cursorWidth: 1,
          barWidth: 3,
          barGap: 1,
          barRadius: 3,
          overlayColor: '#E7F7FB',
        })
      );
    }

    waveSurferRef.current = waveSurfer;

    waveSurfer.on('ready', () => {
      setIsReady(true);
      updateRegions();
    });

    // In v7, we use 'interaction' to detect user-initiated seeks.
    // This prevents feedback loops when syncing with the audio element.
    const handleInteraction = (newRelativePosition: number) => {
      if (!waveSurferRef.current || !isReady) return;
      try {
        const duration = waveSurferRef.current.getDuration();
        const time = newRelativePosition * duration;
        if (!isNaN(time) && isFinite(time)) {
          onActionRef.current?.(AudioPlayerActions.seek, time);
        }
      } catch (e) {
        console.warn('[WaveSurfer] handleInteraction failed:', e);
      }
    };
    waveSurfer.on('interaction', (newRelativePosition: number) => {
      if (!waveSurferRef.current || !isReadyRef.current) return;
      handleInteraction(newRelativePosition);
    });
    regions.on('region-clicked', (region: { start: number }) => {
      onActionRef.current?.(AudioPlayerActions.seek, region.start);
      onActionRef.current?.(AudioPlayerActions.play);
    });

    const addSeparatorLine = () => {
      const shadowRoot = (container.firstChild as HTMLElement)?.shadowRoot;
      if (!shadowRoot) return;
      const canvases = shadowRoot.querySelector('.canvases') as HTMLDivElement;
      if (!canvases) return;

      let separator = canvases.querySelector('.wave-separator') as HTMLCanvasElement;
      if (!separator) {
        separator = document.createElement('canvas');
        separator.className = 'wave-separator';
        separator.style.position = 'absolute';
        separator.style.top = '50%';
        separator.style.left = '0';
        separator.style.backgroundColor = 'var(--ut-color-border-muted)';
        separator.style.zIndex = '10';
        separator.style.pointerEvents = 'none';
        canvases.appendChild(separator);
      }

      if (Math.abs(separator.width - canvases.clientWidth) > 1) {
        separator.width = canvases.clientWidth;
        separator.height = 1;
      }
    };

    const addMinimapStyling = () => {
      if (!minimapContainerRef?.current || !waveSurferRef.current) return;

      const waveEl = container.firstChild as HTMLElement;
      if (!waveEl || !waveEl.shadowRoot) return;

      const minimapFirstChild = minimapContainerRef.current.firstChild as HTMLElement;
      if (!minimapFirstChild) return;

      const overlayEl = minimapFirstChild?.firstChild as HTMLElement;
      if (!overlayEl) return;

      const waveContainerWidth = waveEl.clientWidth ?? 1;
      // Use cached/ref values or avoid query if possible.
      // For now, let's at least minimize the calculations.
      const wrapper = waveEl.shadowRoot.querySelector('.wrapper');
      const waveWidth = wrapper?.clientWidth ?? 1;
      const sliderContainerWidth = minimapFirstChild.clientWidth ?? 1;

      const targetWidth = Math.round((sliderContainerWidth / waveWidth) * waveContainerWidth);
      if (overlayEl.style.width !== targetWidth + 'px') {
        overlayEl.style.width = targetWidth + 'px';
        overlayEl.classList.add('u-slider-overlay');
      }
    };

    // Use a small timeout or flag to prevent excessive redraw work
    let redrawTimer: any;
    waveSurfer.on('redraw', () => {
      if (redrawTimer) return;
      redrawTimer = setTimeout(() => {
        addSeparatorLine();
        addMinimapStyling();
        redrawTimer = null;
      }, 50); // Throttle redraw adjustments
    });

    return () => {
      waveSurfer.destroy();
      waveSurferRef.current = null;
      regionsRef.current = null;
      setIsReady(false);
    };
  }, [height, interact, isStream, audioRef]); // Re-create if essential props or stream status change

  // Update options when they change
  useEffect(() => {
    if (waveSurferRef.current && isReadyRef.current) {
      try {
        waveSurferRef.current.setOptions({
          height,
          waveColor: interact ? '#C3C3C4' : '#424242',
          splitChannels: [],
          autoCenter: false,
          interact,
          normalize: true,
        });
      } catch (e) {
        console.warn('[WaveSurfer] setOptions failed:', e);
      }
    }
  }, [height, interact]);

  const backupPeaksRef = useRef<[Float32Array, Float32Array] | undefined>(undefined);
  const lastDurationRef = useRef(0);
  const currentSrcRef = useRef<string | undefined>(undefined);
  const rafRef = useRef<number | null>(null);

  // 1. Handle Audio Source Load
  useEffect(() => {
    if (!waveSurferRef.current) return;

    // Reset if src changed
    if (audioSrc !== currentSrcRef.current || peaks) {
      currentSrcRef.current = audioSrc;
      setIsReady(false);
      isReadyRef.current = false;
      backupPeaksRef.current = undefined;
      lastDurationRef.current = 0;

      let activePeaks = peaks;
      let activeDuration = duration;

      if (!activePeaks && audioSrc) {
        // For Streams: Start with generated peaks (to match Vue's noise/stream aesthetic)
        if (isStream) {
          // Use 0 if duration is missing, otherwise duration
          activeDuration = duration && duration > 0 && duration !== Infinity ? duration : 0;
          activePeaks = generateRandomPeaks(activeDuration, audioSrc, true);
          backupPeaksRef.current = activePeaks;
          lastDurationRef.current = activeDuration;
        } else {
          // For Static Audio: Use UNDEFINED peaks and duration to trigger WaveSurfer's internal decoding
          // This ensures precise, high-resolution waveforms that match the Vue implementation's behavior for static files.
          activePeaks = undefined;
          activeDuration = duration && duration > 0 && duration !== Infinity ? duration : undefined;
        }
      }

      if (audioSrc || activePeaks) {
        // Cancel any pending updates
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        waveSurferRef.current.load(audioSrc || '', activePeaks, activeDuration);
      }
    }
  }, [audioSrc, peaks, isStream]);

  // 2. Handle Stream/Duration Updates
  useEffect(() => {
    if (!waveSurferRef.current || !isReadyRef.current) return;

    // STRICTLY prevent any updates for static audio (Audio 1/2) here.
    // Their duration is loaded once and doesn't change dynamically like a stream.
    if (!isStream) return;

    const currentDuration = duration || 0;

    // Only update if we have no external peaks (using generated ones) and duration grew
    if (!peaks && currentDuration > lastDurationRef.current) {
      const diff = currentDuration - lastDurationRef.current;

      // Threshold: Update frequently enough for smoothness (1.0s) to reduce lag
      if (diff > 1.0) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);

        rafRef.current = requestAnimationFrame(() => {
          if (!waveSurferRef.current) return;

          // Generate peaks for the time difference
          const newPeaks = generateRandomPeaks(diff, (audioSrc || '') + lastDurationRef.current, true);

          if (backupPeaksRef.current) {
            // Optimized merge: Create new buffer only once
            const oldLen = backupPeaksRef.current[0].length;
            const newLen = newPeaks[0].length;
            const merged0 = new Float32Array(oldLen + newLen);
            const merged1 = new Float32Array(oldLen + newLen);

            merged0.set(backupPeaksRef.current[0]);
            merged0.set(newPeaks[0], oldLen);
            merged1.set(backupPeaksRef.current[1]);
            merged1.set(newPeaks[1], oldLen);

            backupPeaksRef.current = [merged0, merged1];
          } else {
            backupPeaksRef.current = newPeaks;
          }

          lastDurationRef.current = currentDuration;

          // Reload WaveSurfer with new data
          const currentTime = waveSurferRef.current.getCurrentTime();
          // Use empty string for streams to prevent unnecessary fetching/decoding
          waveSurferRef.current
            .load('', backupPeaksRef.current, currentDuration)
            .then(() => {
              if (waveSurferRef.current) {
                waveSurferRef.current.setTime(currentTime);
              }
            })
            .catch(err => console.warn('WaveSurfer reload failed', err));
        });
      }
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [duration, peaks, audioSrc, isStream]);

  const getAnnotationOffset = useCallback(
    (secs: number) => {
      return isStream ? secs - (durationRef.current || 0) : secs;
    },
    [isStream]
  );

  const updateRegions = useCallback(() => {
    if (!regionsRef.current || !annotations) {
      return;
    }

    const regions = regionsRef.current;
    regions.clearRegions();

    const newPortals: AnnotationPortal[] = [];

    annotations.forEach(annotation => {
      const contentEl = document.createElement('div');
      contentEl.setAttribute('part', 'region-content');
      contentEl.style.width = '16px';
      contentEl.style.height = '16px';

      const originalStart =
        annotation.offsetInSeconds ??
        (typeof annotation.timestamp === 'string' ? parseFloat(annotation.timestamp) : annotation.timestamp) ??
        0;
      const start = getAnnotationOffset(originalStart as number);

      regions.addRegion({
        start,
        content: contentEl,
        color: 'transparent',
        drag: false,
      });

      if (annotation.id) {
        newPortals.push({
          id: String(annotation.id),
          container: contentEl,
          annotation,
        });
      } else {
        newPortals.push({
          id: Math.random().toString(),
          container: contentEl,
          annotation,
        });
      }
    });

    setAnnotationPortals(newPortals);
  }, [annotations, getAnnotationOffset]);

  useEffect(() => {
    if (isReady) {
      updateRegions();
    }
  }, [annotations, updateRegions, isReady]);

  // Handle stream waveform updates

  const setZoom = useCallback(
    (zoomFactor: number) => {
      if (!waveSurferRef.current || !containerRef.current || !isReadyRef.current) return;

      // Use WaveSurfer's internal duration if available, fallback to prop
      const wsDuration = waveSurferRef.current.getDuration() || duration;
      if (!wsDuration || !isFinite(wsDuration)) return;

      // Reset zoom before applying new zoom
      waveSurferRef.current.zoom(1);

      if (zoomFactor > 0) {
        const clientWidth = containerRef.current.clientWidth;
        const minPxPerSec = clientWidth / wsDuration;
        waveSurferRef.current.zoom(zoomFactor * minPxPerSec);
      }
    },
    [containerRef, duration, isReady, containerWidth]
  );

  // Handle container resize to keep zoom consistent
  useEffect(() => {
    if (!containerRef.current || !waveSurferRef.current) return;

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [containerRef]);

  const setTime = useCallback((time: number) => {
    if (!waveSurferRef.current || !isReadyRef.current) return;
    try {
      waveSurferRef.current.setTime(time);
    } catch (e) {
      console.warn('[WaveSurfer] setTime failed:', e);
    }
  }, []);

  return {
    isReady,
    setZoom,
    setTime,
    annotationPortals,
  };
};
