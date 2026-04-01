const themeTailwindCSS = {
  colors: {
    primary: 'var(--ut-color-bg-brand)',
    neutral: 'var(--ut-color-text-heading)',
    jet: 'var(--ut-color-text-primary)',
    'sonic-gray': 'var(--ut-color-text-muted)',
    neutral2: 'var(--ut-color-bg-surface-subtle)',
    neutral3: 'var(--ut-color-bg-surface-muted)',
    neutral4: 'var(--ut-color-border-default)',
    neutral5: 'var(--ut-color-border-muted)',
    neutral6: '#BFBFD0',
    neutral8: 'var(--ut-color-text-subtle)',
    neutral9: 'var(--ut-color-text-muted)',
    neutral10: 'var(--ut-color-text-secondary)',
    neutral11: 'var(--ut-color-text-primary)',
    purple1: '#F8F0FE',
    purple2: '#EAD8F9',
    purple3: '#A47DDB',
    purple6: '#6F2FC2',
    primary1: 'var(--ut-color-bg-brand-subtle)',
    primary2: 'var(--ut-color-bg-brand-muted)',
    primary3: 'var(--ut-color-border-brand-soft)',
    primary6: 'var(--ut-color-bg-brand)',
    green1: 'var(--ut-color-bg-success-subtle)',
    green6: '#21B76C',
    green7: 'var(--ut-color-bg-success)',
    green8: 'var(--ut-color-text-success)',
    red1: 'var(--ut-color-bg-danger-subtle)',
    red8: 'var(--ut-color-text-danger-hover)',
    'color-icon': 'var(--ut-color-text-subtle)',
    'color-icon-gray-secondary': 'var(--ut-color-text-subtle)',
    'dropdown-hover': 'var(--ut-color-bg-brand-subtle)',
    'global-background': 'var(--ut-color-bg-surface-muted)',
    'cool-grey': 'var(--ut-color-text-subtle)',
    'sonic-grey': 'var(--ut-color-text-muted)',
    bprimary: 'var(--ut-color-text-primary)',
    'primary-dark': 'var(--ut-color-text-secondary)',
    'primary-gray': 'var(--ut-color-border-emphasis)',
    tprimary: 'var(--ut-color-text-primary)',
    tsecondary: 'var(--ut-color-text-subtle)',
    'text-description': 'var(--ut-color-text-subtle)',
    'success-light': '#92DEB1',
    'success-lighter': 'var(--ut-color-bg-success-subtle)',
    'fill-disabled': 'var(--ut-color-bg-disabled)',
    'fill-quaternary': 'var(--ut-color-bg-surface-muted)',
    'fill-content': 'var(--ut-color-border-muted)',
    'fill-secondary': 'var(--ut-color-bg-surface-subtle)',
    'fill-tertiary': 'var(--ut-color-bg-surface-muted)',
    'fill-product-secondary': 'var(--ut-color-bg-brand-muted)',
    'menu-color-text': 'var(--ut-color-text-muted)',
    blue4: '#73A9F0',
    blue1: 'var(--ut-color-bg-info-subtle)',
    gold1: 'var(--ut-color-bg-warning-subtle)',
    'bprimary-light': 'var(--ut-color-border-default)',
    info: 'var(--ut-color-text-info)',
    'info-light': '#A2CCFC',
    'info-lighter': 'var(--ut-color-bg-info-subtle)',
    warning: 'var(--ut-color-text-warning)',
    warning2: '#A66402',
    'warning-light': '#FFE796',
    'warning-lighter': 'var(--ut-color-bg-warning-subtle)',
    bdisabled: 'var(--ut-color-border-disabled)',
    tertiary: '#BFBFD0',
    bmagenta: '#FF7DB5',
    'binfo-light': '#A2CCFC',
    error: 'var(--ut-color-text-danger)',
    'error-light': '#FCB3A4',
    'error-lighter': 'var(--ut-color-bg-danger-subtle)',
    tdisabled: 'var(--ut-color-text-disabled)',
    bsecondary: 'var(--ut-color-border-muted)',
    'fill-product-link': 'var(--ut-color-bg-brand-subtle)',
    orange: '#FD5D11',
    'error-secondary': '#FD5D11',
    tsuccess: 'var(--ut-color-text-success)',
    'bsecondary-grey': 'var(--ut-color-border-subtle)',
  },
  gridTemplateColumns: {
    '2-columns': 'auto 1fr',
  },
  margin: {
    '4-125': '1.125rem',
  },
  padding: {
    '4-125': '1.125rem',
    13: '3.25rem',
    15: '3.75rem',
  },
  borderWidth: {
    3: '0.1875rem', //3px
  },
  borderRadius: {
    '4xl': '2rem',
  },
  width: {
    5.5: '1.375rem', //22px
    13: '3.125rem',
    23: '5.75rem',
    25: '6.25rem',
    49: '12.25rem', //196px
    57: '14.25rem', // 228px
    59.5: '14.875rem',
    61: '15.625rem',
    71: '17.75rem', //284px
    76: '18.75rem', //300px
    82: '21.25rem', //340px
    103: '24rem',
    104: '25rem', //400px
    105: '26.25rem', //420px
    106: '28.125rem', //450px
    110: '37.5rem',
    150: '45rem', //720px
    'screen-50': '50vw',
  },
  minWidth: {
    6: '1.5rem',
    8: '2rem',
    25: '6.25rem',
  },
  minHeight: {
    20: '5rem',
    25: '6.25rem',
    34: '8.375rem',
    39: '9.75rem', //156 px
  },
  maxHeight: {
    39: '9.75rem', //156 px
  },
  height: {
    5.5: '1.375rem', //22px
    25: '6.25rem', //100px
    34: '8.375rem',
    7.5: '1.875rem', //30px
    9.5: '2.375rem', //38px
    39: '9.75rem', //156 px
    104: '25rem', //400px
  },
  inset: {
    20: '5rem',
    22: '5.5rem',
    25: '6.25rem',
    34: '8.375rem',
  },
  boxShadow: {
    unid: '0px 2px 8px 0 rgba(0, 0, 0, 0.15)',
    'inline-button':
      '0px 2px 4px 0 rgba(0, 0, 0, 0.02), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 1px 2px 0 rgba(0, 0, 0, 0.20)',
  },
  fontSize: {
    xxs: ['0.625rem', '1rem'], //10px 16px
  },
  transitionProperty: {
    width: 'width',
    'grid-template-rows': 'grid-template-rows',
  },
  gridTemplateRows: {
    '0fr': '0fr',
    '1fr': '1fr',
  },
  lineHeight: {
    5.5: '1.375rem',
  },
};

export const TAILWINDCSS_THEME_TOKEN = themeTailwindCSS;
