export type TokenSwatch = {
  name: string;
  cssVar: string;
  fallback: string;
};

export type TokenSwatchGroup = {
  id: string;
  label: string;
  tokens: TokenSwatch[];
};

export type TypographySample = {
  id: string;
  label: string;
  helper: string;
  sampleText: string;
  fontSizeVar: string;
  fontSizeFallback: number;
  lineHeightVar: string;
  lineHeightFallback: number;
  fontWeight: number;
};

export const tokenSwatchGroups: TokenSwatchGroup[] = [
  {
    id: 'brand',
    label: 'Brand',
    tokens: [
      { name: 'Brand Primary', cssVar: '--bcolor-brand-primary', fallback: '#179DAB' },
      { name: 'Brand Orange', cssVar: '--bcolor-brand-orange', fallback: '#fd5d11' },
      { name: 'Brand Blue', cssVar: '--bcolor-brand-blue', fallback: '#0299dc' },
      { name: 'Brand Green', cssVar: '--bcolor-brand-green', fallback: '#51b1ab' },
      { name: 'Brand Magenta', cssVar: '--bcolor-brand-magenta', fallback: '#e9027c' },
    ],
  },
  {
    id: 'neutral',
    label: 'Neutral',
    tokens: [
      { name: 'Neutral 25', cssVar: '--bcolor-neutral-25', fallback: '#fbfbfd' },
      { name: 'Neutral 100', cssVar: '--bcolor-neutral-100', fallback: '#e9ecf4' },
      { name: 'Neutral 300', cssVar: '--bcolor-neutral-300', fallback: '#bfbfd0' },
      { name: 'Neutral 500', cssVar: '--bcolor-neutral-500', fallback: '#8b8ba0' },
      { name: 'Neutral 800', cssVar: '--bcolor-neutral-800', fallback: '#333333' },
    ],
  },
  {
    id: 'semantic',
    label: 'Semantic',
    tokens: [
      { name: 'Success 700', cssVar: '--bcolor-green-700', fallback: '#139156' },
      { name: 'Warning 700', cssVar: '--bcolor-gold-700', fallback: '#cc860c' },
      { name: 'Error 700', cssVar: '--bcolor-red-700', fallback: '#b01a15' },
      { name: 'Info 600', cssVar: '--bcolor-blue-600', fallback: '#2263d5' },
      { name: 'Accent 600', cssVar: '--bcolor-cyan-600', fallback: '#0891b2' },
    ],
  },
];

export const materialIconNames: string[] = [
  'account_tree',
  'add',
  'add_circle',
  'admin_panel_settings',
  'apps',
  'arrow_back_ios',
  'arrow_forward_ios',
  'check_small',
  'chevron_left',
  'close',
  'close_small',
  'cloud_upload',
  'content_copy',
  'delete',
  'description',
  'device_hub',
  'done',
  'edit',
  'expand_more',
  'fast_forward',
  'fast_rewind',
  'favorite',
  'filter_alt',
  'flare',
  'format_size',
  'grade',
  'grid_view',
  'headset_mic',
  'help',
  'home',
  'imagesmode',
  'info',
  'info_i',
  'keyboard_arrow_down',
  'keyboard_arrow_right',
  'list',
  'lock',
  'lock_open',
  'logout',
  'mail',
  'message',
  'monitoring',
  'more_horiz',
  'more_vert',
  'near_me',
  'notifications',
  'palette',
  'pause',
  'person',
  'person_4',
  'phone',
  'play_arrow',
  'search',
  'settings',
  'settings_b_roll',
  'skip_previous',
  'smart_display',
  'space_dashboard',
  'speed',
  'table',
  'table_chart',
  'table_view',
  'topic',
  'unfold_more',
  'upload',
  'visibility_off',
  'volume_up',
];

export const uniIconNames: string[] = [
  'uni-add',
  'uni-apps',
  'uni-arrow_forward_ios',
  'uni-assignment',
  'uni-call',
  'uni-cancel-solid',
  'uni-check-circle-outline',
  'uni-check_circle',
  'uni-checkbox-checked',
  'uni-checkbox-indeterminate',
  'uni-checkbox-unchecked',
  'uni-close',
  'uni-collapse_content',
  'uni-delete',
  'uni-download',
  'uni-drag_indicator',
  'uni-edit',
  'uni-edit_square',
  'uni-expand_content',
  'uni-export',
  'uni-fast_forward',
  'uni-fast_rewind',
  'uni-filter_alt',
  'uni-integration',
  'uni-list',
  'uni-list-1',
  'uni-lock',
  'uni-mode_comment',
  'uni-more_vert',
  'uni-outbond',
  'uni-pause_filled',
  'uni-person',
  'uni-play_arrow_filled',
  'uni-play_circle',
  'uni-preview',
  'uni-project',
  'uni-refresh',
  'uni-replay',
  'uni-settings',
  'uni-star',
  'uni-sync',
  'uni-theatre',
  'uni-videocam',
  'uni-visibility',
  'uni-visibility_off',
  'uni-volume_down',
  'uni-volume_off',
  'uni-volume_up',
  'uni-warn-circle-outline',
];

export const typographySamples: TypographySample[] = [
  {
    id: 'headline',
    label: 'Headline',
    helper: 'Display-level heading for major sections',
    sampleText: 'Universal Theme Runtime',
    fontSizeVar: '--btypography-font-size-900',
    fontSizeFallback: 36,
    lineHeightVar: '--btypography-line-height-900',
    lineHeightFallback: 48,
    fontWeight: 700,
  },
  {
    id: 'title',
    label: 'Title',
    helper: 'Page and card headers',
    sampleText: 'HostShell navigation and routed views',
    fontSizeVar: '--btypography-font-size-600',
    fontSizeFallback: 24,
    lineHeightVar: '--btypography-line-height-600',
    lineHeightFallback: 36,
    fontWeight: 600,
  },
  {
    id: 'body',
    label: 'Body',
    helper: 'Default body copy for route descriptions',
    sampleText: 'Use design system components and route registry metadata as the source of truth.',
    fontSizeVar: '--btypography-font-size-300',
    fontSizeFallback: 14,
    lineHeightVar: '--btypography-line-height-300',
    lineHeightFallback: 24,
    fontWeight: 400,
  },
  {
    id: 'label',
    label: 'Label',
    helper: 'Support text for controls and metadata',
    sampleText: 'State: loading | empty | error | default',
    fontSizeVar: '--btypography-font-size-200',
    fontSizeFallback: 12,
    lineHeightVar: '--btypography-line-height-200',
    lineHeightFallback: 20,
    fontWeight: 500,
  },
];
