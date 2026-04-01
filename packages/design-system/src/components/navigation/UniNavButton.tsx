import { forwardRef } from 'react';
import classNames from 'classnames';
import { Button } from 'antd';

import type { UniButtonProps } from '../button/UniButton.types';
import { UniBadge } from '../badge/UniBadge';
import { UniIcon, UniMaterialIcon } from '../icon';

import './UniNavButton.scss';

export const UniNavButton = forwardRef<HTMLButtonElement, UniButtonProps>(
  ({ className, class: legacyClass, iconOnly, materialIcon, uniIcon, badge, children, ...rest }, ref) => {
    const classes = classNames('uni-ant-nav-button', className, legacyClass, {
      'uni-ant-nav-button-icon': iconOnly,
    });

    return (
      <Button ref={ref} className={classes} {...rest}>
        {materialIcon ? (
          <UniMaterialIcon
            {...materialIcon}
            size={materialIcon?.size || 24}
            badge={materialIcon.badge ? { ...materialIcon.badge, className: 'uni-nav-badge' } : undefined}
          />
        ) : null}
        {uniIcon ? (
          <UniIcon
            {...uniIcon}
            size={uniIcon?.size || 24}
            badge={uniIcon.badge ? { ...uniIcon.badge, className: 'uni-nav-badge' } : undefined}
          />
        ) : null}
        {children}
        {badge?.value ? <UniBadge {...badge} className="uni-nav-badge" /> : null}
      </Button>
    );
  }
);

UniNavButton.displayName = 'UniNavButton';
