import { forwardRef } from 'react';
import classNames from 'classnames';
import { InputNumber } from 'antd';
import type { InputNumberProps } from 'antd';

import './UniInputNumber.scss';

export type UniInputNumberType = InputNumberProps & {
  class?: string;
};

export const UniInputNumber: React.ForwardRefExoticComponent<
  React.PropsWithoutRef<UniInputNumberType> & React.RefAttributes<any>
> = forwardRef<any, UniInputNumberType>(
  ({ className, class: legacyClass, ...rest }, ref) => {
    const classes = classNames('uni-ant-input-number', className, legacyClass);
    return <InputNumber ref={ref} className={classes} {...rest} />;
  }
);

UniInputNumber.displayName = 'UniInputNumber';
