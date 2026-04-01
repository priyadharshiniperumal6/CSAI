import type { HTMLAttributes } from 'react';
import classNames from 'classnames';

import './UniBadge.scss';

export type UniBadgeProps = HTMLAttributes<HTMLDivElement> & {
  value: number;
  className?: string;
};

export const UniBadge = ({ value, className, ...rest }: UniBadgeProps) => {
  if (value === undefined || value === null) {
    return null;
  }

  return (
    <div className={classNames('uni-ant-badge', className)} {...rest}>
      {value}
    </div>
  );
};
