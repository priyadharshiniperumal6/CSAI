import { useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import type { SideNavItem, TopNavMenuItem } from '../../../types/side-nav';
import {
  HostShell,
  HOST_SHELL_DEFAULT_DATASETS,
  HOST_SHELL_DEFAULT_LANGUAGES,
  HOST_SHELL_DEFAULT_PERSONAS,
} from '../../../components/host-shell/HostShell';
import type { SideNavAppSwitcherItem } from '../../../components/side-nav/SideNav';
import { UniAIAssistPanel } from '../../../components/chat-ui/UniAIAssistPanel';
import type { UniChatUIMessage } from '../../../components/chat-ui/UniChatUI';
import { DEMO_STATE_QUERY_PARAM, DEMO_VIEW_STATES, parseDemoViewState } from '../../mocks/demoState';
import { routeRegistry } from '../../router/routeRegistry';
import { findActiveRoute, resolveRuntimePath } from '../../router/runtimeRouteUtils';
import type { RouteSpec } from '../../router/types';
import {
  TOKEN_SECTION_KEYS,
  TOKEN_SECTION_LABELS,
  TOKEN_SECTION_ROUTE_PATHS,
  parseTokenSectionFromPathname,
} from '../assets/tokenFilters';

const routeById = routeRegistry.reduce<Map<string, RouteSpec>>((map, route) => {
  map.set(route.routeId, route);
  return map;
}, new Map<string, RouteSpec>());

const primaryNavSections = [
  {
    id: 'view-patterns',
    label: 'View Patterns',
    routeIds: [
      'views.aiHome',
      'views.dashboard',
      'views.table',
      'views.card',
      'views.flow',
      'views.chat',
      'views.objectDetails',
    ],
  },
  {
    id: 'design-tokens',
    label: 'Design Tokens',
    routeIds: ['assets.tokens', 'assets.icons', 'assets.typography'],
  },
] as const;

const routeLabelOverrides: Record<string, string> = {
  'views.objectDetails': 'Object View',
};

const demoStateLabels: Record<(typeof DEMO_VIEW_STATES)[number], string> = {
  default: 'Default',
  loading: 'Loading',
  empty: 'Empty',
  error: 'Error',
};

const defaultAlerts = [
  {
    id: 'dev-route-registry',
    title: 'Route registry connected',
    description: 'HostShell navigation is now generated from src/dev/router/routeRegistry.ts.',
    timestamp: 'Now',
    routeName: '/views/dashboard',
    read: false,
  },
];

const appSwitcherRegistry = [
  { key: 'runtime', label: 'Universal Theme Dev Runtime', routeId: 'views.dashboard' },
  { key: 'tokens', label: 'Design Token Explorer', routeId: 'assets.tokens' },
  { key: 'typography', label: 'Typography Studio', routeId: 'assets.typography' },
] as const;

const buildRouteWithQueryParam = (
  pathname: string,
  search: string,
  paramName: string,
  paramValue?: string | null
): string => {
  const searchParams = new URLSearchParams(search);
  if (!paramValue) {
    searchParams.delete(paramName);
  } else {
    searchParams.set(paramName, paramValue);
  }
  const nextSearch = searchParams.toString();
  return nextSearch ? `${pathname}?${nextSearch}` : pathname;
};

const isRouteIdActive = (targetRouteId: string, activeRouteId?: string) => {
  if (!activeRouteId) {
    return false;
  }
  return activeRouteId === targetRouteId || activeRouteId.startsWith(`${targetRouteId}.`);
};

// ── AI Assist panel demo data ───────────────────────────────────────────────────

export const AI_ASSIST_USE_CASES = [
  {
    key: 'uc-paths',
    label: 'Most common customer paths',
    icon: (
      <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#15808C' }}>
        route
      </span>
    ),
  },
  {
    key: 'uc-dropoff',
    label: 'Journey drop-off points',
    icon: (
      <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#2263d5' }}>
        trending_down
      </span>
    ),
  },
  {
    key: 'uc-patterns',
    label: 'Successful journey patterns',
    icon: (
      <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#cc860c' }}>
        task_alt
      </span>
    ),
  },
];

export const AI_ASSIST_CONVERSATIONS = [
  { key: 'conv-1', label: 'User Journeys analysis for Q1' },
  { key: 'conv-2', label: 'Rag Platform document workflow' },
  { key: 'conv-3', label: 'Agent performance deep-dive' },
  { key: 'conv-4', label: 'Self-serve analytics overview' },
  { key: 'conv-5', label: 'Conversion rate path optimisation' },
];

// ── Dummy conversation history ────────────────────────────────────────────────

export const DUMMY_CONVERSATIONS: Record<string, UniChatUIMessage[]> = {
  'conv-1': [
    {
      id: 'c1-1',
      role: 'user',
      content: 'Can you analyse our user journey data for Q1 and tell me where customers are dropping off?',
    },
    {
      id: 'c1-2',
      role: 'ai',
      content: (
        <span>
          Sure! Here is a summary of the <strong>Q1 user journey analysis</strong>:<br />
          <br />
          <strong>Top 3 drop-off points:</strong>
          <ul style={{ margin: '8px 0 0 16px', padding: 0 }}>
            <li>Onboarding step 3 — 38% drop (form too long)</li>
            <li>First report generation — 24% drop (load time &gt;8s)</li>
            <li>Team invite flow — 19% drop (email confirmation friction)</li>
          </ul>
        </span>
      ),
    },
    { id: 'c1-3', role: 'user', content: 'Which segment had the worst drop-off in onboarding step 3?' },
    {
      id: 'c1-4',
      role: 'ai',
      content: (
        <span>
          The <strong>Enterprise tier</strong> had the worst drop-off at onboarding step 3 — <strong>52%</strong> vs 29%
          for SMB.
          <br />
          <br />
          Likely cause: Enterprise users are being asked to configure SSO and SCIM provisioning in the same step, which
          requires IT involvement. SMB users skip this entirely.
        </span>
      ),
    },
    { id: 'c1-5', role: 'user', content: 'Can you compare this to Q4 last year?' },
    {
      id: 'c1-6',
      role: 'ai',
      content: (
        <span>
          <strong>Q1 vs Q4 comparison — Onboarding step 3:</strong>
          <br />
          <br />
          Q4: 31% overall drop-off (Enterprise: 44%, SMB: 22%)
          <br />
          Q1: 38% overall drop-off (Enterprise: 52%, SMB: 29%)
          <br />
          <br />
          The situation has <strong>worsened by 8 percentage points</strong> quarter-over-quarter. This correlates with
          the SSO requirement added in the Jan 15 release.
        </span>
      ),
    },
    { id: 'c1-7', role: 'user', content: 'What would you recommend to fix this?' },
    {
      id: 'c1-8',
      role: 'ai',
      content: (
        <span>
          Three high-impact recommendations:
          <br />
          <br />
          <strong>1. Split the onboarding step</strong> — separate optional SSO/SCIM setup into a finish-later flow.
          Estimated recovery: +15–20% completion.
          <br />
          <br />
          <strong>2. Add an IT admin handoff</strong> — let the main user bookmark the SSO step and send an email invite
          to their IT team to complete it. Used by Okta, Salesforce.
          <br />
          <br />
          <strong>3. Progressive profiling</strong> — skip enterprise config entirely until the user has hit their first
          meaningful value moment (first report viewed). Then prompt.
        </span>
      ),
    },
    { id: 'c1-9', role: 'user', content: 'Which of these would have the fastest impact?' },
    {
      id: 'c1-10',
      role: 'ai',
      content: (
        <span>
          <strong>Option 2 (IT admin handoff)</strong> would be fastest — it is purely a UX copy + email change, no
          backend work required. Could ship in a single sprint.
          <br />
          <br />
          Option 1 is higher impact but requires a flow redesign (~3 sprints). I would prioritise Option 2 for Q2 and
          plan Option 1 for Q3.
        </span>
      ),
    },
    { id: 'c1-11', role: 'user', content: 'Can you draft a JIRA ticket summary for Option 2?' },
    {
      id: 'c1-12',
      role: 'ai',
      content: (
        <span>
          <strong>JIRA: Onboarding — IT Admin Handoff for SSO Step</strong>
          <br />
          <br />
          <em>Summary:</em> Add an IT admin invite CTA in onboarding step 3 to unblock Enterprise users who cannot
          self-configure SSO/SCIM.
          <br />
          <br />
          <em>Acceptance criteria:</em>
          <ul style={{ margin: '6px 0 0 16px', padding: 0 }}>
            <li>User can enter an IT admin email address on step 3</li>
            <li>IT admin receives a branded email with a deep-link to the SSO config</li>
            <li>Main user can skip step 3 and continue onboarding</li>
            <li>Dashboard shows SSO pending badge until configured</li>
          </ul>
        </span>
      ),
    },
  ],
  'conv-2': [
    { id: 'c2-1', role: 'user', content: 'Walk me through how the RAG platform document workflow is set up.' },
    {
      id: 'c2-2',
      role: 'ai',
      content: (
        <span>
          The <strong>RAG platform document workflow</strong> has 4 stages:
          <br />
          <br />
          <strong>1. Ingestion</strong> — Documents (PDF, DOCX, web pages) are uploaded via the API or the UI. They are
          chunked into ~512-token segments.
          <br />
          <br />
          <strong>2. Embedding</strong> — Each chunk is passed through the embedding model (currently{' '}
          <em>text-embedding-ada-002</em>) and stored in the vector DB (Pinecone).
          <br />
          <br />
          <strong>3. Retrieval</strong> — At query time, the user query is embedded and the top-k most similar chunks
          are retrieved.
          <br />
          <br />
          <strong>4. Generation</strong> — The retrieved chunks are injected into the system prompt and the LLM
          generates a grounded answer.
        </span>
      ),
    },
    { id: 'c2-3', role: 'user', content: 'What embedding model are we using and can we switch it?' },
    {
      id: 'c2-4',
      role: 'ai',
      content: (
        <span>
          Current model: <strong>text-embedding-ada-002</strong> (OpenAI, 1536 dimensions).
          <br />
          <br />
          You can switch, but it requires a <strong>full re-embedding</strong> of all documents in the vector DB — the
          embeddings are model-specific and not interchangeable.
          <br />
          <br />
          Alternatives worth evaluating:
          <br />
          <ul style={{ margin: '6px 0 0 16px', padding: 0 }}>
            <li>
              <strong>text-embedding-3-large</strong> — higher accuracy, 3x cost
            </li>
            <li>
              <strong>Cohere embed-v3</strong> — strong multilingual, lower cost
            </li>
            <li>
              <strong>BGE-M3</strong> — open-source, self-hosted, good for on-prem requirements
            </li>
          </ul>
        </span>
      ),
    },
    { id: 'c2-5', role: 'user', content: 'What chunk size are we using and is it optimal?' },
    {
      id: 'c2-6',
      role: 'ai',
      content: (
        <span>
          Current chunk size: <strong>512 tokens</strong>, with a 64-token overlap between adjacent chunks.
          <br />
          <br />
          For your document types (mostly structured reports + policy docs), research suggests{' '}
          <strong>256–512 tokens</strong> is the sweet spot. Longer chunks preserve more context but reduce precision;
          shorter chunks improve retrieval but may miss full answers.
          <br />
          <br />I would recommend running an A/B evaluation at 256 tokens to see if answer quality improves for the top
          20 most common query types.
        </span>
      ),
    },
    { id: 'c2-7', role: 'user', content: 'Are there any known issues with the current setup?' },
    {
      id: 'c2-8',
      role: 'ai',
      content: (
        <span>
          Three known issues logged in the backlog:
          <br />
          <br />
          <strong>1. Table extraction</strong> — PDF tables are being chunked mid-row, breaking the semantic meaning.
          Impact: ~12% of financial report queries return garbled table data.
          <br />
          <br />
          <strong>2. Stale embeddings</strong> — Updated documents are not automatically re-embedded. If a policy doc is
          edited, the old embedding stays in the vector DB until a manual re-index is triggered.
          <br />
          <br />
          <strong>3. Context window overflow</strong> — For very broad queries, top-k retrieval can return 8+ chunks
          that together exceed the LLM context window, causing silent truncation.
        </span>
      ),
    },
    { id: 'c2-9', role: 'user', content: 'How do we fix the stale embeddings issue?' },
    {
      id: 'c2-10',
      role: 'ai',
      content: (
        <span>
          The cleanest fix is a <strong>document hash-based change detection</strong> pipeline:
          <br />
          <br />
          On each document save, compute a SHA-256 hash of the content. Compare against the stored hash. If different,
          trigger an async re-embedding job and update the vector DB.
          <br />
          <br />
          This can be wired into the existing document update webhook — estimated{' '}
          <strong>2–3 days of backend work</strong>. No UI changes needed.
        </span>
      ),
    },
    { id: 'c2-11', role: 'user', content: 'Can we prioritise this for the next sprint?' },
    {
      id: 'c2-12',
      role: 'ai',
      content: (
        <span>
          Yes — this is a good candidate for next sprint given the low complexity and high impact.
          <br />
          <br />
          Consider pairing it with a <strong>re-index UI</strong> (manual force-refresh button on each document) as a
          fallback for edge cases. That adds maybe half a day of frontend work.
          <br />
          <br />
          Want me to draft the technical spec and acceptance criteria for both tasks?
        </span>
      ),
    },
  ],
};

// ── DevAIAssistPanel — stateful AI panel for the dev runtime ──────────────────

const DevAIAssistPanel = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState<UniChatUIMessage[]>([]);
  const [conversations, setConversations] = useState(AI_ASSIST_CONVERSATIONS);
  const [activeKey, setActiveKey] = useState<string | undefined>(undefined);

  const handleSend = (value: string) => {
    setMessages(current => [
      ...current,
      { id: `user-${Date.now()}`, role: 'user' as const, content: value },
      { id: `ai-${Date.now()}`, role: 'ai' as const, content: 'Looking it up…' },
    ]);
  };

  const handleConversationCreate = () => {
    const key = `conv-new-${Date.now()}`;
    setConversations(current => [{ key, label: 'New Chat' }, ...current]);
    setActiveKey(key);
    setMessages([]);
  };

  const handleConversationChange = (key: string) => {
    setActiveKey(key);
    const preset = DUMMY_CONVERSATIONS[key];
    if (preset) {
      setMessages(preset);
    } else {
      const found = conversations.find(c => c.key === key);
      setMessages([{ id: `ai-loaded-${key}`, role: 'ai' as const, content: `Loaded: ${found?.label ?? key}` }]);
    }
  };

  return (
    <UniAIAssistPanel
      userName="Rachel"
      useCases={AI_ASSIST_USE_CASES}
      conversations={conversations}
      activeConversationKey={activeKey}
      messages={messages}
      onSend={handleSend}
      onConversationCreate={handleConversationCreate}
      onConversationChange={handleConversationChange}
      onClose={onClose}
    />
  );
};

export const DevHostShellLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [aiAssistOpen, setAiAssistOpen] = useState(false);
  const [selectedPersonaKey, setSelectedPersonaKey] = useState(HOST_SHELL_DEFAULT_PERSONAS[0].key);
  const [selectedDatasetKey, setSelectedDatasetKey] = useState(HOST_SHELL_DEFAULT_DATASETS[0].key);
  const [selectedLanguageCode, setSelectedLanguageCode] = useState(HOST_SHELL_DEFAULT_LANGUAGES[0].code);

  const activeRoute = useMemo(() => findActiveRoute(location.pathname, routeRegistry), [location.pathname]);
  const selectedPersona =
    HOST_SHELL_DEFAULT_PERSONAS.find(persona => persona.key === selectedPersonaKey) ?? HOST_SHELL_DEFAULT_PERSONAS[0];

  const sideNavData = useMemo<SideNavItem[]>(() => {
    return primaryNavSections.flatMap(section =>
      section.routeIds.flatMap(routeId => {
        const route = routeById.get(routeId);
        if (!route) {
          return [];
        }

        return [
          {
            id: route.routeId,
            text: routeLabelOverrides[route.routeId] ?? route.nav.label,
            icon: route.nav.iconKey,
            groupId: section.id,
            groupName: section.label,
            active: isRouteIdActive(route.routeId, activeRoute?.routeId),
            tooltip: route.title,
            roles: [],
            routeName: resolveRuntimePath(route),
          },
        ];
      })
    );
  }, [activeRoute?.routeId]);

  const topMenuItems = useMemo<TopNavMenuItem[]>(() => {
    if (!activeRoute) {
      return [];
    }

    // Full-page views that manage their own layout don't use the demo state switcher
    if (activeRoute.routeId === 'views.aiHome') {
      return [];
    }

    if (activeRoute.routeId.startsWith('views.')) {
      return DEMO_VIEW_STATES.map(stateKey => ({
        key: `state-${stateKey}`,
        label: demoStateLabels[stateKey],
        title: demoStateLabels[stateKey],
        routeName: buildRouteWithQueryParam(
          location.pathname,
          location.search,
          DEMO_STATE_QUERY_PARAM,
          stateKey === 'default' ? null : stateKey
        ),
      }));
    }

    if (activeRoute.routeId.startsWith('assets.tokens')) {
      return TOKEN_SECTION_KEYS.map(tokenSection => ({
        key: `token-section-${tokenSection}`,
        label: TOKEN_SECTION_LABELS[tokenSection],
        title: TOKEN_SECTION_LABELS[tokenSection],
        routeName: `${TOKEN_SECTION_ROUTE_PATHS[tokenSection]}${location.search}`,
      }));
    }

    return [];
  }, [activeRoute, location.pathname, location.search]);

  const selectedMenuItems = useMemo(() => {
    if (!activeRoute) {
      return [];
    }

    if (activeRoute.routeId.startsWith('views.') && activeRoute.routeId !== 'views.aiHome') {
      return [`state-${parseDemoViewState(location.search)}`];
    }

    if (activeRoute.routeId.startsWith('assets.tokens')) {
      return [`token-section-${parseTokenSectionFromPathname(location.pathname)}`];
    }

    return [];
  }, [activeRoute, location.pathname, location.search]);

  const appSwitcherItems = useMemo<SideNavAppSwitcherItem[]>(() => {
    return appSwitcherRegistry.flatMap(entry => {
      const route = routeById.get(entry.routeId);
      if (!route) {
        return [];
      }

      return [
        {
          key: entry.key,
          label: entry.label,
          routeName: resolveRuntimePath(route),
        },
      ];
    });
  }, []);

  const selectedAppKey = useMemo(() => {
    const activeRouteId = activeRoute?.routeId;
    if (!activeRouteId) {
      return appSwitcherRegistry[0].key;
    }

    if (activeRouteId.startsWith('assets.tokens')) {
      return 'tokens';
    }

    if (activeRouteId.startsWith('assets.typography')) {
      return 'typography';
    }

    return 'runtime';
  }, [activeRoute?.routeId]);

  const handleNavigate = (routeName?: string) => {
    if (!routeName) {
      return;
    }
    navigate(routeName);
  };

  const handleAppSwitch = (app: SideNavAppSwitcherItem) => {
    handleNavigate(app.routeName);
  };

  const isAiHomePage = activeRoute?.routeId === 'views.aiHome';

  return (
    <HostShell
      sideNavData={sideNavData}
      topMenuItems={topMenuItems}
      selectedMenuItems={selectedMenuItems}
      headerClassName={isAiHomePage ? 'dev-host-shell-header--hidden' : undefined}
      userDetails={{
        given_name: 'Rachel',
        name: 'rachel@uniphore.com',
        email: 'rachel@uniphore.com',
        tenantName: 'Universal Theme DS',
      }}
      userRoles={[selectedPersona.label, 'Frontend']}
      appTitle="Universal Theme Dev Runtime"
      appSwitcherItems={appSwitcherItems}
      selectedAppKey={selectedAppKey}
      alerts={defaultAlerts}
      alertsBadgeCount={1}
      userPreferences={{
        personas: HOST_SHELL_DEFAULT_PERSONAS,
        datasets: HOST_SHELL_DEFAULT_DATASETS,
        languages: HOST_SHELL_DEFAULT_LANGUAGES,
        selectedPersonaKey,
        selectedDatasetKey,
        selectedLanguageCode,
      }}
      aiAssistOpen={aiAssistOpen}
      aiAssistPanel={<DevAIAssistPanel onClose={() => setAiAssistOpen(false)} />}
      onSideMenuClick={handleNavigate}
      onTopMenuClick={handleNavigate}
      onAppSwitch={handleAppSwitch}
      onPersonaChange={personaKey => setSelectedPersonaKey(personaKey)}
      onDatasetChange={datasetKey => setSelectedDatasetKey(datasetKey)}
      onLanguageChange={languageCode => setSelectedLanguageCode(languageCode)}
      onAIAssistToggle={setAiAssistOpen}
      contentContainerClassName="dev-host-shell-content"
    >
      <Outlet />
    </HostShell>
  );
};
