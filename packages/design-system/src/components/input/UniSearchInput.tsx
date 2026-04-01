import { forwardRef } from 'react';
import classNames from 'classnames';
import type { InputProps } from 'antd';

import { UniMaterialIcon } from '../icon';
import { UniInput } from './UniInput';

import './UniSearchInput.scss';

export type UniSearchInputProps = InputProps & {
  class?: string;
};

export const UniSearchInput = forwardRef<any, UniSearchInputProps>(({ className, class: legacyClass, prefix, ...rest }, ref) => {
  const classes = classNames('uni-ant-search', className, legacyClass);
  return (
    <UniInput
      ref={ref}
      {...rest}
      className={classes}
      prefix={prefix ?? <UniMaterialIcon iconName="search" size={20} colorClass="search-icon" />}
    />
  );
});

UniSearchInput.displayName = 'UniSearchInput';
