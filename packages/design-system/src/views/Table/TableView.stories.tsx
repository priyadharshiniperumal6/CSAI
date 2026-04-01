import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ColDef } from '@ag-grid-community/core';

import { UniBreadcrumb } from '../../components/breadcrumb/UniBreadcrumb';
import { UniButton } from '../../components/button/UniButton';
import { UniDrawer } from '../../components/drawer/UniDrawer';
import { UniInput } from '../../components/input/UniInput';
import { UniSearchInput } from '../../components/input/UniSearchInput';
import { UniSelect } from '../../components/select/UniSelect';
import { UniTag } from '../../components/tag/UniTag';
import { TableView, type TableViewConfig, type TableViewRow } from './TableView';

const rows: TableViewRow[] = [
  { id: 'obj-100', name: 'Acme Support Queue', owner: 'Talia Ford', region: 'North America', status: 'Active' },
  { id: 'obj-101', name: 'Claims Voice Intake', owner: 'Kade Hancock', region: 'EMEA', status: 'Pending' },
  { id: 'obj-102', name: 'Retention Escalations', owner: 'Remi Richards', region: 'APAC', status: 'Paused' },
  { id: 'obj-103', name: 'Fraud Review Pipeline', owner: 'Trinity Walton', region: 'North America', status: 'Active' },
];

const columns: ColDef<TableViewRow>[] = [
  { headerName: 'Name', field: 'name', filter: true },
  { headerName: 'Owner', field: 'owner', filter: true },
  { headerName: 'Region', field: 'region', filter: true },
  {
    headerName: 'Status',
    field: 'status',
    filter: true,
    cellRenderer: params => <UniTag>{String(params.value ?? '')}</UniTag>,
  },
];

const baseToolbar = {
  searchSlot: <UniSearchInput placeholder="Search records" style={{ width: 260 }} />,
  filtersSlot: (
    <UniSelect
      style={{ minWidth: 180 }}
      placeholder="Region"
      options={[
        { label: 'All Regions', value: 'all' },
        { label: 'North America', value: 'na' },
        { label: 'EMEA', value: 'emea' },
        { label: 'APAC', value: 'apac' },
      ]}
      defaultValue="all"
    />
  ),
  exportSlot: <UniButton>Export</UniButton>,
  shareSlot: <UniButton>Share</UniButton>,
};

const paginationSlot = (
  <div className="flex items-center gap-2">
    <UniButton>Previous</UniButton>
    <UniButton type="primary">1</UniButton>
    <UniButton>2</UniButton>
    <UniButton>Next</UniButton>
  </div>
);

const baseConfig: TableViewConfig = {
  columns,
  toolbar: baseToolbar,
  rowActions: [{ key: 'inspect', label: 'Inspect', materialIcon: 'visibility' }],
  bulkActions: [
    { key: 'archive', label: 'Archive' },
    { key: 'assign', label: 'Assign Owner', type: 'primary' },
  ],
  paginationSlot,
};

const meta = {
  title: 'Views/Patterns/TableView',
  component: TableView,
  tags: ['autodocs'],
  args: {
    title: 'Accounts',
    description: 'Track account-level workflows and execute row-level actions.',
    breadcrumbs: <UniBreadcrumb items={[{ title: 'Views' }, { title: 'Accounts' }]} />,
    primaryAction: <UniButton type="primary">Create Account</UniButton>,
    globalFilters: <UniButton>Refresh</UniButton>,
    data: rows,
    config: baseConfig,
  },
  argTypes: {
    isLoading: { control: 'boolean' },
    isEmpty: { control: 'boolean' },
    error: { control: 'text' },
  },
} satisfies Meta<typeof TableView>;

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
    data: [],
  },
};

export const Error: Story = {
  args: {
    error: 'The records endpoint timed out.',
  },
};

export const EditWorkflow: Story = {
  render: args => {
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<TableViewRow | null>(null);

    const workflowConfig = useMemo<TableViewConfig>(
      () => ({
        ...baseConfig,
        rowActions: [
          {
            key: 'edit',
            label: 'Edit',
            materialIcon: 'edit',
            onClick: row => {
              setSelectedRow(row);
              setOpen(true);
            },
          },
          { key: 'inspect', label: 'Inspect', materialIcon: 'visibility' },
        ],
      }),
      []
    );

    return (
      <>
        <TableView {...args} config={workflowConfig} />
        <UniDrawer
          open={open}
          onClose={() => setOpen(false)}
          width={420}
          title={`Edit ${String(selectedRow?.name ?? 'record')}`}
        >
          <div className="flex flex-col gap-4">
            <UniInput defaultValue={String(selectedRow?.name ?? '')} placeholder="Name" />
            <UniSelect
              placeholder="Status"
              defaultValue={String(selectedRow?.status ?? 'Active')}
              options={[
                { label: 'Active', value: 'Active' },
                { label: 'Pending', value: 'Pending' },
                { label: 'Paused', value: 'Paused' },
              ]}
            />
            <div className="flex items-center justify-end gap-2">
              <UniButton onClick={() => setOpen(false)}>Cancel</UniButton>
              <UniButton type="primary" onClick={() => setOpen(false)}>
                Save
              </UniButton>
            </div>
          </div>
        </UniDrawer>
      </>
    );
  },
};
