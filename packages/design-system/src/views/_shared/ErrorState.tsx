import type { ReactNode } from 'react';
import classNames from 'classnames';

import { UniButton } from '../../components/button/UniButton';
import { UniCard } from '../../components/card/UniCard';

export type ErrorStateProps = {
  title?: string;
  description?: ReactNode;
  retryLabel?: string;
  onRetry?: () => void;
  actionSlot?: ReactNode;
  className?: string;
};

export const ErrorState = ({
  title = 'Something went wrong',
  description = 'Try again. If the issue continues, contact your administrator.',
  retryLabel = 'Retry',
  onRetry,
  actionSlot,
  className,
}: ErrorStateProps) => {
  return (
    <UniCard className={classNames(className)}>
      <div className="flex flex-col gap-3 p-1">
        <div className="text-base font-medium text-red-700">{title}</div>
        <div className="text-sm text-neutral-700">{description}</div>
        <div className="flex items-center gap-2">
          {onRetry ? (
            <UniButton type="primary" onClick={onRetry}>
              {retryLabel}
            </UniButton>
          ) : null}
          {actionSlot}
        </div>
      </div>
    </UniCard>
  );
};
