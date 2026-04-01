import { useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import type { ConversationsProps } from '@ant-design/x';

import UniBubble from './primitives/UniBubble';
import UniSender from './primitives/UniSender';
import UniChatsPanel from './UniChatsPanel';
import type { UniChatUIMessage } from './UniChatUI';
import './UniAIAssistHome.scss';

// ── 4-pointed sparkle icon (matches Figma DS star) ───────────────────────────
export const SparkleIcon = ({ className, size = 16 }: { className?: string; size?: number }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2 C12 6 15 9 22 12 C18 12 15 15 12 22 C12 18 9 15 2 12 C6 12 9 9 12 2 Z" />
  </svg>
);

// ── Default bubble role config ────────────────────────────────────────────────
const defaultRoleConfig = {
  ai: { placement: 'start' as const, avatar: false as const, typing: true },
  user: { placement: 'end' as const, avatar: false as const },
};

const toBubbleItems = (messages: UniChatUIMessage[]) =>
  messages.map(msg => ({
    key: msg.id,
    role: msg.role,
    content: msg.content,
    status: msg.status,
    loading: msg.loading,
  }));

// ── Types ─────────────────────────────────────────────────────────────────────

export type UniAIAssistHomeUseCase = {
  key: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  /** CSS color for the icon badge background. Defaults to primary.50 teal. */
  iconBg?: string;
};

export type UniAIAssistHomeProps = {
  className?: string;
  style?: CSSProperties;
  /** Personalises the greeting: "Hi {userName}!". Falls back to "Hi there!" */
  userName?: string;
  /** Use case card tiles shown below the sender on the welcome screen */
  useCases?: UniAIAssistHomeUseCase[];
  /** Conversations for the right history sidebar */
  conversations?: ConversationsProps['items'];
  /** Controlled active conversation key */
  activeConversationKey?: string;
  /** Externally managed messages. When provided the component is controlled. */
  messages?: UniChatUIMessage[];
  /** Sender placeholder. Default: 'Ask anything or @mention' */
  senderPlaceholder?: string;
  /** Show loading state in the sender */
  senderLoading?: boolean;
  /** Called when the user submits a message */
  onSend?: (value: string) => void;
  /** Called when the user selects a conversation from the history sidebar */
  onConversationChange?: (key: string) => void;
  /** Called when the user clicks New Chat in the history sidebar */
  onConversationCreate?: () => void;
};

// ── Component ─────────────────────────────────────────────────────────────────

export const UniAIAssistHome = ({
  className,
  style,
  userName,
  useCases = [],
  conversations = [],
  activeConversationKey,
  messages,
  senderPlaceholder = 'Ask anything or @mention',
  senderLoading = false,
  onSend,
  onConversationChange,
  onConversationCreate,
}: UniAIAssistHomeProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [internalMessages, setInternalMessages] = useState<UniChatUIMessage[]>([]);
  const [senderValue, setSenderValue] = useState('');
  const [senderFocused, setSenderFocused] = useState(false);
  // welcomeForced lets the user "go back" to welcome by starting a new chat
  const [welcomeForced, setWelcomeForced] = useState(false);

  const resolvedMessages = messages ?? internalMessages;
  const hasMessages = resolvedMessages.length > 0;
  const showWelcome = welcomeForced || !hasMessages;

  const bubbleItems = useMemo(() => toBubbleItems(resolvedMessages), [resolvedMessages]);

  const greetingTitle = userName ? `Hi ${userName}!` : 'Hi there!';

  const handleSend = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    setSenderValue('');
    setWelcomeForced(false);

    if (onSend) {
      onSend(trimmed);
    } else {
      setInternalMessages(current => [
        ...current,
        { id: `user-${Date.now()}`, role: 'user' as const, content: trimmed },
        { id: `ai-${Date.now()}`, role: 'ai' as const, content: 'Looking it up…' },
      ]);
    }
  };

  const handleUseCaseClick = (useCase: UniAIAssistHomeUseCase) => {
    handleSend(useCase.label);
  };

  const handleConversationSelect = (key: string) => {
    setWelcomeForced(false);
    onConversationChange?.(key);
  };

  const handleNewChat = () => {
    setWelcomeForced(true);
    setInternalMessages([]);
    onConversationCreate?.();
  };

  // Shared sender footer — Attach button shown when the sender is focused
  const senderFooter = senderFocused ? (
    <span
      className="material-symbols-outlined uni-ai-assist-home__attach-icon"
      aria-label="Attach file"
      role="button"
      tabIndex={-1}
      onMouseDown={e => e.preventDefault()}
      onClick={() => fileInputRef.current?.click()}
    >
      attach_file
    </span>
  ) : (
    false
  );

  return (
    <div
      className={classNames('uni-ai-assist-home', { 'uni-ai-assist-home--welcome': showWelcome }, className)}
      style={style}
    >
      {/* Hidden file input — triggered by the Attach icon in the sender footer */}
      <input ref={fileInputRef} type="file" style={{ display: 'none' }} />

      {/* ── Main content area ──────────────────────────────────────── */}
      <div className="uni-ai-assist-home__main">
        {/* Background glow blobs */}
        <div className="uni-ai-assist-home__glow uni-ai-assist-home__glow--1" aria-hidden="true" />
        <div className="uni-ai-assist-home__glow uni-ai-assist-home__glow--2" aria-hidden="true" />

        {showWelcome ? (
          /* ── Welcome state ──────────────────────────────────────── */
          <div className="uni-ai-assist-home__content">
            <SparkleIcon className="uni-ai-assist-home__sparkle" />

            <div className="uni-ai-assist-home__greeting">
              <p className="uni-ai-assist-home__greeting-name">{greetingTitle}</p>
              <p className="uni-ai-assist-home__greeting-sub">What can I do for you?</p>
            </div>

            <div
              className="uni-ai-assist-home__sender"
              onFocusCapture={() => setSenderFocused(true)}
              onBlurCapture={() => setSenderFocused(false)}
            >
              <UniSender
                placeholder={senderPlaceholder}
                loading={senderLoading}
                onSubmit={handleSend}
                onChange={value => setSenderValue(value)}
                autoSize={{ minRows: 1, maxRows: 4 }}
                footer={senderFooter}
              />
            </div>

            {useCases.length > 0 && !senderValue.trim() && (
              <div className="uni-ai-assist-home__use-cases">
                <p className="uni-ai-assist-home__use-cases-label">Use Case Examples</p>
                <div className="uni-ai-assist-home__use-cases-grid">
                  {useCases.map(uc => (
                    <button
                      key={uc.key}
                      type="button"
                      className="uni-ai-assist-home__use-case-card"
                      onClick={() => handleUseCaseClick(uc)}
                    >
                      {uc.icon && (
                        <span
                          className="uni-ai-assist-home__use-case-icon"
                          style={uc.iconBg ? { background: uc.iconBg } : undefined}
                        >
                          {uc.icon}
                        </span>
                      )}
                      <p className="uni-ai-assist-home__use-case-title">{uc.label}</p>
                      {uc.description && <p className="uni-ai-assist-home__use-case-desc">{uc.description}</p>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ── Chat state ─────────────────────────────────────────── */
          <div className="uni-ai-assist-home__chat">
            <div className="uni-ai-assist-home__messages">
              <UniBubble.List items={bubbleItems} role={defaultRoleConfig} />
            </div>
            <div
              className="uni-ai-assist-home__sender"
              onFocusCapture={() => setSenderFocused(true)}
              onBlurCapture={() => setSenderFocused(false)}
            >
              <UniSender
                placeholder={senderPlaceholder}
                loading={senderLoading}
                onSubmit={handleSend}
                onChange={value => setSenderValue(value)}
                autoSize={{ minRows: 1, maxRows: 4 }}
                footer={senderFooter}
              />
            </div>
          </div>
        )}
      </div>

      {/* ── History sidebar ───────────────────────────────────────── */}
      <UniChatsPanel
        variant="sidebar"
        conversations={conversations}
        activeConversationKey={activeConversationKey}
        onConversationSelect={handleConversationSelect}
        onNewChat={handleNewChat}
      />
    </div>
  );
};

export default UniAIAssistHome;
