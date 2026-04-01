import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { UniAIAssistHome } from '../UniAIAssistHome';
import type { UniAIAssistHomeProps, UniAIAssistHomeUseCase } from '../UniAIAssistHome';
import type { UniChatUIMessage } from '../UniChatUI';

// ── Demo data ─────────────────────────────────────────────────────────────────

const DEMO_USE_CASES: UniAIAssistHomeUseCase[] = [
  {
    key: 'uc-paths',
    label: 'Most common customer paths',
    description: 'Analyse journey data to surface the top flows driving conversion and drop-off.',
    icon: (
      <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#15808C' }}>
        route
      </span>
    ),
    iconBg: '#f0fdfa',
  },
  {
    key: 'uc-dropoff',
    label: 'Journey drop-off points',
    description: 'Identify where customers are leaving and what interventions would help most.',
    icon: (
      <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#2263d5' }}>
        trending_down
      </span>
    ),
    iconBg: '#f0f8ff',
  },
  {
    key: 'uc-patterns',
    label: 'Successful journey patterns',
    description: 'Find the sequences correlated with highest satisfaction and retention scores.',
    icon: (
      <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#cc860c' }}>
        task_alt
      </span>
    ),
    iconBg: '#fffbe8',
  },
];

const DEMO_CONVERSATIONS = [
  { key: 'conv-1', label: 'User Journeys analysis for Q1' },
  { key: 'conv-2', label: 'Rag Platform document workflow' },
  { key: 'conv-3', label: 'Agent performance deep-dive' },
  { key: 'conv-4', label: 'Self-serve analytics overview' },
  { key: 'conv-5', label: 'Conversion rate path optimisation' },
];

// ── Stateful wrapper ──────────────────────────────────────────────────────────

const StatefulAIAssistHome = (args: UniAIAssistHomeProps) => {
  const [messages, setMessages] = useState<UniChatUIMessage[]>(args.messages ?? []);
  const [activeKey, setActiveKey] = useState<string | undefined>(undefined);
  const [conversations, setConversations] = useState(args.conversations ?? DEMO_CONVERSATIONS);

  const handleSend = (value: string) => {
    setMessages(current => [
      ...current,
      { id: `user-${Date.now()}`, role: 'user' as const, content: value },
      { id: `ai-${Date.now()}`, role: 'ai' as const, content: 'Looking it up…' },
    ]);
  };

  const handleConversationCreate = () => {
    const key = `conv-new-${Date.now()}`;
    setConversations(current => [{ key, label: 'New Chat' }, ...current]);
    setActiveKey(key);
    setMessages([]);
  };

  const handleConversationChange = (key: string) => {
    setActiveKey(key);
    setMessages([{ id: `ai-loaded-${key}`, role: 'ai' as const, content: `Loaded conversation: ${key}` }]);
  };

  return (
    <UniAIAssistHome
      {...args}
      conversations={conversations}
      activeConversationKey={activeKey}
      messages={messages}
      onSend={handleSend}
      onConversationCreate={handleConversationCreate}
      onConversationChange={handleConversationChange}
    />
  );
};

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<typeof UniAIAssistHome> = {
  title: 'Views/Patterns/AI Assist/Home',
  component: UniAIAssistHome,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof UniAIAssistHome>;

// ── Stories ───────────────────────────────────────────────────────────────────

export const Welcome: Story = {
  name: 'Welcome state',
  render: args => <StatefulAIAssistHome {...args} />,
  args: {
    userName: 'Rachel',
    useCases: DEMO_USE_CASES,
    conversations: DEMO_CONVERSATIONS,
  },
};

export const WithoutUseCases: Story = {
  name: 'Welcome — no use cases',
  render: args => <StatefulAIAssistHome {...args} />,
  args: {
    userName: 'Rachel',
    conversations: DEMO_CONVERSATIONS,
    useCases: [],
  },
};

export const ChatState: Story = {
  name: 'Chat state (with messages)',
  render: args => <StatefulAIAssistHome {...args} />,
  args: {
    userName: 'Rachel',
    useCases: DEMO_USE_CASES,
    conversations: DEMO_CONVERSATIONS,
    messages: [
      { id: 'u1', role: 'user', content: 'Can you summarise the Q1 journey drop-off data?' },
      {
        id: 'a1',
        role: 'ai',
        content: 'Sure! The top drop-off is at onboarding step 3 (38%), followed by first report generation (24%).',
      },
    ],
  },
};
