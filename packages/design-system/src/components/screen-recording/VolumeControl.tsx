import { Slider } from 'antd';
import classNames from 'classnames';

import './VolumeControl.scss';

export type VolumeControlProps = {
  label: string;
  value: number;
  onChange?: (value: number) => void;
};

const getIconClass = (volume: number) => {
  if (volume <= 0) {
    return 'uni-volume_off';
  }
  if (volume < 0.5) {
    return 'uni-volume_down';
  }
  return 'uni-volume_up';
};

export const VolumeControl = ({ label, value, onChange }: VolumeControlProps) => {
  const handleToggleMute = () => {
    onChange?.(value === 0 ? 1 : 0);
  };

  return (
    <div className="volume-control flex w-full items-center gap-2 p-1">
      <div className="text-sm text-tprimary w-24 shrink-0">{label}</div>
      <button className="flex cursor-pointer items-center bg-transparent border-0 p-0" type="button" onClick={handleToggleMute}>
        <span className={classNames('uicon text-xl leading-none', getIconClass(value))} />
      </button>
      <div className="volume-control__slider w-14">
        <Slider
          min={0}
          max={1}
          step={0.1}
          tooltip={{ open: false }}
          value={value}
          onChange={val => {
            if (typeof val === 'number') {
              onChange?.(val);
            }
          }}
        />
      </div>
      <div className="w-4 text-xs text-sonic-gray">{Math.round(value * 10)}</div>
    </div>
  );
};
