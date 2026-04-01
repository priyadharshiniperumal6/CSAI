import type { ComponentProps, CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import type { Connection, Edge, EdgeChange, Node, NodeChange } from '@xyflow/react';

import { UniCard } from '../../components/card/UniCard';
import { UniPageHeader } from '../../components/page-header/UniPageHeader';
import { mapToAiqJourneySkin } from '../../components/react-flow/AiqJourneySkin';
import {
  applyRelationshipLayout,
  filterLockedNodePositionChanges,
  type UniReactFlowLayoutDirection,
  type UniReactFlowRelationshipLayoutRules,
} from '../../components/react-flow/relationshipLayout';
import { UniReactFlow } from '../../components/react-flow/UniReactFlow';
import { UniSelect } from '../../components/select/UniSelect';
import { EmptyState, ErrorState, LoadingState } from '../_shared';

export type FlowViewToolbarSlots = {
  leftSlot?: ReactNode;
  filtersSlot?: ReactNode;
  searchSlot?: ReactNode;
  rightSlot?: ReactNode;
  exportSlot?: ReactNode;
  shareSlot?: ReactNode;
  actionsSlot?: ReactNode;
};

export type FlowCanvasVariantOption = {
  label: ReactNode;
  value: string;
};

export type FlowViewProps = {
  title?: ReactNode;
  description?: ReactNode;
  breadcrumbsSlot?: ReactNode;
  primaryActionsSlot?: ReactNode;
  secondaryActionsSlot?: ReactNode;
  globalFiltersSlot?: ReactNode;
  toolbar?: FlowViewToolbarSlots;
  toolbarLeftSlot?: ReactNode;
  toolbarRightSlot?: ReactNode;

  canvasVariant?: string;
  canvasVariantLabel?: ReactNode;
  canvasVariantOptions?: FlowCanvasVariantOption[];
  onCanvasVariantChange?: (nextVariant: string) => void;

  // Backward-compatible aliases from the page-header refactor.
  breadcrumbs?: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  globalFilters?: ReactNode;
  toolbarLeft?: ReactNode;
  toolbarRight?: ReactNode;

  nodes?: Node[];
  edges?: Edge[];
  onNodesChange?: (changes: NodeChange[]) => void;
  onEdgesChange?: (changes: EdgeChange[]) => void;
  onConnect?: (connection: Connection) => void;
  onNodeClick?: ComponentProps<typeof UniReactFlow>['onNodeClick'];
  onNodeMouseEnter?: ComponentProps<typeof UniReactFlow>['onNodeMouseEnter'];
  onNodeMouseLeave?: ComponentProps<typeof UniReactFlow>['onNodeMouseLeave'];
  onPaneClick?: ComponentProps<typeof UniReactFlow>['onPaneClick'];
  onCanvasInit?: ComponentProps<typeof UniReactFlow>['onInit'];
  nodesDraggable?: ComponentProps<typeof UniReactFlow>['nodesDraggable'];
  inspectorSlot?: ReactNode;
  canvasLeftOverlaySlot?: ReactNode;
  canvasRightOverlaySlot?: ReactNode;
  canvasBottomLeftOverlaySlot?: ReactNode;
  canvasBottomOverlaySlot?: ReactNode;
  canvasHeight?: CSSProperties['height'];
  flowSkin?: 'default' | 'aiq-journey';
  layoutMode?: 'manual' | 'relationship';
  layoutDirection?: UniReactFlowLayoutDirection;
  layoutRules?: Partial<UniReactFlowRelationshipLayoutRules>;
  lockNodePositions?: boolean;
  showControls?: boolean;
  showMiniMap?: boolean;
  showBackground?: boolean;
  useFallbackCanvas?: boolean;
  fallbackCanvasSlot?: ReactNode;
  isLoading?: boolean;
  isEmpty?: boolean;
  error?: string | ReactNode | null;
  onRetry?: () => void;
  className?: string;
};

const defaultInspectorSlot = (
  <UniCard>
    <div className="text-base font-medium">Inspector</div>
    <div className="mt-2 text-sm text-neutral-700">Use this panel for selected node attributes and actions.</div>
  </UniCard>
);

const defaultFallbackCanvas = (
  <UniCard className="h-full">
    <div className="text-base font-medium">Flow Canvas Unavailable</div>
    <div className="mt-2 text-sm text-neutral-700">
      UniReactFlow is not available, so this placeholder renders the canvas region.
    </div>
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

export const FlowView = ({
  title = 'Flow Builder',
  description = 'Model and inspect workflow paths with node-edge editing.',
  breadcrumbsSlot,
  primaryActionsSlot,
  secondaryActionsSlot,
  globalFiltersSlot,
  toolbar,
  toolbarLeftSlot,
  toolbarRightSlot,
  canvasVariant,
  canvasVariantLabel = 'Flow Canvas',
  canvasVariantOptions,
  onCanvasVariantChange,
  breadcrumbs,
  primaryAction,
  secondaryAction,
  globalFilters,
  toolbarLeft,
  toolbarRight,
  nodes = [],
  edges = [],
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  onNodeMouseEnter,
  onNodeMouseLeave,
  onPaneClick,
  onCanvasInit,
  nodesDraggable,
  inspectorSlot = defaultInspectorSlot,
  canvasLeftOverlaySlot,
  canvasRightOverlaySlot,
  canvasBottomLeftOverlaySlot,
  canvasBottomOverlaySlot,
  canvasHeight,
  flowSkin = 'aiq-journey',
  layoutMode = 'manual',
  layoutDirection,
  layoutRules,
  lockNodePositions = true,
  showControls,
  showMiniMap,
  showBackground,
  useFallbackCanvas = false,
  fallbackCanvasSlot = defaultFallbackCanvas,
  isLoading = false,
  isEmpty = false,
  error = null,
  onRetry,
  className,
}: FlowViewProps = {}) => {
  const hasGraphData = nodes.length > 0 || edges.length > 0;
  const showEmptyState = isEmpty || (!isLoading && !error && !hasGraphData);

  const resolvedBreadcrumbsSlot = breadcrumbsSlot ?? breadcrumbs;
  const resolvedPrimaryActionsSlot = primaryActionsSlot ?? primaryAction;
  const resolvedSecondaryActionsBase = secondaryActionsSlot ?? secondaryAction;
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

  const nodesWithLayoutMetadata =
    layoutDirection || flowSkin === 'aiq-journey'
      ? nodes.map(node => ({
          ...node,
          data: {
            ...(node.data as Record<string, unknown> | undefined),
            ...(layoutDirection ? { layoutDirection } : {}),
          },
        }))
      : nodes;
  const graphInput =
    flowSkin === 'aiq-journey'
      ? mapToAiqJourneySkin(nodesWithLayoutMetadata, edges)
      : { nodes: nodesWithLayoutMetadata, edges };
  const graph =
    layoutMode === 'relationship'
      ? applyRelationshipLayout(graphInput.nodes, graphInput.edges, {
          direction: layoutDirection ?? 'top-to-bottom',
          rules: layoutRules,
          lockNodePositions,
        })
      : graphInput;
  const resolvedOnNodesChange =
    layoutMode === 'relationship' && onNodesChange
      ? (changes: NodeChange[]) => {
          const filteredChanges = lockNodePositions ? filterLockedNodePositionChanges(changes) : changes;

          if (filteredChanges.length > 0) {
            onNodesChange(filteredChanges);
          }
        }
      : onNodesChange;

  const resolvedShowControls = showControls ?? true;
  const resolvedShowMiniMap = showMiniMap ?? true;
  const resolvedShowBackground = showBackground ?? flowSkin !== 'aiq-journey';
  const resolvedCanvasHeight = canvasHeight ?? (flowSkin === 'aiq-journey' ? '100%' : 560);

  const hasCanvasVariantOptions = Boolean(canvasVariantOptions?.length);
  const canvasVariantSlot = hasCanvasVariantOptions ? (
    <div className="min-w-[200px]">
      {canvasVariantLabel ? (
        <div className="mb-1 text-xs font-medium text-neutral-600">{canvasVariantLabel}</div>
      ) : null}
      <UniSelect
        size="middle"
        value={canvasVariant}
        options={canvasVariantOptions}
        onChange={value => onCanvasVariantChange?.(String(value))}
      />
    </div>
  ) : null;

  const resolvedSecondaryActionsSlot =
    canvasVariantSlot || resolvedSecondaryActionsBase ? (
      <>
        {canvasVariantSlot}
        {resolvedSecondaryActionsBase}
      </>
    ) : undefined;

  const rightOverlaySlot = canvasRightOverlaySlot ?? inspectorSlot;
  const canvasSurface = (
    <div
      className={classNames(
        'relative',
        flowSkin === 'aiq-journey' && 'flex-1 min-h-0 bg-[var(--ut-color-bg-brand-subtle,#fbf8f0)]'
      )}
    >
      {useFallbackCanvas ? (
        fallbackCanvasSlot
      ) : (
        <UniReactFlow
          nodes={graph.nodes}
          edges={graph.edges}
          onNodesChange={resolvedOnNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onNodeMouseEnter={onNodeMouseEnter}
          onNodeMouseLeave={onNodeMouseLeave}
          onPaneClick={onPaneClick}
          onInit={onCanvasInit}
          skin={flowSkin}
          nodesDraggable={layoutMode === 'relationship' && lockNodePositions ? false : nodesDraggable}
          showControls={resolvedShowControls}
          showMiniMap={resolvedShowMiniMap}
          showBackground={resolvedShowBackground}
          containerStyle={{
            height: resolvedCanvasHeight,
            ...(flowSkin === 'aiq-journey' ? { width: '100%' } : {}),
          }}
        />
      )}
      {flowSkin === 'aiq-journey' && canvasLeftOverlaySlot ? (
        <div className="pointer-events-none absolute left-4 top-4 z-20 [&>*]:pointer-events-auto">
          {canvasLeftOverlaySlot}
        </div>
      ) : null}
      {flowSkin === 'aiq-journey' && rightOverlaySlot ? (
        <div className="pointer-events-none absolute right-4 top-4 z-20 w-[min(360px,calc(100%-2rem))] [&>*]:pointer-events-auto">
          {rightOverlaySlot}
        </div>
      ) : null}
      {flowSkin === 'aiq-journey' && canvasBottomLeftOverlaySlot ? (
        <div className="pointer-events-none absolute bottom-4 left-4 z-20 [&>*]:pointer-events-auto">
          {canvasBottomLeftOverlaySlot}
        </div>
      ) : null}
      {flowSkin === 'aiq-journey' && canvasBottomOverlaySlot ? (
        <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 [&>*]:pointer-events-auto">
          {canvasBottomOverlaySlot}
        </div>
      ) : null}
    </div>
  );

  return (
    <div
      className={classNames('flex h-full min-h-0 flex-col', flowSkin === 'aiq-journey' ? 'gap-0' : 'gap-4', className)}
    >
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
        <LoadingState title="Loading flow canvas" description="Fetching nodes and edges." rows={5} />
      ) : error ? (
        <ErrorState title="Unable to load flow" description={normalizeErrorDescription(error)} onRetry={onRetry} />
      ) : showEmptyState ? (
        <EmptyState title="No flow data" description="Add a node to start building a workflow." />
      ) : (
        <div
          className={classNames(
            flowSkin === 'aiq-journey'
              ? 'flex flex-1 min-h-0'
              : 'grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]'
          )}
        >
          {flowSkin === 'aiq-journey' ? canvasSurface : <UniCard className="p-0">{canvasSurface}</UniCard>}
          {flowSkin === 'aiq-journey' ? null : <div>{inspectorSlot}</div>}
        </div>
      )}
    </div>
  );
};
