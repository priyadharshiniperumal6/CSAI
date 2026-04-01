import { useMemo } from 'react';
import type { SelectProps } from 'antd';

import { UniSelect } from '../../select/UniSelect';
import { ZOOM_MENU_ITEMS } from '../constants/zoomOptions';

type ZoomMenuProps = {
  value: number;
  onChange: (value: number) => void;
};

export const ZoomMenu = ({ value, onChange }: ZoomMenuProps) => {
  const options = useMemo<SelectProps['options']>(() => ZOOM_MENU_ITEMS.map(item => ({ ...item })), []);

  return (
    <UniSelect
      size="middle"
      className="audio-player-selector zoom-selector"
      value={String(value)}
      options={options}
      onSelect={val => onChange(Number(val))}
    />
  );
};

export default ZoomMenu;
