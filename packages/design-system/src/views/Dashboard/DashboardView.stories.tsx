import type { Meta, StoryObj } from '@storybook/react-vite';

import { UniBreadcrumb } from '../../components/breadcrumb/UniBreadcrumb';
import { UniButton } from '../../components/button/UniButton';
import { UniCard } from '../../components/card/UniCard';
import { UniSearchInput } from '../../components/input/UniSearchInput';
import { UniSelect } from '../../components/select/UniSelect';
import { DashboardView } from './DashboardView';

const topZone = (
  <div className="grid gap-3 md:grid-cols-4">
    <UniCard>
      <div className="text-sm text-neutral-700">Resolved Today</div>
      <div className="mt-1 text-xl font-semibold">2,481</div>
    </UniCard>
    <UniCard>
      <div className="text-sm text-neutral-700">Avg Handle Time</div>
      <div className="mt-1 text-xl font-semibold">6m 18s</div>
    </UniCard>
    <UniCard>
      <div className="text-sm text-neutral-700">CSAT</div>
      <div className="mt-1 text-xl font-semibold">93.2%</div>
    </UniCard>
    <UniCard>
      <div className="text-sm text-neutral-700">Deflection</div>
      <div className="mt-1 text-xl font-semibold">41%</div>
    </UniCard>
  </div>
);

const mainZone = (
  <UniCard className="h-full">
    <div className="text-base font-medium">Primary Dashboard Surface</div>
    <div className="mt-2 text-sm text-neutral-700">
      Pair charts, incident lists, and comparative tables in this main area.
    </div>
  </UniCard>
);

const rightZone = (
  <UniCard className="h-full">
    <div className="text-base font-medium">Operational Alerts</div>
    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-neutral-700">
      <li>Voice queue latency above threshold</li>
      <li>3 routing policies pending approval</li>
      <li>Forecast drift detected in APAC</li>
    </ul>
  </UniCard>
);

const bottomZone = (
  <UniCard>
    <div className="text-base font-medium">Recent Deployments</div>
    <div className="mt-2 text-sm text-neutral-700">Deployment timeline and rollback status can be shown here.</div>
  </UniCard>
);

const meta = {
  title: 'Views/Patterns/DashboardView',
  component: DashboardView,
  tags: ['autodocs'],
  args: {
    title: 'Operations Dashboard',
    description: 'Monitor live KPIs and workflow outcomes across regions.',
    breadcrumbs: <UniBreadcrumb items={[{ title: 'Views' }, { title: 'Dashboard' }]} />,
    primaryAction: <UniButton type="primary">Add Widget</UniButton>,
    globalFilters: <UniButton>Refresh</UniButton>,
    toolbar: {
      searchSlot: <UniSearchInput placeholder="Search widgets" style={{ width: 220 }} />,
      filtersSlot: (
        <UniSelect
          style={{ minWidth: 180 }}
          defaultValue="all"
          options={[
            { label: 'All Teams', value: 'all' },
            { label: 'Support', value: 'support' },
            { label: 'Sales', value: 'sales' },
            { label: 'Product', value: 'product' },
          ]}
        />
      ),
      actionsSlot: <UniButton>Export</UniButton>,
    },
    topZone,
    mainZone,
    rightZone,
    bottomZone,
  },
  argTypes: {
    isLoading: { control: 'boolean' },
    isEmpty: { control: 'boolean' },
    error: { control: 'text' },
    layout: {
      control: 'radio',
      options: ['zones', 'grid'],
    },
  },
} satisfies Meta<typeof DashboardView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    isEmpty: true,
  },
};

export const Error: Story = {
  args: {
    error: 'Dashboard widgets could not be loaded.',
  },
};
