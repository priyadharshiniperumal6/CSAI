import type { ScreenRecordingMode } from '../screen-recording/constants';

export enum AudioPlayerActions {
  play = 'play',
  pause = 'pause',
  seek = 'seek',
  setVolume = 'setVolume',
  setLeftVolume = 'setLeftVolume',
  setRightVolume = 'setRightVolume',
  setPlaybackRate = 'setPlaybackRate',
  toggleMute = 'toggleMute',
  replay = 'replay',
  forward = 'forward',
  rewind = 'rewind',
  toggleAnnotations = 'toggleAnnotations',
  expand = 'expand',
  minimize = 'minimize',
  reset = 'reset',
  toggleScreenRec = 'toggleScreenRec',
  isPlaying = 'isPlaying',
  setZoom = 'setZoom',
}

export enum AudioPlayerSizeType {
  mini = 'mini',
  expanded = 'expanded',
}

export enum AudioPlayerAdvancedControl {
  annotations = 'annotations',
  screenRec = 'screenRec',
  toggleSize = 'toggleSize',
  settings = 'settings',
}

export type UniAudioAnnotation = {
  id?: string | number;
  annotationId?: string | number;
  label?: string;
  text?: string;
  header?: string;
  timestamp?: string | number;
  offsetInSeconds?: number;
};

export type UniAudioPlayerProps = {
  isMediaLoading?: boolean;
  audioSrc?: string;
  currentTime?: number;
  aDuration?: number;
  peaks?: [Float32Array, Float32Array];
  agentFullName?: string;
  expandDisabled?: boolean;
  annotations?: UniAudioAnnotation[];
  isStream?: boolean;
  advancedControls?: AudioPlayerAdvancedControl[];
  defaultPlayer?: AudioPlayerSizeType;
  defaultScreenRecordingMode?: ScreenRecordingMode;
  screenRecordingLink?: string;
  defaultShowScreenRecording?: boolean;
  defaultShowTopBanner?: boolean;
  theatreVideoEl?: HTMLVideoElement | null;
  zoom?: number;
  playbackRate?: number;
  onAction?: (payload: { type: AudioPlayerActions; value?: any }) => void;
  onRegionClick?: (value: unknown) => void;
  onToggleExpanded?: (expanded: boolean) => void;
  onToggleScreenRecording?: (show: boolean) => void;
  onToggleTopBanner?: (show: boolean) => void;
  onCurrentTimeChange?: (time: number) => void;
  onDurationChange?: (duration: number) => void;
  className?: string;
};
