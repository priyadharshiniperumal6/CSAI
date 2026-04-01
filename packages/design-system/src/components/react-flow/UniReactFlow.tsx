import classNames from 'classnames';
import type { ComponentProps, CSSProperties } from 'react';
import { Background, BackgroundVariant, Controls, MiniMap, ReactFlow, ReactFlowProvider } from '@xyflow/react';
import type { BackgroundProps } from '@xyflow/react';

import {
  AiqJourneyMiniMapNode,
  aiqJourneyEdgeTypes,
  aiqJourneyNodeTypes,
  getAiqJourneyMiniMapNodeColor,
  getAiqJourneyMiniMapNodeStrokeColor,
} from './AiqJourneySkin';
import '@xyflow/react/dist/style.css';
import './UniReactFlow.scss';

type ReactFlowBaseProps = ComponentProps<typeof ReactFlow>;
type UniReactFlowBackgroundVariant = BackgroundProps['variant'];

export type UniReactFlowProps = ReactFlowBaseProps & {
  containerClassName?: string;
  containerStyle?: CSSProperties;
  showControls?: boolean;
  showMiniMap?: boolean;
  showBackground?: boolean;
  backgroundVariant?: UniReactFlowBackgroundVariant;
  skin?: 'default' | 'aiq-journey';
};

export const UniReactFlow = ({
  containerClassName,
  containerStyle,
  className,
  fitView = true,
  showControls = true,
  showMiniMap = true,
  showBackground = true,
  backgroundVariant = BackgroundVariant.Dots,
  skin = 'default',
  nodeTypes,
  edgeTypes,
  children,
  ...rest
}: UniReactFlowProps) => {
  const mergedNodeTypes = skin === 'aiq-journey' ? { ...aiqJourneyNodeTypes, ...nodeTypes } : nodeTypes;
  const mergedEdgeTypes = skin === 'aiq-journey' ? { ...aiqJourneyEdgeTypes, ...edgeTypes } : edgeTypes;
  const shouldRenderBackground = showBackground && skin !== 'aiq-journey';

  return (
    <div className={classNames('uni-react-flow', `uni-react-flow--${skin}`, containerClassName)} style={containerStyle}>
      <ReactFlowProvider>
        <ReactFlow
          className={classNames('uni-react-flow__canvas', className)}
          fitView={fitView}
          nodeTypes={mergedNodeTypes}
          edgeTypes={mergedEdgeTypes}
          {...rest}
        >
          {children}
          {showMiniMap ? (
            <MiniMap
              bgColor={skin === 'aiq-journey' ? '#ffffff' : undefined}
              maskColor={skin === 'aiq-journey' ? 'rgb(27 158 173 / 7%)' : undefined}
              maskStrokeColor={skin === 'aiq-journey' ? '#1b9ead' : undefined}
              maskStrokeWidth={skin === 'aiq-journey' ? 0.8 : undefined}
              nodeBorderRadius={skin === 'aiq-journey' ? 2 : undefined}
              nodeColor={skin === 'aiq-journey' ? getAiqJourneyMiniMapNodeColor : undefined}
              nodeComponent={skin === 'aiq-journey' ? AiqJourneyMiniMapNode : undefined}
              nodeStrokeColor={skin === 'aiq-journey' ? getAiqJourneyMiniMapNodeStrokeColor : undefined}
              nodeStrokeWidth={skin === 'aiq-journey' ? 1 : undefined}
            />
          ) : null}
          {showControls ? <Controls /> : null}
          {shouldRenderBackground ? <Background variant={backgroundVariant} /> : null}
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export { addEdge, applyEdgeChanges, applyNodeChanges, BackgroundVariant, MarkerType } from '@xyflow/react';
export type { Connection, Edge, EdgeChange, Node, NodeChange, ReactFlowInstance } from '@xyflow/react';
export {
  applyRelationshipLayout,
  filterLockedNodePositionChanges,
  horizontalDisplayRuleset,
  verticalDisplayRuleset,
} from './relationshipLayout';
export type {
  UniReactFlowLayoutDirection,
  UniReactFlowRelationshipLayoutContext,
  UniReactFlowRelationshipLayoutOptions,
  UniReactFlowRelationshipLayoutRules,
  UniReactFlowLayoutSize,
} from './relationshipLayout';
