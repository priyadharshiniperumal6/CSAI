import { useMemo } from 'react';
import type { ReactNode } from 'react';
import classNames from 'classnames';

import { UniCard } from '../../components/card/UniCard';
import { UniTabs } from '../../components/tabs/UniTabs';
import { EmptyState, ErrorState, LoadingState } from '../_shared';
import { UniPageHeader } from '../../components/page-header/UniPageHeader';

export type ObjectDetailsSection = {
  key: string;
  label: ReactNode;
  content: ReactNode;
};

export type ObjectDetailsViewProps = {
  title?: ReactNode;
  description?: ReactNode;
  breadcrumbsSlot?: ReactNode;
  primaryActionsSlot?: ReactNode;
  secondaryActionsSlot?: ReactNode;
  globalFiltersSlot?: ReactNode;

  // Backward-compatible aliases from the page-header refactor.
  breadcrumbs?: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  globalFilters?: ReactNode;
  actionBarSlot?: ReactNode;
  sections?: ObjectDetailsSection[];
  defaultActiveSection?: string;
  rightRailSlot?: ReactNode;
  isLoading?: boolean;
  isEmpty?: boolean;
  error?: string | ReactNode | null;
  onRetry?: () => void;
  className?: string;
};

const defaultSections: ObjectDetailsSection[] = [
  {
    key: 'overview',
    label: 'Overview',
    content: (
      <UniCard>
        <div className="text-base font-medium">Overview</div>
        <div className="mt-2 text-sm text-neutral-700">Use this section for key attributes and high-level context.</div>
      </UniCard>
    ),
  },
  {
    key: 'activity',
    label: 'Activity',
    content: (
      <UniCard>
        <div className="text-base font-medium">Activity</div>
        <div className="mt-2 text-sm text-neutral-700">Use this section to show history, audits, and updates.</div>
      </UniCard>
    ),
  },
];

const defaultRightRail = (
  <UniCard>
    <div className="text-base font-medium">Context Panel</div>
    <div className="mt-2 text-sm text-neutral-700">Use this area for linked records, status, or owner metadata.</div>
  </UniCard>
);

const normalizeErrorDescription = (error: string | ReactNode | null | undefined) => {
  if (!error) {
    return undefined;
  }
  if (typeof error === 'string') {
    return error;
  }
  return error;
};

export const ObjectDetailsView = ({
  title = 'Object Details',
  description = 'Review fields, linked data, and actions for a single entity.',
  breadcrumbsSlot,
  primaryActionsSlot,
  secondaryActionsSlot,
  globalFiltersSlot,
  breadcrumbs,
  primaryAction,
  secondaryAction,
  globalFilters,
  actionBarSlot,
  sections = defaultSections,
  defaultActiveSection,
  rightRailSlot = defaultRightRail,
  isLoading = false,
  isEmpty = false,
  error = null,
  onRetry,
  className,
}: ObjectDetailsViewProps = {}) => {
  const resolvedBreadcrumbsSlot = breadcrumbsSlot ?? breadcrumbs;
  const resolvedPrimaryActionsSlot = primaryActionsSlot ?? primaryAction;
  const resolvedSecondaryActionsSlot = secondaryActionsSlot ?? secondaryAction;
  const resolvedGlobalFiltersSlot = globalFiltersSlot ?? globalFilters;
  const tabItems = useMemo(
    () =>
      sections.map(section => ({
        key: section.key,
        label: section.label,
        children: section.content,
      })),
    [sections]
  );

  const showEmptyState = isEmpty || (!isLoading && !error && sections.length === 0);

  return (
    <div className={classNames('flex h-full flex-col gap-4', className)}>
      <UniPageHeader
        title={title}
        description={description}
        breadcrumbsSlot={resolvedBreadcrumbsSlot}
        primaryActionsSlot={resolvedPrimaryActionsSlot}
        secondaryActionsSlot={resolvedSecondaryActionsSlot}
        globalFiltersSlot={resolvedGlobalFiltersSlot}
        showToolbar={false}
      />

      {actionBarSlot ? (
        <div className="rounded border border-neutral-300 bg-neutral-25 p-3">{actionBarSlot}</div>
      ) : null}

      {isLoading ? (
        <LoadingState title="Loading details" description="Fetching latest object information." />
      ) : error ? (
        <ErrorState
          title="Unable to load object details"
          description={normalizeErrorDescription(error)}
          onRetry={onRetry}
        />
      ) : showEmptyState ? (
        <EmptyState title="No details available" description="This object has no sections to display yet." />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
          <UniCard>
            <UniTabs
              items={tabItems}
              defaultActiveKey={defaultActiveSection ?? sections[0]?.key}
              styleType="horizontal"
            />
          </UniCard>
          <div>{rightRailSlot}</div>
        </div>
      )}
    </div>
  );
};
