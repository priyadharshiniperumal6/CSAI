import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import UniPrompts from '../primitives/UniPrompts';

// ── Shared icon components ─────────────────────────────────────────────────
// SVG line icons — stroke="currentColor", no fill. Inherit color from parent.

const BarChartIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <rect x="1" y="8" width="2.5" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
    <rect x="5.5" y="5" width="2.5" height="8" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
    <rect x="10" y="2" width="2.5" height="11" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const AlertTriangleIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M7 2.5L1.5 12h11L7 2.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <line x1="7" y1="6" x2="7" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="7" cy="10.5" r="0.6" fill="currentColor" />
  </svg>
);

const TrendingUpIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <polyline
      points="1.5,10.5 5,6.5 7.5,9 12.5,3.5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="9.5,3.5 12.5,3.5 12.5,6.5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const GlobeIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
    <ellipse cx="7" cy="7" rx="2.2" ry="5.5" stroke="currentColor" strokeWidth="1.2" />
    <line x1="1.5" y1="7" x2="12.5" y2="7" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const TargetIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="7" cy="7" r="1" fill="currentColor" />
  </svg>
);

const MessageIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path
      d="M2 2h10a1 1 0 011 1v5.5a1 1 0 01-1 1H5l-3 2.5V3a1 1 0 011-1z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
);

const LockIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <rect x="2" y="6.5" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M4.5 6.5V5a2.5 2.5 0 015 0v1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// ── Shared demo styles ──────────────────────────────────────────────────────

const demoLabelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: '#6d6f79', // bcolor.neutral.600 — page chrome only
  marginBottom: 8,
};

// ── Meta ────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/ChatUI/AntX/Prompts',
  component: UniPrompts,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Suggested-prompt chips for AI chat interfaces. Items render as compact horizontal chips by default. Adding a `description` field expands items to a card layout (icon + label + description stacked). Supports `vertical` layout, `wrap`, nested `children` sub-prompts, a `title` prop, and `disabled` items. Hover state uses `primary.100` (#E7F7FB) background + `primary.400` (#72B8C2) border — a teal whisper consistent with the User bubble and focus states. Icons shift to full teal on hover. No sub-components exposed. Thin wrapper around `@ant-design/x` Prompts with Uni tokens.',
      },
    },
  },
} satisfies Meta<typeof UniPrompts>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── 1. Horizontal chips ─────────────────────────────────────────────────────
// Default layout: horizontal, no wrap. Shows normal and disabled states.
// Disabled items are non-interactive (cursor: not-allowed, muted colours).

export const HorizontalChips: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={demoLabelStyle}>default</div>
        <UniPrompts
          items={[
            { key: '1', label: 'Show pipeline summary' },
            { key: '2', label: 'Top deals at risk' },
            { key: '3', label: 'Q3 vs Q4 forecast' },
            { key: '4', label: 'Win rate by region' },
          ]}
        />
      </div>

      <div>
        <div style={demoLabelStyle}>with disabled item</div>
        <UniPrompts
          items={[
            { key: '1', label: 'Show pipeline summary' },
            { key: '2', label: 'Generating… (disabled)', disabled: true },
            { key: '3', label: 'Q3 vs Q4 forecast' },
          ]}
        />
      </div>
    </div>
  ),
};

// ── 2. With icons ──────────────────────────────────────────────────────────
// icon accepts any ReactNode — passed directly inside the chip.
// Icons inherit color via currentColor: neutral.600 at rest, primary.600 on hover
// (via CSS injection in UniPrompts.tsx).

export const WithIcons: Story = {
  render: () => (
    <UniPrompts
      wrap
      items={[
        { key: '1', icon: <BarChartIcon />, label: 'Show pipeline summary' },
        { key: '2', icon: <AlertTriangleIcon />, label: 'Top deals at risk' },
        { key: '3', icon: <TrendingUpIcon />, label: 'Q3 vs Q4 forecast' },
        { key: '4', icon: <GlobeIcon />, label: 'Win rate by region' },
        { key: '5', icon: <TargetIcon />, label: 'Coaching opportunities' },
        { key: '6', icon: <MessageIcon />, label: 'Recent call themes' },
      ]}
    />
  ),
};

// ── 3. Card layout ─────────────────────────────────────────────────────────
// Adding a `description` field to items renders a taller card format:
// icon (18px) + label + description stacked. No separate "card" prop needed.
// The disabled card uses opacity + not-allowed cursor from AntX defaults.

export const CardLayout: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={demoLabelStyle}>default cards</div>
        <UniPrompts
          items={[
            {
              key: '1',
              icon: <BarChartIcon size={18} />,
              label: 'Pipeline summary',
              description: 'Overview of open deals and stage distribution',
            },
            {
              key: '2',
              icon: <AlertTriangleIcon size={18} />,
              label: 'At-risk deals',
              description: 'Deals likely to slip based on activity signals',
            },
            {
              key: '3',
              icon: <TrendingUpIcon size={18} />,
              label: 'Forecast vs target',
              description: 'Q4 attainment projection by team and region',
            },
          ]}
        />
      </div>

      <div>
        <div style={demoLabelStyle}>with disabled card</div>
        <UniPrompts
          items={[
            {
              key: '1',
              icon: <BarChartIcon size={18} />,
              label: 'Pipeline summary',
              description: 'Overview of open deals and stage distribution',
            },
            {
              key: '2',
              icon: <LockIcon size={18} />,
              label: 'Restricted report',
              description: 'Requires additional permissions',
              disabled: true,
            },
            {
              key: '3',
              icon: <TrendingUpIcon size={18} />,
              label: 'Forecast vs target',
              description: 'Q4 attainment projection by team and region',
            },
          ]}
        />
      </div>
    </div>
  ),
};

// ── 4. Vertical layout ──────────────────────────────────────────────────────
// vertical={true} stacks items in a column.
// Left column: icon + label chips. Right column: label + description cards.

export const VerticalLayout: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div>
        <div style={demoLabelStyle}>vertical chips</div>
        <div style={{ width: 260 }}>
          <UniPrompts
            vertical
            items={[
              { key: '1', icon: <BarChartIcon />, label: 'Show pipeline summary' },
              { key: '2', icon: <AlertTriangleIcon />, label: 'Top deals at risk' },
              { key: '3', icon: <TrendingUpIcon />, label: 'Q3 vs Q4 forecast' },
              { key: '4', icon: <GlobeIcon />, label: 'Win rate by region' },
            ]}
          />
        </div>
      </div>

      <div>
        <div style={demoLabelStyle}>vertical cards</div>
        <div style={{ width: 260 }}>
          <UniPrompts
            vertical
            items={[
              {
                key: '1',
                label: 'Pipeline summary',
                description: 'Overview of open deals and stage distribution',
              },
              {
                key: '2',
                label: 'At-risk deals',
                description: 'Deals likely to slip based on activity signals',
              },
              {
                key: '3',
                label: 'Forecast vs target',
                description: 'Q4 attainment projection by team and region',
              },
            ]}
          />
        </div>
      </div>
    </div>
  ),
};

// ── 5. With title ───────────────────────────────────────────────────────────
// title renders as a 12px/600/dark heading above the chips.
// CSS injection sets font-size, weight and color — AntX defaults to
// colorTextTertiary + fontWeight normal for .ant-prompts-title.

export const WithTitle: Story = {
  render: () => (
    <UniPrompts
      title="Suggested questions"
      wrap
      items={[
        { key: '1', icon: <BarChartIcon />, label: 'Show pipeline summary' },
        { key: '2', icon: <AlertTriangleIcon />, label: 'Top deals at risk' },
        { key: '3', icon: <TrendingUpIcon />, label: 'Q3 vs Q4 forecast' },
        { key: '4', icon: <GlobeIcon />, label: 'Win rate by region' },
        { key: '5', icon: <TargetIcon />, label: 'Coaching opportunities' },
        { key: '6', icon: <MessageIcon />, label: 'Recent call themes' },
      ]}
    />
  ),
};

// ── 6. Nested sub-prompts ───────────────────────────────────────────────────
// The design pattern: click a parent chip → a sub-prompt list appears below.
// Click a different parent → a different sub-list replaces it.
//
// Implementation: two separate UniPrompts instances + useState.
// This is intentional — AntX's `children` prop is NOT the right tool here.
// `children` renders sub-items always-visible *inside* the parent chip box,
// resulting in a large embedded card. The click-driven reveal pattern requires
// managing activeKey externally and conditionally rendering the sub-list.
//
// Active parent chip styling (teal border) is an AntX limitation: Prompts has
// no per-item selectedKey / defaultSelectedKey API. The active chip visually
// shows only on press (:active). Production apps should manage this by rendering
// the parent row at the application level (e.g., custom styled buttons) and
// using UniPrompts only for the revealed sub-list.

export const NestedSubPrompts: Story = {
  render: () => {
    const [activeKey, setActiveKey] = React.useState<string>('pipeline');

    const subItems: Record<string, { key: string; label: string }[]> = {
      pipeline: [
        { key: 'p1', label: 'By stage — show deal distribution' },
        { key: 'p2', label: 'By region — APAC vs EMEA vs NA' },
        { key: 'p3', label: 'Deals at risk of slipping' },
        { key: 'p4', label: 'Recently stalled conversations' },
      ],
      forecast: [
        { key: 'f1', label: 'Q4 attainment vs target' },
        { key: 'f2', label: 'By team — AE vs SDR breakdown' },
        { key: 'f3', label: 'Regional forecast gap analysis' },
      ],
      coaching: [
        { key: 'c1', label: 'Top performers this month' },
        { key: 'c2', label: 'Reps at risk of missing quota' },
        { key: 'c3', label: 'Recent call coaching themes' },
      ],
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 520 }}>
        {/* Parent chip row — click to switch sub-list */}
        <UniPrompts
          items={[
            { key: 'pipeline', icon: <BarChartIcon />, label: 'Pipeline analysis' },
            { key: 'forecast', icon: <TrendingUpIcon />, label: 'Forecast' },
            { key: 'coaching', icon: <TargetIcon />, label: 'Coaching' },
          ]}
          onItemClick={({ data }) => setActiveKey(data.key)}
        />
        {/* Sub-prompt container — styled box matches HTML reference .sub-prompts */}
        <div
          style={{
            background: '#f8f9fc', // bcolor.neutral.50
            border: '1px solid #e9ecf4', // bcolor.neutral.100
            borderRadius: 8,
            padding: 8,
          }}
        >
          <UniPrompts vertical items={subItems[activeKey] ?? []} />
        </div>
      </div>
    );
  },
};

// ── 7. In context — prompts above Sender ────────────────────────────────────
// Shows how Prompts sits above the Sender in a real chat layout.
// The surrounding chat frame and sender bar are demo chrome — not part of
// UniPrompts itself. Use UniSender for production sender usage.

export const InContext: Story = {
  render: () => (
    <div
      style={{
        maxWidth: 680,
        background: '#ffffff',
        border: '1px solid #e9ecf4',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      {/* AI message */}
      <div style={{ padding: 20, borderBottom: '1px solid #e9ecf4' }}>
        <div
          style={{
            fontSize: 14,
            color: '#0e0c11',
            background: '#ffffff',
            border: '1px solid #e9ecf4',
            borderRadius: '2px 8px 8px 8px',
            padding: '10px 14px',
            maxWidth: 480,
          }}
        >
          Hello! I&apos;m your Uni AI assistant. What would you like to explore today?
        </div>
      </div>

      {/* Prompts area */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #e9ecf4' }}>
        <div style={{ fontSize: 11, color: '#969498', fontWeight: 500, marginBottom: 8 }}>Suggested</div>
        <UniPrompts
          items={[
            { key: '1', icon: <BarChartIcon />, label: 'Pipeline summary' },
            { key: '2', icon: <AlertTriangleIcon />, label: 'At-risk deals' },
            { key: '3', icon: <TrendingUpIcon />, label: 'Forecast vs target' },
            { key: '4', icon: <GlobeIcon />, label: 'Win rate by region' },
          ]}
        />
      </div>

      {/* Sender mockup — use UniSender for production */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 12px',
        }}
      >
        <span style={{ flex: 1, fontSize: 14, color: '#6d6f79' }}>Ask anything…</span>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 32,
            height: 32,
            borderRadius: 8,
            background: '#f1f2f4',
            color: '#bfbfd0',
            flexShrink: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M2 8h10M8 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  ),
};
