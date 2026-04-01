import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ThoughtChainItemType } from '@ant-design/x';

import UniThoughtChain from '../primitives/UniThoughtChain';

// ── Shared icons ──────────────────────────────────────────────
// Used in CustomIcons story only — icon prop is only rendered when
// status is NOT set. When status is provided, the component always
// uses the built-in status icon (LoadingOutlined, CheckCircleOutlined, etc.)

const SearchIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="6" cy="6" r="3.5" />
    <line x1="9" y1="9" x2="12.5" y2="12.5" />
  </svg>
);

const CodeIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="5 3 1.5 7 5 11" />
    <polyline points="9 3 12.5 7 9 11" />
  </svg>
);

const DbIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <ellipse cx="7" cy="3.5" rx="4" ry="1.5" />
    <path d="M3 3.5 v3 c0 .83 1.79 1.5 4 1.5s4-.67 4-1.5v-3" />
    <path d="M3 6.5 v3 c0 .83 1.79 1.5 4 1.5s4-.67 4-1.5v-3" />
  </svg>
);

const SparkleIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 1.5 L8.2 5.8 L12.5 7 L8.2 8.2 L7 12.5 L5.8 8.2 L1.5 7 L5.8 5.8 Z" />
  </svg>
);

// ── Meta ──────────────────────────────────────────────────────

const meta = {
  title: 'Components/ChatUI/AntX/ThoughtChain',
  component: UniThoughtChain,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Reasoning timeline for AI multi-step tasks. Shows named steps with status indicators (loading / success / error / abort), collapsible content, and custom icons. Valid status values: `"loading"` | `"success"` | `"error"` | `"abort"`. Thin wrapper around @ant-design/x ThoughtChain with Uni tokens applied.',
      },
    },
  },
} satisfies Meta<typeof UniThoughtChain>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── 1. Basic chain ────────────────────────────────────────────
// success → success → loading (blink)

const ts = (label: string, time: string) => (
  <span style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <span>{label}</span>
    <span style={{ color: '#969498', fontWeight: 400, fontSize: 12 }}>{time}</span>
  </span>
);

const basicItems: ThoughtChainItemType[] = [
  {
    key: 'intent',
    title: ts('Parse user intent', '0.3s'),
    description: 'Extracted query parameters and constraints',
    status: 'success',
  },
  {
    key: 'retrieve',
    title: ts('Retrieve knowledge', '1.2s'),
    description: 'Queried knowledge base — 3 relevant chunks',
    status: 'success',
  },
  {
    key: 'synthesise',
    title: 'Synthesise response',
    description: 'Generating answer from retrieved context…',
    status: 'loading',
    blink: true,
  },
];

export const BasicChain: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <UniThoughtChain items={basicItems} />
    </div>
  ),
};

// ── 2. Status variants ────────────────────────────────────────
// All four status values side by side

export const StatusVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{ minWidth: 220 }}>
        <UniThoughtChain
          items={[{ key: 'l', title: 'Processing data', description: 'In progress…', status: 'loading' }]}
        />
      </div>
      <div style={{ minWidth: 220 }}>
        <UniThoughtChain
          items={[{ key: 's', title: 'Data retrieved', description: 'Completed successfully', status: 'success' }]}
        />
      </div>
      <div style={{ minWidth: 220 }}>
        <UniThoughtChain
          items={[{ key: 'e', title: 'API call failed', description: 'Connection timeout — 5s', status: 'error' }]}
        />
      </div>
      <div style={{ minWidth: 220 }}>
        <UniThoughtChain
          items={[{ key: 'a', title: 'Step skipped', description: 'Aborted — upstream error', status: 'abort' }]}
        />
      </div>
    </div>
  ),
};

// ── 3. Full slots ─────────────────────────────────────────────
// title · description · content · footer
// Note: icon is ignored when status is set — see CustomIcons story for icon usage

const fullSlotsItems: ThoughtChainItemType[] = [
  {
    key: 'search',
    title: ts('Search knowledge base', '0.8s'),
    description: 'Full-text + semantic search across 12,000 docs',
    status: 'success',
    content: (
      <div
        style={{
          background: '#faf9fb',
          border: '1px solid #e9ecf4',
          borderRadius: 8,
          padding: '10px 12px',
          fontSize: 13,
          color: '#0e0c11',
          lineHeight: 1.6,
        }}
      >
        {
          'Found 4 relevant documents. Top match: Q4 2025 Revenue Report — score 0.94. Applied re-ranking to surface highest-confidence chunks.'
        }
      </div>
    ),
    footer: '4 documents matched · 2 chunks selected',
  },
  {
    key: 'tool',
    title: ts('Execute tool call', '0.5s'),
    description: 'Called get_revenue_metrics()',
    status: 'success',
    content: (
      <div
        style={{
          background: '#faf9fb',
          border: '1px solid #e9ecf4',
          borderRadius: 8,
          padding: '10px 12px',
          fontSize: 13,
          color: '#0e0c11',
          lineHeight: 1.6,
        }}
      >
        {'Returned structured JSON: { region: "APAC", period: "Q4 2025", revenue: 48.2M, yoy: +12% }'}
      </div>
    ),
    footer: 'Tool exit code 0 · 1 result row',
  },
  {
    key: 'compose',
    title: 'Compose answer',
    description: 'Writing final response…',
    status: 'loading',
  },
];

export const FullSlots: Story = {
  render: () => (
    <div style={{ maxWidth: 540 }}>
      <UniThoughtChain items={fullSlotsItems} />
    </div>
  ),
};

// ── 4. Collapsible ────────────────────────────────────────────
// items with collapsible: true; first item expanded by default

const collapsibleItems: ThoughtChainItemType[] = [
  {
    key: 'analyse',
    title: 'Analyse query',
    status: 'success',
    collapsible: true,
    content: (
      <div
        style={{
          background: '#faf9fb',
          border: '1px solid #e9ecf4',
          borderRadius: 8,
          padding: '10px 12px',
          fontSize: 13,
          color: '#0e0c11',
          lineHeight: 1.6,
        }}
      >
        Intent: <strong>revenue lookup</strong>. Entities: Q4 2025, APAC region. Confidence: 0.97.
      </div>
    ),
  },
  {
    key: 'fetch',
    title: 'Fetch metrics',
    status: 'loading',
    collapsible: true,
  },
];

export const Collapsible: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <UniThoughtChain items={collapsibleItems} defaultExpandedKeys={['analyse']} />
    </div>
  ),
};

// ── 5. Custom icons ───────────────────────────────────────────
// icon prop is only rendered when status is NOT set.
// Use icon without status to show custom step-type markers.

const customIconItems: ThoughtChainItemType[] = [
  {
    key: 'search',
    icon: <SearchIcon />,
    title: ts('Search', '0.4s'),
    description: 'Retrieved 4 documents from knowledge base',
  },
  {
    key: 'tool',
    icon: <CodeIcon />,
    title: ts('Execute tool', '0.9s'),
    description: 'Called get_revenue_metrics()',
  },
  {
    key: 'db',
    icon: <DbIcon />,
    title: ts('Query data warehouse', '0.5s'),
    description: 'Fetched APAC Q4 revenue rows',
  },
  {
    key: 'compose',
    icon: <SparkleIcon />,
    title: 'Compose answer',
    description: 'Writing final response…',
  },
];

export const CustomIcons: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <UniThoughtChain items={customIconItems} />
    </div>
  ),
};

// ── 6. Error in chain ─────────────────────────────────────────
// success → error → abort (skipped due to upstream error)

const errorChainItems: ThoughtChainItemType[] = [
  {
    key: 'profile',
    title: ts('Load user profile', '0.1s'),
    description: 'User data retrieved',
    status: 'success',
  },
  {
    key: 'permissions',
    title: ts('Fetch permissions', '0.3s'),
    description: '403 Forbidden — insufficient scope',
    status: 'error',
    content: (
      <div
        style={{
          background: '#fff3f0',
          border: '1px solid #fcb3a4',
          borderRadius: 8,
          padding: '10px 12px',
          fontSize: 13,
          color: '#b01a15',
          lineHeight: 1.6,
        }}
      >
        {'GET /api/v2/permissions returned 403. Required scope: '}
        <code style={{ fontSize: 11 }}>admin:read</code>
        {'. Current token lacks this permission.'}
      </div>
    ),
  },
  {
    key: 'recommend',
    title: 'Generate recommendations',
    description: 'Skipped — upstream error',
    status: 'abort',
  },
];

export const ErrorInChain: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <UniThoughtChain items={errorChainItems} />
    </div>
  ),
};

// ── 7. Dashed line ────────────────────────────────────────────
// line="dashed" connector style

const dashedItems: ThoughtChainItemType[] = [
  {
    key: 'one',
    title: 'Step one',
    description: 'Completed',
    status: 'success',
  },
  {
    key: 'two',
    title: 'Step two',
    description: 'Completed',
    status: 'success',
  },
  {
    key: 'three',
    title: 'Step three',
    description: 'In progress…',
    status: 'loading',
  },
];

export const DashedLine: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <UniThoughtChain items={dashedItems} line="dashed" />
    </div>
  ),
};

// ── 8. In-context ─────────────────────────────────────────────
// ThoughtChain embedded as a reasoning block inside a chat message

const inContextItems: ThoughtChainItemType[] = [
  {
    key: 'intent',
    title: ts('Parse intent', '0.2s'),
    description: 'Region: APAC · Period: Q4 2025 · Metric: revenue',
    status: 'success',
  },
  {
    key: 'query',
    title: ts('Query data warehouse', '1.1s'),
    description: 'SQL across 3 fact tables — 1 result row',
    status: 'success',
  },
  {
    key: 'format',
    title: 'Format response',
    description: 'Writing answer…',
    status: 'loading',
    blink: true,
  },
];

export const InContext: Story = {
  render: () => (
    <div style={{ maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* User message */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div
          style={{
            padding: '10px 14px',
            background: '#E7F7FB',
            border: '1px solid #CFF0F7',
            borderRadius: 8,
            fontSize: 14,
            maxWidth: 440,
          }}
        >
          What were APAC revenue figures for Q4 2025?
        </div>
      </div>

      {/* Reasoning block */}
      <div
        style={{
          marginLeft: 42,
          background: '#ffffff',
          border: '1px solid #e9ecf4',
          borderRadius: 8,
          padding: 16,
          maxWidth: 440,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#969498',
            marginBottom: 14,
          }}
        >
          Thinking
        </div>
        <UniThoughtChain items={inContextItems} />
      </div>

      {/* AI reply (generating) */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: '#E7F7FB',
            border: '1px solid #CFF0F7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            color: '#15808C',
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 1.5 L9.4 5.9 L14 8 L9.4 10.1 L8 14.5 L6.6 10.1 L2 8 L6.6 5.9 Z" />
          </svg>
        </div>
        <div
          style={{
            padding: '10px 14px',
            background: '#ffffff',
            border: '1px solid #e9ecf4',
            borderRadius: 8,
            fontSize: 14,
            color: '#bfbfd0',
            fontStyle: 'italic',
          }}
        >
          Generating response…
        </div>
      </div>
    </div>
  ),
};
