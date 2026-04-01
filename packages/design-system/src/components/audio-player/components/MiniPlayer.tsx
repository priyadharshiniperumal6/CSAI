import { memo, useMemo, useState } from 'react';
import { UniDivider } from '../../divider/UniDivider';
import { UniSliderProgress } from '../../slider/UniSliderProgress';
import { useAudioPlayerSlider } from '../../screen-recording/useAudioPlayerSlider';
import { AudioPlayerActions, AudioPlayerAdvancedControl, UniAudioAnnotation } from '../types';
import { getAdvancedControlConfig, getBasicControlConfig } from '../constants/playerControls';
import { AudioPlayerButtons } from './AudioPlayerButtons';
import { formatOffsetTime } from '../utils/time';
import { SPEED_MENU_ITEMS } from '../constants/speedOptions';

type MiniPlayerProps = {
  agentName?: string;
  callDuration: number;
  currentTime: number;
  playing: boolean;
  canInteract: boolean;
  isStream?: boolean;
  showAnnotations: boolean;
  annotations?: UniAudioAnnotation[];
  showScreenRecording: boolean;
  hasScreenRecording: boolean;
  onAction: (action: AudioPlayerActions, value?: any) => void;
  advancedControls: AudioPlayerAdvancedControl[];
  playbackRate?: number;
};

export const MiniPlayer = memo(({
  agentName = 'Agent',
  callDuration,
  currentTime,
  playing,
  canInteract,
  isStream = false,
  showAnnotations,
  annotations = [],
  showScreenRecording,
  hasScreenRecording,
  onAction,
  advancedControls,
  playbackRate = 1,
}: MiniPlayerProps) => {
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const slider = useAudioPlayerSlider({
    currentTime,
    callDuration,
    isStream,
    emitAction: action => onAction(action.type, action.value),
  });

  const basicControls = useMemo(() => getBasicControlConfig(playing, isStream), [isStream, playing]);
  const advancedControlConfig = useMemo(
    () =>
      getAdvancedControlConfig(advancedControls, {
        showAnnotations,
        hasAnnotations: (annotations as any).length > 0,
        showScreenRecording,
        hasScreenRecording,
        expandDisabled: false,
        isExpanded: false,
        showSpeedMenu,
        currentSpeed: playbackRate,
        speedOptions: SPEED_MENU_ITEMS.map(i => Number(i.value)),
        onSpeedMenuToggle: () => setShowSpeedMenu(true),
        onSettingsBack: () => setShowSpeedMenu(false),
        onSpeedChange: speed => {
          onAction(AudioPlayerActions.setPlaybackRate, speed);
          setShowSpeedMenu(false);
        },
        onAction,
      }),
    [advancedControls, annotations.length, hasScreenRecording, showAnnotations, showScreenRecording, showSpeedMenu, playbackRate, onAction]
  );

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-white p-4">
      <div className="flex items-center justify-between text-sm text-neutral-600">
        <span className="font-medium text-neutral-900">{agentName}</span>
        <span>
          {formatOffsetTime(currentTime, callDuration > 3599 ? 'HH:mm:ss' : 'mm:ss')}
          {!isStream ? ` / ${formatOffsetTime(callDuration, callDuration > 3599 ? 'HH:mm:ss' : 'mm:ss')}` : ''}
        </span>
      </div>
      <UniSliderProgress
        max={slider.sliderMax}
        value={slider.progress}
        onChange={value => slider.sliderChange(value as number)}
        onAfterChange={() => slider.progressChanged()}
        tooltip={{ open: false }}
        disabled={!canInteract}
      />
      <div className="flex items-center justify-between gap-4">
        <AudioPlayerButtons controls={basicControls} onClick={action => onAction(action)} />
        {advancedControlConfig.length > 0 ? (
          <>
            <UniDivider type="vertical" className="border-bgray-tertiary h-6" />
            <AudioPlayerButtons controls={advancedControlConfig} onClick={action => onAction(action)} />
          </>
        ) : null}
      </div>
    </div>
  );
});

MiniPlayer.displayName = 'MiniPlayer';

export default MiniPlayer;
