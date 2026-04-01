import type { Meta, StoryObj } from '@storybook/react-vite';

import { UniRangePicker } from '../date-picker/UniDatePicker';
import { UniPageHeader } from '../page-header/UniPageHeader';
import { UniFilterDropdown } from './UniFilterDropdown';

const meta = {
  title: 'Components/Filter Dropdown',
  component: UniFilterDropdown,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof UniFilterDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const orgOptions = [
  { key: 'uniphore', name: 'Uniphore' },
  { key: 'demo-org', name: 'Demo Org' },
];

const statusOptions = [
  { key: 'active', name: 'Active' },
  { key: 'inactive', name: 'Inactive' },
  { key: 'pending', name: 'Pending' },
];

export const Default: Story = {
  args: {
    label: 'Filter',
    showChevron: true,
    options: statusOptions,
  },
};

export const WithSelection: Story = {
  args: {
    label: 'Status',
    showChevron: true,
    selectedKey: 'active',
    options: statusOptions,
  },
};

export const WithIcon: Story = {
  name: 'With icon (org selector)',
  args: {
    label: 'Uniphore',
    iconName: 'domain',
    showChevron: true,
    options: orgOptions,
    selectedKey: 'uniphore',
    placement: 'bottomRight',
  },
};

export const Secondary: Story = {
  name: 'Secondary variant (toolbar filter)',
  args: {
    label: 'Application',
    variant: 'secondary',
    showChevron: true,
    options: [
      { key: 'contact-center', name: 'Contact Center' },
      { key: 'quality', name: 'Quality Management' },
      { key: 'agent-assist', name: 'Agent Assist' },
    ],
  },
};

// ── In context — globalFiltersSlot composition ────────────────
// Daniel's pattern: UniFilterDropdown + UniRangePicker together
// in globalFiltersSlot, as established in UniPageHeader stories.
export const InGlobalFiltersSlot: Story = {
  name: 'In context — globalFiltersSlot',
  render: () => (
    <UniPageHeader
      title="Audiences"
      globalFiltersSlot={
        <>
          <UniFilterDropdown
            label="Uniphore"
            iconName="domain"
            showChevron
            options={orgOptions}
            selectedKey="uniphore"
            placement="bottomRight"
          />
          <UniRangePicker format="YYYY-MM-DD" placeholder={['Start Date', 'End Date']} />
        </>
      }
      primaryActionsSlot={null}
      showToolbar={false}
    />
  ),
};
