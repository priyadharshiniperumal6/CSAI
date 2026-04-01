import { useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import type { ConversationsProps, PromptsItemType } from '@ant-design/x';

import UniBubble from './primitives/UniBubble';
import UniPrompts from './primitives/UniPrompts';
import UniSender from './primitives/UniSender';
import UniWelcome from './primitives/UniWelcome';
import UniChatsPanel from './UniChatsPanel';
import type { UniChatUIMessage } from './UniChatUI';
import './UniAIAssistPanel.scss';

// ── 4-pointed sparkle icon (matches Figma DS star) ──────────────────────────
// Bezier curves create the concave "pinched" arms of the sparkle shape.
const SparkleIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2 C12 6 15 9 22 12 C18 12 15 15 12 22 C12 18 9 15 2 12 C6 12 9 9 12 2 Z" />
  </svg>
);

// ── Default role config for bubble list ─────────────────────────────────────
const defaultRoleConfig = {
  ai: {
    placement: 'start' as const,
    avatar: false as const,
    typing: true,
  },
  user: {
    placement: 'end' as const,
    avatar: false as const,
  },
};

const toBubbleItems = (messages: UniChatUIMessage[]) =>
  messages.map(msg => ({
    key: msg.id,
    role: msg.role,
    content: msg.content,
    status: msg.status,
    loading: msg.loading,
  }));

// ── Types ────────────────────────────────────────────────────────────────────

export type UniAIAssistPanelProps = {
  className?: string;
  style?: CSSProperties;
  /** Panel title. Default: 'AI Assist' */
  title?: ReactNode;
  /** Personalises the greeting: "Hi {userName}!". Falls back to "Hi there!" */
  userName?: string;
  /** Sub-heading on the welcome screen. Default: 'How can I help?' */
  welcomeDescription?: ReactNode;
  /** Override the large star illustration in the welcome screen */
  welcomeIcon?: ReactNode;
  /** Use Case tiles shown on the welcome screen */
  useCases?: PromptsItemType[];
  /** Conversation list shown in the Chats history panel */
  conversations?: ConversationsProps['items'];
  /** Controlled active conversation key */
  activeConversationKey?: string;
  /** Externally managed messages. When provided the panel is controlled. */
  messages?: UniChatUIMessage[];
  /** Sender placeholder. Default: 'Ask anything or @mention' */
  senderPlaceholder?: string;
  /** Show loading state in the sender */
  senderLoading?: boolean;
  /** Called when the user submits a message */
  onSend?: (value: string) => void;
  /** Called when the user selects a conversation from the Chats panel */
  onConversationChange?: (key: string) => void;
  /** Called when the user clicks New Chat in the Chats panel */
  onConversationCreate?: () => void;
  /** Called when the close button is clicked */
  onClose?: () => void;
};

// ── Component ────────────────────────────────────────────────────────────────

export const UniAIAssistPanel = ({
  className,
  style,
  title = 'AI Assist',
  userName,
  welcomeDescription = 'How can I help?',
  welcomeIcon,
  useCases = [],
  conversations = [],
  activeConversationKey,
  messages,
  senderPlaceholder = 'Ask anything or @mention',
  senderLoading = false,
  onSend,
  onConversationChange,
  onConversationCreate,
  onClose,
}: UniAIAssistPanelProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [chatsOpen, setChatsOpen] = useState(false);
  const [internalMessages, setInternalMessages] = useState<UniChatUIMessage[]>([]);
  const [senderValue, setSenderValue] = useState('');
  const [senderFocused, setSenderFocused] = useState(false);
  // welcomeForced lets the user "go back" to the welcome screen by creating a new chat
  const [welcomeForced, setWelcomeForced] = useState(false);

  // Prefer externally managed messages if provided
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
      // Uncontrolled fallback — useful in Storybook / standalone usage
      setInternalMessages(current => [
        ...current,
        { id: `user-${Date.now()}`, role: 'user' as const, content: trimmed },
        { id: `ai-${Date.now()}`, role: 'ai' as const, content: 'Looking it up…' },
      ]);
    }
  };

  const handleUseCaseClick = (info: { data: PromptsItemType }) => {
    const label = typeof info.data.label === 'string' ? info.data.label : '';
    if (label) handleSend(label);
  };

  const handleConversationSelect = (key: string) => {
    setChatsOpen(false);
    setWelcomeForced(false);
    onConversationChange?.(key);
  };

  const handleNewChat = () => {
    setChatsOpen(false);
    setWelcomeForced(true);
    setInternalMessages([]);
    onConversationCreate?.();
  };

  return (
    <div
      className={classNames('uni-ai-assist-panel', { 'uni-ai-assist-panel--welcome': showWelcome }, className)}
      style={style}
    >
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="uni-ai-assist-panel__header">
        <div className="uni-ai-assist-panel__header-title">
          <SparkleIcon className="uni-ai-assist-panel__brand-icon" />
          <span>{title}</span>
        </div>
        <div className="uni-ai-assist-panel__header-actions">
          <button
            type="button"
            className={classNames('uni-ai-assist-panel__icon-btn', {
              'uni-ai-assist-panel__icon-btn--active': chatsOpen,
            })}
            onClick={() => setChatsOpen(true)}
            aria-label="Open chat history"
            aria-pressed={chatsOpen}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              menu_book
            </span>
          </button>
          <button
            type="button"
            className="uni-ai-assist-panel__icon-btn"
            onClick={onClose}
            aria-label="Close AI Assist"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              close
            </span>
          </button>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────────── */}
      <div className="uni-ai-assist-panel__body">
        {showWelcome ? (
          <div className="uni-ai-assist-panel__welcome-area">
            <UniWelcome
              className="uni-ai-assist-panel__welcome"
              styles={{
                root: { flexDirection: 'column', alignItems: 'center', textAlign: 'center' },
                icon: { marginInlineEnd: 0, marginBottom: 12 },
                title: { textAlign: 'center' },
                description: { textAlign: 'center' },
              }}
              icon={welcomeIcon ?? <SparkleIcon className="uni-ai-assist-panel__welcome-star" />}
              title={greetingTitle}
              description={welcomeDescription}
              variant="borderless"
            />
            {useCases.length > 0 && !senderValue.trim() && (
              <div className="uni-ai-assist-panel__use-cases">
                <div className="uni-ai-assist-panel__use-cases-label">Use Case Examples</div>
                <UniPrompts
                  className="uni-ai-assist-panel__prompts"
                  items={useCases}
                  onItemClick={handleUseCaseClick}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="uni-ai-assist-panel__messages">
            <UniBubble.List items={bubbleItems} role={defaultRoleConfig} />
          </div>
        )}
      </div>

      {/* ── Sender ──────────────────────────────────────────────────── */}
      {/* Wrapper captures focus/blur at container level — more reliable than
          textarea onFocus/onBlur which don't fire when clicking action buttons */}
      <div
        className="uni-ai-assist-panel__sender"
        onFocusCapture={() => setSenderFocused(true)}
        onBlurCapture={() => setSenderFocused(false)}
      >
        {/* Hidden file input — triggered by the Attach icon in the sender footer */}
        <input ref={fileInputRef} type="file" style={{ display: 'none' }} />
        <UniSender
          placeholder={senderPlaceholder}
          loading={senderLoading}
          onSubmit={handleSend}
          onChange={value => setSenderValue(value)}
          autoSize={{ minRows: 1, maxRows: 4 }}
          footer={
            senderFocused ? (
              // onMouseDown preventDefault keeps textarea focused so the footer
              // doesn't collapse before the click registers to open the file picker
              <span
                className="material-symbols-outlined uni-ai-assist-panel__attach-icon"
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
            )
          }
        />
      </div>

      {/* ── Chats history sub-panel (absolute overlay) ───────────────── */}
      {chatsOpen && (
        <UniChatsPanel
          conversations={conversations}
          activeConversationKey={activeConversationKey}
          onConversationSelect={handleConversationSelect}
          onNewChat={handleNewChat}
          onClose={() => setChatsOpen(false)}
        />
      )}
    </div>
  );
};

export default UniAIAssistPanel;
