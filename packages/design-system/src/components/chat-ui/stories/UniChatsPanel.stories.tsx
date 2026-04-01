import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { UniChatsPanel } from '../UniChatsPanel';
import type { UniChatsPanelProps } from '../UniChatsPanel';

// ── Demo data ─────────────────────────────────────────────────────────────────

const DEMO_CONVERSATIONS = [
  { key: 'conv-1', label: 'User Journeys analysis for Q1' },
  { key: 'conv-2', label: 'Rag Platform document workflow setup' },
  { key: 'conv-3', label: 'Agent performance deep-dive' },
  { key: 'conv-4', label: 'Self-serve analytics overview' },
  { key: 'conv-5', label: 'Conversion rate path optimisation' },
  { key: 'conv-6', label: 'Outcome analytics data review' },
];

// ── Stateful wrapper ──────────────────────────────────────────────────────────

const StatefulChatsPanel = (args: UniChatsPanelProps) => {
  const [activeKey, setActiveKey] = useState<string | undefined>(undefined);
  const [conversations, setConversations] = useState(args.conversations ?? DEMO_CONVERSATIONS);

  const handleNewChat = () => {
    const key = `conv-new-${Date.now()}`;
    setConversations(current => [{ key, label: 'New Chat' }, ...current]);
    setActiveKey(key);
    args.onNewChat?.();
  };

  return (
    <div style={{ width: 360, height: 600, position: 'relative', border: '1px solid #e9ecf4', borderRadius: 12 }}>
      <UniChatsPanel
        {...args}
        conversations={conversations}
        activeConversationKey={activeKey}
        onConversationSelect={key => setActiveKey(key)}
        onNewChat={handleNewChat}
        onClose={() => alert('Close — wire to panel toggle')}
      />
    </div>
  );
};

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Views/Patterns/AI Assist/ChatsPanel',
  component: UniChatsPanel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Chat history sub-panel. Shows a searchable list of past conversations with a New Chat action. Typically rendered as an overlay inside UniAIAssistPanel when the book icon is clicked.',
      },
    },
    layout: 'centered',
  },
} satisfies Meta<typeof UniChatsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Stories ───────────────────────────────────────────────────────────────────

/** Default state with a populated conversations list */
export const WithConversations: Story = {
  render: args => <StatefulChatsPanel {...args} conversations={DEMO_CONVERSATIONS} />,
};

/** Empty state — no conversations yet */
export const Empty: Story = {
  render: args => <StatefulChatsPanel {...args} conversations={[]} />,
};

/** Playground */
export const Playground: Story = {
  render: args => <StatefulChatsPanel {...args} />,
};
