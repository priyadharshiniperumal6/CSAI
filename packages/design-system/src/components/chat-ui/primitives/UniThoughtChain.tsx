import React from 'react';
import { ThoughtChain, XProvider } from '@ant-design/x';
import type { ThoughtChainProps, XProviderProps } from '@ant-design/x';

// ── Uni theme tokens ────────────────────────────────────
// Source: _uniphore-design-tokens.json_ (UniveralThemeReactLib, Feb 2026)
const uniTheme: XProviderProps['theme'] = {
  token: {
    // Brand — primary.600 as colorPrimary (canonical antDesignTheme)
    // ThoughtChain uses colorPrimary for the active/loading node indicator
    colorPrimary: '#15808C', // antDesignTheme.token.colorPrimary
    colorPrimaryHover: '#127380', // bcolor.primary.700
    colorPrimaryActive: '#0E6772', // bcolor.primary.800
    colorPrimaryBg: '#E7F7FB', // bcolor.primary.100 — loading node bg ring
    colorPrimaryBgHover: '#CFF0F7', // bcolor.primary.200
    colorPrimaryBorder: '#72B8C2', // bcolor.primary.400
    colorPrimaryBorderHover: '#449CA7', // bcolor.primary.500

    // Surfaces
    colorBgContainer: '#ffffff', // bcolor.neutral.0
    colorBgLayout: '#faf9fb', // ucolor.fill.canvas-bg
    colorBgElevated: '#ffffff',

    // Text
    colorText: '#0e0c11', // ucolor.text.gray-primary / bcolor.uni-black.950
    colorTextSecondary: '#969498', // ucolor.text.gray-secondary / bcolor.uni-black.450
    colorTextDisabled: '#bfbfd0', // bcolor.neutral.300
    colorTextPlaceholder: '#6d6f79', // bcolor.neutral.600

    // Borders
    colorBorder: '#e9ecf4', // bcolor.neutral.100
    colorBorderSecondary: '#f1f2f4', // bcolor.neutral.75
    colorSplit: '#e9ecf4', // bcolor.neutral.100 — connector line

    // Semantic status — ThoughtChain maps status to these tokens
    colorSuccess: '#096b40', // bcolor.green.800 — success node icon
    colorSuccessBg: '#e9f7ed', // bcolor.green.100 — success node bg ring
    colorSuccessBorder: '#92deb1', // bcolor.green.300
    colorError: '#b01a15', // bcolor.red.700   — error node icon
    colorErrorBg: '#fff3f0', // bcolor.red.100   — error node bg ring
    colorErrorBorder: '#fcb3a4', // bcolor.red.300
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
  components: {
    ThoughtChain: {
      // 24px keeps the connector line math correct (32px broke it).
      // The filled circle appearance comes from CSS injection below.
      iconSize: 24,
    },
  },
};

// ── Status circle styles ──────────────────────────────────────
// The @ant-design/x ThoughtChain uses outline icons (CheckCircleOutlined etc.)
// with no background. We inject CSS once to add per-status filled backgrounds
// that match the design reference.
if (typeof document !== 'undefined') {
  const STYLE_ID = 'uni-thought-chain-status-styles';
  if (!document.getElementById(STYLE_ID)) {
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = `
      /* ── Node alignment ─────────────────────────────────────────────────────────
         AntX uses align-items: baseline on the node flex row. Once the status
         container is styled with inline-flex the flex baseline shifts and the icon
         drops below the text. Override to flex-start so the icon column and text
         column start at the same top edge. */
      .ant-thought-chain-node { align-items: flex-start !important; }

      /* ── Status circles: background + icon colour ────────────────────────────
         CheckCircleOutlined / CloseCircleOutlined / MinusCircleOutlined all draw
         their own ring as part of the SVG path — just add a background tint.
         LoadingOutlined is the exception: it renders a bare spinning arc (no ring).
         It needs explicit container sizing and centering so the arc sits inside a
         proper circle, and the inset box-shadow provides the visible ring. */
      .ant-thought-chain-status-success { background: #e9f7ed; border-radius: 50%; color: #139156 !important; }  /* colorSuccessBg / bcolor.green.700 */
      .ant-thought-chain-status-error   { background: #fff3f0; border-radius: 50%; color: #e35a4b !important; }  /* colorErrorBg / bcolor.red.500 */
      .ant-thought-chain-status-abort   { background: #f1f2f4; border-radius: 50%; color: #bfbfd0 !important; }  /* colorBorderSecondary / colorTextDisabled */
      .ant-thought-chain-status-loading {
        width: 24px; height: 24px;
        display: inline-flex; align-items: center; justify-content: center;
        background: #E7F7FB; border-radius: 50%;
        box-shadow: inset 0 0 0 1.5px #15808C;
        color: #15808C !important;
      }  /* colorPrimaryBg / colorPrimary */

      /* ── Custom icon items (no status): neutral gray circle ──────────────────
         When icon prop is used without status, AntX renders the custom icon inside
         the status container but adds no background. We give it explicit circle
         geometry (matching the loading circle size), a neutral fill, and a border
         ring via inset box-shadow (matching the technique used for loading).
         Note: AntX cannot show both a custom icon and a status colour simultaneously
         — status always overrides icon. Gray is intentional for no-status items. */
      .ant-thought-chain-node-icon:not(.ant-thought-chain-status-success):not(.ant-thought-chain-status-loading):not(.ant-thought-chain-status-error):not(.ant-thought-chain-status-abort) {
        width: 24px; height: 24px;
        display: inline-flex; align-items: center; justify-content: center;
        background: #f1f2f4; border-radius: 50%;
        box-shadow: inset 0 0 0 1.5px #e9ecf4;  /* colorBorder (bcolor.neutral.100) */
        color: #969498;
      }

      /* ── Node spacing ────────────────────────────────────────────────────────────
         The box container has no gap — spacing between nodes comes from description,
         content-box, and footer margins. When items are collapsed (no content) those
         margins are absent and nodes pack tightly. Adding gap: 8px ensures a minimum
         baseline gap between all nodes regardless of content. */
      .ant-thought-chain-box { gap: 8px; }

      /* ── Connector line fix ─────────────────────────────────────────────────────
         Component calculates top as iconSize × lineHeight (24 × 1.5714 = 37.7px),
         leaving a gap. Override to start the connector right after the 24px icon. */
      .ant-thought-chain-node-icon::after {
        top: 24px !important;
        height: calc(100% - 24px) !important;
      }

      /* ── Spacing ────────────────────────────────────────────────────────────────
         AntD defaults description margin-block-end and content-box margin-bottom
         to token.margin (16px) — too spacious. Reduce to 8px (2 × 4px grid).
         Footer: 12px / colorTextSecondary to match design reference. */
      .ant-thought-chain-node-description { font-size: 12px; margin-block-end: 8px !important; }  /* fontSizeSM — description is secondary text, one step down from title */
      .ant-thought-chain-node-content-box { margin-bottom: 8px !important; }
      .ant-thought-chain-node-footer { font-size: 12px; color: #969498; }

      /* ── Node box ───────────────────────────────────────────────────────────────
         Stretch so timestamps inside title ReactNodes can be right-aligned. */
      .ant-thought-chain-node-box { flex: 1; min-width: 0; }
    `;
    document.head.appendChild(el);
  }
}

// ── UniThoughtChain ──────────────────────────────────────
//
// Thin wrapper around @ant-design/x ThoughtChain.
// Inherits all upstream functionality: status indicators, collapsible
// expand/collapse, blink animation on loading items, custom icons,
// icon/title/description/content/footer per item.
//
// Valid status values: 'loading' | 'success' | 'error' | 'abort'
//
// Status colour rationale:
//   loading → colorPrimary (#15808C teal) — active AI execution, brand-aligned
//   success → colorSuccess (#096b40 green) — semantic success, distinct from brand
//   error   → colorError   (#b01a15 red)   — semantic error
//   abort   → neutral gray                 — skipped/cancelled step
//
// Note: custom icon prop is only rendered when status is NOT set.
// When status is provided, the built-in status icon takes precedence.
//
// Note: there is no 'extra' prop for right-aligned timestamp text.
// Pass timestamps as ReactNode inside the title prop if needed.

export interface UniThoughtChainProps extends ThoughtChainProps {}

const UniThoughtChain: React.FC<UniThoughtChainProps> = props => {
  return (
    <XProvider theme={uniTheme}>
      <ThoughtChain {...props} />
    </XProvider>
  );
};

export default UniThoughtChain;
