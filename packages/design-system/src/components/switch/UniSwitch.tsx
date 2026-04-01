import { forwardRef } from 'react';
import classNames from 'classnames';
import { Switch } from 'antd';
import type { SwitchProps } from 'antd';

import './UniSwitch.scss';

export type UniSwitchProps = SwitchProps & {
  class?: string;
};

export const UniSwitch = forwardRef<HTMLButtonElement, UniSwitchProps>(({ className, class: legacyClass, ...rest }, ref) => {
  return <Switch ref={ref} className={classNames('uni-ant-switch', className, legacyClass)} {...rest} />;
});

UniSwitch.displayName = 'UniSwitch';
