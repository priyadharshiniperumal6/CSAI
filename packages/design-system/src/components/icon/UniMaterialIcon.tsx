import { forwardRef } from 'react';
import classNames from 'classnames';
import { Tooltip } from 'antd';

import type { UniIconType } from '../../types/icon';
import { UniBadge } from '../badge/UniBadge';

export const UniMaterialIcon = forwardRef<HTMLSpanElement, UniIconType>(
  (
    { iconName, size = 24, colorClass = '', isIconFill = false, badge, placement, title, click, className, style, isAfter, ...rest },
    ref
  ) => {
    const classes = classNames(className, colorClass, isIconFill ? 'material-symbols-filled' : 'material-symbols-outlined');
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
      >
        {iconName}
        {badge?.value ? <UniBadge {...badge} /> : null}
      </span>
    );

    if (!title) {
      return content;
    }

    return (
      <Tooltip title={title} placement={placement}>
        {content}
      </Tooltip>
    );
  }
);

UniMaterialIcon.displayName = 'UniMaterialIcon';
