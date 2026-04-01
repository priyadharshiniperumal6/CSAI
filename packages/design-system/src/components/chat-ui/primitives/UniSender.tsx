import React from 'react';
import { ConfigProvider } from 'antd';
import { Sender } from '@ant-design/x';
import type { SenderProps } from '@ant-design/x';

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
    // Input overrides — from antDesignTheme.components.Input
    Input: {
      colorBorder: '#8b8ba0', // bcolor.neutral.500
      colorBgContainer: '#ffffff', // bcolor.neutral.0
      colorText: '#424242', // bcolor.neutral.700
      lineWidth: 1, // borderWidth.100
      borderRadius: 4, // borderRadius.200
      colorTextPlaceholder: '#6d6f79', // bcolor.neutral.600
      hoverBorderColor: '#15808C', // antDesignTheme.token.colorPrimary
      colorPrimaryHover: '#15808C',
      colorPrimaryActive: '#15808C',
      fontSize: 14, // typography.fontSize.300
    },
    // Button overrides — from antDesignTheme.components.Button
    Button: {
      borderRadius: 8, // borderRadius.300
      fontSizeSM: 14,
      fontSize: 14,
      fontSizeLG: 12,
      borderRadiusLG: 8,
      colorBgTextHover: '#E7F7FB', // bcolor.primary.100
    },
  },
};

// ── CSS injection ────────────────────────────────────────────────────────────
//
// Three AntX CSS-in-JS overrides that cannot be resolved through ConfigProvider.
// All injected values are token-backed (bradius.300 = 8px).
//
// ── Upgrade checklist (review each on @ant-design/x version bump) ────────────
//
// 1. CONTAINER BORDER-RADIUS
//    Source: es/sender/style/index.js → genSenderStyle()
//    Hardcodes: calc(token.borderRadius).mul(2) = 16px with our tokens.
//    No Sender-specific borderRadius token in prepareComponentToken().
//    Remove when: AntX adds `borderRadius` to Sender's component tokens.
//    Then set via: ConfigProvider.components.Sender.borderRadius = 8.
//
// 2. HEADER BAR TOP CORNERS
//    Source: es/sender/style/header.js → genSenderHeaderStyle()
//    Same × 2 formula on .ant-sender-header-header (bottom corners stay 0).
//    Remove when: same condition as (1).
//
// 3. ACTION BUTTON SHAPE
//    Source: es/sender/components/SendButton.js + LoadingButton/index.js
//    Both hardcode shape="circle", forcing border-radius: 50% in antd regardless
//    of the Button.borderRadius component token.
//    Remove when: AntX removes the hardcoded shape or exposes it as a prop.
//    Then verify: ConfigProvider.components.Button.borderRadius = 8 applies.
//
const STYLE_ID = 'uni-sender-styles';
if (typeof document !== 'undefined') {
  let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }
  style.textContent = `
    /* Outer container: token.borderRadius × 2 → 8px (borderRadius.300) */
    .ant-sender-main {
      border-radius: 8px !important;
    }
    /* Header top bar: same × 2 formula; bottom corners stay 0 (flush with body) */
    .ant-sender-header-header {
      border-radius: 8px 8px 0 0 !important;
    }
    /* Send + cancel buttons: shape="circle" hardcoded → 8px (borderRadius.300) */
    .ant-sender-actions-btn .ant-btn,
    .ant-sender-actions-btn .ant-btn-circle {
      border-radius: 8px !important;
    }
  `;
}

// ── UniSender ───────────────────────────────────────────────────────────
//
// Thin wrapper around @ant-design/x Sender.
// Inherits all upstream functionality: slot mode, speech input,
// file paste, ref control, Sender.Header/Switch, etc.
//
// Theme rationale:
//   colorPrimary = #15808C (primary.600) — the send button uses
//   full-strength teal only when there is content to submit.
//   This is the one surface where teal at full strength is correct:
//   it's an interactive CTA. Empty → gray (disabled aesthetic).

export interface UniSenderProps extends SenderProps {}

const UniSender: React.FC<UniSenderProps> & {
  Header: typeof Sender.Header;
  Switch: typeof Sender.Switch;
} = props => {
  return (
    <ConfigProvider theme={uniChatTheme}>
      <Sender {...props} />
    </ConfigProvider>
  );
};

UniSender.Header = Sender.Header;
UniSender.Switch = Sender.Switch;

export default UniSender;
