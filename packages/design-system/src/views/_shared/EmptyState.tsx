import type { ReactNode } from 'react';
import classNames from 'classnames';

import { UniCard } from '../../components/card/UniCard';
import { UniEmpty } from '../../components/empty/UniEmpty';

export type EmptyStateProps = {
  title?: string;
  description?: string;
  actionSlot?: ReactNode;
  className?: string;
};

export const EmptyState = ({
  title = 'No results found',
  description = 'Try adjusting your filters to see results.',
  actionSlot,
  className,
}: EmptyStateProps) => {
  return (
    <UniCard className={classNames(className)}>
      <UniEmpty
        params={{
          props: {
            title,
            description,
          },
        }}
      >
        {actionSlot}
      </UniEmpty>
    </UniCard>
  );
};
