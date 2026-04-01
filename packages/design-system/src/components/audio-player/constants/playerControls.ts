import type { UniButtonProps } from '../../button/UniButton.types';
import { AudioPlayerActions, AudioPlayerAdvancedControl } from '../types';
import type { UniDropdownMenuOption } from '../../dropdown/UniDropdownMenu';

export type AudioPlayerButtonConfig = UniButtonProps & {
  key: AudioPlayerActions;
  tooltip?: string;
  selected?: boolean;
  options?: UniDropdownMenuOption[];
};

const secondaryButtonClass = 'button-secondary rounded-lg';

export const getBasicControlConfig = (isPlaying: boolean, isStream: boolean): AudioPlayerButtonConfig[] => {
  if (isStream) {
    return [
      {
        key: isPlaying ? AudioPlayerActions.pause : AudioPlayerActions.play,
        tooltip: isPlaying ? 'Pause' : 'Play',
        iconOnly: true,
        type: 'primary',
        shape: 'circle',
        materialIcon: { iconName: isPlaying ? 'pause' : 'play_arrow', size: 20, isIconFill: true },
      },
    ];
  }

  return [
    {
      key: AudioPlayerActions.replay,
      tooltip: 'Restart',
      iconOnly: true,
      type: 'default',
      className: secondaryButtonClass,
      materialIcon: { iconName: 'skip_previous', size: 18, colorClass: 'text-neutral8', isIconFill: true },
    },
    {
      key: isPlaying ? AudioPlayerActions.pause : AudioPlayerActions.play,
      tooltip: isPlaying ? 'Pause' : 'Play',
      iconOnly: true,
      type: 'primary',
      shape: 'circle',
      materialIcon: { iconName: isPlaying ? 'pause' : 'play_arrow', size: 20, isIconFill: true },
    },
    {
      key: AudioPlayerActions.rewind,
      tooltip: 'Skip back 10s',
      iconOnly: true,
      type: 'default',
      className: secondaryButtonClass,
      materialIcon: { iconName: 'fast_rewind', size: 18, colorClass: 'text-neutral8', isIconFill: true },
    },
    {
      key: AudioPlayerActions.forward,
      tooltip: 'Skip forward 10s',
      iconOnly: true,
      type: 'default',
      className: secondaryButtonClass,
      materialIcon: { iconName: 'fast_forward', size: 18, colorClass: 'text-neutral8', isIconFill: true },
    },
  ];
};

export const getAdvancedControlConfig = (
  advancedControls: AudioPlayerAdvancedControl[],
  options: {
    showAnnotations: boolean;
    hasAnnotations: boolean;
    showScreenRecording: boolean;
    hasScreenRecording: boolean;
    expandDisabled: boolean;
    isExpanded: boolean;
    showSpeedMenu?: boolean;
    currentSpeed?: number;
    speedOptions?: number[];
    onSpeedMenuToggle?: () => void;
    onSettingsBack?: () => void;
    onSpeedChange?: (speed: number) => void;
    onAction?: (action: AudioPlayerActions) => void;
  }
): AudioPlayerButtonConfig[] => {
  const controls: AudioPlayerButtonConfig[] = [];
  const {
    showAnnotations,
    hasAnnotations,
    showScreenRecording,
    hasScreenRecording,
    expandDisabled,
    isExpanded,
  } = options;

  if (advancedControls.includes(AudioPlayerAdvancedControl.annotations)) {
    controls.push({
      key: AudioPlayerActions.toggleAnnotations,
      tooltip: showAnnotations ? 'Hide annotations' : 'Show annotations',
      iconOnly: true,
      type: 'default',
      disabled: !hasAnnotations,
      className: `${secondaryButtonClass}${showAnnotations ? ' button-secondary-selected' : ''}`,
      uniIcon: { iconName: 'uni-mode_comment', size: 18, colorClass: 'text-neutral8' },
    });
  }

  if (advancedControls.includes(AudioPlayerAdvancedControl.screenRec)) {
    controls.push({
      key: AudioPlayerActions.toggleScreenRec,
      tooltip: showScreenRecording ? 'Hide screen recording' : 'Show screen recording',
      iconOnly: true,
      disabled: !hasScreenRecording,
      type: 'default',
      className: `${secondaryButtonClass}${showScreenRecording ? ' button-secondary-selected' : ''}`,
      materialIcon: { iconName: 'smart_display', size: 18, colorClass: 'text-neutral8' },
    });
  }

  if (advancedControls.includes(AudioPlayerAdvancedControl.toggleSize)) {
    controls.push({
      key: isExpanded ? AudioPlayerActions.minimize : AudioPlayerActions.expand,
      tooltip: isExpanded ? 'Show mini player' : 'Expand',
      iconOnly: true,
      disabled: expandDisabled,
      type: 'default',
      className: secondaryButtonClass,
      materialIcon: { iconName: isExpanded ? 'collapse_content' : 'unfold_more', size: 18, colorClass: 'text-neutral8' },
    });
  }

  if (advancedControls.includes(AudioPlayerAdvancedControl.settings) && !isExpanded) {
    if (options.showSpeedMenu) {
      controls.push({
        key: AudioPlayerActions.setPlaybackRate,
        tooltip: 'Playback speed',
        iconOnly: true,
        type: 'default',
        className: secondaryButtonClass,
        materialIcon: { iconName: 'speed', size: 18, colorClass: 'text-neutral8' },
        options: [
          {
            name: 'Back',
            action: options.onSettingsBack,
            materialIcon: { iconName: 'chevron_left', size: 16 },
          },
          ...(options.speedOptions?.map(speed => ({
            name: `${speed}x`,
            action: () => options.onSpeedChange?.(speed),
            class: options.currentSpeed === speed ? 'uni-dropdown-item-selected' : '',
          })) ?? []),
        ],
      });
    } else {
      controls.push({
        key: AudioPlayerActions.setPlaybackRate,
        tooltip: 'More controls',
        iconOnly: true,
        type: 'default',
        className: secondaryButtonClass,
        materialIcon: { iconName: 'settings', size: 18, colorClass: 'text-neutral8' },
        options: [
          {
            name: `Playback speed: ${options.currentSpeed?.toFixed(2)}x`,
            action: options.onSpeedMenuToggle,
            materialIcon: { iconName: 'keyboard_arrow_right', size: 16, isAfter: true },
          },
          {
            name: 'Skip back 10s',
            action: () => options.onAction?.(AudioPlayerActions.rewind),
          },
          {
            name: 'Skip forward 10s',
            action: () => options.onAction?.(AudioPlayerActions.forward),
          },
          {
            name: 'Restart playback',
            action: () => options.onAction?.(AudioPlayerActions.replay),
          },
        ],
      });
    }
  }

  return controls;
};
