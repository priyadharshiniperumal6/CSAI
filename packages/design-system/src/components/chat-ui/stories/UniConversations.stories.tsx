import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import UniConversations from '../primitives/UniConversations';

// ── Shared icon components ─────────────────────────────────────────────────
// SVG line icons — stroke="currentColor", no fill.

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M7 1v2M7 11v2M1 7h2M11 7h2M3.22 3.22l1.42 1.42M9.36 9.36l1.42 1.42M3.22 10.78l1.42-1.42M9.36 4.64l1.42-1.42"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

const BarChartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1.5" y="9" width="3" height="5.5" rx="0.5" stroke="currentColor" strokeWidth="1.3" />
    <rect x="6.5" y="5.5" width="3" height="9" rx="0.5" stroke="currentColor" strokeWidth="1.3" />
    <rect x="11.5" y="2" width="3" height="12.5" rx="0.5" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M10.5 10.5l4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const TargetIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="8" cy="8" r="1.2" fill="currentColor" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <polyline
      points="1.5,12 5.5,7.5 8.5,10 14,4.5"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="10.5,4.5 14,4.5 14,8"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const NewChatIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 3H4a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1V9"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.5 1.5l2 2-5 5H6.5v-2l5-5z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ── Label helpers ──────────────────────────────────────────────────────────
//
// AntX Conversations wraps `label` in Typography.Text with overflow/ellipsis.
// CSS injection in the component adds `display: flex` to .ant-conversations-label,
// enabling a right-side timestamp span. The title span carries its own overflow.

const titleStyle: React.CSSProperties = {
  flex: '1 1 0',
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const tsStyle: React.CSSProperties = {
  flexShrink: 0,
  fontSize: 11,
  color: '#969498', // colorTextSecondary
};

/** Inline label + right-aligned timestamp */
function lbl(title: string, time: string): React.ReactNode {
  return (
    <>
      <span style={titleStyle}>{title}</span>
      <span style={tsStyle}>{time}</span>
    </>
  );
}

/** Two-line label: title on top, sublabel below (for WithIcons sublabel variant) */
function lblSub(title: string, sublabel: string): React.ReactNode {
  return (
    <span style={{ whiteSpace: 'normal' }}>
      <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {title}
      </span>
      <span style={{ display: 'block', fontSize: 11, color: '#969498', marginTop: 1 }}>{sublabel}</span>
    </span>
  );
}

// ── Shared demo styles ─────────────────────────────────────────────────────

const demoLabelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: '#6d6f79', // bcolor.neutral.600 — page chrome only
  marginBottom: 8,
};

// 240px white card — standard sidebar container for all stories
const listContainerStyle: React.CSSProperties = {
  width: 240,
  background: '#ffffff',
  border: '1px solid #e9ecf4', // bcolor.neutral.100
  borderRadius: 8,
  overflow: 'hidden',
};

// Icon containers — 28×28px rounded square
const iconBaseStyle: React.CSSProperties = {
  width: 28,
  height: 28,
  borderRadius: 6,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const iconStyle: React.CSSProperties = {
  ...iconBaseStyle,
  background: '#f1f2f4', // bcolor.neutral.75
  color: '#6d6f79', // bcolor.neutral.600
};

const iconTealStyle: React.CSSProperties = {
  ...iconBaseStyle,
  background: '#E7F7FB', // bcolor.primary.100
  color: '#15808C', // bcolor.primary.600
};

// ── Meta ───────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/ChatUI/AntX/Conversations',
  component: UniConversations,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Sidebar conversation list for AI chat applications. The active item uses a `primary.100` (#E7F7FB) background tint with a 2px teal left indicator — consistent with the User bubble and focus states across the system. Supports flat lists, grouped lists (via `groupable` + `group` field on items), per-item icons, context menus (`menu` prop), disabled items, and a built-in creation button (`Conversations.Creation`). Timestamps are embedded in the `label` ReactNode as a flex row — AntX does not have a native timestamp slot. Thin wrapper around `@ant-design/x` Conversations with Uni tokens.',
      },
    },
  },
} satisfies Meta<typeof UniConversations>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── 1. Basic list ─────────────────────────────────────────────────────────
// Flat list with timestamps and a pre-selected active key.
// Timestamps are passed via the label ReactNode (AntX has no timestamp slot).

export const BasicList: Story = {
  render: () => (
    <div style={listContainerStyle}>
      <UniConversations
        defaultActiveKey="1"
        items={[
          { key: '1', label: lbl('APAC pipeline review', '9:41 AM') },
          { key: '2', label: lbl('Q3 sales summary', 'Yesterday') },
          { key: '3', label: lbl('Deal risk analysis', 'Mon') },
        ]}
      />
    </div>
  ),
};

// ── 2. Grouped list ───────────────────────────────────────────────────────
// groupable={true} reads each item's `group` field and renders section headers.

export const GroupedList: Story = {
  render: () => (
    <div style={listContainerStyle}>
      <UniConversations
        defaultActiveKey="1"
        groupable
        items={[
          { key: '1', label: lbl('APAC pipeline review', '9:41 AM'), group: 'Today' },
          { key: '2', label: lbl('Forecast Q4 targets', '8:15 AM'), group: 'Today' },
          { key: '3', label: lbl('Q3 sales summary', '3:22 PM'), group: 'Yesterday' },
          { key: '4', label: lbl('Deal risk analysis', '11:05 AM'), group: 'Yesterday' },
          { key: '5', label: lbl('Churn prediction model', 'Mon'), group: 'Last 7 days' },
          { key: '6', label: lbl('Onboarding funnel drop-off', 'Fri'), group: 'Last 7 days' },
        ]}
      />
    </div>
  ),
};

// ── 3. With icons ─────────────────────────────────────────────────────────
// icon accepts any ReactNode. AntX adds no container around it — pass a
// pre-styled 28×28 div to get the rounded-square icon from the design reference.
// Two column variants: inline timestamp (right) and stacked sublabel (below).

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div>
        <div style={demoLabelStyle}>agent icons</div>
        <div style={listContainerStyle}>
          <UniConversations
            defaultActiveKey="1"
            items={[
              {
                key: '1',
                label: lbl('APAC pipeline review', '9:41 AM'),
                icon: (
                  <div style={iconTealStyle}>
                    <SparkleIcon />
                  </div>
                ),
              },
              {
                key: '2',
                label: lbl('Q3 sales summary', 'Yesterday'),
                icon: (
                  <div style={iconStyle}>
                    <BarChartIcon />
                  </div>
                ),
              },
              {
                key: '3',
                label: lbl('Deal risk analysis', 'Mon'),
                icon: (
                  <div style={iconStyle}>
                    <SearchIcon />
                  </div>
                ),
              },
              {
                key: '4',
                label: lbl('My coaching session', 'Fri'),
                icon: <div style={{ ...iconTealStyle, fontFamily: 'inherit', fontSize: 11, fontWeight: 600 }}>JD</div>,
              },
            ]}
          />
        </div>
      </div>

      <div>
        <div style={demoLabelStyle}>with sublabel</div>
        <div style={listContainerStyle}>
          <UniConversations
            defaultActiveKey="1"
            items={[
              {
                key: '1',
                icon: (
                  <div style={iconTealStyle}>
                    <SparkleIcon />
                  </div>
                ),
                label: lblSub('APAC pipeline review', 'Today · 9:41 AM'),
              },
              {
                key: '2',
                icon: (
                  <div style={iconStyle}>
                    <BarChartIcon />
                  </div>
                ),
                label: lblSub('Q3 sales summary', 'Yesterday · 3:22 PM'),
              },
              {
                key: '3',
                icon: (
                  <div style={iconStyle}>
                    <SearchIcon />
                  </div>
                ),
                label: lblSub('Deal risk analysis', 'Monday · 11:05 AM'),
              },
            ]}
          />
        </div>
      </div>
    </div>
  ),
};

// ── 4. Context menu ───────────────────────────────────────────────────────
// menu prop applies a dropdown to every item.
// Hover to reveal the ··· trigger; click to open.

export const WithContextMenu: Story = {
  render: () => (
    <div style={listContainerStyle}>
      <UniConversations
        defaultActiveKey="1"
        items={[
          { key: '1', label: lbl('APAC pipeline review', '9:41 AM') },
          { key: '2', label: lbl('Q3 sales summary', 'Yesterday') },
          { key: '3', label: lbl('Deal risk analysis', 'Mon') },
        ]}
        menu={{
          items: [
            { key: 'rename', label: 'Rename' },
            { key: 'share', label: 'Share' },
            { type: 'divider' },
            { key: 'delete', label: 'Delete', danger: true },
          ],
        }}
      />
    </div>
  ),
};

// ── 5. Disabled items ─────────────────────────────────────────────────────
// Items with disabled: true are non-interactive (opacity + cursor: not-allowed).

export const WithDisabledItems: Story = {
  render: () => (
    <div style={listContainerStyle}>
      <UniConversations
        defaultActiveKey="1"
        items={[
          { key: '1', label: lbl('APAC pipeline review', '9:41 AM') },
          {
            key: '2',
            disabled: true,
            label: lblSub('Processing… (disabled)', 'Generating report'),
          },
          { key: '3', label: lbl('Deal risk analysis', 'Mon') },
        ]}
      />
    </div>
  ),
};

// ── 6. Full sidebar composition ───────────────────────────────────────────
// Conversations list inside a realistic sidebar frame.
// The header bar (title + new chat button) is scaffold chrome — not part of
// the Conversations component itself.

export const FullSidebar: Story = {
  render: () => (
    <div
      style={{
        width: 240,
        background: '#ffffff',
        border: '1px solid #e9ecf4',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      {/* Sidebar header — page chrome */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 12px 8px',
          borderBottom: '1px solid #e9ecf4',
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 600, color: '#0e0c11' }}>Conversations</span>
        <button
          type="button"
          title="New conversation"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 28,
            height: 28,
            border: 'none',
            background: 'transparent',
            borderRadius: 6,
            cursor: 'pointer',
            color: '#6d6f79',
            padding: 0,
          }}
        >
          <NewChatIcon />
        </button>
      </div>

      {/* Conversations list */}
      <UniConversations
        defaultActiveKey="1"
        groupable
        items={[
          {
            key: '1',
            group: 'Today',
            label: lbl('APAC pipeline review', '9:41 AM'),
            icon: (
              <div style={iconTealStyle}>
                <SparkleIcon />
              </div>
            ),
          },
          {
            key: '2',
            group: 'Today',
            label: lbl('Forecast Q4 targets', '8:15 AM'),
            icon: (
              <div style={iconStyle}>
                <BarChartIcon />
              </div>
            ),
          },
          {
            key: '3',
            group: 'Yesterday',
            label: lbl('Q3 sales summary', '3:22 PM'),
            icon: (
              <div style={iconStyle}>
                <SearchIcon />
              </div>
            ),
          },
          {
            key: '4',
            group: 'Yesterday',
            label: lbl('Deal risk analysis', '11:05 AM'),
            icon: (
              <div style={iconStyle}>
                <TargetIcon />
              </div>
            ),
          },
          {
            key: '5',
            group: 'Last 7 days',
            label: lbl('Churn prediction model', 'Mon'),
            icon: (
              <div style={iconStyle}>
                <TrendingUpIcon />
              </div>
            ),
          },
        ]}
      />
    </div>
  ),
};
