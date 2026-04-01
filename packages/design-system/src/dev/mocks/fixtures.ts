export type DashboardMetricFixture = {
  id: string;
  label: string;
  value: string;
  delta: string;
};

export type ObjectFixtureStatus = 'Healthy' | 'Warning' | 'Critical';

export type ObjectFixture = {
  objectId: string;
  name: string;
  owner: string;
  status: ObjectFixtureStatus;
  description: string;
  lastUpdated: string;
};

export type FlowFixture = {
  flowId: string;
  name: string;
  owner: string;
  nodeCount: number;
  edgeCount: number;
  executionWindow: string;
};

export const dashboardMetricFixtures: DashboardMetricFixture[] = [
  {
    id: 'conversations',
    label: 'Conversations',
    value: '28,940',
    delta: '+4.3%',
  },
  {
    id: 'containment',
    label: 'Containment Rate',
    value: '71%',
    delta: '+2.0%',
  },
  {
    id: 'avgHandleTime',
    label: 'Avg Handle Time',
    value: '3m 14s',
    delta: '-11%',
  },
  {
    id: 'sentiment',
    label: 'Sentiment Positive',
    value: '82%',
    delta: '+1.4%',
  },
];

const objectFixtures: ObjectFixture[] = [
  {
    objectId: '123',
    name: 'Enterprise Contact Center',
    owner: 'Operations Team',
    status: 'Healthy',
    description: 'Primary object used for customer interaction routing and workspace assignment.',
    lastUpdated: '2026-02-10 09:13 UTC',
  },
  {
    objectId: '456',
    name: 'Collections Bot',
    owner: 'Automation Team',
    status: 'Warning',
    description: 'Outbound collections workflow with dynamic offer selection and escalation paths.',
    lastUpdated: '2026-02-08 14:48 UTC',
  },
  {
    objectId: '789',
    name: 'Risk Case Queue',
    owner: 'Fraud Team',
    status: 'Critical',
    description: 'Queue configuration for high-risk case reviews and compliance hold events.',
    lastUpdated: '2026-02-12 17:22 UTC',
  },
];

const flowFixtures: FlowFixture[] = [
  {
    flowId: 'sample-flow',
    name: 'KYC Escalation Flow',
    owner: 'Risk Automation',
    nodeCount: 18,
    edgeCount: 24,
    executionWindow: 'Last run 9m ago',
  },
  {
    flowId: 'loan-origination',
    name: 'Loan Origination Assistant',
    owner: 'Lending Ops',
    nodeCount: 26,
    edgeCount: 33,
    executionWindow: 'Last run 1h ago',
  },
];

const STATUSES: ObjectFixtureStatus[] = ['Healthy', 'Warning', 'Critical'];

const hashValue = (input: string): number => {
  return [...input].reduce((sum, character) => sum + character.charCodeAt(0), 0);
};

export const getObjectFixture = (objectId: string): ObjectFixture => {
  const existing = objectFixtures.find(item => item.objectId === objectId);
  if (existing) {
    return existing;
  }

  const hash = hashValue(objectId);
  return {
    objectId,
    name: `Object ${objectId}`,
    owner: `Team ${String.fromCharCode(65 + (hash % 5))}`,
    status: STATUSES[hash % STATUSES.length],
    description: 'Deterministic fallback fixture generated from the object route parameter.',
    lastUpdated: '2026-02-15 12:00 UTC',
  };
};

export const getFlowFixture = (flowId: string): FlowFixture => {
  const existing = flowFixtures.find(item => item.flowId === flowId);
  if (existing) {
    return existing;
  }

  const hash = hashValue(flowId);
  return {
    flowId,
    name: `Flow ${flowId}`,
    owner: `Workflow Team ${1 + (hash % 4)}`,
    nodeCount: 8 + (hash % 15),
    edgeCount: 10 + (hash % 20),
    executionWindow: 'Last run 32m ago',
  };
};
