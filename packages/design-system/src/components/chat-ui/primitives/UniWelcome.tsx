import React from 'react';
import { ConfigProvider } from 'antd';
import { Welcome } from '@ant-design/x';
import type { WelcomeProps } from '@ant-design/x';

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
    colorSplit: '#e9ecf4', // bcolor.neutral.100

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
// Two overrides that ConfigProvider alone cannot reach for Welcome.
// All values are token-backed — no fabricated values.
//
// ── Upgrade checklist (review each on @ant-design/x version bump) ────────────
//
// 1. FILLED VARIANT BORDER RADIUS
//    Source: es/welcome/style/index.js — filled uses token.borderRadiusLG (16px).
//    prepareComponentToken() returns {} — no Welcome-specific radius token.
//    Remove when: AntX adds a borderRadius Welcome component token.
//    Then set via: ConfigProvider.components.Welcome.borderRadius = 8.
//
// 2. DESCRIPTION COLOR
//    Source: same — .ant-welcome-description renders via Typography.Text which
//    inherits colorText (#0e0c11). Design reference requires colorTextSecondary
//    (#969498) — secondary text reads as supporting copy, not primary content.
//    Remove when: AntX adds a descriptionColor Welcome component token.
//
const STYLE_ID = 'uni-welcome-styles';
if (typeof document !== 'undefined') {
  let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }
  style.textContent = `
    /* (1) Filled variant border radius: borderRadiusLG (16px) → 8px */
    .ant-welcome-filled {
      border-radius: 8px !important;
    }
    /* (2) Description color: colorText (#0e0c11) → colorTextSecondary (#969498) */
    .ant-welcome-description {
      color: #969498 !important;
    }
  `;
}

// ── UniWelcome ──────────────────────────────────────────────────────────
//
// Thin wrapper around @ant-design/x Welcome.
// Inherits all upstream functionality: icon, title, description, extra slot,
// and variant ('filled' | 'borderless').
//
// Note: Welcome has no `prompts` prop. To show prompt chips below a Welcome
// screen, compose <UniWelcome> and <UniPrompts> as siblings in a
// flex-column container. See the WithPrompts story for the pattern.
//
// Icon container: AntX renders the `icon` prop as-is with no added styling.
// Pass a pre-styled ReactNode (48×48, borderRadius 12, primary.100 bg +
// primary.200 border + primary.600 icon color) to match the design reference.

export interface UniWelcomeProps extends WelcomeProps {}

const UniWelcome: React.FC<UniWelcomeProps> = props => (
  <ConfigProvider theme={uniChatTheme}>
    <Welcome {...props} />
  </ConfigProvider>
);

export default UniWelcome;
