import type { CSSProperties, ReactNode } from 'react';
import { Card } from 'antd';
import type { CardProps } from 'antd';
import classNames from 'classnames';

import './UniCard.scss';

export const UNI_CARD_VARIANTS = [
  'default',
  'project-overview',
  'tool-registry',
  'platform-component',
  'spotlight',
] as const;

export type UniCardVariant = (typeof UNI_CARD_VARIANTS)[number];

export type UniCardBadgeTone = 'verified' | 'community' | 'neutral' | 'accent';

export const UNI_CARD_COLOR_MODES = ['manual', 'random'] as const;

export type UniCardColorMode = (typeof UNI_CARD_COLOR_MODES)[number];

export const UNI_CARD_COLOR_APPLY_OPTIONS = ['none', 'header', 'card'] as const;

export type UniCardColorApply = (typeof UNI_CARD_COLOR_APPLY_OPTIONS)[number];

export const UNI_CARD_LAYOUT_MODES = ['hug', 'fixed'] as const;

export type UniCardLayoutMode = (typeof UNI_CARD_LAYOUT_MODES)[number];

export type UniCardColorPair = {
  type: string;
  label?: ReactNode;
  color300: string;
  color700: string;
};

export const UNI_CARD_COLOR_PAIRS: UniCardColorPair[] = [
  {
    type: 'teal',
    label: 'Teal',
    color300: '#5eead4',
    color700: '#0f766e',
  },
  {
    type: 'blue',
    label: 'Blue',
    color300: '#93c5fd',
    color700: '#1d4ed8',
  },
  {
    type: 'indigo',
    label: 'Indigo',
    color300: '#a5b4fc',
    color700: '#4338ca',
  },
  {
    type: 'violet',
    label: 'Violet',
    color300: '#c4b5fd',
    color700: '#6d28d9',
  },
  {
    type: 'emerald',
    label: 'Emerald',
    color300: '#6ee7b7',
    color700: '#047857',
  },
  {
    type: 'amber',
    label: 'Amber',
    color300: '#fcd34d',
    color700: '#b45309',
  },
];

export type UniCardColorConfig = {
  mode?: UniCardColorMode;
  applyTo?: UniCardColorApply;
  pairs?: UniCardColorPair[];
  colorType?: string;
  randomSeed?: string | number;
};

export type UniCardLayoutConfig = {
  mode?: UniCardLayoutMode;
  fixedHeight?: number | string;
};

export type UniCardVariantBadge = {
  label: ReactNode;
  tone?: UniCardBadgeTone;
  icon?: ReactNode;
};

export type UniCardVariantData = {
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  showIcon?: boolean;
  version?: ReactNode;
  badges?: UniCardVariantBadge[];
  chips?: ReactNode[];
  metric?: ReactNode;
  usageLabel?: ReactNode;
  usageValue?: ReactNode;
  relatedLabel?: ReactNode;
  relatedItems?: string[];
  actionLabel?: ReactNode;
  footerMeta?: ReactNode;
  statusLabel?: ReactNode;
  colorConfig?: UniCardColorConfig;
  layoutConfig?: UniCardLayoutConfig;
};

export type UniCardProps = CardProps & {
  class?: string;
  cardVariant?: UniCardVariant;
  variantData?: UniCardVariantData;
  cardColorConfig?: UniCardColorConfig;
  cardLayoutConfig?: UniCardLayoutConfig;
};

type UniCardVariantRenderer = (data: UniCardVariantData, fallbackContent?: ReactNode) => ReactNode;

const fallbackVariantIcon = (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
    <circle cx="8" cy="8" r="6.58333" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="8" cy="8" r="3.91667" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="8" cy="8" r="1.25" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const arrowIcon = (
  <svg className="uni-card-variant__action-icon" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M3 8H12.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8.8 4.8L12 8L8.8 11.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const activityIcon = (
  <svg className="uni-card-variant__meta-icon" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M2 8H5L6.8 4L9.2 12L11 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const verifiedBadgeIcon = (
  <svg className="uni-card-variant__badge-icon" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M3.5 8L6.5 11L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const badgeToneClassMap: Record<UniCardBadgeTone, string> = {
  verified: 'uni-card-variant__badge--verified',
  community: 'uni-card-variant__badge--community',
  neutral: 'uni-card-variant__badge--neutral',
  accent: 'uni-card-variant__badge--accent',
};

const toStableHash = (input: string) => {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
};

const resolveCardColorPair = (
  colorConfig: UniCardColorConfig | undefined,
  data: UniCardVariantData | undefined
): UniCardColorPair | undefined => {
  const colorPairs = colorConfig?.pairs?.length ? colorConfig.pairs : UNI_CARD_COLOR_PAIRS;

  if (!colorPairs.length) {
    return undefined;
  }

  if (colorConfig?.mode === 'random') {
    const seedInput = String(
      colorConfig.randomSeed ?? data?.title ?? data?.description ?? data?.version ?? data?.metric ?? 'uni-card-random'
    );
    const colorIndex = toStableHash(seedInput) % colorPairs.length;
    return colorPairs[colorIndex];
  }

  if (colorConfig?.colorType) {
    return colorPairs.find(pair => pair.type === colorConfig.colorType) ?? colorPairs[0];
  }

  return colorPairs[0];
};

const resolveCardColorStyle = (colorPair?: UniCardColorPair): CSSProperties | undefined => {
  if (!colorPair) {
    return undefined;
  }

  return {
    ['--uni-card-color-300' as string]: colorPair.color300,
    ['--uni-card-color-700' as string]: colorPair.color700,
  } as CSSProperties;
};

const toCssUnit = (value?: string | number): string | undefined => {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }
  return typeof value === 'number' ? `${value}px` : value;
};

const resolveCardLayoutStyle = (layoutConfig?: UniCardLayoutConfig): CSSProperties | undefined => {
  const layoutMode = layoutConfig?.mode ?? 'hug';
  if (layoutMode !== 'fixed') {
    return undefined;
  }

  const fixedHeight = toCssUnit(layoutConfig?.fixedHeight ?? 320);
  if (!fixedHeight) {
    return undefined;
  }

  return {
    ['--uni-card-fixed-height' as string]: fixedHeight,
  } as CSSProperties;
};

const shouldShowIcon = (data: UniCardVariantData) => data.showIcon !== false;

const renderToolRegistryVariant: UniCardVariantRenderer = (data, fallbackContent) => {
  const badges: UniCardVariantBadge[] =
    data.badges && data.badges.length
      ? data.badges
      : [{ label: 'Verified', tone: 'verified', icon: verifiedBadgeIcon }];

  const chips = data.chips?.length ? data.chips : ['query', 'execute', 'monitor'];
  const usageLabel = data.usageLabel ?? (
    <>
      {activityIcon}
      Usage
    </>
  );
  const usageValue = data.usageValue ?? '3 Projects';
  const relatedLabel = data.relatedLabel ?? 'Used in';
  const relatedItems = data.relatedItems?.length ? data.relatedItems.join(', ') : 'Default workspace';

  return (
    <div className="uni-card-variant uni-card-variant--tool-registry">
      <div className="uni-card-variant__header-shell">
        <div className="uni-card-variant__header">
          <div className="uni-card-variant__header-leading">
            {shouldShowIcon(data) ? (
              <div className="uni-card-variant__icon-wrap">{data.icon ?? fallbackVariantIcon}</div>
            ) : null}
            <h3 className="uni-card-variant__headline">{data.title ?? 'Card title'}</h3>
          </div>
          <div className="uni-card-variant__badge-row">
            {badges.map((badge, index) => (
              <span
                key={`${String(badge.label)}-${index}`}
                className={classNames(
                  'uni-card-variant__badge',
                  badgeToneClassMap[badge.tone ?? 'neutral'],
                  index > 0 && 'uni-card-variant__badge--stacked'
                )}
              >
                {badge.icon}
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="uni-card-variant__version">{data.version ?? 'v1.0.0'}</p>
      <div className="uni-card-variant__description">{data.description ?? fallbackContent}</div>

      <div className="uni-card-variant__chips">
        {chips.map((chip, index) => (
          <span key={`${String(chip)}-${index}`} className="uni-card-variant__chip">
            {chip}
          </span>
        ))}
      </div>

      <div className="uni-card-variant__meta">
        <div className="uni-card-variant__meta-row">
          <span className="uni-card-variant__meta-label">{usageLabel}</span>
          <span className="uni-card-variant__meta-value">{usageValue}</span>
        </div>
        <div className="uni-card-variant__meta-row">
          <span className="uni-card-variant__meta-label">{relatedLabel}:</span>
          <span className="uni-card-variant__meta-value">{relatedItems}</span>
        </div>
      </div>
    </div>
  );
};

const renderProjectOverviewVariant: UniCardVariantRenderer = (data, fallbackContent) => {
  return (
    <div className="uni-card-variant uni-card-variant--project-overview">
      <div className="uni-card-variant__header-shell">
        <div className="uni-card-variant__project-header">
          <div className="uni-card-variant__header-leading">
            {shouldShowIcon(data) ? (
              <div className="uni-card-variant__icon-wrap">{data.icon ?? fallbackVariantIcon}</div>
            ) : null}
            <h3 className="uni-card-variant__headline">{data.title ?? 'Project name'}</h3>
          </div>
          {data.statusLabel ? <span className="uni-card-variant__project-status">{data.statusLabel}</span> : null}
        </div>
      </div>

      <div className="uni-card-variant__description">{data.description ?? fallbackContent}</div>

      <div className="uni-card-variant__project-footer">
        <span className="uni-card-variant__project-meta">{data.footerMeta ?? 'Updated recently'}</span>
        {data.actionLabel ? (
          <div className="uni-card-variant__action">
            <span>{data.actionLabel}</span>
            {arrowIcon}
          </div>
        ) : null}
      </div>
    </div>
  );
};

const renderPlatformComponentVariant: UniCardVariantRenderer = (data, fallbackContent) => {
  return (
    <div className="uni-card-variant uni-card-variant--platform-component">
      <div className="uni-card-variant__header-shell">
        <div className="uni-card-variant__row">
          <div className="uni-card-variant__header-leading">
            {shouldShowIcon(data) ? (
              <div className="uni-card-variant__icon-wrap">{data.icon ?? fallbackVariantIcon}</div>
            ) : null}
            <h3 className="uni-card-variant__headline">{data.title ?? 'Card title'}</h3>
          </div>
        </div>
      </div>
      <div className="uni-card-variant__description">{data.description ?? fallbackContent}</div>
      <div className="uni-card-variant__metric">{data.metric}</div>
      <div className="uni-card-variant__action">
        <span>{data.actionLabel ?? 'Explore'}</span>
        {arrowIcon}
      </div>
    </div>
  );
};

const renderSpotlightVariant: UniCardVariantRenderer = (data, fallbackContent) => {
  return (
    <div className="uni-card-variant uni-card-variant--spotlight">
      <div className="uni-card-variant__spotlight-glow uni-card-variant__spotlight-glow--top-right" />
      <div className="uni-card-variant__spotlight-glow uni-card-variant__spotlight-glow--bottom-left" />

      <div className="uni-card-variant__spotlight-content">
        <div className="uni-card-variant__header-shell">
          <div className="uni-card-variant__row">
            <div className="uni-card-variant__header-leading">
              {shouldShowIcon(data) ? (
                <div className="uni-card-variant__icon-wrap">{data.icon ?? fallbackVariantIcon}</div>
              ) : null}
              <h3 className="uni-card-variant__headline">{data.title ?? 'Card title'}</h3>
            </div>
            {data.statusLabel ? <span className="uni-card-variant__status">{data.statusLabel}</span> : null}
          </div>
        </div>

        <div className="uni-card-variant__description">{data.description ?? fallbackContent}</div>

        <div className="uni-card-variant__footer">
          <span className="uni-card-variant__footer-meta">{data.footerMeta}</span>
          <div className="uni-card-variant__action">
            <span>{data.actionLabel ?? 'Open Experience'}</span>
            {arrowIcon}
          </div>
        </div>
      </div>
    </div>
  );
};

const uniCardVariantRenderers: Record<Exclude<UniCardVariant, 'default'>, UniCardVariantRenderer> = {
  'project-overview': renderProjectOverviewVariant,
  'tool-registry': renderToolRegistryVariant,
  'platform-component': renderPlatformComponentVariant,
  spotlight: renderSpotlightVariant,
};

export const UniCard = ({
  className,
  class: legacyClass,
  children,
  cardVariant = 'default',
  variantData,
  cardColorConfig,
  cardLayoutConfig,
  ...rest
}: UniCardProps) => {
  const { style: cardStyle, ...cardProps } = rest;

  const variantRenderer = cardVariant === 'default' ? undefined : uniCardVariantRenderers[cardVariant];
  const variantContent = variantRenderer ? variantRenderer(variantData ?? {}, children) : children;
  const resolvedColorConfig = cardColorConfig ?? variantData?.colorConfig;
  const resolvedLayoutConfig = cardLayoutConfig ?? variantData?.layoutConfig;
  const layoutMode = resolvedLayoutConfig?.mode ?? 'hug';
  const colorApplyTarget = resolvedColorConfig?.applyTo ?? 'none';
  const colorPair = resolveCardColorPair(resolvedColorConfig, variantData);
  const colorClass = colorPair && colorApplyTarget !== 'none' ? `uni-card--color-${colorApplyTarget}` : undefined;
  const layoutClass = `uni-card--layout-${layoutMode}`;
  const colorStyle = resolveCardColorStyle(colorPair);
  const layoutStyle = resolveCardLayoutStyle(resolvedLayoutConfig);

  return (
    <Card
      className={classNames('uni-card', `uni-card--${cardVariant}`, layoutClass, colorClass, className, legacyClass)}
      style={{ ...layoutStyle, ...colorStyle, ...cardStyle }}
      {...cardProps}
    >
      {variantContent}
    </Card>
  );
};
