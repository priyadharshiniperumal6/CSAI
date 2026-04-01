import type { Meta, StoryObj } from '@storybook/react-vite';

import { SideNav } from './SideNav';
import type { SideNavItem } from '../../types/side-nav';

const sampleData: SideNavItem[] = [
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
    icon: 'table',
    groupId: 'main',
    groupName: 'Main',
    active: false,
    tooltip: 'Reports',
    roles: [],
    routeName: 'reports',
  },
  {
    id: 'settings',
    text: 'Settings',
    icon: 'settings',
    groupId: 'configuration',
    groupName: 'CONFIGURATION',
    active: false,
    tooltip: 'Settings',
    roles: [],
    routeName: 'settings',
  },
];

const meta = {
  title: 'Navigation/SideNav',
  component: SideNav,
  tags: ['autodocs'],
  args: {
    sideNavData: sampleData,
    appTitle: 'Universal Theme Dev Runtime',
    appSwitcherItems: [
      { key: 'runtime', label: 'Universal Theme Dev Runtime', routeName: 'overview' },
      { key: 'tokens', label: 'Design Token Explorer', routeName: 'settings' },
    ],
    selectedAppKey: 'runtime',
  },
} satisfies Meta<typeof SideNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
