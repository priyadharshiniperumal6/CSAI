import { ReactNode, forwardRef } from 'react';
import classNames from 'classnames';
import { Dropdown } from 'antd';
import type { DropdownProps } from 'antd';

import { UniButton, type UniButtonProps } from '../button/UniButton';
import { UniDropdownMenu, type UniDropdownMenuOption } from './UniDropdownMenu';

import './UniDropdown.scss';

export type UniDropdownProps = DropdownProps & {
  onOpen?: (open: boolean) => void;
  openButtonProps?: (UniButtonProps & { label?: string }) | null;
  type?: 'default';
  size?: 'small';
  class?: string;
  dropdownMenuClass?: string;
  options?: UniDropdownMenuOption[];
  content?: ReactNode;
};

export const UniDropdown = forwardRef<any, UniDropdownProps>(
  ({ className, class: legacyClass, onOpen, openButtonProps, options, dropdownMenuClass, size, content, children, type, ...rest }, ref) => {
    const classes = classNames('uni-ant-dropdown', legacyClass, className, {
      'uni-ant-dropdown-default': type === 'default',
    });
    const menuSize =
      size === 'small' ? size : openButtonProps?.materialIcon?.size === 'small' ? 'small' : undefined;

    const overlay = options ? (
      <UniDropdownMenu className={dropdownMenuClass} size={menuSize} options={options} />
    ) : (
      <div>{children}</div>
    );

    const triggerContent = openButtonProps ? (
      <UniButton
        {...openButtonProps}
        onClick={event => {
          openButtonProps.onClick?.(event);
          event.preventDefault();
        }}
      >
        {openButtonProps.label}
      </UniButton>
    ) : (
      content
    );

    return (
      <Dropdown
        className={classes}
        onOpenChange={onOpen}
        trigger={['click']}
        popupRender={() => overlay}
        {...rest}
      >
        <div>{triggerContent}</div>
      </Dropdown>
    );
  }
);

UniDropdown.displayName = 'UniDropdown';
