import { useMemo, useState } from 'react';
import type { PromptsItemType } from '@ant-design/x';

import { UniCard } from '../../../components/card/UniCard';
import { UniChatUI } from '../../../components/chat-ui/UniChatUI';
import type { UniChatUIMessage } from '../../../components/chat-ui/UniChatUI';
import { UniEmpty } from '../../../components/empty/UniEmpty';
import { UniSkeleton } from '../../../components/skeleton/UniSkeleton';
import { UniTag } from '../../../components/tag/UniTag';
import type { DemoViewState } from '../../mocks/demoState';
import { useDemoState } from '../../mocks/demoState';
import { ViewRouteShell } from '../shared/ViewRouteShell';

const DEV_CHAT_CONVERSATIONS = [
  { key: 'deployments', label: 'Deployment Readiness' },
  { key: 'quality', label: 'Quality Monitoring' },
  { key: 'design-system', label: 'Design System Ops' },
];

const DEV_CHAT_PROMPTS: PromptsItemType[] = [
  {
    key: 'prompt-release-health',
    label: 'Summarize release health',
    description: 'Show blockers, open defects, and rollout confidence.',
  },
  {
    key: 'prompt-token-audit',
    label: 'Audit token overrides',
    description: 'Identify duplicate overrides across Ant and custom wrappers.',
  },
  {
    key: 'prompt-view-pattern',
    label: 'Create a view-pattern test matrix',
    description: 'Cover default, loading, empty, and error scenarios.',
  },
];

const DEV_CHAT_INITIAL_MESSAGES: Record<string, UniChatUIMessage[]> = {
  deployments: [
    {
      id: 'deployments-ai-1',
      role: 'ai',
      content: 'Release train status: 8 services green, 1 service waiting on canary verification.',
    },
    {
      id: 'deployments-user-1',
      role: 'user',
      content: 'Which service is blocking full rollout?',
    },
    {
      id: 'deployments-ai-2',
      role: 'ai',
      content: 'Auth Gateway is pending latency validation under peak synthetic load.',
    },
  ],
  quality: [
    {
      id: 'quality-system-1',
      role: 'system',
      content: 'Nightly regression report completed at 04:15 UTC.',
    },
    {
      id: 'quality-ai-1',
      role: 'ai',
      content: 'Two visual regressions are still open on Card View compact layouts.',
    },
  ],
  'design-system': [
    {
      id: 'design-ai-1',
      role: 'ai',
      content: 'Token sync is stable. 14 semantic aliases were updated in the latest merge.',
    },
  ],
};

const toPromptText = (prompt: PromptsItemType): string =>
  typeof prompt.label === 'string' ? prompt.label : prompt.key;

const createMessageId = (prefix: string) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

const buildAssistantReply = (input: string) =>
  `Processed "${input}". I prepared a concise action list and linked each item to the relevant route and owner.`;

type ChatRouteStateProps = {
  state: DemoViewState;
  conversations: { key: string; label: string }[];
  activeConversationKey: string;
  messages: UniChatUIMessage[];
  onConversationChange: (key: string) => void;
  onConversationCreate: () => void;
  onPromptSelect: (prompt: PromptsItemType) => void;
  onSend: (value: string) => void;
};

const renderChatState = ({
  state,
  conversations,
  activeConversationKey,
  messages,
  onConversationChange,
  onConversationCreate,
  onPromptSelect,
  onSend,
}: ChatRouteStateProps) => {
  if (state === 'loading') {
    return (
      <UniCard className="dev-route-shell__panel">
        <UniSkeleton paragraph={{ rows: 10 }} />
      </UniCard>
    );
  }

  if (state === 'empty') {
    return (
      <UniCard className="dev-route-shell__panel">
        <UniEmpty
          params={{
            props: {
              title: 'No chat sessions available',
              description: 'Switch to default state to restore seeded conversation threads.',
            },
          }}
        />
      </UniCard>
    );
  }

  if (state === 'error') {
    return (
      <UniCard className="dev-route-shell__panel">
        <div className="dev-route-shell__title-row">
          <h2 className="dev-route-shell__subtitle">Chat service unavailable</h2>
          <UniTag>Error</UniTag>
        </div>
        <p className="dev-route-shell__description">
          Unable to load chat responses. Set `?state=default` to restore the demo interaction.
        </p>
      </UniCard>
    );
  }

  return (
    <div className="dev-chat-route">
      <UniChatUI
        conversations={conversations}
        activeConversationKey={activeConversationKey}
        onConversationChange={key => onConversationChange(String(key))}
        onConversationCreate={onConversationCreate}
        messages={messages}
        prompts={DEV_CHAT_PROMPTS}
        onPromptSelect={onPromptSelect}
        onSend={onSend}
        senderPlaceholder="Ask for rollout status, quality trends, or token governance updates"
        conversationTitle="Chat Sessions"
      />
    </div>
  );
};

export const ChatViewDemoRoute = () => {
  const { state } = useDemoState();
  const [conversations, setConversations] = useState(() => DEV_CHAT_CONVERSATIONS);
  const [activeConversationKey, setActiveConversationKey] = useState<string>(DEV_CHAT_CONVERSATIONS[0].key);
  const [messagesByConversation, setMessagesByConversation] =
    useState<Record<string, UniChatUIMessage[]>>(DEV_CHAT_INITIAL_MESSAGES);

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

  const handleConversationCreate = () => {
    const nextIndex = conversations.length + 1;
    const nextKey = `chat-session-${nextIndex}`;

    setConversations(current => [...current, { key: nextKey, label: `Chat Session ${nextIndex}` }]);
    setMessagesByConversation(current => ({ ...current, [nextKey]: [] }));
    setActiveConversationKey(nextKey);
  };

  return (
    <ViewRouteShell
      title="Chat"
      description="Conversational AI view pattern built with the UniChatUI wrapper on top of Ant Design X."
      badges={['UniChatUI', 'Ant Design X']}
    >
      {renderChatState({
        state,
        conversations,
        activeConversationKey,
        messages: activeMessages,
        onConversationChange: setActiveConversationKey,
        onConversationCreate: handleConversationCreate,
        onPromptSelect: handlePromptSelect,
        onSend: handleSend,
      })}
    </ViewRouteShell>
  );
};
