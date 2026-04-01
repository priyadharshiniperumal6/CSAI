import { forwardRef } from 'react';
import { Radio } from 'antd';
import type { RadioProps, RadioGroupProps } from 'antd';
import classNames from 'classnames';

import './UniRadio.scss';

export type UniRadioProps = RadioProps & {
  class?: string;
};

export const UniRadio = ({ className, class: legacyClass, children, ...rest }: UniRadioProps) => {
  return (
    <Radio className={classNames(className, legacyClass)} {...rest}>
      {children}
    </Radio>
  );
};

UniRadio.displayName = 'UniRadio';

export type UniRadioGroupProps = RadioGroupProps & {
  class?: string;
};

export const UniRadioGroup = ({ className, class: legacyClass, ...rest }: UniRadioGroupProps) => {
  return <Radio.Group className={classNames('uni-radio-group', className, legacyClass)} {...rest} />;
};
