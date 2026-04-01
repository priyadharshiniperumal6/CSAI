import { ThemeConfig } from 'antd';
import { allColors, allLineWidth, allRadius, allSizes } from '../helpers/token-runtime';
export { allColors, allLineWidth, allRadius, allSizes };

export const themeAntDesign: ThemeConfig = {
  token: {
    colorPrimary: allColors['--bcolor-primary-600'] as string,
    colorInfo: '#15808C',
    fontSize: 16,
    fontFamily: 'Inter',
  },
  components: {
    Button: {
      lineHeight: 1.5715,
      fontWeight: 400,
      borderRadius: allRadius['--bradius-300'] as number,
      fontSizeSM: 14,
      fontSize: 14,
      fontSizeLG: allSizes['--bsize-300'] as number,
      borderRadiusLG: allRadius['--bradius-300'] as number,
      colorBgTextHover: allColors['--bcolor-primary-100'] as string,
      primaryShadow: '0 2px 0 rgba(3, 51, 47, 0.25)',
      dangerShadow: '0 2px 0 rgba(3, 51, 47, 0.25)',
    },
    Input: {
      colorBorder: allColors['--bcolor-neutral-500'] as string,
      colorBgContainer: allColors['--bcolor-neutral-0'] as string,
      colorText: allColors['--bcolor-neutral-700'] as string,
      lineWidth: allLineWidth['--blinewidth-100'] as number,
      borderRadius: allRadius['--bradius-200'] as number,
      colorTextPlaceholder: allColors['--bcolor-neutral-600'] as string,
      hoverBorderColor: allColors['--ucolor-content-text-product-hover'] as string,
      colorPrimaryHover: allColors['--ucolor-content-text-product-hover'] as string,
      colorPrimaryActive: allColors['--bcolor-primary-600'] as string,
      fontSize: 14,
    },
    DatePicker: {
      fontSize: 14,
      borderRadius: allRadius['--bradius-300'] as number,
      borderRadiusLG: allRadius['--bradius-300'] as number,
      colorTextPlaceholder: allColors['--bcolor-neutral-600'] as string,
      hoverBorderColor: allColors['--bcolor-primary-600'] as string,
      activeBorderColor: allColors['--bcolor-primary-600'] as string,
      // Replace computed olive glow (derived from colorPrimaryBg via FastColor) with teal tint
      activeShadow: '0 0 0 2px rgba(21, 128, 140, 0.15)',
      // Override computed "olive" range-selection colors (FastColor.lighten from colorPrimary)
      cellHoverWithRangeBg: allColors['--bcolor-primary-100'] as string,
      cellActiveWithRangeBg: allColors['--bcolor-primary-100'] as string,
      cellRangeBorderColor: allColors['--bcolor-primary-400'] as string,
    },
    Checkbox: {
      colorWhite: '#fff',
      colorPrimary: allColors['--bcolor-primary-600'] as string,
      colorBorder: allColors['--bcolor-neutral-500'] as string,
      colorPrimaryBorderHover: allColors['--ucolor-border-product-light'] as string,
    },
    Modal: {
      fontSize: 14,
    },
    Dropdown: {
      fontSize: 14,
    },
    Select: {
      fontSize: 14,
      borderRadius: allRadius['--bradius-300'] as number,
      borderRadiusLG: allRadius['--bradius-300'] as number,
      optionSelectedBg: allColors['--bcolor-primary-100'] as string,
      optionActiveBg: allColors['--bcolor-primary-100'] as string,
      colorTextPlaceholder: allColors['--bcolor-neutral-600'] as string,
    },
    Upload: {
      fontSize: 14,
      fontFamily: 'Inter',
    },
    Tree: {
      fontSize: 14,
    },
    Card: {
      borderRadiusLG: allRadius['--bradius-400'] as number,
    },
    Table: {
      borderRadius: allRadius['--bradius-400'] as number,
    },
  },
};

export const ANT_THEME_TOKEN = themeAntDesign;
