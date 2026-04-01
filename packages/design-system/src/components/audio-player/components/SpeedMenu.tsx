import { useMemo } from 'react';
import type { SelectProps } from 'antd';

import { UniSelect } from '../../select/UniSelect';
import { SPEED_MENU_ITEMS } from '../constants/speedOptions';

type SpeedMenuProps = {
  value: number;
  onChange: (value: number) => void;
};

export const SpeedMenu = ({ value, onChange }: SpeedMenuProps) => {
  const options = useMemo<SelectProps['options']>(() => SPEED_MENU_ITEMS.map(item => ({ ...item })), []);

  return (
    <UniSelect
      size="middle"
      className="audio-player-selector speed-selector"
      value={value.toFixed(2)}
      options={options}
      onSelect={val => onChange(Number(val))}
    />
  );
};

export default SpeedMenu;
