import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import UniWelcome from '../primitives/UniWelcome';
import UniPrompts from '../primitives/UniPrompts';

// ── Icon helpers ────────────────────────────────────────────────────────────
// AntX Welcome renders the `icon` prop as-is — no background or styling added.
// Pass a pre-styled container to match the design reference: 48×48, teal tint.

const SparkleIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2L14 9L21 12L14 15L12 22L10 15L3 12L10 9Z" />
  </svg>
);

const ChatIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16a2 2 0 012 2v10a2 2 0 01-2 2H8L4 22V6a2 2 0 012-2z" />
  </svg>
);

const TargetIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const BrandUIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#15808C"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 5L6 14Q6 19 12 19Q18 19 18 14L18 5" />
  </svg>
);

// Small icons for prompt chips
const TrendingIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="2 10 5 6.5 7.5 8.5 10 5 12 7" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="13"
    height="13"
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

const GlobeIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="7" cy="7" r="5" />
    <line x1="2" y1="7" x2="12" y2="7" />
    <path d="M7 2Q9.5 5 9.5 7Q9.5 9 7 12" />
    <path d="M7 2Q4.5 5 4.5 7Q4.5 9 7 12" />
  </svg>
);

const ChartIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="2" y1="11" x2="4.5" y2="7" />
    <line x1="4.5" y1="7" x2="7" y2="9" />
    <line x1="7" y1="9" x2="10" y2="5" />
    <line x1="10" y1="5" x2="12" y2="8" />
  </svg>
);

// Pre-styled icon container matching the design reference (48×48, teal tint)
const WelcomeIcon = ({ size = 48, children }: { size?: number; children: React.ReactNode }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size >= 64 ? 16 : 12,
      background: '#E7F7FB', // bcolor.primary.100
      border: '1px solid #CFF0F7', // bcolor.primary.200
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#15808C', // bcolor.primary.600
      flexShrink: 0,
    }}
  >
    {children}
  </div>
);

// ── Meta ────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/ChatUI/AntX/Welcome',
  component: UniWelcome,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Empty-state welcome screen for AI chat interfaces. Renders icon, title, description, and an optional `extra` slot (rendered in a row with the title). Two variants: `borderless` (default in these stories — no background, transparent) and `filled` (light background + border radius). **No `prompts` prop exists** — compose `<UniPrompts>` as a sibling in a flex-column container when prompt chips are needed (see WithPrompts). The `icon` prop is a bare ReactNode — pass a pre-styled 48×48 container for the teal icon treatment shown in the design reference. Thin wrapper around `@ant-design/x` Welcome with Uni tokens.',
      },
    },
  },
} satisfies Meta<typeof UniWelcome>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── 1. Basic ────────────────────────────────────────────────────────────────
// Icon + title + description. variant="borderless" — the Welcome component
// itself has no background; wrap in a container for visual context in Storybook.

export const Basic: Story = {
  render: () => (
    <div
      style={{
        maxWidth: 560,
        background: '#ffffff',
        border: '1px solid #e9ecf4',
        borderRadius: 8,
        padding: 32,
      }}
    >
      <UniWelcome
        variant="borderless"
        icon={
          <WelcomeIcon>
            <SparkleIcon />
          </WelcomeIcon>
        }
        title="Hello, how can I help?"
        description="I'm your Uni AI assistant. Ask me anything about your data, customers, or workflows — or pick a suggestion below to get started."
      />
    </div>
  ),
};

// ── 2. With prompts ─────────────────────────────────────────────────────────
// AntX Welcome has no `prompts` prop. Compose UniWelcome + UniPrompts
// as siblings in a flex-column container. The gap between description and chips
// is controlled by the outer container, not the Welcome component.

export const WithPrompts: Story = {
  render: () => (
    <div
      style={{
        maxWidth: 600,
        background: '#ffffff',
        border: '1px solid #e9ecf4',
        borderRadius: 8,
        padding: 32,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <UniWelcome
        variant="borderless"
        icon={
          <WelcomeIcon>
            <SparkleIcon />
          </WelcomeIcon>
        }
        title="Good morning, Alex"
        description="Here are some things you can ask me today."
      />
      <UniPrompts
        wrap
        items={[
          { key: '1', icon: <ChartIcon />, label: "Summarise yesterday's calls" },
          { key: '2', icon: <SearchIcon />, label: 'Find open support tickets' },
          { key: '3', icon: <TrendingIcon />, label: 'Q4 APAC revenue report' },
          { key: '4', icon: <GlobeIcon />, label: 'Global agent performance' },
        ]}
      />
    </div>
  ),
};

// ── 3. With extra slot ──────────────────────────────────────────────────────
// AntX renders `extra` in a flex row alongside the title
// (.ant-welcome-title-wrapper: [title] [extra]).
//
// Two patterns shown:
//
// A) `extra` prop — works well when the title is short (buttons sit neatly
//    beside a compact title). AntX's native layout.
//
// B) Buttons-below pattern — pass description as a ReactNode containing both
//    the description text and the action buttons. Uses <span display:block>
//    to avoid div-inside-span HTML issues. Recommended when the title is long
//    or the description needs visual breathing room before the CTAs.

const actionButtons = (
  <span style={{ display: 'inline-flex', gap: 8, marginTop: 16 }}>
    <button
      type="button"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 12px',
        border: '1px solid #e9ecf4',
        borderRadius: 8,
        fontSize: 13,
        color: '#6d6f79',
        background: '#ffffff',
        cursor: 'pointer',
        fontFamily: 'inherit',
      }}
    >
      Learn more
    </button>
    <button
      type="button"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '6px 14px',
        border: 'none',
        borderRadius: 8,
        fontSize: 13,
        color: '#ffffff',
        background: '#15808C',
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontWeight: 500,
      }}
    >
      Get started
    </button>
  </span>
);

const demoLabelSm: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  color: '#6d6f79',
  marginBottom: 16,
};

export const WithExtra: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 640 }}>
      {/* Pattern A: extra prop — buttons inline with title */}
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #e9ecf4',
          borderRadius: 8,
          padding: 32,
        }}
      >
        <div style={demoLabelSm}>A — extra prop (buttons inline with title)</div>
        <UniWelcome
          variant="borderless"
          icon={
            <WelcomeIcon>
              <SparkleIcon />
            </WelcomeIcon>
          }
          title="Uni AI"
          description="Supercharge your workflows with AI-powered insights and intelligent search."
          extra={
            <span style={{ display: 'inline-flex', gap: 8, flexShrink: 0 }}>
              <button
                type="button"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 12px',
                  border: '1px solid #e9ecf4',
                  borderRadius: 8,
                  fontSize: 13,
                  color: '#6d6f79',
                  background: '#ffffff',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Learn more
              </button>
              <button
                type="button"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '6px 14px',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 13,
                  color: '#ffffff',
                  background: '#15808C',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontWeight: 500,
                }}
              >
                Get started
              </button>
            </span>
          }
        />
      </div>

      {/* Pattern B: buttons below description via description ReactNode */}
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #e9ecf4',
          borderRadius: 8,
          padding: 32,
        }}
      >
        <div style={demoLabelSm}>B — buttons below description (recommended for longer content)</div>
        <UniWelcome
          variant="borderless"
          icon={
            <WelcomeIcon>
              <SparkleIcon />
            </WelcomeIcon>
          }
          title="Uni AI Assistant"
          description={
            <>
              <span style={{ display: 'block' }}>
                Supercharge your workflows with AI-powered insights, automated summaries, and intelligent search across
                all your data.
              </span>
              {actionButtons}
            </>
          }
        />
      </div>
    </div>
  ),
};

// ── 4. No icon ──────────────────────────────────────────────────────────────
// Omit the `icon` prop entirely. Title and description fill the full width.
// Left: title + description + prompt chips (composition with UniPrompts).
// Right: title only — minimal greeting.

export const NoIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div
        style={{
          flex: '1 1 260px',
          background: '#ffffff',
          border: '1px solid #e9ecf4',
          borderRadius: 8,
          padding: 28,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <UniWelcome
          variant="borderless"
          title="What would you like to know?"
          description="Ask a question or describe a task and I'll get to work."
        />
        <UniPrompts
          items={[
            { key: '1', label: 'Analyse sentiment trends' },
            { key: '2', label: 'Draft a call summary' },
            { key: '3', label: 'Pull NPS scores' },
          ]}
        />
      </div>

      <div
        style={{
          flex: '1 1 200px',
          background: '#ffffff',
          border: '1px solid #e9ecf4',
          borderRadius: 8,
          padding: 28,
        }}
      >
        <UniWelcome variant="borderless" title="How can I help today?" />
      </div>
    </div>
  ),
};

// ── 5. Variants — filled vs borderless ──────────────────────────────────────
// filled: light background + borderRadius from token (overridden to 8px via
// CSS injection — AntX defaults to borderRadiusLG = 16px).
// borderless: transparent, no background. Most welcome screens use borderless
// and rely on the page background for context.

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{ flex: '1 1 260px' }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#6d6f79',
            marginBottom: 12,
          }}
        >
          filled (default variant)
        </div>
        <UniWelcome
          variant="filled"
          icon={
            <WelcomeIcon>
              <SparkleIcon />
            </WelcomeIcon>
          }
          title="Hello, how can I help?"
          description="Ask me anything about your data, customers, or workflows."
        />
      </div>

      <div style={{ flex: '1 1 260px' }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#6d6f79',
            marginBottom: 12,
          }}
        >
          borderless
        </div>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e9ecf4',
            borderRadius: 8,
            padding: 24,
          }}
        >
          <UniWelcome
            variant="borderless"
            icon={
              <WelcomeIcon>
                <SparkleIcon />
              </WelcomeIcon>
            }
            title="Hello, how can I help?"
            description="Ask me anything about your data, customers, or workflows."
          />
        </div>
      </div>
    </div>
  ),
};

// ── 6. Custom icon variants ──────────────────────────────────────────────────
// The icon prop is a bare ReactNode — pass any pre-styled container.
// Three common patterns: brand mark, chat bubble, target/goal.

export const CustomIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {[
        {
          label: 'brand / logo icon',
          icon: (
            <WelcomeIcon>
              <BrandUIcon />
            </WelcomeIcon>
          ),
          title: 'Welcome back',
          desc: 'Ready when you are.',
        },
        {
          label: 'chat icon',
          icon: (
            <WelcomeIcon>
              <ChatIcon />
            </WelcomeIcon>
          ),
          title: 'Start a conversation',
          desc: 'Ask me anything about your customers and conversations.',
        },
        {
          label: 'goal / target icon',
          icon: (
            <WelcomeIcon>
              <TargetIcon />
            </WelcomeIcon>
          ),
          title: 'Set your goals',
          desc: "Tell me what you want to achieve and I'll help you get there.",
        },
      ].map(({ label, icon, title, desc }) => (
        <div
          key={label}
          style={{
            flex: '1 1 200px',
            background: '#ffffff',
            border: '1px solid #e9ecf4',
            borderRadius: 8,
            padding: 24,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#6d6f79',
              marginBottom: 16,
            }}
          >
            {label}
          </div>
          <UniWelcome variant="borderless" icon={icon} title={title} description={desc} />
        </div>
      ))}
    </div>
  ),
};

// ── 7. In context — centered chat onboarding ────────────────────────────────
// Welcome as the empty-state for a chat interface: centered in the main area,
// larger icon (64px), centred text and chips. The surrounding shell (sidebar +
// sender bar) is demo chrome, not part of UniWelcome.

export const InContext: Story = {
  render: () => (
    <div
      style={{
        maxWidth: 720,
        background: '#faf9fb',
        border: '1px solid #e9ecf4',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', height: 460 }}>
        {/* Sidebar chrome */}
        <div
          style={{
            width: 200,
            borderRight: '1px solid #e9ecf4',
            background: '#ffffff',
            padding: 16,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#969498',
              marginBottom: 12,
            }}
          >
            Conversations
          </div>
          <div style={{ fontSize: 13, color: '#bfbfd0', padding: '6px 8px', borderRadius: 6 }}>
            No conversations yet
          </div>
        </div>

        {/* Main area — centered Welcome + Prompts */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 32,
            gap: 24,
          }}
        >
          <UniWelcome
            variant="borderless"
            icon={
              <WelcomeIcon size={64}>
                <SparkleIcon />
              </WelcomeIcon>
            }
            title="Hello, how can I help?"
            description="Ask me anything about your CX data, or pick a suggestion to get started."
            styles={{
              root: { alignItems: 'center', textAlign: 'center' },
            }}
          />
          <UniPrompts
            wrap
            styles={{ list: { justifyContent: 'center' } }}
            items={[
              { key: '1', icon: <ChartIcon />, label: "Yesterday's call summary" },
              { key: '2', icon: <SearchIcon />, label: 'Search knowledge base' },
              { key: '3', icon: <TrendingIcon />, label: 'Q4 revenue report' },
              { key: '4', icon: <GlobeIcon />, label: 'Agent performance' },
            ]}
          />
        </div>
      </div>

      {/* Sender bar chrome */}
      <div
        style={{
          borderTop: '1px solid #e9ecf4',
          background: '#ffffff',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 36,
            border: '1px solid #e9ecf4',
            borderRadius: 8,
            background: '#faf9fb',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
          }}
        >
          <span style={{ fontSize: 13, color: '#bfbfd0' }}>Message Uni AI…</span>
        </div>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 6,
            background: '#15808C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            flexShrink: 0,
          }}
        >
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
            <line x1="2" y1="7" x2="12" y2="7" />
            <polyline points="8 3 12 7 8 11" />
          </svg>
        </div>
      </div>
    </div>
  ),
};
