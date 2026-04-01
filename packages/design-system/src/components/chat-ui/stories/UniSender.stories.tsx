import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import UniSender from '../primitives/UniSender';

// ── Shared icon components ─────────────────────────────────────────────────
// SVG line icons — stroke="currentColor", no fill.
// Used in prefix slot demos only.

const PaperclipIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
  >
    <path d="M13.5 7.5l-5.5 5.5a4 4 0 01-5.657-5.657l5.5-5.5a2.5 2.5 0 013.536 3.536l-5.5 5.5a1 1 0 01-1.414-1.414l5.5-5.5" />
  </svg>
);

const MicIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
  >
    <rect x="5.5" y="1.5" width="5" height="7" rx="2.5" />
    <path d="M3 7.5a5 5 0 0010 0" />
    <line x1="8" y1="12.5" x2="8" y2="14.5" />
  </svg>
);

const DocIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinejoin="round"
  >
    <path d="M2 1h5.5L10 3.5V11H2V1z" />
    <path d="M7 1v3h3" strokeLinejoin="miter" />
  </svg>
);

// ── Shared demo styles ─────────────────────────────────────────────────────

const demoLabelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: '#6d6f79', // bcolor.neutral.600 — page chrome only
  marginBottom: 8,
};

const prefixBtnStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 28,
  height: 28,
  border: 'none',
  background: 'transparent',
  borderRadius: 6,
  cursor: 'pointer',
  color: '#6d6f79', // bcolor.neutral.600
  padding: 0,
};

const kbdStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '1px 5px',
  border: '1px solid #d7dae3', // bcolor.neutral.200
  borderRadius: 3,
  background: '#f8f9fc', // bcolor.neutral.50
  fontSize: 10,
  color: '#6d6f79', // bcolor.neutral.600
  fontFamily: 'inherit',
};

// ── Meta ───────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/ChatUI/AntX/Sender',
  component: UniSender,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Chat input box for AI conversations. The send button uses full-strength teal (`colorPrimary`) only when content is present — the one surface where a teal CTA is correct. Empty → muted gray; loading → teal stop button. Supports `prefix`, `header`, `footer`, `suffix` slots, `Sender.Header` for collapsible context panels, `Sender.Switch` for input mode switching, `allowSpeech` for built-in voice input, and `slotConfig` for structured slot inputs. Thin wrapper around `@ant-design/x` Sender with Uni tokens.',
      },
    },
  },
} satisfies Meta<typeof UniSender>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── 1. Default states ──────────────────────────────────────────────────────
// idle (empty) → active (has content) → loading (AI responding, cancel shown)

export const DefaultStates: Story = {
  render: () => (
    <div style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <div style={demoLabelStyle}>idle — empty</div>
        <UniSender placeholder="Ask anything…" />
      </div>

      <div>
        <div style={demoLabelStyle}>active — with content</div>
        <UniSender defaultValue="What were our top 5 deals closed last quarter?" />
      </div>

      <div>
        <div style={demoLabelStyle}>loading — AI responding (cancel shown)</div>
        <UniSender loading placeholder="Ask anything…" />
      </div>
    </div>
  ),
};

// ── 2. Disabled ────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: () => (
    <div style={{ maxWidth: 680 }}>
      <UniSender disabled placeholder="Input disabled" />
    </div>
  ),
};

// ── 3. With prefix slot ────────────────────────────────────────────────────
// prefix prop accepts any ReactNode — shown to the left of the textarea.
// Typical use: attachment button, or attachment + speech buttons.

export const WithPrefix: Story = {
  render: () => (
    <div style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <div style={demoLabelStyle}>prefix — attachment button</div>
        <UniSender
          defaultValue="Show me the pipeline by region."
          prefix={
            <button type="button" style={prefixBtnStyle} title="Attach file">
              <PaperclipIcon />
            </button>
          }
        />
      </div>

      <div>
        <div style={demoLabelStyle}>prefix — attachment + speech buttons</div>
        <UniSender
          placeholder="Ask anything or speak…"
          prefix={
            <div style={{ display: 'flex', gap: 2 }}>
              <button type="button" style={prefixBtnStyle} title="Attach file">
                <PaperclipIcon />
              </button>
              <button type="button" style={prefixBtnStyle} title="Speech input">
                <MicIcon />
              </button>
            </div>
          }
        />
      </div>
    </div>
  ),
};

// ── 4. With Sender.Header ──────────────────────────────────────────────────
// Sender.Header renders a bar above the input.
// Everything goes into `title` so label + chip appear on the same line.
// No children / no `open` needed — the title bar is always visible.

export const WithSenderHeader: Story = {
  render: () => (
    <div style={{ maxWidth: 680 }}>
      <div style={demoLabelStyle}>header — file reference attached</div>
      <UniSender
        defaultValue="Summarise the key findings from this report."
        header={
          <UniSender.Header
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, color: '#969498' }}>Attached:</span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '2px 8px',
                    borderRadius: 4, // bradius.200
                    background: '#E7F7FB', // bcolor.primary.100
                    color: '#15808C', // bcolor.primary.600
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  <DocIcon />
                  Q3-Sales-Report.pdf
                </span>
              </div>
            }
          />
        }
      />
    </div>
  ),
};

// ── 5. With footer slot ────────────────────────────────────────────────────
// footer prop renders below the textarea — typically used for submit hints.

export const WithFooter: Story = {
  render: () => (
    <div style={{ maxWidth: 680 }}>
      <div style={demoLabelStyle}>footer — submit type hint</div>
      <UniSender
        placeholder="Ask anything…"
        footer={
          <div style={{ fontSize: 11, color: '#969498' }}>
            {' '}
            {/* colorTextSecondary */}
            <kbd style={kbdStyle}>Enter</kbd>
            {' to send · '}
            <kbd style={kbdStyle}>Shift</kbd>
            {' + '}
            <kbd style={kbdStyle}>Enter</kbd>
            {' for new line'}
          </div>
        }
      />
    </div>
  ),
};

// ── 6. Full composition ────────────────────────────────────────────────────
// All slots together: Sender.Header + prefix + content + footer.

export const FullComposition: Story = {
  render: () => (
    <div style={{ maxWidth: 680 }}>
      <UniSender
        defaultValue="Which deals in APAC are at risk of slipping this quarter?"
        header={
          <UniSender.Header
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, color: '#969498' }}>Context:</span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '2px 8px',
                    borderRadius: 4, // bradius.200
                    background: '#E7F7FB', // bcolor.primary.100
                    color: '#15808C', // bcolor.primary.600
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  <DocIcon />
                  APAC-Pipeline.xlsx
                </span>
              </div>
            }
          />
        }
        prefix={
          <button type="button" style={prefixBtnStyle} title="Attach file">
            <PaperclipIcon />
          </button>
        }
        footer={
          <div style={{ fontSize: 11, color: '#969498' }}>
            <kbd style={kbdStyle}>Enter</kbd>
            {' to send · '}
            <kbd style={kbdStyle}>Shift</kbd>
            {' + '}
            <kbd style={kbdStyle}>Enter</kbd>
            {' for new line'}
          </div>
        }
      />
    </div>
  ),
};
