import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// import { UniBreadcrumb } from '../../../components/breadcrumb/UniBreadcrumb';
// import { UniButton } from '../../../components/button/UniButton';
import { UniCard } from '../../../components/card/UniCard';
import {
  UNI_CARD_COLOR_APPLY_OPTIONS,
  UNI_CARD_COLOR_MODES,
  UNI_CARD_COLOR_PAIRS,
  UNI_CARD_LAYOUT_MODES,
} from '../../../components/card/UniCard';
import type {
  UniCardColorApply,
  UniCardColorConfig,
  UniCardColorMode,
  UniCardColorPair,
  UniCardLayoutConfig,
  UniCardLayoutMode,
  UniCardVariant,
  UniCardVariantData,
} from '../../../components/card/UniCard';
import { UniEmpty } from '../../../components/empty/UniEmpty';
import { UniSelect } from '../../../components/select/UniSelect';
import { UniSkeleton } from '../../../components/skeleton/UniSkeleton';
import { UniTag } from '../../../components/tag/UniTag';
import { CardView } from '../../../views/CardView/CardView';
// import type { UniDropdownMenuOption } from '../../../components/dropdown/UniDropdownMenu';
import type { DemoViewState } from '../../mocks/demoState';
import { useDemoState } from '../../mocks/demoState';
import { ViewRouteShell } from '../shared/ViewRouteShell';

// const orgOptions: UniDropdownMenuOption[] = [
//   { key: 'uniphore', name: 'Uniphore' },
//   { key: 'demo-org', name: 'Demo Org' },
// ];

const CARD_COLOR_MODE_QUERY_PARAM = 'cardColorMode';
const CARD_COLOR_SCOPE_QUERY_PARAM = 'cardColorScope';
const CARD_COLOR_TYPES_QUERY_PARAM = 'cardColorTypes';
const CARD_LAYOUT_MODE_QUERY_PARAM = 'cardLayoutMode';
const CARD_ICON_QUERY_PARAM = 'cardIcon';

const cardColorModeLabels: Record<UniCardColorMode, string> = {
  manual: 'Manual',
  random: 'Random (300 / 700)',
};

const cardColorApplyLabels: Record<UniCardColorApply, string> = {
  none: 'No Color',
  header: 'Header',
  card: 'Whole Card',
};

const cardLayoutModeLabels: Record<UniCardLayoutMode, string> = {
  hug: 'Hug Content',
  fixed: 'Fixed Height',
};

type CardIconMode = 'show' | 'hide';

const cardIconModeLabels: Record<CardIconMode, string> = {
  show: 'Show Icon',
  hide: 'Hide Icon',
};

type CardVariantRoute = {
  key: 'classic' | 'project-overview' | 'tool-registry' | 'platform-component' | 'spotlight';
  label: string;
  path: string;
  description: string;
  variant: UniCardVariant;
};

type CardVariantSample = {
  id: string;
  title: string;
  description: string;
  status: string;
  metric?: string;
  version?: string;
  usage?: string;
  functions?: string[];
  related?: string[];
};

type CardControlState = {
  mode: UniCardColorMode;
  applyTo: UniCardColorApply;
  colorTypes: string[];
  showIcon: boolean;
  layoutMode: UniCardLayoutMode;
};

const CARD_VARIANT_ROUTES: CardVariantRoute[] = [
  {
    key: 'classic',
    label: 'Classic',
    path: '/views/card/classic',
    description: 'Base Ant-style card with familiar title, content, and actions.',
    variant: 'default',
  },
  {
    key: 'project-overview',
    label: 'Project Overview',
    path: '/views/card/project-overview',
    description: 'Project status card inspired by GuidedFlow ProjectCard surfaces.',
    variant: 'project-overview',
  },
  {
    key: 'tool-registry',
    label: 'Tool Registry',
    path: '/views/card/tool-registry',
    description: 'Operational card with function chips, usage metadata, and trust badges.',
    variant: 'tool-registry',
  },
  {
    key: 'platform-component',
    label: 'Platform Component',
    path: '/views/card/platform-component',
    description: 'Resource catalog card with metric callout and guided explore action.',
    variant: 'platform-component',
  },
  {
    key: 'spotlight',
    label: 'Spotlight',
    path: '/views/card/spotlight',
    description: 'Premium gradient treatment for featured workflows and launch surfaces.',
    variant: 'spotlight',
  },
];

const CARD_VARIANT_SAMPLES: CardVariantSample[] = [
  {
    id: 'slack',
    title: 'Slack Integration',
    description: 'Connect your agent to Slack to send messages and orchestrate workspace automation.',
    status: 'Production',
    version: 'v1.2.0',
    usage: '12 Projects',
    functions: ['sendMessage', 'createChannel', 'listUsers'],
    related: ['Support Bot', 'Internal Ops'],
  },
  {
    id: 'rag',
    title: 'RAG Management',
    description: 'Try out embedding pipelines, retrieval tuning, and evaluation workflows.',
    status: 'Development',
    metric: '475 workflows',
    usage: '8 Projects',
    functions: ['ingest', 'retrieve', 'evaluate'],
    related: ['Model Ops', 'Runtime'],
  },
  {
    id: 'workflow',
    title: 'Agentic Workflow Builder',
    description: 'Build and orchestrate multi-agent workflows with safety-gated deployment paths.',
    status: 'Beta',
    metric: '81 active agents',
    usage: '5 Projects',
    functions: ['compose', 'validate', 'deploy'],
    related: ['Automation', 'Assistant Ops'],
  },
];

const verifiedBadgeIcon = (
  <svg className="uni-card-variant__badge-icon" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M3.5 8L6.5 11L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const getActiveVariantRoute = (pathname: string): CardVariantRoute => {
  return CARD_VARIANT_ROUTES.find(route => pathname.startsWith(route.path)) ?? CARD_VARIANT_ROUTES[0];
};

const resolveColorMode = (search: string): UniCardColorMode => {
  const value = new URLSearchParams(search).get(CARD_COLOR_MODE_QUERY_PARAM);
  if (!value) {
    return 'manual';
  }
  return UNI_CARD_COLOR_MODES.includes(value as UniCardColorMode) ? (value as UniCardColorMode) : 'manual';
};

const resolveColorScope = (search: string): UniCardColorApply => {
  const value = new URLSearchParams(search).get(CARD_COLOR_SCOPE_QUERY_PARAM);
  if (!value) {
    return 'none';
  }
  return UNI_CARD_COLOR_APPLY_OPTIONS.includes(value as UniCardColorApply) ? (value as UniCardColorApply) : 'none';
};

const resolveColorTypes = (search: string): string[] => {
  const value = new URLSearchParams(search).get(CARD_COLOR_TYPES_QUERY_PARAM);
  if (!value) {
    return [];
  }

  const selectedTypes = value
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);
  const availableTypes = new Set(UNI_CARD_COLOR_PAIRS.map(pair => pair.type));

  return selectedTypes.filter(item => availableTypes.has(item));
};

const resolveLayoutMode = (search: string): UniCardLayoutMode => {
  const value = new URLSearchParams(search).get(CARD_LAYOUT_MODE_QUERY_PARAM);
  if (!value) {
    return 'hug';
  }
  return UNI_CARD_LAYOUT_MODES.includes(value as UniCardLayoutMode) ? (value as UniCardLayoutMode) : 'hug';
};

const resolveIconMode = (search: string): CardIconMode => {
  const value = new URLSearchParams(search).get(CARD_ICON_QUERY_PARAM);
  if (!value) {
    return 'show';
  }
  return value === 'hide' ? 'hide' : 'show';
};

const buildPathWithUpdatedQuery = (pathname: string, search: string, updates: Record<string, string | undefined>) => {
  const params = new URLSearchParams(search);

  Object.entries(updates).forEach(([key, value]) => {
    if (!value) {
      params.delete(key);
      return;
    }
    params.set(key, value);
  });

  const nextQuery = params.toString();
  return nextQuery ? `${pathname}?${nextQuery}` : pathname;
};

const resolveCardColorPairs = (selectedColorTypes: string[]): UniCardColorPair[] => {
  if (!selectedColorTypes.length) {
    return UNI_CARD_COLOR_PAIRS;
  }
  return UNI_CARD_COLOR_PAIRS.filter(pair => selectedColorTypes.includes(pair.type));
};

const resolveCardColorConfig = (
  sample: CardVariantSample,
  sampleIndex: number,
  controlState: CardControlState
): UniCardColorConfig | undefined => {
  if (controlState.applyTo === 'none') {
    return undefined;
  }

  const pairs = resolveCardColorPairs(controlState.colorTypes);
  if (!pairs.length) {
    return undefined;
  }

  if (controlState.mode === 'random') {
    return {
      applyTo: controlState.applyTo,
      mode: 'random',
      pairs,
      randomSeed: sample.id,
    };
  }

  const selectedPair = pairs[sampleIndex % pairs.length];
  return {
    applyTo: controlState.applyTo,
    mode: 'manual',
    pairs,
    colorType: selectedPair.type,
  };
};

const resolveCardLayoutConfig = (controlState: CardControlState): UniCardLayoutConfig => {
  if (controlState.layoutMode === 'fixed') {
    return {
      mode: 'fixed',
      fixedHeight: 320,
    };
  }

  return {
    mode: 'hug',
  };
};

const toVariantData = (
  sample: CardVariantSample,
  variant: UniCardVariant,
  controlState: CardControlState,
  cardColorConfig?: UniCardColorConfig
): UniCardVariantData => {
  if (variant === 'project-overview') {
    return {
      title: sample.title,
      description: sample.description,
      statusLabel: sample.status,
      footerMeta: 'Last modified: 2 days ago',
      actionLabel: 'Open',
      showIcon: controlState.showIcon,
      colorConfig: cardColorConfig,
    };
  }

  if (variant === 'tool-registry') {
    return {
      title: sample.title,
      description: sample.description,
      version: sample.version ?? 'v1.0.0',
      badges: [{ label: 'Verified', tone: 'verified', icon: verifiedBadgeIcon }],
      chips: sample.functions,
      usageLabel: 'Usage',
      usageValue: sample.usage,
      relatedLabel: 'Used in',
      relatedItems: sample.related,
      showIcon: controlState.showIcon,
      colorConfig: cardColorConfig,
    };
  }

  if (variant === 'platform-component') {
    return {
      title: sample.title,
      description: sample.description,
      metric: sample.metric ?? sample.usage,
      actionLabel: 'Explore',
      showIcon: controlState.showIcon,
      colorConfig: cardColorConfig,
    };
  }

  if (variant === 'spotlight') {
    return {
      title: sample.title,
      description: sample.description,
      statusLabel: sample.status,
      footerMeta: `Last updated: ${sample.status.toLowerCase()} track`,
      actionLabel: 'Open Experience',
      showIcon: controlState.showIcon,
      colorConfig: cardColorConfig,
    };
  }

  return {};
};

const renderVariantCard = (
  sample: CardVariantSample,
  sampleIndex: number,
  activeVariant: CardVariantRoute,
  controlState: CardControlState,
  className?: string
) => {
  const cardColorConfig = resolveCardColorConfig(sample, sampleIndex, controlState);
  const cardLayoutConfig = resolveCardLayoutConfig(controlState);

  if (activeVariant.variant === 'default') {
    return (
      <UniCard
        key={sample.id}
        title={sample.title}
        className={className}
        extra={<UniTag>{sample.status}</UniTag>}
        cardColorConfig={cardColorConfig}
        cardLayoutConfig={cardLayoutConfig}
      >
        <p>{sample.description}</p>
        <p>{sample.metric ?? sample.usage}</p>
      </UniCard>
    );
  }

  return (
    <UniCard
      key={sample.id}
      cardVariant={activeVariant.variant}
      variantData={toVariantData(sample, activeVariant.variant, controlState, cardColorConfig)}
      className={className}
      cardLayoutConfig={cardLayoutConfig}
    />
  );
};

const renderVariantCards = (activeVariant: CardVariantRoute, controlState: CardControlState) => {
  return CARD_VARIANT_SAMPLES.map((sample, sampleIndex) =>
    renderVariantCard(sample, sampleIndex, activeVariant, controlState, 'dev-card-variant-card')
  );
};

const renderCardState = (state: DemoViewState, activeVariant: CardVariantRoute, controlState: CardControlState) => {
  if (state === 'loading') {
    return (
      <UniCard className="dev-route-shell__panel">
        <UniSkeleton paragraph={{ rows: 8 }} />
      </UniCard>
    );
  }

  if (state === 'empty') {
    return (
      <UniCard className="dev-route-shell__panel">
        <UniEmpty
          params={{
            props: {
              title: 'No cards to display',
              description: 'Switch back to default state to render the card variant gallery.',
            },
          }}
        />
      </UniCard>
    );
  }

  if (state === 'error') {
    return (
      <UniCard className="dev-route-shell__panel">
        <div className="dev-route-shell__title-row">
          <h2 className="dev-route-shell__subtitle">Card view data error</h2>
          <UniTag>Error</UniTag>
        </div>
        <p className="dev-route-shell__description">
          Card variants failed to load. Set `?state=default` to return to the standard route.
        </p>
      </UniCard>
    );
  }

  return (
    <div className="dev-card-variant-route">
      <p className="dev-card-variant-description">{activeVariant.description}</p>

      <div className="dev-card-variant-scroll">
        <div className="dev-card-variant-grid">{renderVariantCards(activeVariant, controlState)}</div>

        <h3 className="dev-card-variant-subtitle">Card - Table-backed card collection view ({activeVariant.label})</h3>
        <div className="dev-card-route-container dev-card-route-container--table-backed">
          <CardView
            className="dev-card-table-backed-view"
            cardsData={CARD_VARIANT_SAMPLES}
            summarySlot={<div>{CARD_VARIANT_SAMPLES.length} Records</div>}
            renderCard={(sample, index) => renderVariantCard(sample, index, activeVariant, controlState)}
          />
        </div>
      </div>
    </div>
  );
};

export const CardViewDemoRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useDemoState();

  const activeVariant = useMemo(() => getActiveVariantRoute(location.pathname), [location.pathname]);
  const colorMode = resolveColorMode(location.search);
  const colorScope = resolveColorScope(location.search);
  const colorTypes = resolveColorTypes(location.search);
  const iconMode = resolveIconMode(location.search);
  const layoutMode = resolveLayoutMode(location.search);

  const headerControls = (
    <div className="dev-card-header-controls">
      <div className="dev-card-header-control">
        <span className="dev-card-header-control__label">Card Variant</span>
        <UniSelect
          value={activeVariant.path}
          className="dev-card-header-select"
          style={{ minWidth: 190 }}
          options={CARD_VARIANT_ROUTES.map(route => ({ value: route.path, label: route.label }))}
          onChange={value => {
            navigate(`${String(value)}${location.search}`);
          }}
        />
      </div>

      <div className="dev-card-header-control">
        <span className="dev-card-header-control__label">Color Mode</span>
        <UniSelect
          value={colorMode}
          className="dev-card-header-select"
          style={{ minWidth: 170 }}
          options={UNI_CARD_COLOR_MODES.map(mode => ({ value: mode, label: cardColorModeLabels[mode] }))}
          onChange={value => {
            const nextPath = buildPathWithUpdatedQuery(location.pathname, location.search, {
              [CARD_COLOR_MODE_QUERY_PARAM]: String(value) === 'manual' ? undefined : String(value),
            });
            navigate(nextPath);
          }}
        />
      </div>

      <div className="dev-card-header-control">
        <span className="dev-card-header-control__label">Apply Colors</span>
        <UniSelect
          value={colorScope}
          className="dev-card-header-select"
          style={{ minWidth: 170 }}
          options={UNI_CARD_COLOR_APPLY_OPTIONS.map(scope => ({ value: scope, label: cardColorApplyLabels[scope] }))}
          onChange={value => {
            const nextPath = buildPathWithUpdatedQuery(location.pathname, location.search, {
              [CARD_COLOR_SCOPE_QUERY_PARAM]: String(value) === 'none' ? undefined : String(value),
            });
            navigate(nextPath);
          }}
        />
      </div>

      <div className="dev-card-header-control">
        <span className="dev-card-header-control__label">Color Types</span>
        <UniSelect
          mode="multiple"
          maxTagCount="responsive"
          className="dev-card-header-select"
          style={{ minWidth: 230 }}
          value={colorTypes}
          placeholder="All color pairs"
          options={UNI_CARD_COLOR_PAIRS.map(pair => ({
            value: pair.type,
            label: `${pair.label ?? pair.type} (${pair.color300} / ${pair.color700})`,
          }))}
          onChange={value => {
            const selectedTypes = Array.isArray(value) ? value.map(item => String(item)) : [];
            const nextPath = buildPathWithUpdatedQuery(location.pathname, location.search, {
              [CARD_COLOR_TYPES_QUERY_PARAM]: selectedTypes.length ? selectedTypes.join(',') : undefined,
            });
            navigate(nextPath);
          }}
        />
      </div>

      <div className="dev-card-header-control">
        <span className="dev-card-header-control__label">Card Size</span>
        <UniSelect
          value={layoutMode}
          className="dev-card-header-select"
          style={{ minWidth: 150 }}
          options={UNI_CARD_LAYOUT_MODES.map(mode => ({ value: mode, label: cardLayoutModeLabels[mode] }))}
          onChange={value => {
            const nextPath = buildPathWithUpdatedQuery(location.pathname, location.search, {
              [CARD_LAYOUT_MODE_QUERY_PARAM]: String(value) === 'hug' ? undefined : String(value),
            });
            navigate(nextPath);
          }}
        />
      </div>

      <div className="dev-card-header-control">
        <span className="dev-card-header-control__label">Header Icon</span>
        <UniSelect
          value={iconMode}
          className="dev-card-header-select"
          style={{ minWidth: 140 }}
          options={(Object.keys(cardIconModeLabels) as CardIconMode[]).map(mode => ({
            value: mode,
            label: cardIconModeLabels[mode],
          }))}
          onChange={value => {
            const nextPath = buildPathWithUpdatedQuery(location.pathname, location.search, {
              [CARD_ICON_QUERY_PARAM]: String(value) === 'show' ? undefined : String(value),
            });
            navigate(nextPath);
          }}
        />
      </div>
    </div>
  );

  return (
    <ViewRouteShell
      title="Card View"
      description="Card-oriented view route with reusable UniCard variants inspired by GuidedFlow platform and tools surfaces."
      // breadcrumbs={<UniBreadcrumb items={[{ title: 'Home' }, { title: 'Card View' }]} />}
      globalFilters={headerControls}
      // primaryAction={
      //   <UniButton type="primary" materialIcon={{ iconName: 'add', size: 16 }}>
      //     + New Card
      //   </UniButton>
      // }
    >
      {renderCardState(state, activeVariant, {
        mode: colorMode,
        applyTo: colorScope,
        colorTypes,
        showIcon: iconMode === 'show',
        layoutMode,
      })}
    </ViewRouteShell>
  );
};
