import { forwardRef } from 'react';
import classNames from 'classnames';
import { Input } from 'antd';
import type { PasswordProps } from 'antd/es/input/Password';

import './UniInput.scss';

export type UniInputPasswordProps = PasswordProps & {
  class?: string;
};

export const UniInputPassword = forwardRef<any, UniInputPasswordProps>(
  ({ className, class: legacyClass, ...rest }, ref) => {
    const classes = classNames('uni-ant-input', className, legacyClass);

    return <Input.Password ref={ref} className={classes} {...rest} />;
  }
);

UniInputPassword.displayName = 'UniInputPassword';
