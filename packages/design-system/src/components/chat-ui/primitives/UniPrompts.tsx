import React from 'react';
import { ConfigProvider } from 'antd';
import { Prompts } from '@ant-design/x';
import type { PromptsProps } from '@ant-design/x';

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
    fontFamily: "'Inter', sans-serif",
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
};

// ── CSS injection ────────────────────────────────────────────────────────────
//
// Twelve overrides that ConfigProvider alone cannot reach for Prompts.
// All values are token-backed — no fabricated values.
//
// ── Upgrade checklist (review each on @ant-design/x version bump) ────────────
//
// 1. ITEM BORDER RADIUS
//    Source: es/prompts/style/index.js — item uses token.borderRadiusLG (16px).
//    prepareComponentToken() returns {} — no Prompts-specific radius token exists.
//    Remove when: AntX adds a borderRadius Prompts component token.
//    Then set via: ConfigProvider.components.Prompts.borderRadius = 8.
//
// 2. ITEM BORDER COLOR
//    Source: same — item border uses token.colorBorderSecondary (#f1f2f4).
//    We need colorBorder (#e9ecf4). Setting colorBorderSecondary globally affects other components.
//    Remove when: AntX adds an itemBorderColor Prompts component token.
//
// 3. ITEM PADDING (CHIP)
//    Source: same — paddingBlock: token.paddingSM (12px), paddingInline: token.padding (16px).
//    Design reference: 6px 12px. Cannot reduce global padding/paddingSM tokens.
//    Remove when: AntX adds paddingBlock / paddingInline Prompts component tokens.
//
// 4. ITEM PADDING (CARD — has description)
//    Source: same padding formula; card items need more breathing room (12px 14px).
//    Uses :has(.ant-prompts-desc) to target only items that render a description.
//    Remove when: AntX adds distinct chip vs card padding tokens.
//
// 5. LIST GAP
//    Source: same — list gap uses token.paddingSM (12px). Design reference: 8px.
//    Cannot reduce global paddingSM without affecting other components.
//    Remove when: AntX adds a gap / itemGap Prompts component token.
//
// 6. HOVER BACKGROUND + BORDER
//    Source: same — item :hover uses token.colorFillTertiary; border unchanged on hover.
//    We need primary.100 (#E7F7FB) bg + primary.400 (#72B8C2) border.
//    colorFillTertiary is a global utility token.
//    Remove when: AntX adds itemHoverBg / itemHoverBorderColor Prompts component tokens.
//
// 7. ACTIVE (PRESS) STATE
//    Source: same — item :active uses token.colorFill. Design reference shows primary.100
//    bg + colorPrimary (#15808C) border (a step stronger than hover's primary.400 border).
//    Remove when: AntX adds itemActiveBg / itemActiveBorderColor Prompts component tokens.
//
// 8. ICON COLOR
//    Source: same — .ant-prompts-icon inherits colorText (#0e0c11) by default.
//    Design reference: neutral.600 at rest, primary.600 on hover/active.
//    Remove when: AntX adds iconColor / iconHoverColor Prompts component tokens.
//
// 9. DESCRIPTION FONT SIZE + COLOR
//    Source: same — .ant-prompts-desc uses token.fontSize (14px) and token.colorTextTertiary.
//    Design reference: fontSizeSM (12px) / colorTextSecondary (#969498).
//    Remove when: AntX adds descriptionFontSize / descriptionColor Prompts component tokens.
//
// 10. TITLE FONT SIZE, WEIGHT, COLOR + MARGIN
//    Source: same — .ant-prompts-title uses token.colorTextTertiary + fontWeight: 'normal'.
//    Design reference: 12px / 600 / colorText (#0e0c11) / margin-bottom 8px.
//    Remove when: AntX adds titleFontSize / titleFontWeight / titleColor Prompts component tokens.
//
// 11. NESTED CONTAINER BACKGROUND
//    Source: same — .ant-prompts-nested uses token.colorFillQuaternary (near-transparent).
//    Design reference: neutral.50 (#f8f9fc) — a visible light fill matching the canvas bg.
//    Remove when: AntX adds a nestedBg Prompts component token.
//
// 12. NESTED SUB-ITEM STYLING
//    Source: same — nested items render as full bordered chips (same as top-level items).
//    Design reference shows sub-items as compact borderless text rows inside the container.
//    Overrides: remove border/bg, reduce padding, add small hover tint, tighter radius.
//    Remove when: AntX adds distinct styling for nested vs top-level items.
//
const STYLE_ID = 'uni-prompts-styles';
if (typeof document !== 'undefined') {
  let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }
  style.textContent = `
    /* (1) Item border radius: borderRadiusLG (16px) → 8px */
    .ant-prompts-item {
      border-radius: 8px !important;
    }
    /* (2) Item border color: colorBorderSecondary (#f1f2f4) → colorBorder (#e9ecf4) */
    .ant-prompts-item {
      border-color: #e9ecf4 !important;
    }
    /* (3) Chip padding: paddingBlock=paddingSM(12px) + paddingInline=padding(16px) → 6px 12px */
    .ant-prompts-item {
      padding: 6px 12px !important;
    }
    /* (4) Card padding (item has description): → 12px 14px */
    .ant-prompts-item:has(.ant-prompts-desc) {
      padding: 12px 14px !important;
    }
    /* (5) List gap: paddingSM (12px) → 8px */
    .ant-prompts-list {
      gap: 8px !important;
    }
    /* (6) Hover: colorFillTertiary → primary.100 bg + primary.400 border */
    .ant-prompts-item:not(.ant-prompts-item-disabled):hover {
      background-color: #E7F7FB !important;
      border-color: #72B8C2 !important;
    }
    /* (7) Active (press): colorFill → primary.100 bg + colorPrimary border */
    .ant-prompts-item:not(.ant-prompts-item-disabled):active {
      background-color: #E7F7FB !important;
      border-color: #15808C !important;
    }
    /* (8) Icon color at rest → neutral.600; on hover/active → primary.600 */
    .ant-prompts-icon {
      color: #6d6f79 !important;
    }
    .ant-prompts-item:not(.ant-prompts-item-disabled):hover .ant-prompts-icon,
    .ant-prompts-item:not(.ant-prompts-item-disabled):active .ant-prompts-icon {
      color: #15808C !important;
    }
    /* (9) Description font size: token.fontSize (14px) → 12px; color → colorTextSecondary */
    .ant-prompts-desc {
      font-size: 12px !important;
      color: #969498 !important;
    }
    /* (10) Title: colorTextTertiary + normal → 12px / 600 / colorText; margin-bottom → 8px */
    .ant-prompts-title {
      font-size: 12px !important;
      font-weight: 600 !important;
      color: #0e0c11 !important;
      margin-bottom: 8px !important;
    }
    /* (11) Nested container: colorFillQuaternary → neutral.50 bg + neutral.100 border */
    .ant-prompts-nested {
      background: #f8f9fc !important;
      border-color: #e9ecf4 !important;
    }
    /* (12) Nested sub-items: borderless compact text rows (not full bordered chips) */
    .ant-prompts-nested .ant-prompts-item {
      border: none !important;
      background: transparent !important;
      border-radius: 4px !important;
      padding: 5px 10px !important;
    }
    .ant-prompts-nested .ant-prompts-item:not(.ant-prompts-item-disabled):hover {
      background: #E7F7FB !important;
      border: none !important;
    }
  `;
}

// ── UniPrompts ──────────────────────────────────────────────────────────
//
// Thin wrapper around @ant-design/x Prompts.
// Inherits all upstream functionality: horizontal/vertical layout,
// wrapping, nested sub-prompts, icons, disabled items, title, onItemClick.
//
// Chip hover uses primary.100 (#E7F7FB) bg + primary.400 (#72B8C2) border —
// a teal whisper that mirrors the User bubble and focus states.
// Full teal (#15808C) appears only on the icon-on-hover transition.
// Prompts are suggestions, not primary CTAs — full-strength teal is
// reserved for the send button (Sender) and active indicators (Conversations).

export interface UniPromptsProps extends PromptsProps {}

const UniPrompts: React.FC<UniPromptsProps> = props => (
  <ConfigProvider theme={uniChatTheme}>
    <Prompts {...props} />
  </ConfigProvider>
);

export default UniPrompts;
