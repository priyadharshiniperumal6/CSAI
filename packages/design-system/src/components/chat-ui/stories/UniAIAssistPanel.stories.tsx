import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { PromptsItemType } from '@ant-design/x';

import { UniAIAssistPanel } from '../UniAIAssistPanel';
import type { UniAIAssistPanelProps } from '../UniAIAssistPanel';
import type { UniChatUIMessage } from '../UniChatUI';

// ── Demo data ─────────────────────────────────────────────────────────────────

const DEMO_USE_CASES: PromptsItemType[] = [
  {
    key: 'use-case-1',
    label: 'Most common customer paths',
    icon: (
      <span style={{ fontSize: 20, color: '#15808C' }} className="material-symbols-outlined">
        track_changes
      </span>
    ),
  },
  {
    key: 'use-case-2',
    label: 'Journey drop-off points',
    icon: (
      <span style={{ fontSize: 20, color: '#449CA7' }} className="material-symbols-outlined">
        track_changes
      </span>
    ),
  },
  {
    key: 'use-case-3',
    label: 'Successful journey patterns',
    icon: (
      <span style={{ fontSize: 20, color: '#cc860c' }} className="material-symbols-outlined">
        track_changes
      </span>
    ),
  },
];

const DEMO_CONVERSATIONS = [
  { key: 'conv-1', label: 'User Journeys analysis for Q1' },
  { key: 'conv-2', label: 'Rag Platform document workflow' },
  { key: 'conv-3', label: 'Agent performance deep-dive' },
  { key: 'conv-4', label: 'Self-serve analytics overview' },
  { key: 'conv-5', label: 'Conversion rate path optimisation' },
];

const DEMO_MESSAGES: UniChatUIMessage[] = [
  { id: 'ai-1', role: 'ai', content: 'What are the top emerging trends for the last 24 hours?' },
  { id: 'ai-2', role: 'ai', content: 'Looking it up…' },
];

// ── Stateful wrapper for interactive stories ──────────────────────────────────

const StatefulAIAssistPanel = (args: UniAIAssistPanelProps) => {
  const [messages, setMessages] = useState<UniChatUIMessage[]>(args.messages ?? []);
  const [activeKey, setActiveKey] = useState<string | undefined>(undefined);
  const [conversations, setConversations] = useState(args.conversations ?? DEMO_CONVERSATIONS);

  const handleSend = (value: string) => {
    setMessages(current => [
      ...current,
      { id: `user-${Date.now()}`, role: 'user', content: value },
      { id: `ai-${Date.now()}`, role: 'ai', content: `I received: "${value}". Analysing now…` },
    ]);
  };

  const handleConversationCreate = () => {
    setMessages([]);
    setActiveKey(undefined);
  };

  const handleConversationChange = (key: string) => {
    setActiveKey(key);
    setMessages([{ id: `ai-loaded-${key}`, role: 'ai', content: `Loaded conversation: ${key}` }]);
  };

  return (
    <div style={{ width: 380, height: 680, position: 'relative' }}>
      <UniAIAssistPanel
        {...args}
        messages={messages}
        conversations={conversations}
        activeConversationKey={activeKey}
        onSend={handleSend}
        onConversationCreate={handleConversationCreate}
        onConversationChange={handleConversationChange}
        onClose={() => alert('Close clicked — wire to your panel toggle')}
      />
    </div>
  );
};

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Views/Patterns/AI Assist/Panel',
  component: UniAIAssistPanel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'AI Assist panel built on ChatUI primitives. Shows a personalised welcome screen with use-case tiles, transitions to a conversation view on first message, and exposes a Chats history sub-panel via the book icon.',
      },
    },
    layout: 'centered',
  },
  args: {
    title: 'AI Assist',
    userName: 'Rachel',
    welcomeDescription: 'How can I help?',
    senderPlaceholder: 'Ask anything or @mention',
    useCases: DEMO_USE_CASES,
  },
} satisfies Meta<typeof UniAIAssistPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Stories ───────────────────────────────────────────────────────────────────

/** Default welcome state — greeting + use case tiles */
export const WelcomeState: Story = {
  render: args => <StatefulAIAssistPanel {...args} />,
};

/** Panel pre-loaded with messages — skips welcome, shows chat */
export const ChatState: Story = {
  args: {
    messages: DEMO_MESSAGES,
  },
  render: args => <StatefulAIAssistPanel {...args} />,
};

/** No use cases — minimal welcome screen */
export const WelcomeNoUseCases: Story = {
  args: {
    useCases: [],
  },
  render: args => <StatefulAIAssistPanel {...args} />,
};

/** Full interactive playground */
export const Playground: Story = {
  args: {
    conversations: DEMO_CONVERSATIONS,
    useCases: DEMO_USE_CASES,
  },
  render: args => <StatefulAIAssistPanel {...args} />,
};
