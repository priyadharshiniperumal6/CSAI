import React from 'react';
import { ConfigProvider } from 'antd';
import { Conversations } from '@ant-design/x';
import type { ConversationsProps } from '@ant-design/x';

// ── Uni theme tokens ────────────────────────────────────────────────────
// Source: _uniphore-design-tokens.json_ (UniversalThemeReactLib, Feb 2026)
const uniChatTheme = {
  token: {
    // Brand — teal (primary.600 = colorPrimary per antDesignTheme)
    colorPrimary: '#15808C', // antDesignTheme.token.colorPrimary
    colorPrimaryHover: '#127380', // bcolor.primary.700
    colorPrimaryActive: '#0E6772', // bcolor.primary.800
    colorPrimaryBg: '#E7F7FB', // bcolor.primary.100
    colorPrimaryBgHover: '#CFF0F7', // bcolor.primary.200
    colorPrimaryBorder: '#72B8C2', // bcolor.primary.400
    colorPrimaryBorderHover: '#449CA7', // bcolor.primary.500

    // Surfaces
    colorBgContainer: '#ffffff', // bcolor.neutral.0
    colorBgLayout: '#faf9fb', // ucolor.fill.canvas-bg
    colorBgElevated: '#ffffff', // bcolor.neutral.0

    // Text
    colorText: '#0e0c11', // ucolor.text.gray-primary / bcolor.uni-black.950
    colorTextSecondary: '#969498', // ucolor.text.gray-secondary / bcolor.uni-black.450
    colorTextDisabled: '#bfbfd0', // bcolor.neutral.300
    colorTextPlaceholder: '#6d6f79', // bcolor.neutral.600

    // Borders
    colorBorder: '#e9ecf4', // bcolor.neutral.100
    colorBorderSecondary: '#f1f2f4', // bcolor.neutral.75

    // Semantic
    colorSuccess: '#096b40', // bcolor.green.800
    colorSuccessBg: '#e9f7ed', // bcolor.green.100
    colorError: '#b01a15', // bcolor.red.700
    colorErrorBg: '#fff3f0', // bcolor.red.100
    colorWarning: '#cc860c', // bcolor.gold.700
    colorWarningBg: '#fffbe8', // bcolor.gold.100
    colorInfo: '#2263d5', // bcolor.blue.600
    colorInfoBg: '#f0f8ff', // bcolor.blue.100

    // Typography
    fontFamily: "'Inter', sans-serif", // typography.fontFamily
    fontSize: 14, // typography.fontSize.300
    fontSizeSM: 12, // typography.fontSize.200
    fontSizeLG: 16, // typography.fontSize.400
    lineHeight: 1.5714,

    // Shape
    borderRadius: 8, // borderRadius.300
    borderRadiusSM: 4, // borderRadius.200
    borderRadiusLG: 16, // borderRadius.400
    borderRadiusXS: 2, // borderRadius.100

    // Motion
    motionDurationMid: '0.2s',
    motionDurationSlow: '0.3s',
  },
  components: {
    // Menu overrides — Conversations uses Menu internally
    Menu: {
      itemBg: 'transparent',
      itemSelectedBg: '#E7F7FB', // bcolor.primary.100 — active conversation bg
      itemSelectedColor: '#0e0c11', // keep text dark on active, teal for indicator only
      itemHoverBg: '#f8f9fc', // bcolor.neutral.50
      itemHoverColor: '#0e0c11',
      itemActiveBg: '#E7F7FB', // bcolor.primary.100
      activeBarBorderWidth: 2, // borderWidth.100 × 2
      activeBarWidth: 2,
      activeBarHeight: 24,
      itemColor: '#0e0c11',
      groupTitleColor: '#969498', // ucolor.text.gray-secondary
      groupTitleFontSize: 11,
      fontSize: 14, // typography.fontSize.300
      borderRadius: 6, // slightly tighter than global 8px for list items
      colorSplit: '#e9ecf4', // bcolor.neutral.100 — group dividers
    },
  },
};

// ── CSS injection ────────────────────────────────────────────────────────────
//
// AntX Conversations does NOT use antd Menu internally — it renders a plain
// <ul>/<li> structure with its own CSS-in-JS. The Menu component overrides in
// uniChatTheme above only affect the Dropdown action menu (menu prop), not the
// conversation item list itself.
//
// Eight overrides are needed that ConfigProvider alone cannot reach:
//
// ── Upgrade checklist (review each on @ant-design/x version bump) ────────────
//
// 1. ITEM BORDER RADIUS
//    Source: es/conversations/style/index.js — item uses token.borderRadiusLG (16px).
//    No Conversations-specific borderRadius component token in prepareComponentToken().
//    Remove when: AntX adds a borderRadius Conversations component token.
//    Then set via: ConfigProvider.components.Conversations.borderRadius = 6.
//
// 2. HOVER BACKGROUND
//    Source: same — item :hover uses token.colorBgTextHover.
//    colorBgTextHover is not set in our theme (intentionally — it affects many components).
//    Remove when: AntX adds an itemHoverBg Conversations component token.
//
// 3. ACTIVE BACKGROUND
//    Source: same — item-active uses the SAME token.colorBgTextHover as hover.
//    No separate selected/active bg token for Conversations.
//    Remove when: AntX adds an itemSelectedBg Conversations component token.
//
// 4. ACTIVE LEFT INDICATOR BAR
//    Not rendered by AntX at all. Custom addition matching the design reference.
//    Remove when: AntX adds native active-bar support to Conversations.
//
// 5. LABEL FLEX LAYOUT
//    Source: es/conversations/Item.js — label rendered in Typography.Text (<span>)
//    with white-space: nowrap / text-overflow: ellipsis from the CSS-in-JS.
//    Making it a flex container allows a timestamp <span> to sit at the right.
//    Inner title span must carry its own min-width: 0 / overflow: hidden.
//    Remove when: AntX adds a native timestamp or suffix slot to ConversationItemType.
//
// 6. GROUP TITLE HEIGHT
//    Source: es/conversations/style/index.js — group-title uses height + minHeight:
//    token.controlHeightLG (40px). No group-specific height token.
//    Remove when: AntX adds a groupTitleHeight Conversations component token.
//
// 7. GROUP LABEL SIZE / STYLE
//    Source: same — group-label inherits token.fontSize (14px) with no override.
//    Design reference requires 11px/600/uppercase/letter-spacing.
//    Remove when: AntX exposes groupTitleFontSize / groupTitleFontWeight tokens
//    (currently these exist in Menu but not in Conversations).
//
// 8. GROUP SEPARATOR
//    Not rendered by AntX at all. Group container <li> has no built-in class;
//    separator is added via CSS adjacent-sibling selector on the root <ul>.
//    Remove when: AntX adds native group divider support to Conversations.
//
const STYLE_ID = 'uni-conversations-styles';
if (typeof document !== 'undefined') {
  let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }
  style.textContent = `
    /* (1) Item radius: borderRadiusLG (16px) → 6px */
    .ant-conversations-item {
      border-radius: 6px !important;
    }
    /* (2) Hover background: neutral.50 */
    .ant-conversations-item:not(.ant-conversations-item-disabled):hover {
      background-color: #f8f9fc !important;
    }
    /* (3) Active background: primary.100 — overrides shared colorBgTextHover */
    .ant-conversations-item-active {
      background-color: #E7F7FB !important;
      position: relative !important;
    }
    /* (4) Active left bar: 2px primary.600 indicator */
    .ant-conversations-item-active::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 2px;
      height: 20px;
      border-radius: 1px;
      background: #15808C;
    }
    /* (5) Label flex: allows inline timestamp span on the right */
    .ant-conversations-label {
      display: flex !important;
      align-items: center !important;
      gap: 4px !important;
    }
    /* (6) Group title height: controlHeightLG (40px) → compact */
    .ant-conversations-group-title {
      height: auto !important;
      min-height: auto !important;
      padding: 12px 8px 4px !important;
    }
    /* (7) Group label: 11px / 600 / uppercase — inherits 14px from token.fontSize */
    .ant-conversations-group-label {
      font-size: 11px !important;
      font-weight: 600 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.05em !important;
      color: #969498 !important;
    }
    /* (8) Group separator: 1px line above every group except the first.
       Group container <li> has no built-in class; adjacent-sibling on root <ul>. */
    .ant-conversations > li + li .ant-conversations-group-title {
      border-top: 1px solid #e9ecf4 !important;
    }
    /* (9) Creation button: solid teal CTA.
       AntX source: es/conversations/style/index.js genConversationsStyle()
       Computes creationBgColor as colorPrimary @ 0.15 alpha — a subtle tint, not a CTA.
       Override to full-strength primary.600 (#15808C) matching our button type="primary".
       Remove when AntX adds a creationVariant / creationType token to ConversationsToken. */
    .ant-conversations-creation {
      background-color: #15808C !important;
      border-color: #15808C !important;
      color: #ffffff !important;
    }
    .ant-conversations-creation:not(.ant-conversations-creation-disabled):hover {
      background-color: #127380 !important;
      border-color: #127380 !important;
      color: #ffffff !important;
    }
    .ant-conversations-creation .ant-conversations-creation-label,
    .ant-conversations-creation .ant-conversations-creation-icon {
      color: #ffffff !important;
    }
  `;
}

// ── UniConversations ─────────────────────────────────────────────────────
//
// Thin wrapper around @ant-design/x Conversations.
// Inherits all upstream functionality: grouping, context menus,
// icons, active state, disabled items, keyboard shortcuts, Creation button.
//
// Active item uses primary.100 (#E7F7FB) background fill —
// consistent with the User bubble and focus states across the system.
// Full teal (#15808C) surfaces only as the left active-bar indicator.

export interface UniConversationsProps extends ConversationsProps {}

const UniConversations: React.FC<UniConversationsProps> & {
  Creation: typeof Conversations.Creation;
} = props => {
  return (
    <ConfigProvider theme={uniChatTheme}>
      <Conversations {...props} />
    </ConfigProvider>
  );
};

UniConversations.Creation = Conversations.Creation;

export default UniConversations;
