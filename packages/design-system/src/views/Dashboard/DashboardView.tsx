import type { ReactNode } from 'react';
import classNames from 'classnames';

import { UniCard } from '../../components/card/UniCard';
import { EmptyState, ErrorState, LoadingState } from '../_shared';
import { UniPageHeader } from '../../components/page-header/UniPageHeader';

export type DashboardViewLayout = 'zones' | 'grid';

export type DashboardViewToolbarSlots = {
  leftSlot?: ReactNode;
  filtersSlot?: ReactNode;
  searchSlot?: ReactNode;
  rightSlot?: ReactNode;
  exportSlot?: ReactNode;
  shareSlot?: ReactNode;
  actionsSlot?: ReactNode;
};

export type DashboardViewProps = {
  title?: ReactNode;
  description?: ReactNode;
  breadcrumbsSlot?: ReactNode;
  primaryActionsSlot?: ReactNode;
  secondaryActionsSlot?: ReactNode;
  globalFiltersSlot?: ReactNode;
  toolbar?: DashboardViewToolbarSlots;
  toolbarLeftSlot?: ReactNode;
  toolbarRightSlot?: ReactNode;

  // Backward-compatible aliases from the page-header refactor.
  breadcrumbs?: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  globalFilters?: ReactNode;
  toolbarLeft?: ReactNode;
  toolbarRight?: ReactNode;
  layout?: DashboardViewLayout;
  topZone?: ReactNode;
  mainZone?: ReactNode;
  rightZone?: ReactNode;
  bottomZone?: ReactNode;
  gridItems?: ReactNode[];
  isLoading?: boolean;
  isEmpty?: boolean;
  error?: string | ReactNode | null;
  onRetry?: () => void;
  className?: string;
};

const defaultTopZone = (
  <div className="grid gap-3 md:grid-cols-3">
    <UniCard>
      <div className="text-sm text-neutral-700">Total Sessions</div>
      <div className="mt-1 text-2xl font-semibold">84,220</div>
    </UniCard>
    <UniCard>
      <div className="text-sm text-neutral-700">Automation Coverage</div>
      <div className="mt-1 text-2xl font-semibold">73%</div>
    </UniCard>
    <UniCard>
      <div className="text-sm text-neutral-700">Escalation Rate</div>
      <div className="mt-1 text-2xl font-semibold">4.1%</div>
    </UniCard>
  </div>
);

const defaultMainZone = (
  <UniCard className="h-full">
    <div className="text-base font-medium">Main Analytics</div>
    <div className="mt-2 text-sm text-neutral-700">Use this area for charts, tables, and KPI callouts.</div>
  </UniCard>
);

const defaultRightZone = (
  <UniCard className="h-full">
    <div className="text-base font-medium">Right Rail</div>
    <div className="mt-2 text-sm text-neutral-700">Use this area for goals, alerts, or drill-in details.</div>
  </UniCard>
);

const defaultBottomZone = (
  <UniCard>
    <div className="text-base font-medium">Recent Activity</div>
    <div className="mt-2 text-sm text-neutral-700">Use this region for event timelines, incident logs, or updates.</div>
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

export const DashboardView = ({
  title = 'Dashboard',
  description = 'Monitor performance and operational health across your workspace.',
  breadcrumbsSlot,
  primaryActionsSlot,
  secondaryActionsSlot,
  globalFiltersSlot,
  toolbar,
  toolbarLeftSlot,
  toolbarRightSlot,
  breadcrumbs,
  primaryAction,
  secondaryAction,
  globalFilters,
  toolbarLeft,
  toolbarRight,
  layout = 'zones',
  topZone = defaultTopZone,
  mainZone = defaultMainZone,
  rightZone = defaultRightZone,
  bottomZone = defaultBottomZone,
  gridItems = [],
  isLoading = false,
  isEmpty = false,
  error = null,
  onRetry,
  className,
}: DashboardViewProps = {}) => {
  const showEmptyState = isEmpty || (!isLoading && !error && layout === 'grid' && gridItems.length === 0);
  const resolvedBreadcrumbsSlot = breadcrumbsSlot ?? breadcrumbs;
  const resolvedPrimaryActionsSlot = primaryActionsSlot ?? primaryAction;
  const resolvedSecondaryActionsSlot = secondaryActionsSlot ?? secondaryAction;
  const resolvedGlobalFiltersSlot = globalFiltersSlot ?? globalFilters;
  const resolvedToolbarLeftSlot =
    toolbarLeftSlot ??
    toolbarLeft ??
    (toolbar ? (
      <>
        {toolbar.leftSlot}
        {toolbar.filtersSlot}
        {toolbar.searchSlot}
      </>
    ) : undefined);
  const resolvedToolbarRightSlot =
    toolbarRightSlot ??
    toolbarRight ??
    (toolbar ? (
      <>
        {toolbar.rightSlot}
        {toolbar.exportSlot}
        {toolbar.shareSlot}
        {toolbar.actionsSlot}
      </>
    ) : undefined);

  return (
    <div className={classNames('flex h-full flex-col gap-4', className)}>
      <UniPageHeader
        title={title}
        description={description}
        breadcrumbsSlot={resolvedBreadcrumbsSlot}
        primaryActionsSlot={resolvedPrimaryActionsSlot}
        secondaryActionsSlot={resolvedSecondaryActionsSlot}
        globalFiltersSlot={resolvedGlobalFiltersSlot}
        toolbarLeftSlot={resolvedToolbarLeftSlot}
        toolbarRightSlot={resolvedToolbarRightSlot}
      />

      {isLoading ? (
        <LoadingState title="Loading dashboard" description="Collecting metrics and refreshing widgets." rows={5} />
      ) : error ? (
        <ErrorState title="Unable to load dashboard" description={normalizeErrorDescription(error)} onRetry={onRetry} />
      ) : showEmptyState ? (
        <EmptyState title="No dashboard data" description="Add widgets or change filters to populate this view." />
      ) : layout === 'grid' ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {gridItems.map((item, index) => (
            <div key={`grid-item-${index}`}>{item}</div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {topZone}
          <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
            <div>{mainZone}</div>
            <div>{rightZone}</div>
          </div>
          {bottomZone}
        </div>
      )}
    </div>
  );
};
