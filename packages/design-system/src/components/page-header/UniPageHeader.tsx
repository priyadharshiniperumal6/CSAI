import type { ReactNode } from 'react';
import classNames from 'classnames';

import './UniPageHeader.scss';

export type UniPageHeaderProps = {
  // Row 1 — left block
  title: ReactNode;
  description?: ReactNode;
  metadataSlot?: ReactNode;
  breadcrumbsSlot?: ReactNode;

  // Row 1 — right block
  // Primary action is intentionally rendered last to keep it at the far right.
  primaryActionsSlot?: ReactNode;
  secondaryActionsSlot?: ReactNode;
  globalFiltersSlot?: ReactNode;

  // Row 2 — toolbar
  showToolbar?: boolean;
  toolbarLeftSlot?: ReactNode;
  toolbarRightSlot?: ReactNode;

  className?: string;

  // Backward-compatible aliases from the refactor (prefer slot names above).
  breadcrumbs?: ReactNode;
  metadata?: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  globalFilters?: ReactNode;
  toolbarLeft?: ReactNode;
  toolbarRight?: ReactNode;
};

export const UniPageHeader = ({
  title,
  description,
  metadataSlot,
  breadcrumbsSlot,
  primaryActionsSlot,
  secondaryActionsSlot,
  globalFiltersSlot,
  showToolbar = true,
  toolbarLeftSlot,
  toolbarRightSlot,
  className,
  breadcrumbs,
  metadata,
  primaryAction,
  secondaryAction,
  globalFilters,
  toolbarLeft,
  toolbarRight,
}: UniPageHeaderProps) => {
  const resolvedBreadcrumbs = breadcrumbsSlot ?? breadcrumbs;
  const resolvedMetadata = metadataSlot ?? metadata;
  const resolvedPrimaryActions = primaryActionsSlot ?? primaryAction;
  const resolvedSecondaryActions = secondaryActionsSlot ?? secondaryAction;
  const resolvedGlobalFilters = globalFiltersSlot ?? globalFilters;
  const resolvedToolbarLeft = toolbarLeftSlot ?? toolbarLeft;
  const resolvedToolbarRight = toolbarRightSlot ?? toolbarRight;

  const hasRightBlock = Boolean(resolvedGlobalFilters || resolvedSecondaryActions || resolvedPrimaryActions);
  const hasToolbar = showToolbar && Boolean(resolvedToolbarLeft || resolvedToolbarRight);

  return (
    <div className={classNames('uni-page-header', className)}>
      {/* Row 1 — header */}
      <div className="flex flex-col gap-1">
        {resolvedBreadcrumbs ? (
          <div className="uni-page-header__breadcrumbs flex items-center">{resolvedBreadcrumbs}</div>
        ) : null}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-[220px] grow">
            <div className="text-2xl font-semibold">{title}</div>
            {description ? <div className="mt-1 text-sm text-neutral-700">{description}</div> : null}
            {resolvedMetadata ? <div className="mt-2">{resolvedMetadata}</div> : null}
          </div>
          {hasRightBlock ? (
            <div className="flex items-center gap-2">
              {resolvedGlobalFilters ? <div className="flex items-center gap-2">{resolvedGlobalFilters}</div> : null}
              {resolvedSecondaryActions ? (
                <div className="flex items-center gap-2">{resolvedSecondaryActions}</div>
              ) : null}
              {resolvedPrimaryActions ? <div className="flex items-center gap-2">{resolvedPrimaryActions}</div> : null}
            </div>
          ) : null}
        </div>
      </div>

      {/* Row 2 — toolbar */}
      {hasToolbar ? (
        <div className="uni-page-header__toolbar flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-[220px] grow flex-wrap items-center gap-2">{resolvedToolbarLeft}</div>
          {resolvedToolbarRight ? <div className="flex items-center gap-2">{resolvedToolbarRight}</div> : null}
        </div>
      ) : null}
    </div>
  );
};
