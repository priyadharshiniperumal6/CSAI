import type { Edge, Node, NodeChange } from '@xyflow/react';

export type UniReactFlowLayoutDirection = 'top-to-bottom' | 'left-to-right';

export type UniReactFlowLayoutSize = {
  width: number;
  height: number;
};

export type UniReactFlowRelationshipLayoutRules = {
  rootX: number;
  rootY: number;
  parentChildGap: number;
  siblingGap: number;
  rootGap: number;
};

export type UniReactFlowRelationshipLayoutContext = {
  nodesById: Map<string, Node>;
};

export type UniReactFlowRelationshipLayoutOptions = {
  direction?: UniReactFlowLayoutDirection;
  rules?: Partial<UniReactFlowRelationshipLayoutRules>;
  getNodeSize?: (node: Node) => UniReactFlowLayoutSize;
  isStructuralEdge?: (edge: Edge, context: UniReactFlowRelationshipLayoutContext) => boolean;
  lockNodePositions?: boolean;
  stripBendPoints?: boolean;
};

type FlowNodeData = {
  nodeType?: string;
  contentDisplayMode?: string;
};

const COLLAPSED_NODE_WIDTH = 200;
const EXPANDED_CONTENT_WIDTH = 260;
const DEFAULT_NODE_HEIGHT = 60;
const END_NODE_WIDTH = 116;
const END_NODE_HEIGHT = 44;
const ADD_NODE_SIZE = 28;
const COLLAPSED_CONTENT_HEIGHT = 44;
const EXPANDED_CONTENT_HEIGHT = 147;

export const verticalDisplayRuleset = Object.freeze({
  rootX: 80,
  rootY: 20,
  parentChildGap: 53,
  siblingGap: 120,
  rootGap: 160,
}) satisfies UniReactFlowRelationshipLayoutRules;

export const horizontalDisplayRuleset = Object.freeze({
  rootX: 20,
  rootY: 80,
  parentChildGap: 120,
  siblingGap: 53,
  rootGap: 160,
}) satisfies UniReactFlowRelationshipLayoutRules;

const getNodeData = (node: Node): FlowNodeData => (node.data ?? {}) as FlowNodeData;

const getDefaultNodeSize = (node: Node): UniReactFlowLayoutSize => {
  const nodeData = getNodeData(node);
  const nodeType = nodeData.nodeType;
  const contentDisplayMode = nodeData.contentDisplayMode === 'collapsed' ? 'collapsed' : 'expanded';

  if (nodeType === 'add') {
    return { width: ADD_NODE_SIZE, height: ADD_NODE_SIZE };
  }

  if (nodeType === 'end') {
    return { width: END_NODE_WIDTH, height: END_NODE_HEIGHT };
  }

  if (nodeType === 'content') {
    return {
      width: contentDisplayMode === 'collapsed' ? COLLAPSED_NODE_WIDTH : EXPANDED_CONTENT_WIDTH,
      height: contentDisplayMode === 'collapsed' ? COLLAPSED_CONTENT_HEIGHT : EXPANDED_CONTENT_HEIGHT,
    };
  }

  if (typeof node.width === 'number' && typeof node.height === 'number') {
    return { width: node.width, height: node.height };
  }

  return { width: COLLAPSED_NODE_WIDTH, height: DEFAULT_NODE_HEIGHT };
};

const getResolvedRules = (
  direction: UniReactFlowLayoutDirection,
  overrides?: Partial<UniReactFlowRelationshipLayoutRules>
): UniReactFlowRelationshipLayoutRules => ({
  ...(direction === 'left-to-right' ? horizontalDisplayRuleset : verticalDisplayRuleset),
  ...overrides,
});

const getCrossAxisSize = (size: UniReactFlowLayoutSize, direction: UniReactFlowLayoutDirection) =>
  direction === 'top-to-bottom' ? size.width : size.height;

const getMainAxisSize = (size: UniReactFlowLayoutSize, direction: UniReactFlowLayoutDirection) =>
  direction === 'top-to-bottom' ? size.height : size.width;

const stripEdgeBendPoints = (edge: Edge): Edge => {
  if (!edge.data || typeof edge.data !== 'object' || !('bendPoints' in edge.data)) {
    return edge;
  }

  const rest = { ...(edge.data as Record<string, unknown>) };
  delete rest.bendPoints;

  return {
    ...edge,
    data: Object.keys(rest).length > 0 ? rest : undefined,
  };
};

export const filterLockedNodePositionChanges = (changes: NodeChange[]): NodeChange[] =>
  changes.filter(change => change.type !== 'position');

export const applyRelationshipLayout = (
  nodes: Node[],
  edges: Edge[],
  options: UniReactFlowRelationshipLayoutOptions = {}
): { nodes: Node[]; edges: Edge[] } => {
  if (nodes.length === 0) {
    return { nodes, edges };
  }

  const direction = options.direction ?? 'top-to-bottom';
  const rules = getResolvedRules(direction, options.rules);
  const lockNodePositions = options.lockNodePositions ?? true;
  const stripBendPoints = options.stripBendPoints ?? true;
  const getNodeSize = options.getNodeSize ?? getDefaultNodeSize;
  const nodesById = new Map(nodes.map(node => [node.id, node]));
  const structuralEdgeContext = { nodesById };
  const isStructuralEdge =
    options.isStructuralEdge ??
    ((edge: Edge, context: UniReactFlowRelationshipLayoutContext) =>
      edge.source !== edge.target &&
      context.nodesById.has(edge.source) &&
      context.nodesById.has(edge.target) &&
      !(edge.data as { isGotoLink?: boolean } | undefined)?.isGotoLink);

  const structuralEdges = edges.filter(edge => isStructuralEdge(edge, structuralEdgeContext));
  const incomingEdgesByTarget = new Map<string, Edge[]>();

  structuralEdges.forEach(edge => {
    const currentEdges = incomingEdgesByTarget.get(edge.target) ?? [];
    currentEdges.push(edge);
    incomingEdgesByTarget.set(edge.target, currentEdges);
  });

  const primaryParentByNodeId = new Map<string, string>();

  nodes.forEach(node => {
    const incomingEdges = incomingEdgesByTarget.get(node.id);
    if (incomingEdges?.length) {
      primaryParentByNodeId.set(node.id, incomingEdges[0].source);
    }
  });

  const childIdsByParentId = new Map<string, string[]>();

  structuralEdges.forEach(edge => {
    if (primaryParentByNodeId.get(edge.target) !== edge.source) {
      return;
    }

    const currentChildIds = childIdsByParentId.get(edge.source) ?? [];
    currentChildIds.push(edge.target);
    childIdsByParentId.set(edge.source, currentChildIds);
  });

  const nodeSizeById = new Map(nodes.map(node => [node.id, getNodeSize(node)]));
  const subtreeSpanByNodeId = new Map<string, number>();

  const getSubtreeSpan = (nodeId: string, visiting = new Set<string>()): number => {
    const cachedSpan = subtreeSpanByNodeId.get(nodeId);
    if (typeof cachedSpan === 'number') {
      return cachedSpan;
    }

    if (visiting.has(nodeId)) {
      return getCrossAxisSize(nodeSizeById.get(nodeId) ?? getDefaultNodeSize(nodesById.get(nodeId)!), direction);
    }

    visiting.add(nodeId);

    const nodeSize = nodeSizeById.get(nodeId) ?? getDefaultNodeSize(nodesById.get(nodeId)!);
    const ownSpan = getCrossAxisSize(nodeSize, direction);
    const childIds = childIdsByParentId.get(nodeId) ?? [];
    const childSpan = childIds.reduce((totalSpan, childId, childIndex) => {
      const nextSpan = totalSpan + getSubtreeSpan(childId, visiting);
      return childIndex < childIds.length - 1 ? nextSpan + rules.siblingGap : nextSpan;
    }, 0);
    const subtreeSpan = Math.max(ownSpan, childSpan);

    visiting.delete(nodeId);
    subtreeSpanByNodeId.set(nodeId, subtreeSpan);

    return subtreeSpan;
  };

  const positionedNodeIds = new Set<string>();
  const positionByNodeId = new Map<string, { x: number; y: number }>();

  const layoutSubtree = (
    nodeId: string,
    crossAxisStart: number,
    mainAxisStart: number,
    visiting = new Set<string>()
  ) => {
    if (positionedNodeIds.has(nodeId) || visiting.has(nodeId)) {
      return;
    }

    visiting.add(nodeId);

    const node = nodesById.get(nodeId);
    if (!node) {
      visiting.delete(nodeId);
      return;
    }

    const nodeSize = nodeSizeById.get(nodeId) ?? getDefaultNodeSize(node);
    const subtreeSpan = getSubtreeSpan(nodeId);
    const crossAxisSize = getCrossAxisSize(nodeSize, direction);
    const crossAxisPosition = crossAxisStart + (subtreeSpan - crossAxisSize) / 2;
    const position =
      direction === 'top-to-bottom'
        ? {
            x: Math.round(crossAxisPosition),
            y: Math.round(mainAxisStart),
          }
        : {
            x: Math.round(mainAxisStart),
            y: Math.round(crossAxisPosition),
          };

    positionByNodeId.set(nodeId, position);
    positionedNodeIds.add(nodeId);

    const childIds = childIdsByParentId.get(nodeId) ?? [];
    if (childIds.length > 0) {
      const totalChildSpan = childIds.reduce((totalSpan, childId, childIndex) => {
        const nextSpan = totalSpan + getSubtreeSpan(childId);
        return childIndex < childIds.length - 1 ? nextSpan + rules.siblingGap : nextSpan;
      }, 0);
      const childCrossAxisStart = crossAxisStart + (subtreeSpan - totalChildSpan) / 2;
      const childMainAxisStart = mainAxisStart + getMainAxisSize(nodeSize, direction) + rules.parentChildGap;

      let nextChildCrossAxisStart = childCrossAxisStart;
      childIds.forEach(childId => {
        layoutSubtree(childId, nextChildCrossAxisStart, childMainAxisStart, visiting);
        nextChildCrossAxisStart += getSubtreeSpan(childId) + rules.siblingGap;
      });
    }

    visiting.delete(nodeId);
  };

  const rootNodeIds = nodes.filter(node => !primaryParentByNodeId.has(node.id)).map(node => node.id);
  const orderedRootNodeIds = rootNodeIds.length > 0 ? rootNodeIds : [nodes[0].id];

  let nextRootCrossAxisStart = direction === 'top-to-bottom' ? rules.rootX : rules.rootY;
  const rootMainAxisStart = direction === 'top-to-bottom' ? rules.rootY : rules.rootX;

  orderedRootNodeIds.forEach(rootNodeId => {
    layoutSubtree(rootNodeId, nextRootCrossAxisStart, rootMainAxisStart);
    nextRootCrossAxisStart += getSubtreeSpan(rootNodeId) + rules.rootGap;
  });

  nodes.forEach(node => {
    if (positionedNodeIds.has(node.id)) {
      return;
    }

    layoutSubtree(node.id, nextRootCrossAxisStart, rootMainAxisStart);
    nextRootCrossAxisStart += getSubtreeSpan(node.id) + rules.rootGap;
  });

  return {
    nodes: nodes.map(node => ({
      ...node,
      position: positionByNodeId.get(node.id) ?? node.position,
      ...(lockNodePositions ? { draggable: false } : {}),
    })),
    edges: stripBendPoints ? edges.map(stripEdgeBendPoints) : edges,
  };
};
