import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { PromptsItemType } from '@ant-design/x';

import { UniChatUI } from '../UniChatUI';
import type { UniChatUIMessage, UniChatUIProps } from '../UniChatUI';

const CHAT_CONVERSATIONS = [
  { key: 'platform-ops', label: 'Platform Ops' },
  { key: 'token-refactor', label: 'Token Refactor' },
  { key: 'storybook-review', label: 'Storybook Review' },
];

const CHAT_PROMPTS: PromptsItemType[] = [
  {
    key: 'prompt-release',
    label: 'Summarize release readiness',
    description: 'Status of blockers, defects, and rollout confidence.',
  },
  {
    key: 'prompt-layout',
    label: 'Review host-shell layout issues',
    description: 'Highlight viewport and inner-scroll layout regressions.',
  },
  {
    key: 'prompt-tokens',
    label: 'List token override conflicts',
    description: 'Find duplicate overrides across semantic and component scopes.',
  },
];

const INITIAL_MESSAGES: Record<string, UniChatUIMessage[]> = {
  'platform-ops': [
    {
      id: 'ops-ai-1',
      role: 'ai',
      content: 'Deployment monitor is healthy. One canary check is still running in production.',
    },
    {
      id: 'ops-user-1',
      role: 'user',
      content: 'Which canary check is still running?',
    },
    {
      id: 'ops-ai-2',
      role: 'ai',
      content: 'Card View smoke tests for fixed-height rendering in compact mode.',
    },
  ],
  'token-refactor': [
    {
      id: 'token-system-1',
      role: 'system',
      content: 'Token sync pipeline completed 6 minutes ago.',
    },
    {
      id: 'token-ai-1',
      role: 'ai',
      content: '18 semantic token aliases were updated without breaking Storybook snapshots.',
    },
  ],
  'storybook-review': [
    {
      id: 'sb-ai-1',
      role: 'ai',
      content: 'All chat components are now available under Components/ChatUI for review.',
    },
  ],
};

const createMessageId = (prefix: string) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

const toPromptText = (prompt: PromptsItemType) => (typeof prompt.label === 'string' ? prompt.label : prompt.key);

const buildAssistantReply = (input: string) =>
  `Captured "${input}" and generated a review checklist with owners, scope, and validation steps.`;

const StatefulUniChatUI = (args: UniChatUIProps) => {
  const [activeConversationKey, setActiveConversationKey] = useState<string>('platform-ops');
  const [conversations, setConversations] = useState(() => args.conversations ?? CHAT_CONVERSATIONS);
  const [messagesByConversation, setMessagesByConversation] =
    useState<Record<string, UniChatUIMessage[]>>(INITIAL_MESSAGES);

  const activeMessages = useMemo(
    () => messagesByConversation[activeConversationKey] ?? [],
    [activeConversationKey, messagesByConversation]
  );

  const handleSend = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      return;
    }

    setMessagesByConversation(current => {
      const existing = current[activeConversationKey] ?? [];

      return {
        ...current,
        [activeConversationKey]: [
          ...existing,
          { id: createMessageId('user'), role: 'user', content: trimmedValue },
          { id: createMessageId('ai'), role: 'ai', content: buildAssistantReply(trimmedValue) },
        ],
      };
    });
  };

  const handlePromptSelect = (prompt: PromptsItemType) => {
    handleSend(toPromptText(prompt));
  };

  const handleCreateConversation = () => {
    const nextIndex = conversations.length + 1;
    const nextKey = `chat-${nextIndex}`;

    setConversations(current => [...current, { key: nextKey, label: `New Chat ${nextIndex}` }]);
    setMessagesByConversation(current => ({ ...current, [nextKey]: [] }));
    setActiveConversationKey(nextKey);
  };

  return (
    <div style={{ height: 680 }}>
      <UniChatUI
        {...args}
        conversations={conversations}
        activeConversationKey={activeConversationKey}
        onConversationChange={key => setActiveConversationKey(String(key))}
        onConversationCreate={handleCreateConversation}
        messages={args.messages ?? activeMessages}
        prompts={args.prompts ?? CHAT_PROMPTS}
        onPromptSelect={handlePromptSelect}
        onSend={handleSend}
      />
    </div>
  );
};

const meta = {
  title: 'Views/Patterns/ChatUI',
  component: UniChatUI,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Unified chat wrapper around Ant Design X primitives. Includes conversations, prompt chips, message bubbles, and sender.',
      },
    },
  },
  args: {
    conversationTitle: 'Conversations',
    promptsTitle: 'Suggested prompts',
    senderPlaceholder: 'Ask about runtime routes, token governance, or test coverage',
  },
  argTypes: {
    senderLoading: { control: 'boolean' },
    senderDisabled: { control: 'boolean' },
    showWelcomeWhenEmpty: { control: 'boolean' },
  },
} satisfies Meta<typeof UniChatUI>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: args => <StatefulUniChatUI {...args} />,
};

export const EmptyWelcome: Story = {
  args: {
    messages: [],
  },
  render: args => <StatefulUniChatUI {...args} />,
};

export const StandaloneSurface: Story = {
  args: {
    conversations: [],
    prompts: [],
    messages: [
      {
        id: 'standalone',
        role: 'ai',
        content: 'Standalone mode: only messages and sender are rendered.',
      },
    ],
  },
  render: args => <StatefulUniChatUI {...args} />,
};
