import type { Meta, StoryObj } from '@storybook/react-vite';

import { UniBreadcrumb } from '../../components/breadcrumb/UniBreadcrumb';
import { UniButton } from '../../components/button/UniButton';
import { UniCard } from '../../components/card/UniCard';
import { UniTag } from '../../components/tag/UniTag';
import { ObjectDetailsView, type ObjectDetailsSection } from './ObjectDetailsView';

const sections: ObjectDetailsSection[] = [
  {
    key: 'overview',
    label: 'Overview',
    content: (
      <UniCard>
        <div className="text-base font-medium">Customer Overview</div>
        <div className="mt-2 text-sm text-neutral-700">
          Active channels: Voice, Chat, Email. Last policy refresh completed 2 hours ago.
        </div>
      </UniCard>
    ),
  },
  {
    key: 'integrations',
    label: 'Integrations',
    content: (
      <UniCard>
        <div className="text-base font-medium">Integrations</div>
        <div className="mt-2 flex flex-wrap gap-2">
          <UniTag>Salesforce</UniTag>
          <UniTag>Snowflake</UniTag>
          <UniTag>Zendesk</UniTag>
        </div>
      </UniCard>
    ),
  },
  {
    key: 'audit',
    label: 'Audit',
    content: (
      <UniCard>
        <div className="text-base font-medium">Audit Trail</div>
        <div className="mt-2 text-sm text-neutral-700">
          Use this section for ownership changes, approvals, and policy rollout history.
        </div>
      </UniCard>
    ),
  },
];

const rightRailSlot = (
  <UniCard>
    <div className="text-base font-medium">Owner & Status</div>
    <div className="mt-2 text-sm text-neutral-700">Owner: CX Operations</div>
    <div className="mt-1 text-sm text-neutral-700">Environment: Production</div>
    <div className="mt-2">
      <UniTag>Healthy</UniTag>
    </div>
  </UniCard>
);

const meta = {
  title: 'Views/Patterns/ObjectDetailsView',
  component: ObjectDetailsView,
  tags: ['autodocs'],
  args: {
    title: 'Account Policy',
    description: 'Inspect object-level details and execute updates from a single pane.',
    breadcrumbs: <UniBreadcrumb items={[{ title: 'Views' }, { title: 'Accounts' }, { title: 'Account Policy' }]} />,
    primaryAction: <UniButton type="primary">Save Changes</UniButton>,
    globalFilters: <UniButton>Clone</UniButton>,
    actionBarSlot: (
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm text-neutral-700">Last synced: 6 minutes ago</div>
        <div className="flex items-center gap-2">
          <UniButton>Compare Versions</UniButton>
          <UniButton>Export JSON</UniButton>
        </div>
      </div>
    ),
    sections,
    rightRailSlot,
  },
  argTypes: {
    isLoading: { control: 'boolean' },
    isEmpty: { control: 'boolean' },
    error: { control: 'text' },
  },
} satisfies Meta<typeof ObjectDetailsView>;

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
    sections: [],
  },
};

export const Error: Story = {
  args: {
    error: 'Object details are currently unavailable.',
  },
};
