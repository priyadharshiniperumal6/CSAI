import { forwardRef } from 'react';
import classNames from 'classnames';
import { Input } from 'antd';
import type { InputProps } from 'antd';

import './UniInput.scss';

export type UniInputProps = InputProps & {
  class?: string;
};

const COLOR_TYPES = new Set(['color']);

export const UniInput = forwardRef<any, UniInputProps>(({ className, class: legacyClass, type, ...rest }, ref) => {
  const classes = classNames('uni-ant-input', className, legacyClass, {
    'color-picker-input': type && COLOR_TYPES.has(type),
  });

  return <Input ref={ref} type={type} className={classes} {...rest} />;
});

UniInput.displayName = 'UniInput';
