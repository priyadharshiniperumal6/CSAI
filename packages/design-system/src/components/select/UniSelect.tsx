import { forwardRef } from 'react';
import classNames from 'classnames';
import { Select } from 'antd';
import type { SelectProps } from 'antd';

import './UniSelect.scss';

export type UniSelectProps<T = any> = Omit<SelectProps<T>, 'variant'> & {
  class?: string;
  /**
   * 'filter' — neutral gray border/text for toolbar and global filter controls.
   * Prevents the select from stretching to full container width (width: auto).
   * Dropdown expands to content width to avoid label truncation.
   */
  variant?: 'filter';
};

export const UniSelect = forwardRef<any, UniSelectProps>(
  ({ className, class: legacyClass, variant, popupMatchSelectWidth, ...rest }, ref) => {
    return (
      <Select
        ref={ref}
        className={classNames('uni-ant-select', variant && `uni-ant-select--${variant}`, className, legacyClass)}
        popupMatchSelectWidth={popupMatchSelectWidth ?? (variant ? false : true)}
        {...rest}
      />
    );
  }
);

UniSelect.displayName = 'UniSelect';
