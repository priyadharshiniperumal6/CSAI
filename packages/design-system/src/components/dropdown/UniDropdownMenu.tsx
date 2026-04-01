import classNames from 'classnames';
import { Menu } from 'antd';

import { UniIcon, UniMaterialIcon } from '../icon';
import type { UniIconType } from '../../types/icon';

import './UniDropdown.scss';

export type UniDropdownMenuOption = {
  name: string;
  key?: string;
  action?: (e?: React.MouseEvent) => void;
  class?: string;
  icon?: UniIconType;
  materialIcon?: UniIconType;
  disabled?: boolean;
};

export type UniDropdownMenuProps = {
  options: UniDropdownMenuOption[];
  size?: 'small';
  className?: string;
};

export const UniDropdownMenu = ({ options, size, className }: UniDropdownMenuProps) => {
  const classes = classNames('uni-ant-dropdown-menu', className, {
    'uni-ant-dropdown-menu-small': size === 'small',
  });

  return (
    <Menu
      className={classes}
      items={options.map(option => ({
        key: option?.key ?? option.name,
        disabled: option.disabled,
        className: classNames('uni-dropdown-item', option.class),
        label: (
          <div
            className="ant-dropdown-menu-item-container"
            onClick={e => option.action?.(e)}
            role="button"
            tabIndex={0}
          >
            {option.icon && !option.icon.isAfter ? <UniIcon {...option.icon} /> : null}
            {option.materialIcon && !option.materialIcon.isAfter ? <UniMaterialIcon {...option.materialIcon} /> : null}
            {option.name}
            {option.icon && option.icon.isAfter ? <UniIcon {...option.icon} /> : null}
            {option.materialIcon && option.materialIcon.isAfter ? <UniMaterialIcon {...option.materialIcon} /> : null}
          </div>
        ),
      }))}
    />
  );
};
