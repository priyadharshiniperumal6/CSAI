/* eslint-disable react/prop-types */ // TypeScript interfaces replace propTypes for this component
import React from 'react';
import { ConfigProvider } from 'antd';
import { Bubble } from '@ant-design/x';
import type { BubbleProps, BubbleListProps } from '@ant-design/x';

// ── CSS injection ────────────────────────────────────────────
// AntX sets marginBlockStart: token.margin (16px) on .ant-bubble-footer via
// CSS-in-JS, but this rule does not apply in the Storybook/Vite context.
// Injecting directly ensures consistent 8px (marginXS) gap above the footer.
const STYLE_ID = 'uni-bubble-styles';
if (typeof document !== 'undefined') {
  let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }
  style.textContent = `
    .ant-bubble-footer {
      margin-block-start: 2px !important; /* tight under the bubble */
    }
  `;
}

// ── Uni theme tokens ────────────────────────────────────
const uniChatTheme = {
  token: {
    // Brand — teal reserved for user actions only
    colorPrimary: '#15808C',
    colorPrimaryHover: '#15808C',
    colorPrimaryActive: '#0E6772',
    colorPrimaryBg: '#E7F7FB',
    colorPrimaryBgHover: '#CFF0F7',
    colorPrimaryBorder: '#72B8C2',
    colorPrimaryBorderHover: '#449CA7',

    // Surfaces
    colorBgContainer: '#ffffff',
    colorBgLayout: '#faf9fb',
    colorBgElevated: '#ffffff',

    // Text
    colorText: '#0e0c11',
    colorTextSecondary: '#969498',
    colorTextDisabled: '#bfbfd0',
    colorTextPlaceholder: '#6d6f79',

    // Borders
    colorBorder: '#e9ecf4',
    colorBorderSecondary: '#f1f2f4',

    // Semantic
    colorSuccess: '#096b40',
    colorSuccessBg: '#e9f7ed',
    colorError: '#b01a15',
    colorErrorBg: '#fff3f0',
    colorWarning: '#cc860c',
    colorWarningBg: '#fffbe8',
    colorInfo: '#2263d5',
    colorInfoBg: '#f0f8ff',

    // Typography
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    fontSizeSM: 12,
    fontSizeLG: 16,
    lineHeight: 1.5714,

    // Shape
    borderRadius: 8,
    borderRadiusSM: 4,
    borderRadiusLG: 16,
    borderRadiusXS: 2,

    // Motion
    motionDurationMid: '0.2s',
    motionDurationSlow: '0.3s',
  },
  components: {
    Avatar: {
      containerSize: 36,
      containerSizeSM: 28,
      containerSizeLG: 44,
      colorTextPlaceholder: '#969498',
    },
  },
};

// ── Bubble style variants ────────────────────────────────────
//
// Bubble colour rationale:
//   AI   → white bg, neutral border — recedes completely
//   User → primary.100 (#E7F7FB) — subtle teal whisper,
//           ties back to the brand without noise
//
// Teal is NOT used at full strength on either side.
// Full teal (#449CA7) is reserved for interactive elements
// (buttons, links, focus rings) elsewhere in the product.
//
// neutral.0   #ffffff  AI bubble bg
// neutral.100 #e9ecf4  AI bubble border
// neutral.900 #0e0c11  AI bubble text
// primary.100 #E7F7FB  User bubble bg
// primary.200 #CFF0F7  User bubble border
// neutral.900 #0e0c11  User bubble text

const variantStyles: Record<string, React.CSSProperties> = {
  ai: {
    backgroundColor: '#ffffff', // neutral.0
    border: '1px solid #e9ecf4', // neutral.100
    color: '#0e0c11', // neutral.900
    borderRadius: 8,
  },
  user: {
    backgroundColor: '#E7F7FB', // primary.100 — lightest teal
    border: '1px solid #CFF0F7', // primary.200
    color: '#0e0c11', // neutral.900
    borderRadius: 8,
  },
};

// ── UniBubble ───────────────────────────────────────────
export type UniBubbleVariant = 'ai' | 'user';

export interface UniBubbleProps extends Omit<BubbleProps, 'variant'> {
  /**
   * 'ai'   → neutral gray fill, start placement (default)
   * 'user' → teal fill, end placement
   */
  uVariant?: UniBubbleVariant;
  /** Ant Design X native variant — filled | outlined | borderless | shadow */
  variant?: BubbleProps['variant'];
}

const UniBubble: React.FC<UniBubbleProps> & {
  List: typeof Bubble.List;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  System?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Divider?: any;
} = ({ uVariant, styles: stylesProp, classNames: classNamesProp, placement, ...rest }) => {
  const resolvedPlacement = placement ?? (uVariant === 'user' ? 'end' : 'start');
  const contentStyle: React.CSSProperties = uVariant ? variantStyles[uVariant] : {};

  return (
    <ConfigProvider theme={uniChatTheme}>
      <Bubble
        placement={resolvedPlacement}
        styles={{
          content: contentStyle,
          ...stylesProp,
        }}
        classNames={classNamesProp}
        {...rest}
      />
    </ConfigProvider>
  );
};

// ── UniBubble.List ──────────────────────────────────────
export interface UniBubbleListProps extends Omit<BubbleListProps, 'role'> {
  /** Merged with default ai/user role config. Lower priority than item-level props. */
  role?: BubbleListProps['role'];
}

const defaultRole: BubbleListProps['role'] = {
  ai: {
    placement: 'start',
    styles: { content: variantStyles.ai },
  },
  user: {
    placement: 'end',
    styles: { content: variantStyles.user },
  },
};

const UniBubbleList: React.FC<UniBubbleListProps> = ({ role, ...rest }) => {
  // Per-key merge: consumer overrides (avatar, typing, etc.) layer on top of
  // Uni defaults (placement, styles.content) rather than replacing them.
  const mergedRole = { ...defaultRole };
  if (role) {
    Object.keys(role).forEach(key => {
      (mergedRole as any)[key] = { ...(defaultRole as any)[key], ...(role as any)[key] };
    });
  }

  return (
    <ConfigProvider theme={uniChatTheme}>
      <Bubble.List role={mergedRole} {...rest} />
    </ConfigProvider>
  );
};

UniBubble.List = UniBubbleList as unknown as typeof Bubble.List;

if ((Bubble as any).System) UniBubble.System = (Bubble as any).System;
if ((Bubble as any).Divider) UniBubble.Divider = (Bubble as any).Divider;

export default UniBubble;
