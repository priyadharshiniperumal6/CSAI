import { useMemo, useState } from 'react';
import type { CSSProperties, MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import classNames from 'classnames';
import type {
  BubbleItemType,
  BubbleListProps,
  ConversationsProps,
  PromptsItemType,
  PromptsProps,
  SenderProps,
} from '@ant-design/x';

import UniBubble from './primitives/UniBubble';
import UniConversations from './primitives/UniConversations';
import UniPrompts from './primitives/UniPrompts';
import UniSender from './primitives/UniSender';
import UniWelcome from './primitives/UniWelcome';
import './UniChatUI.scss';

export type UniChatUIMessageRole = 'user' | 'ai' | 'system';

export type UniChatUIMessage = {
  id: string | number;
  role: UniChatUIMessageRole;
  content: ReactNode;
  status?: BubbleItemType['status'];
  loading?: boolean;
};

export type UniChatUIProps = {
  className?: string;
  style?: CSSProperties;
  conversations?: ConversationsProps['items'];
  activeConversationKey?: ConversationsProps['activeKey'];
  defaultActiveConversationKey?: ConversationsProps['defaultActiveKey'];
  onConversationChange?: ConversationsProps['onActiveChange'];
  onConversationCreate?: () => void;
  conversationTitle?: ReactNode;
  messages?: UniChatUIMessage[];
  roleConfig?: BubbleListProps['role'];
  showWelcomeWhenEmpty?: boolean;
  welcomeTitle?: ReactNode;
  welcomeDescription?: ReactNode;
  welcomeIcon?: ReactNode;
  welcomeExtra?: ReactNode;
  prompts?: PromptsItemType[];
  promptsTitle?: ReactNode;
  onPromptSelect?: (prompt: PromptsItemType) => void;
  senderPlaceholder?: string;
  senderDisabled?: boolean;
  senderLoading?: boolean;
  senderSubmitType?: SenderProps['submitType'];
  senderValue?: string;
  defaultSenderValue?: string;
  onSenderChange?: (value: string) => void;
  onSend?: (value: string) => void;
  bubbleListProps?: Omit<BubbleListProps, 'items' | 'role'>;
  conversationsProps?: Omit<ConversationsProps, 'items' | 'activeKey' | 'defaultActiveKey' | 'onActiveChange'>;
  promptsProps?: Omit<PromptsProps, 'items' | 'title' | 'onItemClick'>;
  senderProps?: Omit<
    SenderProps,
    'value' | 'defaultValue' | 'placeholder' | 'disabled' | 'loading' | 'submitType' | 'onChange' | 'onSubmit'
  >;
};

// Placement and bubble colours come from UniBubble.List defaultRoles.
// Only avatar and typing are specified here — they are merged per-key, not overriding styles.
const defaultRoleConfig: NonNullable<BubbleListProps['role']> = {
  ai: {
    placement: 'start',
    avatar: <span className="uni-chat-ui__avatar">AI</span>,
    typing: true,
  },
  user: {
    placement: 'end',
    avatar: <span className="uni-chat-ui__avatar uni-chat-ui__avatar--user">You</span>,
  },
  system: {
    placement: 'start',
    variant: 'borderless',
  },
};

const toBubbleItems = (messages: UniChatUIMessage[]): BubbleItemType[] =>
  messages.map(message => ({
    key: message.id,
    role: message.role,
    content: message.content,
    status: message.status,
    loading: message.loading,
  }));

const isTextPrompt = (prompt: PromptsItemType): prompt is PromptsItemType & { label: string } =>
  typeof prompt.label === 'string';

export const UniChatUI = ({
  className,
  style,
  conversations = [],
  activeConversationKey,
  defaultActiveConversationKey,
  onConversationChange,
  onConversationCreate,
  conversationTitle = 'Conversations',
  messages = [],
  roleConfig,
  showWelcomeWhenEmpty = true,
  welcomeTitle = 'Start a conversation',
  welcomeDescription = 'Send a prompt to begin exploring an AI-assisted workflow.',
  welcomeIcon,
  welcomeExtra,
  prompts = [],
  promptsTitle = 'Suggested prompts',
  onPromptSelect,
  senderPlaceholder = 'Ask UniChatUI...',
  senderDisabled = false,
  senderLoading = false,
  senderSubmitType = 'enter',
  senderValue,
  defaultSenderValue = '',
  onSenderChange,
  onSend,
  bubbleListProps,
  conversationsProps,
  promptsProps,
  senderProps,
}: UniChatUIProps) => {
  const [internalSenderValue, setInternalSenderValue] = useState(defaultSenderValue);

  const mergedSenderValue = senderValue ?? internalSenderValue;

  const syncSenderValue = (nextValue: string) => {
    if (senderValue === undefined) {
      setInternalSenderValue(nextValue);
    }
    onSenderChange?.(nextValue);
  };

  const bubbleItems = useMemo(() => toBubbleItems(messages), [messages]);
  const hasMessages = bubbleItems.length > 0;
  const hasConversations = (conversations?.length ?? 0) > 0;
  const hasPrompts = prompts.length > 0;

  const mergedCreation =
    onConversationCreate || conversationsProps?.creation
      ? {
          ...conversationsProps?.creation,
          onClick: (event?: ReactMouseEvent<HTMLButtonElement>) => {
            conversationsProps?.creation?.onClick?.(event);
            onConversationCreate?.();
          },
        }
      : undefined;

  const handlePromptClick: NonNullable<PromptsProps['onItemClick']> = info => {
    onPromptSelect?.(info.data);

    if (isTextPrompt(info.data)) {
      syncSenderValue(info.data.label);
    }
  };

  const handleSenderChange: NonNullable<SenderProps['onChange']> = nextValue => {
    syncSenderValue(nextValue);
  };

  const handleSenderSubmit: NonNullable<SenderProps['onSubmit']> = nextValue => {
    const trimmedValue = nextValue.trim();
    if (!trimmedValue) {
      return;
    }

    onSend?.(trimmedValue);
    syncSenderValue('');
  };

  return (
    <div className={classNames('uni-chat-ui', className)} style={style}>
      {hasConversations ? (
        <aside className="uni-chat-ui__sidebar">
          <div className="uni-chat-ui__sidebar-title">{conversationTitle}</div>
          <div className="uni-chat-ui__conversation-list">
            <UniConversations
              {...conversationsProps}
              items={conversations}
              activeKey={activeConversationKey}
              defaultActiveKey={defaultActiveConversationKey}
              onActiveChange={onConversationChange}
              creation={mergedCreation}
            />
          </div>
        </aside>
      ) : null}

      <section className="uni-chat-ui__main">
        <div className="uni-chat-ui__messages">
          {showWelcomeWhenEmpty && !hasMessages ? (
            <UniWelcome
              className="uni-chat-ui__welcome"
              title={welcomeTitle}
              description={welcomeDescription}
              icon={welcomeIcon}
              extra={welcomeExtra}
            />
          ) : (
            <UniBubble.List {...bubbleListProps} items={bubbleItems} role={roleConfig ?? defaultRoleConfig} />
          )}
        </div>

        {hasPrompts ? (
          <div className="uni-chat-ui__prompts">
            <UniPrompts {...promptsProps} items={prompts} title={promptsTitle} onItemClick={handlePromptClick} />
          </div>
        ) : null}

        <div className="uni-chat-ui__sender">
          <UniSender
            {...senderProps}
            value={mergedSenderValue}
            placeholder={senderPlaceholder}
            disabled={senderDisabled}
            loading={senderLoading}
            submitType={senderSubmitType}
            onChange={handleSenderChange}
            onSubmit={handleSenderSubmit}
          />
        </div>
      </section>
    </div>
  );
};

export default UniChatUI;
