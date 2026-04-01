import { useState, useMemo, useRef } from 'react';
import type { CSSProperties } from 'react';
import classNames from 'classnames';
import type { ConversationsProps } from '@ant-design/x';

import UniConversations from './primitives/UniConversations';
// Imports all .uni-chats-panel styles regardless of parent (overlay or sidebar usage)
import './UniAIAssistPanel.scss';

// ── Decision log ─────────────────────────────────────────────────────────────
// Search input: no ChatUI primitive exists for a text search field.
// Using a native <input> styled with design tokens rather than importing
// UniInput (different component family), keeps this file self-contained
// within the chat-ui module boundary.
//
// New Chat + Search use a nav-item pattern (icon + text label row) rather than
// the full-width teal CTA button shown in Figma. Agreed deviation — this pattern
// suits the narrow overlay context and matches modern AI assistant conventions
// (Claude, AI Assist). The full-width button is reserved for the full-page view
// (UniAIAssistHome). Note captured in PR description.
// ─────────────────────────────────────────────────────────────────────────────

export type UniChatsPanelVariant = 'overlay' | 'sidebar';

export type UniChatsPanelProps = {
  className?: string;
  style?: CSSProperties;
  /** 'overlay' (default) — absolute over AIAssistPanel. 'sidebar' — persistent inline panel. */
  variant?: UniChatsPanelVariant;
  conversations?: ConversationsProps['items'];
  activeConversationKey?: string;
  onConversationSelect?: (key: string) => void;
  onNewChat?: () => void;
  /** Called when the close button is clicked. Only applicable in overlay variant. */
  onClose?: () => void;
};

export const UniChatsPanel = ({
  className,
  style,
  variant = 'overlay',
  conversations = [],
  activeConversationKey,
  onConversationSelect,
  onNewChat,
  onClose,
}: UniChatsPanelProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;
    const q = searchQuery.toLowerCase();
    return conversations?.filter(c => {
      if (!('label' in c)) return true;
      const label = typeof c.label === 'string' ? c.label : '';
      return label.toLowerCase().includes(q);
    });
  }, [conversations, searchQuery]);

  const handleSearchClick = () => {
    setSearchActive(true);
    requestAnimationFrame(() => searchInputRef.current?.focus());
  };

  const handleSearchBlur = () => {
    if (!searchQuery.trim()) {
      setSearchActive(false);
    }
  };

  const handleExpandAndSearch = () => {
    setCollapsed(false);
    setTimeout(() => {
      setSearchActive(true);
      requestAnimationFrame(() => searchInputRef.current?.focus());
    }, 50);
  };

  const handleExpandAndNewChat = () => {
    setCollapsed(false);
    onNewChat?.();
  };

  // ── Collapsed sidebar strip ───────────────────────────────────────────────
  if (variant === 'sidebar' && collapsed) {
    return (
      <div
        className={classNames('uni-chats-panel', 'uni-chats-panel--sidebar', 'uni-chats-panel--collapsed', className)}
        style={style}
      >
        <div className="uni-chats-panel__collapsed-strip">
          <button
            type="button"
            className="uni-chats-panel__icon-btn"
            onClick={() => setCollapsed(false)}
            aria-label="Expand chat history"
            title="Chats"
          >
            <span className="material-symbols-outlined uni-chats-panel__header-icon" aria-hidden="true">
              menu_book
            </span>
          </button>
          <button
            type="button"
            className="uni-chats-panel__collapsed-new-chat"
            onClick={handleExpandAndNewChat}
            aria-label="New Chat"
            title="New Chat"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              add
            </span>
          </button>
          <button
            type="button"
            className="uni-chats-panel__icon-btn"
            onClick={handleExpandAndSearch}
            aria-label="Search conversations"
            title="Search"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              search
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={classNames('uni-chats-panel', { 'uni-chats-panel--sidebar': variant === 'sidebar' }, className)}
      style={style}
    >
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="uni-chats-panel__header">
        <div className="uni-chats-panel__header-title">
          <span className="material-symbols-outlined uni-chats-panel__header-icon" aria-hidden="true">
            menu_book
          </span>
          <span>Chats</span>
        </div>
        {variant === 'sidebar' ? (
          <button
            type="button"
            className="uni-chats-panel__icon-btn"
            onClick={() => setCollapsed(true)}
            aria-label="Collapse chat history"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              chevron_right
            </span>
          </button>
        ) : (
          <button type="button" className="uni-chats-panel__icon-btn" onClick={onClose} aria-label="Close chat history">
            <span className="material-symbols-outlined" aria-hidden="true">
              close
            </span>
          </button>
        )}
      </div>

      {/* ── New Chat nav-item ─────────────────────────────────────────── */}
      <button
        type="button"
        className="uni-chats-panel__nav-item uni-chats-panel__nav-item--new-chat"
        onClick={onNewChat}
      >
        <span className="uni-chats-panel__nav-item-icon">
          <span className="material-symbols-outlined" aria-hidden="true">
            add
          </span>
        </span>
        <span className="uni-chats-panel__nav-item-label">New Chat</span>
      </button>

      {/* ── Search nav-item (or active input) ────────────────────────── */}
      {searchActive ? (
        <div className="uni-chats-panel__nav-item uni-chats-panel__nav-item--search-active">
          <div className="uni-chats-panel__search-input-wrap">
            <span className="material-symbols-outlined uni-chats-panel__nav-search-icon" aria-hidden="true">
              search
            </span>
            <input
              ref={searchInputRef}
              type="text"
              className="uni-chats-panel__search-input"
              placeholder="Search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onBlur={handleSearchBlur}
              aria-label="Search conversations"
            />
          </div>
        </div>
      ) : (
        <button type="button" className="uni-chats-panel__nav-item" onClick={handleSearchClick}>
          <span className="uni-chats-panel__nav-item-icon uni-chats-panel__nav-item-icon--muted">
            <span className="material-symbols-outlined" aria-hidden="true">
              search
            </span>
          </span>
          <span className="uni-chats-panel__nav-item-label uni-chats-panel__nav-item-label--muted">Search</span>
        </button>
      )}

      {/* ── Divider ───────────────────────────────────────────────────── */}
      <hr className="uni-chats-panel__divider" />

      {/* ── Recents list ─────────────────────────────────────────────── */}
      <div className="uni-chats-panel__recents-label">Recents</div>
      <div className="uni-chats-panel__list">
        <UniConversations
          items={filteredConversations}
          activeKey={activeConversationKey}
          onActiveChange={key => onConversationSelect?.(String(key))}
        />
      </div>
    </div>
  );
};

export default UniChatsPanel;
