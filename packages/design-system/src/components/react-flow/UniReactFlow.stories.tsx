import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useState } from 'react';
import { addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import type { Connection, Edge, EdgeChange, Node, NodeChange } from '@xyflow/react';

import { UniReactFlow } from './UniReactFlow';

const DEFAULT_EDGE_TYPE: Edge['type'] = 'smoothstep';

const initialNodes: Node[] = [
  {
    id: 'start',
    position: { x: 80, y: 20 },
    data: { nodeType: 'start', title: 'Start' },
    type: 'default',
  },
  {
    id: 'loan-assessment',
    position: { x: 80, y: 130 },
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
    position: { x: 80, y: 330 },
    selected: true,
    data: {
      nodeType: 'content',
      contentSubtype: 'question',
      title: 'Eligibility Question',
      description: 'Ask if the customer is employed full-time and has no delinquent debt.',
    },
    type: 'default',
  },
  {
    id: 'disclosure-statement',
    position: { x: 80, y: 530 },
    data: {
      nodeType: 'content',
      contentSubtype: 'statement',
      title: 'Disclosure Statement',
      description: 'Read APR details and payment terms before collecting explicit confirmation.',
    },
    type: 'default',
  },
  {
    id: 'risk-check-tool',
    position: { x: 80, y: 730 },
    data: {
      nodeType: 'content',
      contentSubtype: 'tool',
      title: 'Risk Check Tool',
      description: 'Invoke external fraud and compliance scoring services before approval.',
    },
    type: 'default',
  },
  {
    id: 'renewal-subflow',
    position: { x: 80, y: 930 },
    data: {
      nodeType: 'content',
      contentSubtype: 'subflow',
      title: 'Renewal Subflow',
      description: 'Route successful applicants into the renewal journey for next best actions.',
    },
    type: 'default',
  },
  {
    id: 'transfer',
    position: { x: 380, y: 530 },
    data: {
      nodeType: 'transfer',
      title: 'Human Hand-off',
    },
    type: 'default',
  },
  {
    id: 'end',
    position: { x: 80, y: 1120 },
    selected: true,
    data: { nodeType: 'end', title: 'End' },
    type: 'default',
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e-start-agent',
    source: 'start',
    target: 'loan-assessment',
    type: DEFAULT_EDGE_TYPE,
    data: { canInsert: true },
  },
  {
    id: 'e-agent-question',
    source: 'loan-assessment',
    target: 'eligibility-question',
    type: DEFAULT_EDGE_TYPE,
    data: { canInsert: true },
  },
  {
    id: 'e-question-statement',
    source: 'eligibility-question',
    target: 'disclosure-statement',
    type: DEFAULT_EDGE_TYPE,
    data: { branchLabel: 'Qualified', canInsert: true },
  },
  {
    id: 'e-question-transfer',
    source: 'eligibility-question',
    target: 'transfer',
    type: DEFAULT_EDGE_TYPE,
    data: {
      branchLabel: 'Needs Transfer',
      canInsert: true,
      bendPoints: [
        { x: 210, y: 470 },
        { x: 380, y: 470 },
      ],
    },
  },
  {
    id: 'e-statement-tool',
    source: 'disclosure-statement',
    target: 'risk-check-tool',
    type: DEFAULT_EDGE_TYPE,
    data: { canInsert: true },
  },
  {
    id: 'e-tool-subflow',
    source: 'risk-check-tool',
    target: 'renewal-subflow',
    type: DEFAULT_EDGE_TYPE,
    data: { canInsert: true },
  },
  {
    id: 'e-subflow-end',
    source: 'renewal-subflow',
    target: 'end',
    type: DEFAULT_EDGE_TYPE,
    data: { canInsert: true },
  },
  {
    id: 'e-transfer-end',
    source: 'transfer',
    target: 'end',
    type: DEFAULT_EDGE_TYPE,
    data: {
      canInsert: true,
      bendPoints: [
        { x: 380, y: 1030 },
        { x: 80, y: 1030 },
      ],
    },
  },
];

const meta = {
  title: 'Components/Flow/UniReactFlow',
  component: UniReactFlow,
  tags: ['autodocs'],
} satisfies Meta<typeof UniReactFlow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    skin: 'aiq-journey',
    showMiniMap: true,
    showBackground: false,
  },
  render: args => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
      (changes: NodeChange[]) => setNodes(current => applyNodeChanges(changes, current)),
      []
    );
    const onEdgesChange = useCallback(
      (changes: EdgeChange[]) => setEdges(current => applyEdgeChanges(changes, current)),
      []
    );
    const onConnect = useCallback(
      (connection: Connection) =>
        setEdges(current => addEdge({ ...connection, animated: true, type: DEFAULT_EDGE_TYPE }, current)),
      []
    );

    return (
      <UniReactFlow
        {...args}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        containerStyle={{ height: 780 }}
      />
    );
  },
};

export const MinimalCanvas: Story = {
  args: {
    nodes: initialNodes,
    edges: initialEdges,
    skin: 'aiq-journey',
    containerStyle: { height: 640 },
    showMiniMap: false,
    showControls: false,
    showBackground: false,
  },
};
