import type { ReactNode } from 'react';
import classNames from 'classnames';

import { UniTag } from '../../../components/tag/UniTag';
import { UniPageHeader } from '../../../components/page-header/UniPageHeader';

export type ViewRouteShellProps = {
  title: string;
  description: string;
  breadcrumbsSlot?: ReactNode;
  metadataSlot?: ReactNode;
  primaryActionsSlot?: ReactNode;
  secondaryActionsSlot?: ReactNode;
  globalFiltersSlot?: ReactNode;
  toolbarLeftSlot?: ReactNode;
  toolbarRightSlot?: ReactNode;

  // Backward-compatible aliases from the page-header refactor.
  breadcrumbs?: ReactNode;
  badges?: string[];
  globalFilters?: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  showToolbar?: boolean;
  toolbarLeft?: ReactNode;
  toolbarRight?: ReactNode;
  contentClassName?: string;
  children: ReactNode;
};

export const ViewRouteShell = ({
  title,
  description,
  breadcrumbsSlot,
  metadataSlot,
  primaryActionsSlot,
  secondaryActionsSlot,
  globalFiltersSlot,
  toolbarLeftSlot,
  toolbarRightSlot,
  breadcrumbs,
  badges,
  globalFilters,
  primaryAction,
  secondaryAction,
  showToolbar,
  toolbarLeft,
  toolbarRight,
  contentClassName,
  children,
}: ViewRouteShellProps) => {
  const badgesMetadata = badges?.length ? (
    <div className="dev-route-shell__badges">
      {badges.map(badge => (
        <UniTag key={badge}>{badge}</UniTag>
      ))}
    </div>
  ) : undefined;

  const resolvedBreadcrumbsSlot = breadcrumbsSlot ?? breadcrumbs;
  const resolvedMetadataSlot = metadataSlot ?? badgesMetadata;
  const resolvedPrimaryActionsSlot = primaryActionsSlot ?? primaryAction;
  const resolvedSecondaryActionsSlot = secondaryActionsSlot ?? secondaryAction;
  const resolvedGlobalFiltersSlot = globalFiltersSlot ?? globalFilters;
  const resolvedToolbarLeftSlot = toolbarLeftSlot ?? toolbarLeft;
  const resolvedToolbarRightSlot = toolbarRightSlot ?? toolbarRight;

  return (
    <div className="dev-route-shell">
      <div className="dev-route-shell__page-header">
        <UniPageHeader
          title={title}
          description={description}
          breadcrumbsSlot={resolvedBreadcrumbsSlot}
          metadataSlot={resolvedMetadataSlot}
          primaryActionsSlot={resolvedPrimaryActionsSlot}
          secondaryActionsSlot={resolvedSecondaryActionsSlot}
          globalFiltersSlot={resolvedGlobalFiltersSlot}
          showToolbar={showToolbar}
          toolbarLeftSlot={resolvedToolbarLeftSlot}
          toolbarRightSlot={resolvedToolbarRightSlot}
        />
      </div>
      <div className={classNames('dev-route-shell__content', contentClassName)}>{children}</div>
    </div>
  );
};
