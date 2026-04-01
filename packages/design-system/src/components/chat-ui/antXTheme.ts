import type { CSSProperties } from 'react';
import type { ThemeConfig } from 'antd';

import { allColors, allLineWidth, allRadius } from '../../theme/themeAntDesign';

const asColor = (token: string, fallback: string): string => (allColors[token] as string) ?? fallback;
const asRadius = (token: string, fallback: number): number => (allRadius[token] as number) ?? fallback;
const asLineWidth = (token: string, fallback: number): number => (allLineWidth[token] as number) ?? fallback;

export const ANTX_BUBBLE_CONTENT_STYLES: Record<'ai' | 'user', CSSProperties> = {
  ai: {
    backgroundColor: asColor('--bcolor-neutral-0', '#ffffff'),
    border: `1px solid ${asColor('--bcolor-neutral-100', '#e9ecf4')}`,
    color: asColor('--bcolor-uni-black-950', '#0e0c11'),
    borderRadius: asRadius('--bradius-300', 8),
  },
  user: {
    backgroundColor: asColor('--bcolor-primary-100', '#E7F7FB'),
    border: `1px solid ${asColor('--bcolor-primary-200', '#CFF0F7')}`,
    color: asColor('--bcolor-uni-black-950', '#0e0c11'),
    borderRadius: asRadius('--bradius-300', 8),
  },
};

export const ANTX_THEME_TOKEN: ThemeConfig = {
  token: {
    colorPrimary: asColor('--bcolor-primary-600', '#15808C'),
    colorPrimaryHover: asColor('--bcolor-primary-700', '#127380'),
    colorPrimaryActive: asColor('--bcolor-primary-800', '#0E6772'),
    colorPrimaryBg: asColor('--bcolor-primary-100', '#E7F7FB'),
    colorPrimaryBgHover: asColor('--bcolor-primary-200', '#CFF0F7'),
    colorPrimaryBorder: asColor('--bcolor-primary-400', '#72B8C2'),
    colorPrimaryBorderHover: asColor('--bcolor-primary-500', '#449CA7'),
    colorBgContainer: asColor('--bcolor-neutral-0', '#ffffff'),
    colorBgLayout: asColor('--ucolor-fill-canvas-bg', '#faf9fb'),
    colorBgElevated: asColor('--bcolor-neutral-0', '#ffffff'),
    colorText: asColor('--bcolor-uni-black-950', '#0e0c11'),
    colorTextSecondary: asColor('--bcolor-uni-black-450', '#969498'),
    colorTextDisabled: asColor('--bcolor-neutral-300', '#bfbfd0'),
    colorTextPlaceholder: asColor('--bcolor-neutral-600', '#6d6f79'),
    colorBorder: asColor('--bcolor-neutral-100', '#e9ecf4'),
    colorBorderSecondary: asColor('--bcolor-neutral-75', '#f1f2f4'),
    colorSplit: asColor('--bcolor-neutral-100', '#e9ecf4'),
    colorSuccess: asColor('--bcolor-green-800', '#096b40'),
    colorSuccessBg: asColor('--bcolor-green-100', '#e9f7ed'),
    colorError: asColor('--bcolor-red-700', '#b01a15'),
    colorErrorBg: asColor('--bcolor-red-100', '#fff3f0'),
    colorWarning: asColor('--bcolor-gold-700', '#cc860c'),
    colorWarningBg: asColor('--bcolor-gold-100', '#fffbe8'),
    colorInfo: asColor('--bcolor-blue-600', '#2263d5'),
    colorInfoBg: asColor('--bcolor-blue-100', '#f0f8ff'),
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    fontSizeSM: 12,
    fontSizeLG: 16,
    lineHeight: 1.5714,
    borderRadius: asRadius('--bradius-300', 8),
    borderRadiusSM: asRadius('--bradius-200', 4),
    borderRadiusLG: asRadius('--bradius-400', 16),
    borderRadiusXS: asRadius('--bradius-100', 2),
    motionDurationMid: '0.2s',
    motionDurationSlow: '0.3s',
  },
  components: {
    Avatar: {
      containerSize: 36,
      containerSizeSM: 28,
      containerSizeLG: 44,
      colorTextPlaceholder: asColor('--bcolor-uni-black-450', '#969498'),
    },
    Button: {
      borderRadius: asRadius('--bradius-300', 8),
      fontSizeSM: 14,
      fontSize: 14,
      fontSizeLG: 12,
      borderRadiusLG: asRadius('--bradius-300', 8),
      colorBgTextHover: asColor('--bcolor-primary-100', '#E7F7FB'),
    },
    Input: {
      colorBorder: asColor('--bcolor-neutral-500', '#8b8ba0'),
      colorBgContainer: asColor('--bcolor-neutral-0', '#ffffff'),
      colorText: asColor('--bcolor-neutral-700', '#424242'),
      lineWidth: asLineWidth('--blinewidth-100', 1),
      borderRadius: asRadius('--bradius-200', 4),
      colorTextPlaceholder: asColor('--bcolor-neutral-600', '#6d6f79'),
      hoverBorderColor: asColor('--bcolor-primary-600', '#15808C'),
      colorPrimaryHover: asColor('--bcolor-primary-600', '#15808C'),
      colorPrimaryActive: asColor('--bcolor-primary-600', '#15808C'),
      fontSize: 14,
    },
    Menu: {
      itemBg: 'transparent',
      itemSelectedBg: asColor('--bcolor-primary-100', '#E7F7FB'),
      itemSelectedColor: asColor('--bcolor-uni-black-950', '#0e0c11'),
      itemHoverBg: asColor('--bcolor-neutral-50', '#f8f9fc'),
      itemHoverColor: asColor('--bcolor-uni-black-950', '#0e0c11'),
      itemActiveBg: asColor('--bcolor-primary-100', '#E7F7FB'),
      activeBarBorderWidth: 2,
      activeBarWidth: 2,
      activeBarHeight: 24,
      itemColor: asColor('--bcolor-uni-black-950', '#0e0c11'),
      groupTitleColor: asColor('--bcolor-uni-black-450', '#969498'),
      groupTitleFontSize: 11,
      fontSize: 14,
      borderRadius: 6,
      colorSplit: asColor('--bcolor-neutral-100', '#e9ecf4'),
    },
  },
};
