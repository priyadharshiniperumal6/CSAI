import classNames from 'classnames';

import { UniCard } from '../../components/card/UniCard';
import { UniSkeleton } from '../../components/skeleton/UniSkeleton';

export type LoadingStateProps = {
  title?: string;
  description?: string;
  rows?: number;
  className?: string;
};

export const LoadingState = ({ title = 'Loading view', description, rows = 4, className }: LoadingStateProps) => {
  return (
    <UniCard className={classNames(className)}>
      <div className="flex flex-col gap-3" role="status" aria-live="polite">
        <div className="text-base font-medium">{title}</div>
        {description ? <div className="text-sm text-neutral-700">{description}</div> : null}
        <UniSkeleton title={{ width: '40%' }} paragraph={{ rows }} />
      </div>
    </UniCard>
  );
};
