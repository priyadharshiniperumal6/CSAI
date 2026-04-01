import { Fragment } from 'react';

import { UniButton } from '../../button/UniButton';
import { UniTooltip } from '../../tooltip/UniTooltip';
import type { AudioPlayerButtonConfig } from '../constants/playerControls';
import { AudioPlayerActions } from '../types';

import { UniDropdown } from '../../dropdown/UniDropdown';

type AudioPlayerButtonsProps = {
  controls: AudioPlayerButtonConfig[];
  onClick: (action: AudioPlayerActions) => void;
};

export const AudioPlayerButtons = ({ controls, onClick }: AudioPlayerButtonsProps) => (
  <div className="flex items-center gap-1 justify-between">
    {controls.map(control => (
      <Fragment key={control.key}>
        {control.options ? (
          <UniDropdown
            options={control.options}
            openButtonProps={control}
            placement="topRight"
          />
        ) : (
          <UniTooltip title={control.disabled ? undefined : control.tooltip} placement="top">
            <UniButton {...control} onClick={() => onClick(control.key)} />
          </UniTooltip>
        )}
      </Fragment>
    ))}
  </div>
);

export default AudioPlayerButtons;
