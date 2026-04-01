import { forwardRef } from 'react';
import classNames from 'classnames';
import { Checkbox } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';

import './UniCheckbox.scss';

export type UniCheckboxGroupProps = CheckboxGroupProps & {
  class?: string;
};

export const UniCheckboxGroup = forwardRef<HTMLDivElement, UniCheckboxGroupProps>(
  ({ className, class: legacyClass, ...rest }, ref) => {
    const classes = classNames(className, legacyClass);
    return <Checkbox.Group ref={ref} className={classes} {...rest} />;
  }
);

UniCheckboxGroup.displayName = 'UniCheckboxGroup';
