import { useEffect, useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  HostShell,
  HOST_SHELL_DEFAULT_DATASETS,
  HOST_SHELL_DEFAULT_LANGUAGES,
  HOST_SHELL_DEFAULT_PERSONAS,
} from './HostShell';
import type { SideNavItem, TopNavMenuItem } from '../../types/side-nav';

const sideNavData: SideNavItem[] = [
  {
    id: 'overview',
    text: 'Overview',
    icon: 'space_dashboard',
    groupId: 'main',
    groupName: 'Main',
    active: true,
    tooltip: 'Overview',
    roles: [],
    routeName: 'overview',
  },
  {
    id: 'reports',
    text: 'Reports',
    icon: 'table_chart',
    groupId: 'main',
    groupName: 'Main',
    active: false,
    tooltip: 'Reports',
    roles: [],
    routeName: 'reports',
  },
];

const menuItems: TopNavMenuItem[] = [
  { key: 'home', label: 'Home', title: 'Home', routeName: 'home', children: [] },
  { key: 'settings', label: 'Settings', title: 'Settings', routeName: 'settings', children: [] },
];

const meta = {
  title: 'Navigation/HostShell',
  component: HostShell,
  tags: ['autodocs'],
  render: args => {
    const personas = useMemo(
      () =>
        args.userPreferences?.personas === false ? [] : (args.userPreferences?.personas ?? HOST_SHELL_DEFAULT_PERSONAS),
      [args.userPreferences?.personas]
    );
    const datasets = useMemo(
      () =>
        args.userPreferences?.datasets === false ? [] : (args.userPreferences?.datasets ?? HOST_SHELL_DEFAULT_DATASETS),
      [args.userPreferences?.datasets]
    );
    const languages = useMemo(
      () =>
        args.userPreferences?.languages === false
          ? []
          : (args.userPreferences?.languages ?? HOST_SHELL_DEFAULT_LANGUAGES),
      [args.userPreferences?.languages]
    );

    const [sideNavState, setSideNavState] = useState(args.sideNavData);
    const [selectedKeys, setSelectedKeys] = useState(args.selectedMenuItems ?? []);
    const [selectedAppKey, setSelectedAppKey] = useState(args.selectedAppKey);
    const [selectedPersonaKey, setSelectedPersonaKey] = useState(
      args.userPreferences?.selectedPersonaKey ?? personas[0]?.key
    );
    const [selectedDatasetKey, setSelectedDatasetKey] = useState(
      args.userPreferences?.selectedDatasetKey ?? datasets[0]?.key
    );
    const [selectedLanguageCode, setSelectedLanguageCode] = useState(
      args.userPreferences?.selectedLanguageCode ?? languages[0]?.code
    );

    useEffect(() => {
      setSideNavState(args.sideNavData);
    }, [args.sideNavData]);

    useEffect(() => {
      setSelectedKeys(args.selectedMenuItems ?? []);
    }, [args.selectedMenuItems]);

    useEffect(() => {
      setSelectedAppKey(args.selectedAppKey);
    }, [args.selectedAppKey]);

    useEffect(() => {
      setSelectedPersonaKey(args.userPreferences?.selectedPersonaKey ?? personas[0]?.key);
    }, [args.userPreferences?.selectedPersonaKey, personas]);

    useEffect(() => {
      setSelectedDatasetKey(args.userPreferences?.selectedDatasetKey ?? datasets[0]?.key);
    }, [args.userPreferences?.selectedDatasetKey, datasets]);

    useEffect(() => {
      setSelectedLanguageCode(args.userPreferences?.selectedLanguageCode ?? languages[0]?.code);
    }, [args.userPreferences?.selectedLanguageCode, languages]);

    const routeKeyMap = useMemo(() => {
      const map = new Map<string, string>();
      const traverse = (items?: TopNavMenuItem[]) => {
        items?.forEach(item => {
          if (item.routeName) {
            map.set(item.routeName, item.key);
          }
          traverse(item.children);
        });
      };
      traverse(args.topMenuItems);
      return map;
    }, [args.topMenuItems]);

    const selectedPersona = personas.find(persona => persona.key === selectedPersonaKey) ?? personas[0];
    const selectedDataset = datasets.find(dataset => dataset.key === selectedDatasetKey) ?? datasets[0];
    const selectedLanguage = languages.find(language => language.code === selectedLanguageCode) ?? languages[0];
    const resolvedUserRoles = selectedPersona
      ? [selectedPersona.label, ...(args.userRoles ?? []).slice(1)]
      : (args.userRoles ?? []);

    const handleSideMenuClick = (route?: string) => {
      setSideNavState(current => setActiveRoute(current, route));
      args.onSideMenuClick?.(route);
    };

    const handleTopMenuClick = (route?: string) => {
      if (!route) {
        setSelectedKeys([]);
        return;
      }
      const key = routeKeyMap.get(route);
      setSelectedKeys(key ? [key] : []);
      args.onTopMenuClick?.(route);
    };

    return (
      <HostShell
        {...args}
        sideNavData={sideNavState}
        selectedMenuItems={selectedKeys}
        selectedAppKey={selectedAppKey}
        userRoles={resolvedUserRoles}
        userPreferences={{
          ...args.userPreferences,
          personas,
          datasets,
          languages,
          selectedPersonaKey,
          selectedDatasetKey,
          selectedLanguageCode,
        }}
        onSideMenuClick={handleSideMenuClick}
        onTopMenuClick={handleTopMenuClick}
        onAppSwitch={app => {
          setSelectedAppKey(app.key);
          args.onAppSwitch?.(app);
        }}
        onPersonaChange={(personaKey, persona) => {
          setSelectedPersonaKey(personaKey);
          args.onPersonaChange?.(personaKey, persona);
        }}
        onDatasetChange={(datasetKey, dataset) => {
          setSelectedDatasetKey(datasetKey);
          args.onDatasetChange?.(datasetKey, dataset);
        }}
        onLanguageChange={(languageCode, language) => {
          setSelectedLanguageCode(languageCode);
          args.onLanguageChange?.(languageCode, language);
        }}
      >
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-3 text-sm font-semibold text-slate-900">Route content</div>
          <div className="mb-4 text-sm text-slate-600">
            Persona: {selectedPersona?.label ?? 'None'} | Data set: {selectedDataset?.label ?? 'None'} | Language:{' '}
            {selectedLanguage?.label ?? 'None'}
          </div>
          {args.children}
        </div>
      </HostShell>
    );
  },
  args: {
    sideNavData,
    topMenuItems: menuItems,
    selectedMenuItems: ['home'],
    userDetails: { name: 'Jane Doe', email: 'jane@example.com' },
    userRoles: ['Admin', 'Developer'],
    appTitle: 'Universal Apps',
    appSwitcherItems: [
      { key: 'apps', label: 'Universal Apps', routeName: 'home' },
      { key: 'ops', label: 'Operations Studio', routeName: 'reports' },
      { key: 'tokens', label: 'Token Explorer', routeName: 'settings' },
    ],
    selectedAppKey: 'apps',
    alerts: [
      {
        id: 'a-1',
        title: 'Dataset refresh complete',
        description: 'Customer usage metrics were updated.',
        timestamp: '2m ago',
        read: false,
      },
      {
        id: 'a-2',
        title: 'Role approval pending',
        description: 'A request needs your review.',
        timestamp: '14m ago',
        read: false,
      },
      {
        id: 'a-3',
        title: 'Sync completed',
        description: 'CRM and telephony integration synced successfully.',
        timestamp: '1h ago',
        read: true,
      },
    ],
    alertsBadgeCount: 2,
    userPreferences: {
      personas: HOST_SHELL_DEFAULT_PERSONAS,
      datasets: HOST_SHELL_DEFAULT_DATASETS,
      languages: HOST_SHELL_DEFAULT_LANGUAGES,
    },
    children: <div>Route content (for example an &lt;Outlet /&gt; target) goes here.</div>,
  },
} satisfies Meta<typeof HostShell>;

export default meta;

type Story = StoryObj<typeof meta>;

const setActiveRoute = (items: SideNavItem[], route?: string): SideNavItem[] =>
  items.map(item => ({
    ...item,
    active: Boolean(route && item.routeName === route),
    children: item.children ? setActiveRoute(item.children, route) : undefined,
  }));

export const Default: Story = {
  args: {},
};

export const NoSideNav: Story = {
  args: {
    showSideNav: false,
  },
};
