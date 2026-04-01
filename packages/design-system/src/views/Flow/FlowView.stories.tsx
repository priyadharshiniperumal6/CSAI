import type { ComponentProps, DragEvent } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { Connection, Edge, EdgeChange, Node, NodeChange, ReactFlowInstance } from '@xyflow/react';

import { UniBreadcrumb } from '../../components/breadcrumb/UniBreadcrumb';
import { UniButton } from '../../components/button/UniButton';
import { UniCard } from '../../components/card/UniCard';
import type { UniDropdownMenuOption } from '../../components/dropdown/UniDropdownMenu';
import { UniFilterDropdown } from '../../components/filter-dropdown/UniFilterDropdown';
import { UniInput } from '../../components/input/UniInput';
import { UniSearchInput } from '../../components/input/UniSearchInput';
import { UniModal } from '../../components/modal/UniModal';
import { UniRadioGroup } from '../../components/radio/UniRadio';
import { UniSelect } from '../../components/select/UniSelect';
import {
  AIQ_JOURNEY_NODE_PALETTE_MIME,
  type AiqJourneyContentDisplayMode,
  type AiqJourneyEndSubtype,
  type AiqJourneyLayoutDirection,
  type AiqJourneyPaletteActionItem,
  type AiqJourneyPaletteNodeTemplate,
} from '../../components/react-flow/AiqJourneySkin';
import { AiqJourneyCanvasMapControl } from '../../components/react-flow/AiqJourneyCanvasMapControl';
import { AiqJourneyCanvasToolbar } from '../../components/react-flow/AiqJourneyCanvasToolbar';
import { AiqJourneyTemplatePalette } from '../../components/react-flow/AiqJourneyTemplatePalette';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  applyRelationshipLayout,
  filterLockedNodePositionChanges,
  horizontalDisplayRuleset,
  verticalDisplayRuleset,
} from '../../components/react-flow/UniReactFlow';
import { UniTextarea } from '../../components/textarea/UniTextarea';
import { FlowView } from './FlowView';

const initialNodes: Node[] = [
  {
    id: 'start',
    position: { x: 110, y: 20 },
    data: { nodeType: 'start', title: 'Start' },
    type: 'default',
  },
  {
    id: 'loan-assessment',
    position: { x: 110, y: 130 },
    data: {
      nodeType: 'content',
      contentSubtype: 'agent',
      title: 'Loan Assessment',
      description: 'Analyse users credit history, income, obligations, and repayment capacity.',
    },
    type: 'default',
  },
  {
    id: 'eligibility-question',
    position: { x: 110, y: 330 },
    selected: true,
    data: {
      nodeType: 'content',
      contentSubtype: 'question',
      title: 'Eligibility Question',
      description: 'Ask whether income and debt ratio satisfy the minimum loan policy.',
    },
    type: 'default',
  },
  {
    id: 'disclosure-statement',
    position: { x: 110, y: 530 },
    data: {
      nodeType: 'content',
      contentSubtype: 'statement',
      title: 'Disclosure Statement',
      description: 'Present APR, term length, and repayment obligations for acceptance.',
    },
    type: 'default',
  },
  {
    id: 'risk-tool',
    position: { x: 110, y: 730 },
    data: {
      nodeType: 'content',
      contentSubtype: 'tool',
      title: 'Risk Tool Check',
      description: 'Execute risk scoring and compliance checks before final recommendation.',
    },
    type: 'default',
  },
  {
    id: 'renewal-subflow',
    position: { x: 110, y: 930 },
    data: {
      nodeType: 'content',
      contentSubtype: 'subflow',
      title: 'Renewal Subflow',
      description: 'Continue approved users into a reusable renewal subflow.',
    },
    type: 'default',
  },
  {
    id: 'transfer',
    position: { x: 430, y: 530 },
    data: {
      nodeType: 'transfer',
      title: 'Human Hand-off',
    },
    type: 'default',
  },
  {
    id: 'end',
    position: { x: 110, y: 1120 },
    data: { nodeType: 'end', title: 'End' },
    type: 'default',
  },
];

const initialEdges: Edge[] = [
  { id: 'e-start-agent', source: 'start', target: 'loan-assessment', data: { canInsert: true } },
  { id: 'e-agent-question', source: 'loan-assessment', target: 'eligibility-question', data: { canInsert: true } },
  {
    id: 'e-question-statement',
    source: 'eligibility-question',
    target: 'disclosure-statement',
    data: { branchLabel: 'If Qualified', canInsert: true },
  },
  {
    id: 'e-question-transfer',
    source: 'eligibility-question',
    target: 'transfer',
    data: {
      branchLabel: 'Escalate',
      canInsert: true,
      bendPoints: [
        { x: 220, y: 470 },
        { x: 430, y: 470 },
      ],
    },
  },
  { id: 'e-statement-tool', source: 'disclosure-statement', target: 'risk-tool', data: { canInsert: true } },
  { id: 'e-tool-subflow', source: 'risk-tool', target: 'renewal-subflow', data: { canInsert: true } },
  { id: 'e-subflow-end', source: 'renewal-subflow', target: 'end', data: { canInsert: true } },
  {
    id: 'e-transfer-end',
    source: 'transfer',
    target: 'end',
    data: {
      canInsert: true,
      bendPoints: [
        { x: 430, y: 1030 },
        { x: 110, y: 1030 },
      ],
    },
  },
];

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
  };
};

const FLOW_NODE_WIDTH = 200;
const ADD_NODE_SIZE = 28;
const ADD_NODE_X_OFFSET = (FLOW_NODE_WIDTH - ADD_NODE_SIZE) / 2;
const ROOT_NODE_X = 80;
const START_NODE_Y = 20;
const ROOT_ADD_NODE_Y = 118;

const orchestrationNodeTemplates: NodeTemplateItem[] = [
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

const skillNodeTemplates: NodeTemplateItem[] = [
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

const specialNodeTemplates: NodeTemplateItem[] = [
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

const storyViewportHeight = 'calc(100vh - 32px)';

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
    templates: [...orchestrationNodeTemplates, ...specialNodeTemplates],
    layoutRules: sharedCanvasLayoutRules,
    visual: { skin: 'aiq-journey' },
  },
  skill: {
    id: 'skill',
    label: 'Skill',
    templates: [...skillNodeTemplates, ...specialNodeTemplates],
    layoutRules: sharedCanvasLayoutRules,
    visual: { skin: 'aiq-journey' },
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

const createPaletteGraph = (canvasVariant: FlowCanvasVariantId): FlowGraph => {
  const startId = `${canvasVariant}-start`;
  const addId = `${canvasVariant}-add-root`;

  const startNode: Node = {
    id: startId,
    type: 'default',
    position: { x: ROOT_NODE_X, y: START_NODE_Y },
    data: { nodeType: 'start', title: 'Start' },
  };

  const rootAddNode = createAddNode(addId, ROOT_NODE_X + ADD_NODE_X_OFFSET, ROOT_ADD_NODE_Y);

  return {
    nodes: [startNode, rootAddNode],
    edges: [createEdge('e-start-add-root', startNode.id, rootAddNode.id)],
  };
};

const createPaletteGraphs = (): FlowGraphCollection => ({
  orchestration: createPaletteGraph('orchestration'),
  skill: createPaletteGraph('skill'),
});

const getNodeType = (node: Node): string | undefined => (node.data as { nodeType?: string } | undefined)?.nodeType;

const getDisplayRuleset = (layoutDirection: FlowCanvasDirection) =>
  layoutDirection === 'left-to-right' ? horizontalDisplayRuleset : verticalDisplayRuleset;

const getNodeMainAxisPosition = (node: Node, layoutDirection: FlowCanvasDirection) =>
  layoutDirection === 'left-to-right' ? node.position.x : node.position.y;

const getNodeLabel = (node: Node): string => {
  const data = (node.data ?? {}) as Record<string, unknown>;
  const value = data.title ?? data.label;

  if (typeof value === 'string' && value.trim()) {
    return value;
  }

  return node.id;
};

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

  return targetNodes.map(node => ({ value: node.id, label: getNodeLabel(node) }));
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

const inspectorSlot = (
  <UniCard className="w-[340px] shadow-lg">
    <div className="text-base font-medium">Eligibility Question</div>
    <div className="mt-3 text-sm font-medium">General</div>
    <div className="mt-2 text-sm text-neutral-700">Instructions</div>
    <div className="mt-1 rounded border border-neutral-200 bg-neutral-50 p-2 text-sm text-neutral-800">
      Ask whether income and debt ratio satisfy the minimum loan policy.
    </div>
    <div className="mt-3 text-sm text-neutral-700">Response Model</div>
    <div className="mt-1">
      <UniSelect defaultValue="model-placeholder" options={[{ label: 'Select Model', value: 'model-placeholder' }]} />
    </div>
    <div className="mt-3 flex items-center gap-2">
      <UniButton size="small">Cancel</UniButton>
      <UniButton size="small" type="primary">
        Save
      </UniButton>
    </div>
  </UniCard>
);

const actionsOptions: UniDropdownMenuOption[] = [
  { key: 'duplicate', name: 'Duplicate' },
  { key: 'archive', name: 'Archive' },
];

const flowOptions: UniDropdownMenuOption[] = [
  { key: 'basic-inbound', name: 'Basic Inbound' },
  { key: 'advanced-inbound', name: 'Advanced Inbound' },
];

const paletteInspectorSlot = (
  <UniCard className="w-[320px] shadow-lg">
    <div className="text-base font-medium">Flow Inspector</div>
    <div className="mt-2 text-sm text-neutral-700">
      Drag a node from the palette and drop it on a teal <strong>+</strong> add-node target. Hover palette nodes to view
      descriptions.
    </div>
  </UniCard>
);

const PaletteBuilderCanvas = (args: ComponentProps<typeof FlowView>) => {
  const idCounterRef = useRef(1);
  const [canvasVariant, setCanvasVariant] = useState<FlowCanvasVariantId>('orchestration');
  const [graphsByCanvas, setGraphsByCanvas] = useState<FlowGraphCollection>(createPaletteGraphs);
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
  const toolbarLeftSlot = (
    <>
      <UniButton type="default" materialIcon={{ iconName: 'tune', size: 16 }} />
      <UniSearchInput placeholder="Search" style={{ width: 220 }} />
      <UniFilterDropdown
        label="Basic Inbound"
        showChevron
        options={flowOptions}
        selectedKey="basic-inbound"
        variant="secondary"
      />
      <UniSelect
        style={{ minWidth: 220 }}
        value={canvasVariant}
        options={flowCanvasVariantOptions}
        onChange={value => setCanvasVariant(value as FlowCanvasVariantId)}
      />
      <span className="text-sm text-neutral-700">2 nodes</span>
    </>
  );

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

  useEffect(() => {
    setHoveredGotoNodeId(null);
    setLayoutDirection('top-to-bottom');
    closeEditor();
  }, [canvasVariant, closeEditor]);

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

      if (editingNodeId === nodeId) {
        closeEditor();
      }
    },
    [applyForcedLayoutToGraph, canvasVariant, closeEditor, editingNodeId, nextId]
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
          selected: true,
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
        const remainingNodes = (
          isAddPointDrop
            ? currentGraph.nodes.filter(node => node.id !== pendingCreateNode.targetNodeId)
            : currentGraph.nodes
        ).map(node => ({
          ...node,
          selected: false,
        }));
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
    <>
      <div style={{ height: storyViewportHeight }}>
        <FlowView
          {...args}
          nodes={laidOutGraph.nodes}
          edges={laidOutGraph.edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
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
          canvasVariant={canvasVariant}
          toolbarLeftSlot={toolbarLeftSlot}
          flowSkin={canvasVariantConfig.visual.skin}
          nodesDraggable={false}
          showControls={false}
          onCanvasInit={setReactFlowInstance}
          canvasLeftOverlaySlot={
            <AiqJourneyTemplatePalette items={actionPaletteItems} onDragStart={handleTemplateDragStart} />
          }
          canvasRightOverlaySlot={paletteInspectorSlot}
          canvasBottomLeftOverlaySlot={canvasControls}
        />
      </div>
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
          <label className="text-sm font-medium text-neutral-700" htmlFor="storybook-node-name">
            Node Name
          </label>
          <UniInput
            id="storybook-node-name"
            value={draftName}
            placeholder="Enter node name"
            onChange={event => setDraftName(event.target.value)}
          />
          <label className="text-sm font-medium text-neutral-700" htmlFor="storybook-node-description">
            Description
          </label>
          <UniTextarea
            id="storybook-node-description"
            rows={4}
            value={draftDescription}
            placeholder="Enter node description"
            onChange={event => setDraftDescription(event.target.value)}
          />
          {editingNodeType === 'end' ? (
            <>
              <label className="text-sm font-medium text-neutral-700" htmlFor="storybook-end-subtype">
                End Type
              </label>
              <UniSelect
                id="storybook-end-subtype"
                value={draftEndSubtype || undefined}
                options={endSubtypeOptions}
                placeholder="Select an end type"
                onChange={value => setDraftEndSubtype(value as AiqJourneyEndSubtype)}
              />
            </>
          ) : null}
          {showBranchFields ? (
            <>
              <label className="text-sm font-medium text-neutral-700" htmlFor="storybook-branch-label">
                Branch Label
              </label>
              <UniInput
                id="storybook-branch-label"
                value={draftBranchLabel}
                placeholder="Enter branch label"
                onChange={event => setDraftBranchLabel(event.target.value)}
              />
              <label className="text-sm font-medium text-neutral-700" htmlFor="storybook-branch-description">
                Branch Description
              </label>
              <UniTextarea
                id="storybook-branch-description"
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
    </>
  );
};

const meta = {
  title: 'Views/Patterns/FlowView',
  component: FlowView,
  tags: ['autodocs'],
  args: {
    title: 'Basic Inbound',
    description: '',
    breadcrumbsSlot: <UniBreadcrumb items={[{ title: 'Agent Studio' }, { title: 'Basic Inbound' }]} />,
    globalFiltersSlot: (
      <>
        <span className="text-sm text-primary">Version 1.11.1</span>
        <UniFilterDropdown
          label="Actions"
          showChevron
          options={actionsOptions}
          selectedKey="duplicate"
          placement="bottomRight"
        />
      </>
    ),
    primaryActionsSlot: (
      <UniButton type="primary" materialIcon={{ iconName: 'play_arrow', size: 16 }}>
        Preview
      </UniButton>
    ),
    toolbarLeftSlot: (
      <>
        <UniButton type="default" materialIcon={{ iconName: 'tune', size: 16 }} />
        <UniSearchInput placeholder="Search" style={{ width: 220 }} />
        <UniFilterDropdown
          label="Basic Inbound"
          showChevron
          options={flowOptions}
          selectedKey="basic-inbound"
          variant="secondary"
        />
        <UniSelect style={{ minWidth: 220 }} defaultValue="orchestration" options={flowCanvasVariantOptions} />
        <span className="text-sm text-neutral-700">2 nodes</span>
      </>
    ),
    toolbarRightSlot: (
      <UniRadioGroup
        size="small"
        optionType="button"
        defaultValue="Flow"
        options={[
          { label: 'Flow', value: 'Flow' },
          { label: 'Nodes', value: 'Nodes' },
          { label: 'Entities', value: 'Entities' },
          { label: 'Content', value: 'Content' },
          { label: 'Rules', value: 'Rules' },
        ]}
      />
    ),
    flowSkin: 'aiq-journey',
    inspectorSlot,
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/hl4xUrAKXdtDCJAh7aRSKz/U-Assist-Q3-2025?node-id=1390-3540&t=HF50tsKcZpJgmVGg-4',
    },
  },
  argTypes: {
    isLoading: { control: 'boolean' },
    isEmpty: { control: 'boolean' },
    error: { control: 'text' },
    toolbar: { table: { disable: true } },
    globalFilters: { table: { disable: true } },
    primaryAction: { table: { disable: true } },
    breadcrumbs: { table: { disable: true } },
    secondaryAction: { table: { disable: true } },
    toolbarLeft: { table: { disable: true } },
    toolbarRight: { table: { disable: true } },
  },
} satisfies Meta<typeof FlowView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    layoutMode: 'relationship',
    layoutDirection: 'top-to-bottom',
    nodesDraggable: false,
  },
  render: args => {
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);

    const onNodesChange = useCallback(
      (changes: NodeChange[]) => setNodes(current => applyNodeChanges(changes, current)),
      []
    );
    const onEdgesChange = useCallback(
      (changes: EdgeChange[]) => setEdges(current => applyEdgeChanges(changes, current)),
      []
    );
    const onConnect = useCallback(
      (connection: Connection) => setEdges(current => addEdge({ ...connection, animated: true }, current)),
      []
    );

    return (
      <div style={{ height: storyViewportHeight }}>
        <FlowView
          {...args}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        />
      </div>
    );
  },
};

export const PaletteBuilder: Story = {
  args: {
    title: 'Flow Builder',
    description:
      'Canvas-aware node palette with Orchestration and Skill node sets, plus shared Goto and End terminal behaviors.',
  },
  render: args => <PaletteBuilderCanvas {...args} />,
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    isEmpty: true,
    nodes: [],
    edges: [],
  },
};

export const Error: Story = {
  args: {
    error: 'Unable to load flow definition from API.',
  },
};
