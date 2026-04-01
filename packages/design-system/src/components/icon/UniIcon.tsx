import { forwardRef } from 'react';
import classNames from 'classnames';
import { Tooltip } from 'antd';

import type { UniIconType } from '../../types/icon';
import { UniBadge } from '../badge/UniBadge';

export const UniIcon = forwardRef<HTMLSpanElement, UniIconType>(
  ({ iconName, size = 24, colorClass = '', badge, placement, title, click, className, style, isAfter, ...rest }, ref) => {
    const classes = classNames('uicon', className, colorClass, iconName);
    const mergedStyle = { ...style, fontSize: typeof size === 'number' ? `${size}px` : size };

    const content = (
      <span
        ref={ref}
        className={classes}
        style={mergedStyle}
        onClick={event => {
          rest.onClick?.(event);
          click?.(event);
        }}
        {...rest}
      />
    );

    const withBadge = (
      <>
        {content}
        {badge?.value ? <UniBadge {...badge} /> : null}
      </>
    );

    if (!title) {
      return withBadge;
    }

    return (
      <Tooltip title={title} placement={placement}>
        {withBadge}
      </Tooltip>
    );
  }
);

UniIcon.displayName = 'UniIcon';
