import { forwardRef } from 'react';
import classNames from 'classnames';
import { Button } from 'antd';

import type { UniButtonProps } from './UniButton.types';
export type { UniButtonProps };
import { UniBadge } from '../badge/UniBadge';
import { UniIcon, UniMaterialIcon } from '../icon';

import './UniButton.scss';

export const UniButton = forwardRef<HTMLButtonElement, UniButtonProps>(
  ({ className, class: legacyClass, iconOnly, materialIcon, uniIcon, badge, children, ...rest }, ref) => {
    const mergedClassName = classNames(legacyClass, className, 'uni-ant-button', {
      'uni-ant-button-icon': iconOnly,
    });

    return (
      <Button ref={ref} className={mergedClassName} tabIndex={0} {...rest}>
        {materialIcon && !materialIcon.isAfter ? <UniMaterialIcon {...materialIcon} /> : null}
        {uniIcon && !uniIcon.isAfter ? <UniIcon {...uniIcon} /> : null}
        {children}
        {materialIcon && materialIcon.isAfter ? <UniMaterialIcon {...materialIcon} /> : null}
        {uniIcon && uniIcon.isAfter ? <UniIcon {...uniIcon} /> : null}
        {badge?.value ? <UniBadge {...badge} /> : null}
      </Button>
    );
  }
);

UniButton.displayName = 'UniButton';
