import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { PromptsItemType } from '@ant-design/x';

import { UniChatUI } from './UniChatUI';
import type { UniChatUIMessage, UniChatUIProps } from './UniChatUI';

const SAMPLE_CONVERSATIONS = [
  { key: 'ops-review', label: 'Ops Review' },
  { key: 'release-qa', label: 'Release QA' },
  { key: 'design-sync', label: 'Design Sync' },
];

const SAMPLE_PROMPTS: PromptsItemType[] = [
  {
    key: 'prompt-release-readiness',
    label: 'Summarize release readiness',
    description: 'Deployment risk, open blockers, and environment status.',
  },
  {
    key: 'prompt-theme-gaps',
    label: 'Find theme token gaps',
    description: 'Compare base and semantic tokens for missing aliases.',
  },
  {
    key: 'prompt-route-tests',
    label: 'Generate route-level test checklist',
    description: 'Coverage for default, loading, empty, and error view states.',
  },
];

const STARTING_MESSAGES: Record<string, UniChatUIMessage[]> = {
  'ops-review': [
    {
      id: 'ops-ai-1',
      role: 'ai',
      content: 'Morning update: 3 incidents resolved, 1 pending hotfix validation in staging.',
    },
    {
      id: 'ops-user-1',
      role: 'user',
      content: 'What is the current deployment blocker?',
    },
    {
      id: 'ops-ai-2',
      role: 'ai',
      content: 'The remaining blocker is an authentication timeout observed in production-like traffic replay.',
    },
  ],
  'release-qa': [
    {
      id: 'qa-ai-1',
      role: 'ai',
      content: 'QA sweep complete for card variants. 2 visual regressions remain in compact mode.',
    },
  ],
  'design-sync': [
    {
      id: 'design-system-1',
      role: 'system',
      content: 'Weekly design sync starts in 15 minutes.',
    },
  ],
};

const buildAssistantReply = (input: string) =>
  `Acknowledged. I captured "${input}" and generated a follow-up checklist with owners and target dates.`;

const toPromptText = (prompt: PromptsItemType): string =>
  typeof prompt.label === 'string' ? prompt.label : prompt.key;

const StatefulChat = (args: UniChatUIProps) => {
  const [activeConversationKey, setActiveConversationKey] = useState<string>('ops-review');
  const [conversations, setConversations] = useState(() => args.conversations ?? SAMPLE_CONVERSATIONS);
  const [messagesByConversation, setMessagesByConversation] =
    useState<Record<string, UniChatUIMessage[]>>(STARTING_MESSAGES);

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
          {
            id: `user-${Date.now()}`,
            role: 'user',
            content: trimmedValue,
          },
          {
            id: `ai-${Date.now()}`,
            role: 'ai',
            content: buildAssistantReply(trimmedValue),
          },
        ],
      };
    });
  };

  const handlePromptSelect = (prompt: PromptsItemType) => {
    handleSend(toPromptText(prompt));
  };

  const handleConversationCreate = () => {
    const nextIndex = conversations.length + 1;
    const nextKey = `new-conversation-${nextIndex}`;
    setConversations(current => [...current, { key: nextKey, label: `New Conversation ${nextIndex}` }]);
    setMessagesByConversation(current => ({ ...current, [nextKey]: [] }));
    setActiveConversationKey(nextKey);
  };

  return (
    <div style={{ height: 640 }}>
      <UniChatUI
        {...args}
        conversations={conversations}
        activeConversationKey={activeConversationKey}
        onConversationChange={key => setActiveConversationKey(String(key))}
        onConversationCreate={handleConversationCreate}
        messages={args.messages ?? activeMessages}
        prompts={args.prompts ?? SAMPLE_PROMPTS}
        onPromptSelect={handlePromptSelect}
        onSend={handleSend}
      />
    </div>
  );
};

const meta = {
  title: 'Views/Patterns/ChatView',
  component: UniChatUI,
  tags: ['autodocs'],
  args: {
    senderPlaceholder: 'Ask for route guidance, testing coverage, or release updates',
    conversationTitle: 'Workspaces',
  },
  argTypes: {
    senderLoading: { control: 'boolean' },
    senderDisabled: { control: 'boolean' },
    showWelcomeWhenEmpty: { control: 'boolean' },
  },
} satisfies Meta<typeof UniChatUI>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => <StatefulChat {...args} />,
};

export const Loading: Story = {
  args: {
    senderLoading: true,
    messages: [
      {
        id: 'loading-user',
        role: 'user',
        content: 'Draft a rollout checklist for the chat route.',
      },
      {
        id: 'loading-ai',
        role: 'ai',
        content: 'Generating rollout checklist...',
        status: 'loading',
        loading: true,
      },
    ],
  },
  render: args => <StatefulChat {...args} />,
};

export const Empty: Story = {
  args: {
    messages: [],
  },
  render: args => <StatefulChat {...args} />,
};

export const StandaloneChat: Story = {
  args: {
    conversations: [],
    prompts: [],
    messages: [
      {
        id: 'standalone-ai',
        role: 'ai',
        content: 'Standalone mode enabled. Conversation rail and prompt chips are hidden.',
      },
    ],
  },
  render: args => <StatefulChat {...args} />,
};
