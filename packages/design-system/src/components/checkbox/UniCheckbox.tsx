import { forwardRef } from 'react';
import classNames from 'classnames';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';

import './UniCheckbox.scss';

export type UniCheckboxProps = CheckboxProps & {
  class?: string;
};

export const UniCheckbox = forwardRef<HTMLLabelElement, UniCheckboxProps>(
  ({ className, class: legacyClass, children, ...rest }, ref) => {
    const classes = classNames('uni-ant-checkbox', className, legacyClass);
    return (
      <Checkbox ref={ref as any} className={classes} {...rest}>
        {children}
      </Checkbox>
    );
  }
);

UniCheckbox.displayName = 'UniCheckbox';
