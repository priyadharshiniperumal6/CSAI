import type { DragEvent } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { UniBreadcrumb } from '../../../components/breadcrumb/UniBreadcrumb';
import { UniButton } from '../../../components/button/UniButton';
import { UniCard } from '../../../components/card/UniCard';
import { UniEmpty } from '../../../components/empty/UniEmpty';
import type { UniDropdownMenuOption } from '../../../components/dropdown/UniDropdownMenu';
import { UniInput } from '../../../components/input/UniInput';
import { UniSearchInput } from '../../../components/input/UniSearchInput';
import { UniModal } from '../../../components/modal/UniModal';
import { UniNavButton } from '../../../components/navigation/UniNavButton';
import { UniSegmented } from '../../../components/segmented/UniSegmented';
import { UniSelect } from '../../../components/select/UniSelect';
import {
  UniReactFlow,
  addEdge,
  applyRelationshipLayout,
  applyEdgeChanges,
  applyNodeChanges,
  filterLockedNodePositionChanges,
  horizontalDisplayRuleset,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
  type ReactFlowInstance,
  verticalDisplayRuleset,
} from '../../../components/react-flow/UniReactFlow';
import {
  AIQ_JOURNEY_NODE_PALETTE_MIME,
  mapToAiqJourneySkin,
  type AiqJourneyContentDisplayMode,
  type AiqJourneyEndSubtype,
  type AiqJourneyLayoutDirection,
  type AiqJourneyPaletteActionItem,
  type AiqJourneyPaletteNodeTemplate,
} from '../../../components/react-flow/AiqJourneySkin';
import { AiqJourneyCanvasMapControl } from '../../../components/react-flow/AiqJourneyCanvasMapControl';
import { AiqJourneyCanvasToolbar } from '../../../components/react-flow/AiqJourneyCanvasToolbar';
import { AiqJourneyTemplatePalette } from '../../../components/react-flow/AiqJourneyTemplatePalette';
import { UniSkeleton } from '../../../components/skeleton/UniSkeleton';
import { SidePanelHeader } from '../../../components/side-panel/SidePanelHeader';
import { UniSidePanel } from '../../../components/side-panel/UniSidePanel';
import type { ToolPanelParams } from '../../../components/side-panel/types';
import { UniTag } from '../../../components/tag/UniTag';
import { UniTextarea } from '../../../components/textarea/UniTextarea';
import type { DemoViewState } from '../../mocks/demoState';
import { useDemoState } from '../../mocks/demoState';
import { ViewRouteShell } from '../shared/ViewRouteShell';

type FlowGraph = {
  nodes: Node[];
  edges: Edge[];
};

type FlowCanvasVariantId = 'orchestration' | 'skill';
type FlowGraphCollection = Record<FlowCanvasVariantId, FlowGraph>;
type FlowCanvasDirection = AiqJourneyLayoutDirection;

type NodeTemplateItem = {
  id: string;
  label: string;
  description: string;
  template: AiqJourneyPaletteNodeTemplate;
};

type SelectOption = {
  label: string;
  value: string;
};

type FlowEdgeData = {
  bendPoints?: Array<{ x: number; y: number }>;
  branchLabel?: unknown;
  branchDescription?: unknown;
  isGotoLink?: boolean;
  hiddenUntilSourceHover?: boolean;
  isSourceHovered?: boolean;
};

type PendingCreateNode = {
  targetNodeId: string;
  template: AiqJourneyPaletteNodeTemplate;
  dropMode: 'add-point' | 'branch';
  nodeLabel: string;
  gotoTargetOptions: SelectOption[];
};

type EditorMode = 'create' | 'edit';

type FlowCanvasLayoutRules = {
  maxOutgoingByNodeType: Partial<Record<'start' | 'add' | 'goto', number>>;
  noOutgoingNodeTypes: Array<'end'>;
  noAddPointNodeTypes: Array<'end' | 'goto'>;
};

type FlowCanvasVariantConfig = {
  id: FlowCanvasVariantId;
  label: string;
  templates: NodeTemplateItem[];
  layoutRules: FlowCanvasLayoutRules;
  visual: {
    skin: 'aiq-journey';
    paletteClassName: string;
  };
};

const FLOW_NODE_WIDTH = 200;
const ADD_NODE_SIZE = 28;
const ADD_NODE_X_OFFSET = (FLOW_NODE_WIDTH - ADD_NODE_SIZE) / 2;
const ROOT_NODE_X = 80;
const START_NODE_Y = 20;
const ROOT_ADD_NODE_Y = 118;

const orchestrationNodeTemplateItems: NodeTemplateItem[] = [
  {
    id: 'orchestration-subflow',
    label: 'Subflow',
    description: 'Route to a reusable orchestration flow.',
    template: { nodeType: 'content', contentSubtype: 'subflow' },
  },
  {
    id: 'orchestration-agent-transfer',
    label: 'Agent Transfer',
    description: 'Transfer to an agent hand-off destination.',
    template: { nodeType: 'content', contentSubtype: 'agent', title: 'Agent Transfer' },
  },
  {
    id: 'orchestration-skill-set',
    label: 'Skill Set',
    description: 'Assign skills before execution continues.',
    template: { nodeType: 'content', contentSubtype: 'skillset' },
  },
  {
    id: 'orchestration-tool',
    label: 'Tool',
    description: 'Invoke a tool to resolve this step.',
    template: { nodeType: 'content', contentSubtype: 'tool' },
  },
  {
    id: 'orchestration-authenticate',
    label: 'Authenticate',
    description: 'Validate identity before proceeding.',
    template: { nodeType: 'content', contentSubtype: 'authenticate' },
  },
];

const skillNodeTemplateItems: NodeTemplateItem[] = [
  {
    id: 'skill-message',
    label: 'Message',
    description: 'Send a message to the customer.',
    template: { nodeType: 'content', contentSubtype: 'message' },
  },
  {
    id: 'skill-question',
    label: 'Question',
    description: 'Ask a question and branch on the answer.',
    template: { nodeType: 'content', contentSubtype: 'question' },
  },
  {
    id: 'skill-subflow',
    label: 'Subflow',
    description: 'Route to a reusable skill flow.',
    template: { nodeType: 'content', contentSubtype: 'subflow' },
  },
  {
    id: 'skill-tool',
    label: 'Tool',
    description: 'Invoke a tool during skill execution.',
    template: { nodeType: 'content', contentSubtype: 'tool' },
  },
];

const flowOptions: UniDropdownMenuOption[] = [
  { key: 'basic-inbound', name: 'Basic Inbound' },
  { key: 'advanced-inbound', name: 'Advanced Inbound' },
];

const headerActionOptions: UniDropdownMenuOption[] = [
  { key: 'duplicate', name: 'Duplicate' },
  { key: 'archive', name: 'Archive' },
];

const specialNodeTemplateItems: NodeTemplateItem[] = [
  {
    id: 'shared-goto',
    label: 'Goto',
    description: 'Jump back to an existing node.',
    template: { nodeType: 'goto' },
  },
  {
    id: 'shared-end-neutral',
    label: 'End',
    description: 'Default neutral end state for this flow path.',
    template: { nodeType: 'end', endSubtype: 'neutral' },
  },
];

const sharedCanvasLayoutRules: FlowCanvasLayoutRules = {
  maxOutgoingByNodeType: {
    start: 1,
    add: 1,
    goto: 1,
  },
  noOutgoingNodeTypes: ['end'],
  noAddPointNodeTypes: ['end', 'goto'],
};

const flowCanvasVariants: Record<FlowCanvasVariantId, FlowCanvasVariantConfig> = {
  orchestration: {
    id: 'orchestration',
    label: 'Orchestration',
    templates: [...orchestrationNodeTemplateItems, ...specialNodeTemplateItems],
    layoutRules: sharedCanvasLayoutRules,
    visual: {
      skin: 'aiq-journey',
      paletteClassName: 'uni-react-flow-journey-template-palette--orchestration',
    },
  },
  skill: {
    id: 'skill',
    label: 'Skill',
    templates: [...skillNodeTemplateItems, ...specialNodeTemplateItems],
    layoutRules: sharedCanvasLayoutRules,
    visual: {
      skin: 'aiq-journey',
      paletteClassName: 'uni-react-flow-journey-template-palette--skill',
    },
  },
};

const flowCanvasVariantOptions = (Object.keys(flowCanvasVariants) as FlowCanvasVariantId[]).map(variantId => ({
  value: variantId,
  label: flowCanvasVariants[variantId].label,
}));

const endSubtypeOptions: SelectOption[] = [
  { label: 'Neutral', value: 'neutral' },
  { label: 'Positive', value: 'positive' },
  { label: 'Negative', value: 'negative' },
];

const getTemplateNodeTypeLabel = (template: AiqJourneyPaletteNodeTemplate): string => {
  if (template.nodeType === 'content') {
    switch (template.contentSubtype) {
      case 'message':
        return 'Message';
      case 'subflow':
        return 'Subflow';
      case 'question':
        return 'Question';
      case 'tool':
        return 'Tool';
      case 'skillset':
        return 'Skill Set';
      case 'authenticate':
        return 'Authenticate';
      case 'agent':
        return 'Agent Transfer';
      case 'statement':
      default:
        return 'Statement';
    }
  }

  if (template.nodeType === 'goto') {
    return 'Goto';
  }
  if (template.nodeType === 'transfer') {
    return 'Transfer';
  }
  if (template.nodeType === 'end') {
    return 'End';
  }

  return 'Node';
};

const getRenderedNodeHeight = (
  template: AiqJourneyPaletteNodeTemplate,
  contentDisplayMode: AiqJourneyContentDisplayMode = 'expanded'
): number => {
  if (template.nodeType === 'content') {
    return contentDisplayMode === 'collapsed' ? 44 : 147;
  }
  if (template.nodeType === 'transfer' || template.nodeType === 'goto') {
    return 60;
  }
  return 44;
};

const isContentNodeType = (nodeType?: string): boolean => nodeType === 'content';

const createEdge = (id: string, source: string, target: string): Edge => ({
  id,
  source,
  target,
});

const createAddNode = (id: string, x: number, y: number): Node => ({
  id,
  type: 'default',
  position: { x, y },
  draggable: false,
  data: { nodeType: 'add', title: 'Add Node' },
});

const createInitialFlowGraph = (canvasVariant: FlowCanvasVariantId): FlowGraph => {
  const startId = `${canvasVariant}-start`;
  const rootAddId = `${canvasVariant}-add-root`;

  const startNode: Node = {
    id: startId,
    type: 'default',
    position: { x: ROOT_NODE_X, y: START_NODE_Y },
    data: { nodeType: 'start', title: 'Start' },
  };

  const rootAddNode = createAddNode(rootAddId, ROOT_NODE_X + ADD_NODE_X_OFFSET, ROOT_ADD_NODE_Y);

  return {
    nodes: [startNode, rootAddNode],
    edges: [createEdge('e-start-add-root', startNode.id, rootAddNode.id)],
  };
};

const createInitialFlowGraphs = (): FlowGraphCollection => ({
  orchestration: createInitialFlowGraph('orchestration'),
  skill: createInitialFlowGraph('skill'),
});

const getNodeLabel = (node: Node): string => {
  const data = (node.data ?? {}) as Record<string, unknown>;
  const value = data.title ?? data.label;

  if (typeof value === 'string' && value.trim()) {
    return value;
  }

  return node.id;
};

const getNodeType = (node: Node): string | undefined => {
  return (node.data as { nodeType?: string } | undefined)?.nodeType;
};

const getDisplayRuleset = (layoutDirection: FlowCanvasDirection) =>
  layoutDirection === 'left-to-right' ? horizontalDisplayRuleset : verticalDisplayRuleset;

const getNodeMainAxisPosition = (node: Node, layoutDirection: FlowCanvasDirection) =>
  layoutDirection === 'left-to-right' ? node.position.x : node.position.y;

const getGotoTargetOptions = (
  nodes: Node[],
  insertedMainAxisPosition: number,
  layoutDirection: FlowCanvasDirection
): SelectOption[] => {
  const eligibleNodes = nodes.filter(node => {
    const nodeType = getNodeType(node);
    return nodeType !== 'add' && nodeType !== 'goto' && nodeType !== 'end';
  });

  const backwardsNodes = eligibleNodes.filter(
    node => getNodeMainAxisPosition(node, layoutDirection) < insertedMainAxisPosition
  );
  const targetNodes = (backwardsNodes.length > 0 ? backwardsNodes : eligibleNodes).sort(
    (a, b) => getNodeMainAxisPosition(b, layoutDirection) - getNodeMainAxisPosition(a, layoutDirection)
  );

  return targetNodes.map(node => ({
    value: node.id,
    label: getNodeLabel(node),
  }));
};

const asFlowEdgeData = (edge: Edge): FlowEdgeData => (edge.data ?? {}) as FlowEdgeData;

const buildPaletteActionItems = (items: NodeTemplateItem[]): AiqJourneyPaletteActionItem[] =>
  items.map(item => ({
    id: item.id,
    label: item.label,
    description: item.description,
    template: item.template,
  }));

const getNodeTemplateFromNode = (node: Node): AiqJourneyPaletteNodeTemplate | null => {
  const data = (node.data ?? {}) as {
    nodeType?: string;
    contentSubtype?: AiqJourneyPaletteNodeTemplate['contentSubtype'];
    endSubtype?: AiqJourneyEndSubtype;
  };
  const nodeType = data.nodeType;

  if (nodeType !== 'content' && nodeType !== 'transfer' && nodeType !== 'goto' && nodeType !== 'end') {
    return null;
  }

  return {
    nodeType,
    contentSubtype: nodeType === 'content' ? data.contentSubtype : undefined,
    endSubtype: nodeType === 'end' ? (data.endSubtype ?? 'neutral') : undefined,
  };
};

const getNodeDescriptionText = (node: Node): string => {
  const value = (node.data as { description?: unknown } | undefined)?.description;
  return typeof value === 'string' ? value : '';
};

const getAppendTargetId = (nodeId: string, nodes: Node[], edges: Edge[]): string | undefined => {
  const nodeTypeById = new Map(nodes.map(node => [node.id, getNodeType(node)]));

  return edges.find(edge => edge.source === nodeId && nodeTypeById.get(edge.target) === 'add')?.target;
};

const getIncomingBranchEdge = (nodeId: string, nodes: Node[], edges: Edge[]): Edge | undefined => {
  const nodeTypeById = new Map(nodes.map(node => [node.id, getNodeType(node)]));

  return edges.find(edge => {
    if (edge.target !== nodeId || asFlowEdgeData(edge).isGotoLink) {
      return false;
    }

    return nodeTypeById.get(edge.source) === 'content';
  });
};

const canDeleteFlowNode = (node: Node, nodes: Node[], edges: Edge[]): boolean => {
  const nodeType = getNodeType(node);
  if (!nodeType || nodeType === 'start' || nodeType === 'add') {
    return false;
  }

  const nodeTypeById = new Map(nodes.map(currentNode => [currentNode.id, getNodeType(currentNode)]));

  return !edges.some(edge => {
    if (edge.source !== node.id) {
      return false;
    }

    const edgeData = asFlowEdgeData(edge);
    return nodeTypeById.get(edge.target) !== 'add' && edgeData.isGotoLink !== true;
  });
};

const getExistingGotoSelection = (
  node: Node,
  graph: FlowGraph,
  layoutDirection: FlowCanvasDirection
): { options: SelectOption[]; targetId: string } => {
  const targetId = graph.edges.find(edge => edge.source === node.id && asFlowEdgeData(edge).isGotoLink)?.target ?? '';
  const baseOptions = getGotoTargetOptions(
    graph.nodes.filter(candidate => candidate.id !== node.id),
    getNodeMainAxisPosition(node, layoutDirection),
    layoutDirection
  );

  if (!targetId || baseOptions.some(option => option.value === targetId)) {
    return { options: baseOptions, targetId };
  }

  const targetNode = graph.nodes.find(candidate => candidate.id === targetId);

  return {
    options: [
      {
        value: targetId,
        label: targetNode ? getNodeLabel(targetNode) : targetId,
      },
      ...baseOptions,
    ],
    targetId,
  };
};

const deleteFlowNodeFromGraph = (graph: FlowGraph, nodeId: string, nextId: (prefix: string) => string): FlowGraph => {
  const node = graph.nodes.find(candidate => candidate.id === nodeId);
  if (!node || !canDeleteFlowNode(node, graph.nodes, graph.edges)) {
    return graph;
  }

  const nodeTypeById = new Map(graph.nodes.map(currentNode => [currentNode.id, getNodeType(currentNode)]));
  const incomingEdges = graph.edges.filter(edge => edge.target === nodeId);
  const outgoingEdges = graph.edges.filter(edge => edge.source === nodeId);
  const addChildId = outgoingEdges.find(edge => nodeTypeById.get(edge.target) === 'add')?.target;
  const addChildOutgoingEdges = addChildId ? graph.edges.filter(edge => edge.source === addChildId) : [];
  const reconnectableIncomingEdges = incomingEdges.filter(edge => asFlowEdgeData(edge).isGotoLink !== true);
  const replacementAddId = reconnectableIncomingEdges.length > 0 ? nextId('add') : null;

  const nextNodes = graph.nodes.filter(candidate => candidate.id !== nodeId && candidate.id !== addChildId);
  const nextEdges = graph.edges.filter(
    edge => edge.source !== nodeId && edge.target !== nodeId && edge.source !== addChildId && edge.target !== addChildId
  );

  if (!replacementAddId) {
    return {
      nodes: nextNodes,
      edges: nextEdges,
    };
  }

  const replacementAddNode = createAddNode(replacementAddId, node.position.x + ADD_NODE_X_OFFSET, node.position.y - 10);

  return {
    nodes: [...nextNodes, replacementAddNode],
    edges: [
      ...nextEdges,
      ...reconnectableIncomingEdges.map(edge => ({
        ...edge,
        id: nextId('edge'),
        target: replacementAddId,
      })),
      ...addChildOutgoingEdges.map(edge => ({
        ...edge,
        id: nextId('edge'),
        source: replacementAddId,
      })),
    ],
  };
};

type FlowInspectorDetailsTabProps = {
  node: Node;
  incomingEdgeCount: number;
  outgoingEdgeCount: number;
  onDescriptionChange: (nextDescription: string) => void;
  onClose: () => void;
};

const FlowInspectorDetailsTab = ({
  node,
  incomingEdgeCount,
  outgoingEdgeCount,
  onDescriptionChange,
  onClose,
}: FlowInspectorDetailsTabProps) => {
  const nodeDescription = getNodeDescriptionText(node);

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <div>
        <div className="mb-3 text-sm font-medium text-neutral-700">General</div>
        <div className="dev-detail-grid">
          <div>
            <span className="dev-detail-label">Node ID</span>
            <code>{node.id}</code>
          </div>
          <div>
            <span className="dev-detail-label">Position</span>
            <div>{`x: ${Math.round(node.position.x)}, y: ${Math.round(node.position.y)}`}</div>
          </div>
          <div>
            <span className="dev-detail-label">Incoming</span>
            <div>{incomingEdgeCount}</div>
          </div>
          <div>
            <span className="dev-detail-label">Outgoing</span>
            <div>{outgoingEdgeCount}</div>
          </div>
        </div>
      </div>
      <div>
        <div className="mb-3 text-sm font-medium text-neutral-700">Content</div>
        <label className="mb-2 block text-sm text-neutral-700" htmlFor={`flow-sidepanel-description-${node.id}`}>
          Node Description
        </label>
        <UniTextarea
          id={`flow-sidepanel-description-${node.id}`}
          rows={8}
          value={nodeDescription}
          placeholder="Enter node description"
          onChange={event => onDescriptionChange(event.target.value)}
        />
      </div>
      <div className="dev-route-shell__states">
        <UniButton size="small" onClick={onClose}>
          Close panel
        </UniButton>
      </div>
    </div>
  );
};

type FlowInspectorConnectionsTabProps = {
  node: Node;
  edges: Edge[];
};

const FlowInspectorConnectionsTab = ({ node, edges }: FlowInspectorConnectionsTabProps) => {
  const incomingSources = edges.filter(edge => edge.target === node.id).map(edge => edge.source);
  const outgoingTargets = edges.filter(edge => edge.source === node.id).map(edge => edge.target);

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <div>
        <div className="dev-detail-label">Incoming From</div>
        {incomingSources.length ? (
          <ul className="dev-flow-side-panel__list">
            {incomingSources.map(sourceId => (
              <li key={`incoming-${sourceId}`}>
                <code>{sourceId}</code>
              </li>
            ))}
          </ul>
        ) : (
          <div className="dev-route-shell__meta">No incoming edges.</div>
        )}
      </div>
      <div>
        <div className="dev-detail-label">Outgoing To</div>
        {outgoingTargets.length ? (
          <ul className="dev-flow-side-panel__list">
            {outgoingTargets.map(targetId => (
              <li key={`outgoing-${targetId}`}>
                <code>{targetId}</code>
              </li>
            ))}
          </ul>
        ) : (
          <div className="dev-route-shell__meta">No outgoing edges.</div>
        )}
      </div>
    </div>
  );
};

type FlowCanvasProps = {
  flowId: string;
  canvasVariant: FlowCanvasVariantId;
};

const FlowCanvas = ({ flowId, canvasVariant }: FlowCanvasProps) => {
  const idCounterRef = useRef(1);
  const [graphsByCanvas, setGraphsByCanvas] = useState<FlowGraphCollection>(createInitialFlowGraphs);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [hoveredGotoNodeId, setHoveredGotoNodeId] = useState<string | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<EditorMode | null>(null);
  const [pendingCreateNode, setPendingCreateNode] = useState<PendingCreateNode | null>(null);
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [editingBranchEdgeId, setEditingBranchEdgeId] = useState<string | null>(null);
  const [editingNodeType, setEditingNodeType] = useState<AiqJourneyPaletteNodeTemplate['nodeType'] | null>(null);
  const [editingNodeLabel, setEditingNodeLabel] = useState('Node');
  const [contentDisplayMode, setContentDisplayMode] = useState<AiqJourneyContentDisplayMode>('expanded');
  const [layoutDirection, setLayoutDirection] = useState<FlowCanvasDirection>('top-to-bottom');
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [draftName, setDraftName] = useState('');
  const [draftDescription, setDraftDescription] = useState('');
  const [draftEndSubtype, setDraftEndSubtype] = useState<AiqJourneyEndSubtype | ''>('');
  const [gotoTargetOptions, setGotoTargetOptions] = useState<SelectOption[]>([]);
  const [draftGotoTargetId, setDraftGotoTargetId] = useState('');
  const [draftBranchLabel, setDraftBranchLabel] = useState('');
  const [draftBranchDescription, setDraftBranchDescription] = useState('');

  const nextId = useCallback((prefix: string) => `${prefix}-${idCounterRef.current++}`, []);

  const closeEditor = useCallback(() => {
    setEditorOpen(false);
    setEditorMode(null);
    setPendingCreateNode(null);
    setEditingNodeId(null);
    setEditingBranchEdgeId(null);
    setEditingNodeType(null);
    setEditingNodeLabel('Node');
    setDraftName('');
    setDraftDescription('');
    setDraftEndSubtype('');
    setGotoTargetOptions([]);
    setDraftGotoTargetId('');
    setDraftBranchLabel('');
    setDraftBranchDescription('');
  }, []);

  const canvasVariantConfig = flowCanvasVariants[canvasVariant];
  const graph = graphsByCanvas[canvasVariant];
  const nodeTemplateItems = canvasVariantConfig.templates;
  const actionPaletteItems = useMemo(() => buildPaletteActionItems(nodeTemplateItems), [nodeTemplateItems]);
  const applyForcedLayoutToGraph = useCallback(
    (currentGraph: FlowGraph): FlowGraph => {
      const graphWithLayoutMetadata = {
        nodes: currentGraph.nodes.map(node => ({
          ...node,
          data: {
            ...(node.data as Record<string, unknown> | undefined),
            contentDisplayMode,
          },
        })),
        edges: currentGraph.edges,
      };
      const laidOutGraph = applyRelationshipLayout(graphWithLayoutMetadata.nodes, graphWithLayoutMetadata.edges, {
        direction: layoutDirection,
        rules: getDisplayRuleset(layoutDirection),
        lockNodePositions: true,
      });

      return {
        nodes: laidOutGraph.nodes,
        edges: laidOutGraph.edges,
      };
    },
    [contentDisplayMode, layoutDirection]
  );

  useEffect(() => {
    idCounterRef.current = 1;
    setGraphsByCanvas(createInitialFlowGraphs());
    setActiveNodeId(null);
    setHoveredGotoNodeId(null);
    setContentDisplayMode('expanded');
    setLayoutDirection('top-to-bottom');
    closeEditor();
  }, [closeEditor, flowId]);

  useEffect(() => {
    setActiveNodeId(null);
    setHoveredGotoNodeId(null);
    setLayoutDirection('top-to-bottom');
    closeEditor();
  }, [canvasVariant, closeEditor]);

  useEffect(() => {
    setGraphsByCanvas(currentGraphs => ({
      orchestration: applyForcedLayoutToGraph(currentGraphs.orchestration),
      skill: applyForcedLayoutToGraph(currentGraphs.skill),
    }));
  }, [applyForcedLayoutToGraph]);

  const handlePaletteDrop = useCallback(
    (targetNodeId: string, template: AiqJourneyPaletteNodeTemplate, dropMode: 'add-point' | 'branch' = 'add-point') => {
      const targetNode = graph.nodes.find(node => node.id === targetNodeId);
      const targetNodeType = targetNode ? getNodeType(targetNode) : undefined;
      const isAddPointDrop = dropMode === 'add-point' && targetNodeType === 'add';
      const isBranchDrop = dropMode === 'branch' && isContentNodeType(targetNodeType);

      if (!targetNode || (!isAddPointDrop && !isBranchDrop)) {
        return;
      }

      const parentEdge = isAddPointDrop ? graph.edges.find(edge => edge.target === targetNodeId) : null;
      if (isAddPointDrop && !parentEdge) {
        return;
      }

      const targetNodeIdsById = new Map(graph.nodes.map(node => [node.id, getNodeType(node)]));
      const branchCount = isBranchDrop
        ? graph.edges.filter(edge => edge.source === targetNodeId && targetNodeIdsById.get(edge.target) !== 'add')
            .length
        : 0;
      const insertedNodePosition = isAddPointDrop
        ? {
            x: targetNode.position.x - ADD_NODE_X_OFFSET,
            y: targetNode.position.y + 10,
          }
        : {
            x: targetNode.position.x + 320,
            y: targetNode.position.y + Math.max(0, branchCount - 1) * 170,
          };

      const nextGotoTargetOptions =
        template.nodeType === 'goto'
          ? getGotoTargetOptions(
              graph.nodes,
              getNodeMainAxisPosition(
                {
                  id: 'pending-node',
                  type: 'default',
                  position: insertedNodePosition,
                  data: {
                    nodeType: template.nodeType,
                    contentSubtype: template.contentSubtype,
                  },
                },
                layoutDirection
              ) ?? getNodeMainAxisPosition(targetNode, layoutDirection),
              layoutDirection
            )
          : [];

      setPendingCreateNode({
        targetNodeId,
        template,
        dropMode: isBranchDrop ? 'branch' : 'add-point',
        nodeLabel: getTemplateNodeTypeLabel(template),
        gotoTargetOptions: nextGotoTargetOptions,
      });
      setEditingNodeId(null);
      setEditingBranchEdgeId(null);
      setEditingNodeType(template.nodeType);
      setEditingNodeLabel(getTemplateNodeTypeLabel(template));
      setDraftName('');
      setDraftDescription('');
      setDraftEndSubtype('');
      setGotoTargetOptions(nextGotoTargetOptions);
      setDraftGotoTargetId('');
      setDraftBranchLabel('');
      setDraftBranchDescription('');
      setEditorMode('create');
      setEditorOpen(true);
    },
    [graph.edges, graph.nodes, layoutDirection]
  );

  const handleFitToScreen = useCallback(() => {
    reactFlowInstance?.fitView({ duration: 240, padding: 0.18 });
  }, [reactFlowInstance]);
  const handleZoomIn = useCallback(() => {
    reactFlowInstance?.zoomIn({ duration: 180 });
  }, [reactFlowInstance]);
  const handleZoomOut = useCallback(() => {
    reactFlowInstance?.zoomOut({ duration: 180 });
  }, [reactFlowInstance]);

  useEffect(() => {
    if (!reactFlowInstance) {
      return;
    }

    const frameId = requestAnimationFrame(() => {
      reactFlowInstance.fitView({ duration: 240, padding: 0.18 });
    });

    return () => cancelAnimationFrame(frameId);
  }, [contentDisplayMode, layoutDirection, reactFlowInstance]);

  const handleEditNode = useCallback(
    (nodeId: string) => {
      const node = graph.nodes.find(candidate => candidate.id === nodeId);
      const template = node ? getNodeTemplateFromNode(node) : null;
      if (!node || !template) {
        return;
      }

      const branchEdge = getIncomingBranchEdge(nodeId, graph.nodes, graph.edges);
      const branchEdgeData = branchEdge ? asFlowEdgeData(branchEdge) : undefined;
      const gotoState =
        template.nodeType === 'goto'
          ? getExistingGotoSelection(node, graph, layoutDirection)
          : {
              options: [] as SelectOption[],
              targetId: '',
            };

      setActiveNodeId(nodeId);
      setPendingCreateNode(null);
      setEditingNodeId(nodeId);
      setEditingBranchEdgeId(branchEdge?.id ?? null);
      setEditingNodeType(template.nodeType);
      setEditingNodeLabel(getTemplateNodeTypeLabel(template));
      setDraftName(getNodeLabel(node));
      setDraftDescription(getNodeDescriptionText(node));
      setDraftEndSubtype(template.endSubtype ?? 'neutral');
      setGotoTargetOptions(gotoState.options);
      setDraftGotoTargetId(gotoState.targetId);
      setDraftBranchLabel(typeof branchEdgeData?.branchLabel === 'string' ? branchEdgeData.branchLabel : '');
      setDraftBranchDescription(
        typeof branchEdgeData?.branchDescription === 'string' ? branchEdgeData.branchDescription : ''
      );
      setEditorMode('edit');
      setEditorOpen(true);
    },
    [graph, layoutDirection]
  );

  const handleDeleteNode = useCallback(
    (nodeId: string) => {
      setGraphsByCanvas(currentGraphs => {
        const currentGraph = currentGraphs[canvasVariant];
        const nextGraph = deleteFlowNodeFromGraph(currentGraph, nodeId, nextId);

        if (nextGraph === currentGraph) {
          return currentGraphs;
        }

        return {
          ...currentGraphs,
          [canvasVariant]: applyForcedLayoutToGraph(nextGraph),
        };
      });

      setActiveNodeId(current => (current === nodeId ? null : current));
      if (editingNodeId === nodeId) {
        closeEditor();
      }
    },
    [applyForcedLayoutToGraph, canvasVariant, closeEditor, editingNodeId, nextId]
  );

  const handleNodeDescriptionChange = useCallback(
    (nodeId: string, nextDescription: string) => {
      setGraphsByCanvas(currentGraphs => {
        const currentGraph = currentGraphs[canvasVariant];

        return {
          ...currentGraphs,
          [canvasVariant]: {
            ...currentGraph,
            nodes: currentGraph.nodes.map(node =>
              node.id === nodeId
                ? {
                    ...node,
                    data: {
                      ...(node.data as Record<string, unknown>),
                      description: nextDescription,
                    },
                  }
                : node
            ),
          },
        };
      });

      if (editingNodeId === nodeId) {
        setDraftDescription(nextDescription);
      }
    },
    [canvasVariant, editingNodeId]
  );

  const nodesWithDropTargets = useMemo(
    () =>
      graph.nodes.map(node => {
        const nodeData = (node.data ?? {}) as Record<string, unknown>;
        const nodeType = getNodeType(node);
        const appendTargetId = getAppendTargetId(node.id, graph.nodes, graph.edges);
        const editable = nodeType && nodeType !== 'start' && nodeType !== 'add';

        return {
          ...node,
          data: {
            ...nodeData,
            layoutDirection,
            ...(nodeType !== 'start' ? { onPaletteDrop: handlePaletteDrop } : {}),
            ...(appendTargetId
              ? {
                  appendTargetId,
                  appendPaletteItems: actionPaletteItems,
                }
              : {}),
            ...(nodeType === 'content'
              ? {
                  branchPaletteItems: actionPaletteItems,
                  contentDisplayMode,
                }
              : {}),
            ...(editable
              ? {
                  onEditNode: handleEditNode,
                }
              : {}),
            ...(editable && canDeleteFlowNode(node, graph.nodes, graph.edges)
              ? {
                  onDeleteNode: handleDeleteNode,
                }
              : {}),
          },
        };
      }),
    [
      actionPaletteItems,
      contentDisplayMode,
      graph.edges,
      graph.nodes,
      handleDeleteNode,
      handleEditNode,
      handlePaletteDrop,
      layoutDirection,
    ]
  );

  const edgesWithBehavior = useMemo(
    () =>
      graph.edges.map(edge => {
        const sourceNode = graph.nodes.find(node => node.id === edge.source);
        const sourceNodeType = sourceNode ? getNodeType(sourceNode) : undefined;

        if (sourceNodeType !== 'goto') {
          return edge;
        }

        return {
          ...edge,
          data: {
            ...(edge.data as Record<string, unknown>),
            hiddenUntilSourceHover: true,
            isSourceHovered: hoveredGotoNodeId === edge.source,
          },
        };
      }),
    [graph.edges, graph.nodes, hoveredGotoNodeId]
  );

  const laidOutGraph = useMemo(
    () => applyForcedLayoutToGraph({ nodes: nodesWithDropTargets, edges: edgesWithBehavior }),
    [applyForcedLayoutToGraph, edgesWithBehavior, nodesWithDropTargets]
  );

  const skinnedGraph = useMemo(
    () => mapToAiqJourneySkin(laidOutGraph.nodes, laidOutGraph.edges),
    [laidOutGraph.edges, laidOutGraph.nodes]
  );

  const activeNode = useMemo(
    () => graph.nodes.find(node => node.id === activeNodeId) ?? null,
    [activeNodeId, graph.nodes]
  );

  const incomingEdgeCount = useMemo(() => {
    if (!activeNode) {
      return 0;
    }
    return graph.edges.filter(edge => edge.target === activeNode.id).length;
  }, [activeNode, graph.edges]);

  const outgoingEdgeCount = useMemo(() => {
    if (!activeNode) {
      return 0;
    }
    return graph.edges.filter(edge => edge.source === activeNode.id).length;
  }, [activeNode, graph.edges]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const filteredChanges = filterLockedNodePositionChanges(changes);

      if (filteredChanges.length === 0) {
        return;
      }

      setGraphsByCanvas(currentGraphs => ({
        ...currentGraphs,
        [canvasVariant]: {
          ...currentGraphs[canvasVariant],
          nodes: applyNodeChanges(filteredChanges, currentGraphs[canvasVariant].nodes),
        },
      }));
    },
    [canvasVariant]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setGraphsByCanvas(currentGraphs => {
        const currentGraph = currentGraphs[canvasVariant];

        return {
          ...currentGraphs,
          [canvasVariant]: applyForcedLayoutToGraph({
            ...currentGraph,
            edges: applyEdgeChanges(changes, currentGraph.edges),
          }),
        };
      }),
    [applyForcedLayoutToGraph, canvasVariant]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      if (!connection.source || !connection.target) {
        return;
      }

      setGraphsByCanvas(currentGraphs => {
        const currentGraph = currentGraphs[canvasVariant];
        const sourceNode = currentGraph.nodes.find(node => node.id === connection.source);
        const sourceNodeType = sourceNode ? getNodeType(sourceNode) : undefined;
        const outgoingCount = currentGraph.edges.filter(edge => edge.source === connection.source).length;

        if (sourceNodeType && canvasVariantConfig.layoutRules.noOutgoingNodeTypes.includes(sourceNodeType as 'end')) {
          return currentGraphs;
        }

        const maxOutgoing =
          sourceNodeType &&
          canvasVariantConfig.layoutRules.maxOutgoingByNodeType[sourceNodeType as 'start' | 'add' | 'goto'];

        if (typeof maxOutgoing === 'number' && outgoingCount >= maxOutgoing) {
          return currentGraphs;
        }

        const nextEdgeData =
          sourceNodeType === 'goto'
            ? ({
                branchLabel: 'Goto',
                isGotoLink: true,
                hiddenUntilSourceHover: true,
              } as Record<string, unknown>)
            : undefined;

        return {
          ...currentGraphs,
          [canvasVariant]: applyForcedLayoutToGraph({
            ...currentGraph,
            edges: addEdge(
              {
                ...connection,
                id: `e-${connection.source}-${connection.target}-${currentGraph.edges.length + 1}`,
                animated: true,
                data: nextEdgeData,
              },
              currentGraph.edges
            ),
          }),
        };
      });
    },
    [
      applyForcedLayoutToGraph,
      canvasVariant,
      canvasVariantConfig.layoutRules.maxOutgoingByNodeType,
      canvasVariantConfig.layoutRules.noOutgoingNodeTypes,
    ]
  );

  const handleTemplateDragStart = useCallback(
    (template: AiqJourneyPaletteNodeTemplate) => (event: DragEvent<HTMLButtonElement>) => {
      event.dataTransfer.setData(AIQ_JOURNEY_NODE_PALETTE_MIME, JSON.stringify(template));
      event.dataTransfer.effectAllowed = 'move';
    },
    []
  );

  const saveEditor = useCallback(() => {
    const nextTitle = draftName.trim();
    const nextDescription = draftDescription.trim();
    const nextBranchLabel = draftBranchLabel.trim();
    const nextBranchDescription = draftBranchDescription.trim();

    if (editorMode === 'create') {
      if (!pendingCreateNode || !editingNodeType || !nextTitle || !nextDescription) {
        return;
      }
      if (editingNodeType === 'end' && !draftEndSubtype) {
        return;
      }
      if (editingNodeType === 'goto' && !draftGotoTargetId) {
        return;
      }
      if (pendingCreateNode.dropMode === 'branch' && (!nextBranchLabel || !nextBranchDescription)) {
        return;
      }

      let createdNodeId: string | null = null;

      setGraphsByCanvas(currentGraphs => {
        const currentGraph = currentGraphs[canvasVariant];
        const targetNode = currentGraph.nodes.find(node => node.id === pendingCreateNode.targetNodeId);
        const targetNodeType = targetNode ? getNodeType(targetNode) : undefined;
        const isAddPointDrop = pendingCreateNode.dropMode === 'add-point' && targetNodeType === 'add';
        const isBranchDrop = pendingCreateNode.dropMode === 'branch' && isContentNodeType(targetNodeType);

        if (!targetNode || (!isAddPointDrop && !isBranchDrop)) {
          return currentGraphs;
        }

        const parentEdge = isAddPointDrop
          ? currentGraph.edges.find(edge => edge.target === pendingCreateNode.targetNodeId)
          : null;
        if (isAddPointDrop && !parentEdge) {
          return currentGraphs;
        }

        const template = pendingCreateNode.template;
        const insertedNodeId = nextId('node');
        createdNodeId = insertedNodeId;
        const targetNodeIdsById = new Map(currentGraph.nodes.map(node => [node.id, getNodeType(node)]));
        const branchCount = isBranchDrop
          ? currentGraph.edges.filter(
              edge => edge.source === pendingCreateNode.targetNodeId && targetNodeIdsById.get(edge.target) !== 'add'
            ).length
          : 0;
        const insertedNodePosition = isAddPointDrop
          ? {
              x: targetNode.position.x - ADD_NODE_X_OFFSET,
              y: targetNode.position.y + 10,
            }
          : {
              x: targetNode.position.x + 320,
              y: targetNode.position.y + Math.max(0, branchCount - 1) * 170,
            };

        const insertedNode: Node = {
          id: insertedNodeId,
          type: 'default',
          position: insertedNodePosition,
          data: {
            nodeType: template.nodeType,
            contentSubtype: template.contentSubtype,
            title: nextTitle,
            description: nextDescription,
            ...(editingNodeType === 'end' ? { endSubtype: draftEndSubtype } : {}),
          },
        };

        const downstreamEdges = isAddPointDrop
          ? currentGraph.edges.filter(edge => edge.source === pendingCreateNode.targetNodeId)
          : [];
        const remainingNodes = isAddPointDrop
          ? currentGraph.nodes.filter(node => node.id !== pendingCreateNode.targetNodeId)
          : currentGraph.nodes;
        const remainingEdges = isAddPointDrop
          ? currentGraph.edges.filter(
              edge => edge.source !== pendingCreateNode.targetNodeId && edge.target !== pendingCreateNode.targetNodeId
            )
          : currentGraph.edges;
        const shouldAttachAddNode = !canvasVariantConfig.layoutRules.noAddPointNodeTypes.includes(
          template.nodeType as 'end' | 'goto'
        );

        const nextNodes: Node[] = [...remainingNodes, insertedNode];
        const replacementEdges: Edge[] = [];

        if (isAddPointDrop) {
          replacementEdges.push(createEdge(nextId('edge'), parentEdge!.source, insertedNodeId));
        } else {
          replacementEdges.push({
            ...createEdge(nextId('edge'), pendingCreateNode.targetNodeId, insertedNodeId),
            data: {
              branchLabel: nextBranchLabel,
              branchDescription: nextBranchDescription,
            },
          });
        }

        if (shouldAttachAddNode) {
          const nextAddNodeId = nextId('add');
          const addNodeX = isAddPointDrop ? targetNode.position.x : insertedNodePosition.x + ADD_NODE_X_OFFSET;
          const nextAddNode = createAddNode(
            nextAddNodeId,
            addNodeX,
            insertedNodePosition.y + getRenderedNodeHeight(template, contentDisplayMode) + 36
          );
          nextNodes.push(nextAddNode);
          replacementEdges.push(createEdge(nextId('edge'), insertedNodeId, nextAddNodeId));

          if (isAddPointDrop) {
            replacementEdges.push(
              ...downstreamEdges.map(edge => ({
                ...edge,
                id: nextId('edge'),
                source: nextAddNodeId,
              }))
            );
          }
        }

        let nextEdges = [...remainingEdges, ...replacementEdges];

        if (editingNodeType === 'goto') {
          nextEdges = [
            ...nextEdges,
            {
              ...createEdge(nextId('edge'), insertedNodeId, draftGotoTargetId),
              data: { branchLabel: 'Goto', isGotoLink: true, hiddenUntilSourceHover: true },
            },
          ];
        }

        return {
          ...currentGraphs,
          [canvasVariant]: applyForcedLayoutToGraph({
            nodes: nextNodes,
            edges: nextEdges,
          }),
        };
      });

      if (createdNodeId) {
        setActiveNodeId(createdNodeId);
      }
      closeEditor();
      return;
    }

    if (!editingNodeId || !nextTitle) {
      return;
    }
    if (editingNodeType === 'end' && !draftEndSubtype) {
      return;
    }
    if (editingNodeType === 'goto' && !draftGotoTargetId) {
      return;
    }
    if (editingBranchEdgeId && !nextBranchLabel) {
      return;
    }

    setGraphsByCanvas(currentGraphs => {
      const currentGraph = currentGraphs[canvasVariant];
      const nextNodes = currentGraph.nodes.map(node => {
        if (node.id !== editingNodeId) {
          return node;
        }

        return {
          ...node,
          data: {
            ...(node.data as Record<string, unknown>),
            title: nextTitle,
            description: nextDescription,
            ...(editingNodeType === 'end' ? { endSubtype: draftEndSubtype } : {}),
          },
        };
      });

      let nextEdges = currentGraph.edges;

      if (editingNodeType === 'goto') {
        const nonGotoEdges = currentGraph.edges.filter(edge => edge.source !== editingNodeId);
        nextEdges = [
          ...nonGotoEdges,
          {
            ...createEdge(nextId('edge'), editingNodeId, draftGotoTargetId),
            data: { branchLabel: 'Goto', isGotoLink: true, hiddenUntilSourceHover: true },
          },
        ];
      }

      if (editingBranchEdgeId) {
        nextEdges = nextEdges.map(edge => {
          if (edge.id !== editingBranchEdgeId) {
            return edge;
          }

          return {
            ...edge,
            data: {
              ...(edge.data as Record<string, unknown>),
              branchLabel: nextBranchLabel,
              branchDescription: nextBranchDescription,
            },
          };
        });
      }

      return {
        ...currentGraphs,
        [canvasVariant]: applyForcedLayoutToGraph({
          nodes: nextNodes,
          edges: nextEdges,
        }),
      };
    });

    closeEditor();
  }, [
    applyForcedLayoutToGraph,
    canvasVariant,
    canvasVariantConfig.layoutRules.noAddPointNodeTypes,
    closeEditor,
    contentDisplayMode,
    draftBranchDescription,
    draftBranchLabel,
    draftDescription,
    draftEndSubtype,
    draftGotoTargetId,
    draftName,
    editingBranchEdgeId,
    editingNodeId,
    editingNodeType,
    editorMode,
    nextId,
    pendingCreateNode,
  ]);

  const sidePanelParams = useMemo<ToolPanelParams | undefined>(() => {
    if (!activeNode) {
      return undefined;
    }

    const nodeLabel = String(activeNode.data?.title ?? activeNode.data?.label ?? activeNode.id);

    return {
      header: {
        component: SidePanelHeader,
        params: {
          title: { value: nodeLabel },
          close: () => setActiveNodeId(null),
        },
      },
      toolPanels: [{ width: 450, minWidth: 450, maxWidth: 450 }],
      tabs: [
        {
          id: 'details',
          title: 'Details',
          component: FlowInspectorDetailsTab,
          componentProps: {
            node: activeNode,
            incomingEdgeCount,
            outgoingEdgeCount,
            onDescriptionChange: (nextDescription: string) =>
              handleNodeDescriptionChange(activeNode.id, nextDescription),
            onClose: () => setActiveNodeId(null),
          },
          nav: {
            component: UniNavButton,
            props: {
              type: 'text',
              iconOnly: true,
              materialIcon: { iconName: 'info', size: 20 },
            },
          },
        },
        {
          id: 'connections',
          title: 'Connections',
          component: FlowInspectorConnectionsTab,
          componentProps: {
            node: activeNode,
            edges: graph.edges,
          },
          nav: {
            component: UniNavButton,
            props: {
              type: 'text',
              iconOnly: true,
              materialIcon: { iconName: 'device_hub', size: 20 },
            },
          },
        },
      ],
      activeKey: 'details',
    };
  }, [activeNode, graph.edges, handleNodeDescriptionChange, incomingEdgeCount, outgoingEdgeCount]);

  const editorTitle = editingNodeLabel ? `Configure ${editingNodeLabel}` : 'Configure Node';
  const showBranchFields =
    editorMode === 'create' ? pendingCreateNode?.dropMode === 'branch' : editingBranchEdgeId !== null;
  const isEditorSaveDisabled =
    editorMode === 'create'
      ? !draftName.trim() ||
        !draftDescription.trim() ||
        (editingNodeType === 'end' && !draftEndSubtype) ||
        (editingNodeType === 'goto' && !draftGotoTargetId) ||
        (showBranchFields && (!draftBranchLabel.trim() || !draftBranchDescription.trim()))
      : !draftName.trim() ||
        (editingNodeType === 'end' && !draftEndSubtype) ||
        (editingNodeType === 'goto' && !draftGotoTargetId) ||
        (editingBranchEdgeId !== null && !draftBranchLabel.trim());
  const canvasControls = (
    <div className="uni-react-flow-journey-canvas-control-cluster">
      <AiqJourneyCanvasMapControl onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} onFitToScreen={handleFitToScreen} />
      <AiqJourneyCanvasToolbar
        contentDisplayMode={contentDisplayMode}
        onContentDisplayModeChange={setContentDisplayMode}
        layoutDirection={layoutDirection}
        onLayoutDirectionChange={setLayoutDirection}
        showLayoutDirectionToggle
        onFitToScreen={handleFitToScreen}
        showFitToScreen={false}
      />
    </div>
  );

  return (
    <div className="dev-flow-canvas-wrapper">
      <div className="dev-flow-node-palette">
        <AiqJourneyTemplatePalette
          items={actionPaletteItems}
          onDragStart={handleTemplateDragStart}
          className={canvasVariantConfig.visual.paletteClassName}
        />
      </div>

      <UniReactFlow
        nodes={skinnedGraph.nodes}
        edges={skinnedGraph.edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_event, node) => {
          const nodeType = getNodeType(node);
          setActiveNodeId(nodeType === 'add' ? null : node.id);
        }}
        onNodeMouseEnter={(_event, node) => {
          if (getNodeType(node) === 'goto') {
            setHoveredGotoNodeId(node.id);
          }
        }}
        onNodeMouseLeave={(_event, node) => {
          if (getNodeType(node) === 'goto') {
            setHoveredGotoNodeId(current => (current === node.id ? null : current));
          }
        }}
        onPaneClick={() => setActiveNodeId(null)}
        onInit={setReactFlowInstance}
        skin={canvasVariantConfig.visual.skin}
        nodesDraggable={false}
        showControls={false}
        showBackground={false}
        containerStyle={{ height: '100%', width: '100%' }}
      />
      <div className="pointer-events-none absolute bottom-4 left-4 z-20 [&>*]:pointer-events-auto">
        {canvasControls}
      </div>
      {sidePanelParams ? <UniSidePanel className="dev-flow-side-panel" params={sidePanelParams} /> : null}
      <UniModal
        open={editorOpen}
        title={editorTitle}
        footerOkLabel={editorMode === 'create' ? 'Add Node' : 'Save Node'}
        footerCancelLabel="Cancel"
        isOkBtnDisabled={isEditorSaveDisabled}
        onOk={saveEditor}
        onCancel={closeEditor}
        maskClosable={false}
      >
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium text-neutral-700" htmlFor="flow-node-name">
            Node Name
          </label>
          <UniInput
            id="flow-node-name"
            value={draftName}
            placeholder="Enter node name"
            onChange={event => setDraftName(event.target.value)}
          />
          <label className="text-sm font-medium text-neutral-700" htmlFor="flow-node-description">
            Description
          </label>
          <UniTextarea
            id="flow-node-description"
            rows={4}
            value={draftDescription}
            placeholder="Enter node description"
            onChange={event => setDraftDescription(event.target.value)}
          />
          {editingNodeType === 'end' ? (
            <>
              <label className="text-sm font-medium text-neutral-700" htmlFor="flow-end-subtype">
                End Type
              </label>
              <UniSelect
                id="flow-end-subtype"
                value={draftEndSubtype || undefined}
                options={endSubtypeOptions}
                placeholder="Select an end type"
                onChange={value => setDraftEndSubtype(value as AiqJourneyEndSubtype)}
              />
            </>
          ) : null}
          {showBranchFields ? (
            <>
              <label className="text-sm font-medium text-neutral-700" htmlFor="flow-branch-label">
                Branch Label
              </label>
              <UniInput
                id="flow-branch-label"
                value={draftBranchLabel}
                placeholder="Enter branch label"
                onChange={event => setDraftBranchLabel(event.target.value)}
              />
              <label className="text-sm font-medium text-neutral-700" htmlFor="flow-branch-description">
                Branch Description
              </label>
              <UniTextarea
                id="flow-branch-description"
                rows={3}
                value={draftBranchDescription}
                placeholder="Enter branch description"
                onChange={event => setDraftBranchDescription(event.target.value)}
              />
            </>
          ) : null}
          {editingNodeType === 'goto' ? (
            <>
              <div className="text-sm font-medium text-neutral-700">Goto Target</div>
              <UniSelect
                value={draftGotoTargetId || undefined}
                options={gotoTargetOptions}
                placeholder="Select an existing node"
                onChange={value => setDraftGotoTargetId(value as string)}
              />
            </>
          ) : null}
        </div>
      </UniModal>
    </div>
  );
};

const renderFlowState = (state: DemoViewState, flowId: string, canvasVariant: FlowCanvasVariantId) => {
  if (state === 'loading') {
    return (
      <UniCard className="dev-route-shell__panel">
        <UniSkeleton paragraph={{ rows: 5 }} />
      </UniCard>
    );
  }

  if (state === 'empty') {
    return (
      <UniCard className="dev-route-shell__panel">
        <UniEmpty
          params={{
            props: {
              title: `No flow data found for ${flowId}`,
              description: 'Switch to default state to render interactive flow data.',
            },
          }}
        />
      </UniCard>
    );
  }

  if (state === 'error') {
    return (
      <UniCard className="dev-route-shell__panel">
        <div className="dev-route-shell__title-row">
          <h2 className="dev-route-shell__subtitle">Flow load error</h2>
          <UniTag>Error</UniTag>
        </div>
        <p className="dev-route-shell__description">Unable to load flow `{flowId}`. Set `?state=default` to recover.</p>
      </UniCard>
    );
  }

  return <FlowCanvas flowId={flowId} canvasVariant={canvasVariant} />;
};

export const FlowViewDemoRoute = () => {
  const params = useParams<{ flowId: string }>();
  const { state } = useDemoState();
  const flowId = params.flowId ?? 'sample-flow';
  const [flowKey, setFlowKey] = useState('basic-inbound');
  const [actionKey, setActionKey] = useState('duplicate');
  const [viewMode, setViewMode] = useState('Flow');
  const [canvasVariant, setCanvasVariant] = useState<FlowCanvasVariantId>('orchestration');

  useEffect(() => {
    setCanvasVariant('orchestration');
  }, [flowId]);

  const canvasVariantSwitcher = (
    <UniSelect
      variant="filter"
      value={canvasVariant}
      options={flowCanvasVariantOptions}
      onChange={value => setCanvasVariant(value as FlowCanvasVariantId)}
    />
  );

  return (
    <ViewRouteShell
      title="Basic Inbound"
      description=""
      contentClassName="dev-route-shell__content--flush"
      breadcrumbsSlot={<UniBreadcrumb items={[{ title: 'Agent Studio' }, { title: 'Basic Inbound' }]} />}
      globalFiltersSlot={
        <>
          <span style={{ fontSize: 12, color: 'var(--ut-color-text-muted)' }}>Version 1.11.1</span>
          <UniSelect
            variant="filter"
            value={actionKey}
            placeholder="Actions"
            options={headerActionOptions.map(o => ({ value: o.key ?? o.name, label: o.name }))}
            onChange={value => setActionKey(String(value))}
            placement="bottomRight"
          />
        </>
      }
      primaryActionsSlot={
        <UniButton type="primary" materialIcon={{ iconName: 'play_arrow', size: 16 }}>
          Preview
        </UniButton>
      }
      toolbarLeftSlot={
        <>
          <UniButton type="default" materialIcon={{ iconName: 'tune', size: 16 }} />
          <UniSearchInput placeholder="Search" style={{ width: 220 }} className="dev-toolbar-search" />
          <UniSelect
            variant="filter"
            value={flowKey}
            options={flowOptions.map(o => ({ value: o.key ?? o.name, label: o.name }))}
            onChange={value => setFlowKey(String(value))}
          />
          {canvasVariantSwitcher}
          <span className="dev-toolbar-record-count">2 nodes</span>
        </>
      }
      toolbarRightSlot={
        <UniSegmented
          value={viewMode}
          onChange={val => setViewMode(String(val))}
          options={[
            { label: 'Flow', value: 'Flow' },
            { label: 'Nodes', value: 'Nodes' },
            { label: 'Entities', value: 'Entities' },
            { label: 'Content', value: 'Content' },
            { label: 'Rules', value: 'Rules' },
          ]}
        />
      }
    >
      {renderFlowState(state, flowId, canvasVariant)}
    </ViewRouteShell>
  );
};
