import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import UniBubble from '../primitives/UniBubble';

// ── Shared avatar nodes ────────────────────────────────────────
// Colors: bcolor.primary.100 bg / bcolor.primary.200 border / bcolor.primary.500 text for AI
//         bcolor.primary.500 bg / bcolor.neutral.0 text for User

const aiAvatar = (
  <div
    style={{
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: '#E7F7FB', // bcolor.primary.100
      border: '1px solid #CFF0F7', // bcolor.primary.200
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      fontWeight: 600,
      color: '#449CA7', // bcolor.primary.500
      flexShrink: 0,
    }}
  >
    AI
  </div>
);

const userAvatar = (
  <div
    style={{
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: '#449CA7', // bcolor.primary.500
      color: '#ffffff', // bcolor.neutral.0
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      fontWeight: 600,
      flexShrink: 0,
    }}
  >
    JD
  </div>
);

// ── Meta ──────────────────────────────────────────────────────

const meta = {
  title: 'Components/ChatUI/AntX/Bubble',
  component: UniBubble,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Chat message bubbles for AI conversations. `uVariant="ai"` → white/neutral bubble at start; `uVariant="user"` → subtle teal bubble at end. Thin wrapper around `@ant-design/x` Bubble with Uni tokens. Use `UniBubble.List` for multi-message conversations with role-based styling. Supports all native AntX props: `loading`, `typing`, `avatar`, `header`, `footer`, `variant`, `shape`.',
      },
    },
  },
} satisfies Meta<typeof UniBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── 1. Basic conversation ──────────────────────────────────────
// AI and user turns with avatar, header, and footer slots

export const BasicConversation: Story = {
  render: () => (
    <div style={{ maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <UniBubble
        uVariant="ai"
        content="Hello! I'm your Uni AI assistant. How can I help you today?"
        avatar={aiAvatar}
        header={<span style={{ fontSize: 12, color: '#969498' }}>Uni AI</span>}
      />
      <UniBubble uVariant="user" content="Show me the sales performance for last quarter." avatar={userAvatar} />
      <UniBubble
        uVariant="ai"
        content="Q3 revenue was $4.2M, up 18% from Q2. Top performers were the Enterprise and APAC segments. Want me to break it down further?"
        avatar={aiAvatar}
        footer={<span style={{ fontSize: 11, color: '#969498' }}>Just now · ✓ Read</span>}
      />
      <UniBubble uVariant="user" content="Yes, show me APAC specifically." avatar={userAvatar} />
    </div>
  ),
};

// ── 2. Loading & typing states ─────────────────────────────────
// loading={true} → animated dots while AI is thinking
// typing prop → character-by-character typewriter effect (streaming)

export const LoadingAndTyping: Story = {
  render: () => (
    <div style={{ maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <UniBubble
        uVariant="ai"
        content=""
        loading
        avatar={aiAvatar}
        header={<span style={{ fontSize: 12, color: '#969498' }}>Uni AI · loading</span>}
      />
      <UniBubble
        uVariant="ai"
        content="APAC revenue for Q3 was $1.1M, representing 26% of total revenue and a 31% year-over-year increase."
        typing={{ effect: 'typing', step: 3, interval: 60 }}
        avatar={aiAvatar}
        header={<span style={{ fontSize: 12, color: '#969498' }}>Uni AI · typing (streaming)</span>}
      />
    </div>
  ),
};

// ── 3. Variants ────────────────────────────────────────────────
// AntX native variant prop: filled (default) | outlined | shadow | borderless
// "filled" uses uVariant colors (the Uni default). The other three show
// AntX structural variants with ConfigProvider tokens applied.
// Note: shadow uses box-shadow from AntX CSS-in-JS — no shadow tokens in the Uni
// token file, so shadow values are owned by AntX defaults.

const variantCardStyle: React.CSSProperties = {
  background: '#ffffff', // bcolor.neutral.0
  border: '1px solid #e9ecf4', // bcolor.neutral.100
  borderRadius: 8,
  padding: 16,
};

const variantLabelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: '#6d6f79', // bcolor.neutral.600 — page chrome only
  marginBottom: 12,
};

export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 16,
        maxWidth: 680,
      }}
    >
      <div style={variantCardStyle}>
        <div style={variantLabelStyle}>filled (default)</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <UniBubble uVariant="ai" content="AI message — filled" />
          <UniBubble uVariant="user" content="User message — filled" />
        </div>
      </div>

      <div style={variantCardStyle}>
        <div style={variantLabelStyle}>outlined</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <UniBubble variant="outlined" placement="start" content="AI message — outlined" />
          <UniBubble variant="outlined" placement="end" content="User message — outlined" />
        </div>
      </div>

      <div style={variantCardStyle}>
        <div style={variantLabelStyle}>shadow</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <UniBubble variant="shadow" placement="start" content="AI message — shadow" />
          <UniBubble variant="shadow" placement="end" content="User message — shadow" />
        </div>
      </div>

      <div style={variantCardStyle}>
        <div style={variantLabelStyle}>borderless</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <UniBubble variant="borderless" placement="start" content="AI message — borderless" />
          <UniBubble variant="borderless" placement="end" content="User message — borderless" />
        </div>
      </div>
    </div>
  ),
};

// ── 4. Bubble.List with roles ──────────────────────────────────
// UniBubble.List manages a message array with role-based styling.
// Pre-configured roles: 'ai' (white, start) and 'user' (teal, end).
// 'system' renders a centred system message; 'divider' adds a horizontal rule.

const listItems = [
  { key: 1, role: 'system', content: 'Session started' },
  { key: 2, role: 'ai', content: 'Welcome back! Your last session was 2 days ago.' },
  { key: 3, role: 'user', content: 'Pull up my pipeline summary.' },
  { key: 4, role: 'divider', content: 'New topic' },
  {
    key: 5,
    role: 'ai',
    content: 'You have 14 open deals totalling $2.8M. Three are at risk of slipping this quarter.',
  },
  { key: 6, role: 'ai', content: '', loading: true },
];

export const BubbleList: Story = {
  render: () => (
    <div
      style={{
        maxWidth: 680,
        background: '#ffffff', // bcolor.neutral.0
        border: '1px solid #e9ecf4', // bcolor.neutral.100
        borderRadius: 8,
        padding: 20,
      }}
    >
      <UniBubble.List items={listItems as any} />
    </div>
  ),
};

// ── 5. In-context ──────────────────────────────────────────────
// Bubble in a realistic multi-turn chat layout on the canvas background

export const InContext: Story = {
  render: () => (
    <div
      style={{
        maxWidth: 640,
        background: '#faf9fb', // ucolor.fill.canvas-bg
        border: '1px solid #e9ecf4', // bcolor.neutral.100
        borderRadius: 8,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <UniBubble
        uVariant="ai"
        content="Good morning! I've reviewed the Q4 pipeline. Here's the summary."
        avatar={aiAvatar}
        header={<span style={{ fontSize: 12, color: '#969498' }}>Uni AI · 9:01 AM</span>}
      />
      <UniBubble uVariant="user" content="Focus on deals at risk of slipping." avatar={userAvatar} />
      <UniBubble
        uVariant="ai"
        content="3 deals are at risk: Acme Corp ($420K, stalled 3 weeks), TechFlow ($180K, no response since Dec 12), and Vertex AI ($95K, decision delayed to Q1). Want me to draft follow-up emails?"
        avatar={aiAvatar}
        footer={<span style={{ fontSize: 11, color: '#969498' }}>9:03 AM · 3 items found</span>}
      />
      <UniBubble uVariant="user" content="Yes, draft the Acme Corp one first." avatar={userAvatar} />
      <UniBubble
        uVariant="ai"
        content=""
        loading
        avatar={aiAvatar}
        header={<span style={{ fontSize: 12, color: '#969498' }}>Uni AI · drafting…</span>}
      />
    </div>
  ),
};
