import classNames from 'classnames';
import { useMemo, useRef, useState, type MutableRefObject } from 'react';
import { UniDivider } from '../../divider/UniDivider';
import { UniButton } from '../../button/UniButton';
import { UniPopover } from '../../popover/UniPopover';
import { VolumeControl } from '../../screen-recording/VolumeControl';
import { formatOffsetTime } from '../utils/time';
import { AudioPlayerActions, AudioPlayerAdvancedControl, UniAudioAnnotation } from '../types';
import { getAdvancedControlConfig, getBasicControlConfig } from '../constants/playerControls';
import { AudioPlayerButtons } from './AudioPlayerButtons';
import SpeedMenu from './SpeedMenu';
import ZoomMenu from './ZoomMenu';

type AudioPlayerControlsProps = {
  agentName?: string;
  currentTime: number;
  duration: number;
  playing: boolean;
  isStream?: boolean;
  canInteract: boolean;
  zoom?: number;
  speed?: number;
  volume: number;
  leftVolume?: number;
  rightVolume?: number;
  onAction: (action: AudioPlayerActions, value?: any) => void;
  onSpeedChange?: (value: number) => void;
  onZoomChange?: (value: number) => void;
  onVolumeChange?: (value: number) => void;
  onLeftVolumeChange?: (value: number) => void;
  onRightVolumeChange?: (value: number) => void;
  advancedControls: AudioPlayerAdvancedControl[];
  showAnnotations: boolean;
  annotations?: UniAudioAnnotation[];
  showScreenRecording: boolean;
  hasScreenRecording: boolean;
  minimapRef?: MutableRefObject<HTMLDivElement | null>;
  fullScreenElement?: HTMLElement | null;
};

export const AudioPlayerControls = ({
  agentName = 'Agent',
  currentTime,
  duration,
  playing,
  isStream = false,
  zoom = 1,
  speed = 1,
  volume,
  leftVolume,
  rightVolume,
  onAction,
  onSpeedChange,
  onZoomChange,
  onVolumeChange,
  onLeftVolumeChange,
  onRightVolumeChange,
  advancedControls,
  showAnnotations,
  annotations = [],
  showScreenRecording,
  hasScreenRecording,
  minimapRef,
  fullScreenElement,
}: AudioPlayerControlsProps) => {
  const [volumePopoverOpen, setVolumePopoverOpen] = useState(false);
  const popoverContainer = useRef<HTMLDivElement | null>(null);
  const basicControls = useMemo(() => getBasicControlConfig(playing, isStream), [isStream, playing]);
  const advancedControlConfig = useMemo(
    () =>
      getAdvancedControlConfig(advancedControls, {
        showAnnotations,
        hasAnnotations: annotations.length > 0,
        showScreenRecording,
        hasScreenRecording,
        expandDisabled: false,
        isExpanded: true,
      }),
    [advancedControls, annotations.length, hasScreenRecording, showAnnotations, showScreenRecording]
  );

  const timeFormat = duration > 3599 ? 'HH:mm:ss' : 'mm:ss';
  const timeDisplayWidthClass = isStream ? (timeFormat === 'mm:ss' ? 'w-12' : 'w-14') : (timeFormat === 'mm:ss' ? 'w-24' : 'w-36');
  const currentTimeWidthClass = isStream ? (timeFormat === 'mm:ss' ? 'w-4' : 'w-6') : (timeFormat === 'mm:ss' ? 'w-9' : 'w-12');
  const showMinimap = zoom > 1;

  const volumePopover = (
    <UniPopover
      trigger="click"
      placement="topRight"
      open={volumePopoverOpen}
      getPopupContainer={() => (fullScreenElement as HTMLElement) ?? popoverContainer.current!}
      onOpenChange={setVolumePopoverOpen}
      content={
        <div className="flex min-w-48 flex-col">
          {typeof leftVolume === 'number' ? (
            <VolumeControl
              label="Agent"
              value={leftVolume}
              onChange={value => onLeftVolumeChange?.(value)}
            />
          ) : null}
          {typeof rightVolume === 'number' ? (
            <VolumeControl
              label="Other Party"
              value={rightVolume}
              onChange={value => onRightVolumeChange?.(value)}
            />
          ) : null}
          <VolumeControl label="Master volume" value={volume ?? 0} onChange={value => onVolumeChange?.(value)} />
        </div>
      }
    >
      <UniButton
        type="default"
        className="button-secondary rounded-lg"
        iconOnly
        materialIcon={{ iconName: 'volume_up', size: 18, colorClass: 'text-neutral8' }}
      />
    </UniPopover>
  );

  const advancedButtons = advancedControlConfig.length > 0 ? (
    <AudioPlayerButtons controls={advancedControlConfig} onClick={action => onAction(action)} />
  ) : null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="relative flex grow items-center gap-1">
        <AudioPlayerButtons controls={basicControls} onClick={action => onAction(action)} />
        <UniDivider type="vertical" className="border-bgray-tertiary h-6" />
        <div className="flex flex-col text-xs text-neutral-600">
          <span className="text-sm font-medium text-neutral-900">{agentName}</span>
          <div className={classNames('flex items-center text-neutral-500', timeDisplayWidthClass)}>
            <span className={classNames('inline-block', currentTimeWidthClass)}>{formatOffsetTime(currentTime, timeFormat)}</span>
            {!isStream && (
                <>
                    <span className="px-1">/</span>
                    <span>{formatOffsetTime(duration, timeFormat)}</span>
                </>
            )}
          </div>
        </div>
        {!isStream && (
          <>
            <div ref={minimapRef} className={classNames('h-8 grow invisible', { '!visible': showMinimap })} />
            <ZoomMenu value={zoom} onChange={value => onZoomChange?.(value)} />
            <SpeedMenu value={speed} onChange={value => onSpeedChange?.(value)} />
          </>
        )}
        {isStream && <div className="grow" />}
        {volumePopover}
        {advancedButtons}
        <div ref={popoverContainer} className="popover-container h-0 w-0 absolute right-0" />
      </div>
    </div>
  );
};

export default AudioPlayerControls;


