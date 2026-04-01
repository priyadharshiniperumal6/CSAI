import { useMemo, useState } from 'react';

import { UniAIAssistHome } from '../../../components/chat-ui/UniAIAssistHome';
import type { UniAIAssistHomeUseCase } from '../../../components/chat-ui/UniAIAssistHome';
import type { UniChatUIMessage } from '../../../components/chat-ui/UniChatUI';
import { AI_ASSIST_CONVERSATIONS, DUMMY_CONVERSATIONS } from '../shared/DevHostShellLayout';

// ── Use cases ─────────────────────────────────────────────────────────────────
// Extend the shared AI Assist use cases with descriptions for the card tiles.

const AI_HOME_USE_CASES: UniAIAssistHomeUseCase[] = [
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

const createMessageId = (prefix: string) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

const buildAssistantReply = (input: string) =>
  `Understood. I've noted "${input}" and I'm compiling a concise response with the most relevant data points.`;

// ── Route component ───────────────────────────────────────────────────────────

export const AIAssistHomeDemoRoute = () => {
  // Reuse the same conversations and preloaded messages as the small AIAssistPanel
  const [conversations, setConversations] = useState([...AI_ASSIST_CONVERSATIONS]);
  const [activeKey, setActiveKey] = useState<string | undefined>(undefined);
  const [messagesByConversation, setMessagesByConversation] = useState<Record<string, UniChatUIMessage[]>>({
    ...DUMMY_CONVERSATIONS,
  });

  const activeMessages = useMemo(
    () => (activeKey ? (messagesByConversation[activeKey] ?? []) : []),
    [activeKey, messagesByConversation]
  );

  const handleSend = (value: string) => {
    const key = activeKey ?? `conv-new-${Date.now()}`;
    if (!activeKey) {
      setConversations(current => [{ key, label: value.slice(0, 40) }, ...current]);
      setActiveKey(key);
    }
    setMessagesByConversation(current => ({
      ...current,
      [key]: [
        ...(current[key] ?? []),
        { id: createMessageId('user'), role: 'user', content: value },
        { id: createMessageId('ai'), role: 'ai', content: buildAssistantReply(value) },
      ],
    }));
  };

  const handleConversationCreate = () => {
    setActiveKey(undefined);
  };

  const handleConversationChange = (key: string) => {
    setActiveKey(key);
  };

  return (
    <UniAIAssistHome
      userName="Rachel"
      useCases={AI_HOME_USE_CASES}
      conversations={conversations}
      activeConversationKey={activeKey}
      messages={activeMessages}
      onSend={handleSend}
      onConversationCreate={handleConversationCreate}
      onConversationChange={handleConversationChange}
    />
  );
};
