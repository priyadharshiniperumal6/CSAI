import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableHeader } from './TableHeader';
import type { HeaderProperties } from './TableHeader';
import { UniButton } from '../../button/UniButton';
import { UniInput } from '../../input/UniInput';
import { UniIcon } from '../../icon/UniIcon';
import { UniAdvanceFilter } from '../../advance-filter/UniAdvanceFilter';
import { UniSaveView } from '../UniSaveView';
import { UniRangePicker } from '../../date-picker/UniDatePicker';
import { UniSelect } from '../../select/UniSelect';
import { UniRadioGroup } from '../../radio/UniRadio';
import { ColumnSelector } from '../column-selector/ColumnSelector';

const mockColumnList = [
  { field: 'name', headerName: 'Name', hide: false },
  { field: 'status', headerName: 'Status', hide: false },
  { field: 'date', headerName: 'Date', hide: true },
  { field: 'role', headerName: 'Role', hide: false },
];

const meta = {
  title: 'Uni-Table/Table Header/Examples of the Table Header',
  component: TableHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    headerProperties: { control: 'object' },
  },
} satisfies Meta<typeof TableHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

// 1. Accounts Header (Synced with AccountsTableHeader.vue)
const accountsHeaderProps: HeaderProperties = {
  hasSecondRow: false,
  headerClass: 'uni-accounts-table',
  slots: [
    { name: 'searchInput', order: 1, class: 'uni-ml16' },
    { name: 'tableSummary', order: 2, class: 'uni-ml16 grow' },
    { name: 'actionButtons', order: 3, class: 'uni-ml16' },
  ],
};

export const AccountsHeader: Story = {
  args: {
    headerProperties: accountsHeaderProps,
    slots: {
      searchInput: <UniInput style={{ width: 200 }} placeholder="Search" />,
      tableSummary: <div className="summary-cell">10 Records</div>,
      actionButtons: (
        <UniButton type="primary" size="small">
          Add Account
        </UniButton>
      ),
    },
  },
  render: args => (
    <div className="p-4 bg-gray-50 uni-accounts-table">
      <TableHeader headerProperties={args.headerProperties} slots={args.slots} />
    </div>
  ),
};

// 2. Two Tone Header (Synced with TwoToneTableHeader.vue)
const twoToneHeaderProps: HeaderProperties = {
  hasSecondRow: true,
  headerClass: 'ag-theme-primary-two-tone',
  slots: [
    { name: 'searchInput', order: 1, class: 'search-cell', row: 0 },
    { name: 'datePicker', order: 2, class: 'date-picker-cell', row: 0 },
    { name: 'tableSummary', order: 3, class: 'text-sm uni-ml8 summary-cell grow', row: 0 },
    { name: 'actionButtons', order: 4, class: 'flex actions-cell', row: 0 },
    { name: 'advanceFilter', order: 5, class: 'advanced-filter-cell', row: 1 },
    { name: 'otherFilter', order: 6, class: 'fast-filter-cell grow', row: 1 },
    { name: 'tableSwitch', order: 7, class: 'switch-cell', row: 1 },
  ],
};

export const TwoToneHeader: Story = {
  args: {
    headerProperties: twoToneHeaderProps,
    slots: {
      searchInput: <UniInput style={{ width: 216 }} placeholder="Search" />,
      datePicker: <UniRangePicker />,
      tableSummary: <div className="summary-cell">10 Records</div>,
      actionButtons: (
        <div className="flex items-center gap-4">
          <UniButton size="small">Add Data</UniButton>
          <UniButton size="small" type="primary">
            Label Data
          </UniButton>
          <span className="action-icons flex items-center gap-4">
            <UniIcon iconName="uni-export" size="20" colorClass="action-icon" />
            <ColumnSelector columnList={mockColumnList} />
            <UniSaveView />
          </span>
        </div>
      ),
      advanceFilter: <UniAdvanceFilter />,
      otherFilter: (
        <div className="flex gap-4">
          <UniSelect
            style={{ width: 110 }}
            placeholder="Model type"
            options={[
              { label: 'Single', value: 'single' },
              { label: 'Lucy', value: 'lucy' },
            ]}
          />
          <UniSelect
            style={{ width: 100 }}
            placeholder="Data type"
            options={[
              { label: 'Single', value: 'single' },
              { label: 'Lucy', value: 'lucy' },
            ]}
          />
          <UniSelect
            style={{ width: 85 }}
            placeholder="Source"
            options={[
              { label: 'Single', value: 'single' },
              { label: 'Lucy', value: 'lucy' },
            ]}
          />
          <UniSelect
            style={{ width: 105 }}
            placeholder="Label state"
            options={[
              { label: 'Single', value: 'single' },
              { label: 'Lucy', value: 'lucy' },
            ]}
          />
          <UniSelect
            style={{ width: 100 }}
            placeholder="Language"
            options={[
              { label: 'Single', value: 'single' },
              { label: 'Lucy', value: 'lucy' },
            ]}
          />
        </div>
      ),
      tableSwitch: (
        <UniRadioGroup
          size="small"
          optionType="button"
          defaultValue="Conversation"
          options={[
            { label: 'Conversation', value: 'Conversation' },
            { label: 'Chunk', value: 'Chunk' },
            { label: 'Sentence', value: 'Sentence' },
            { label: 'Token', value: 'Token' },
          ]}
        />
      ),
    },
  },
  render: args => (
    <div
      className="p-4 ag-theme-primary-two-tone"
      style={{
        background: 'var(--ut-color-bg-surface-muted)',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TableHeader headerProperties={args.headerProperties} slots={args.slots} />
    </div>
  ),
};

// 3. Single Row Header (Synced with SingleRowTableHeader.vue)
const singleRowHeaderProps: HeaderProperties = {
  hasSecondRow: false,
  headerClass: 'uni-single-header',
  slots: [
    { name: 'advanceFilter', order: 1, class: 'mr-4' },
    { name: 'searchInput', order: 2, class: 'mr-4' },
    { name: 'datePicker', order: 3, class: 'mr-4' },
    { name: 'tableSummary', order: 4, class: 'mr-4 text-sm grow' },
    { name: 'actionButtons', order: 5, class: 'flex items-center uni-header-actions-container' },
  ],
};

export const SingleRowHeader: Story = {
  args: {
    headerProperties: singleRowHeaderProps,
    slots: {
      advanceFilter: <UniAdvanceFilter />,
      searchInput: <UniInput style={{ width: 216 }} placeholder="Search" />,
      datePicker: <UniRangePicker />,
      tableSummary: (
        <div className="summary-cell">
          <span className="selected">6 Selected</span> 30 Filtered of 2,000 Records
        </div>
      ),
      actionButtons: (
        <span className="action-icons flex items-center gap-4">
          <UniIcon iconName="uni-export" size="20" colorClass="action-icon" />
          <ColumnSelector columnList={mockColumnList} />
          <UniSaveView />
        </span>
      ),
    },
  },
  render: args => (
    <div className="p-4 bg-white uni-single-header">
      <TableHeader headerProperties={args.headerProperties} slots={args.slots} />
    </div>
  ),
};

// 4. Two Row Header (Synced with TwoRowTableHeader.vue)
const twoRowHeaderProps: HeaderProperties = {
  hasSecondRow: true,
  headerClass: 'uni-theme-primary-two-row-header',
  slots: [
    { name: 'advanceFilter', order: 1, row: 0 },
    { name: 'datePicker', order: 2, class: 'mx-4 grow', row: 0 },
    { name: 'actionButtons', order: 4, class: 'flex', row: 0 },
    { name: 'tableSummary', order: 1, class: 'mr-4 grow', row: 1 },
    { name: 'searchInput', order: 2, row: 1 },
  ],
};

export const TwoRowHeader: Story = {
  args: {
    headerProperties: {
      ...twoRowHeaderProps,
      hasSaveActions: true,
    },
    slots: {
      advanceFilter: <UniAdvanceFilter />,
      datePicker: <UniRangePicker />,
      actionButtons: (
        <div className="flex items-center gap-4">
          <UniButton size="small">Add data</UniButton>
          <UniButton type="primary" size="small">
            Label data
          </UniButton>
          <ColumnSelector columnList={mockColumnList} />
          <UniSaveView />
        </div>
      ),
      tableSummary: (
        <div className="summary-cell">
          <span className="selected">6 selected</span> 30 filtered of 2,000 records
        </div>
      ),
      searchInput: <UniInput placeholder="Search" />,
    },
  },
  render: args => (
    <div className="p-4 bg-white uni-theme-primary-two-row-header">
      <TableHeader headerProperties={args.headerProperties} slots={args.slots} />
    </div>
  ),
};

// 5. Quick Filter Header (Synced with QuickFilterTableHeader.vue)
const quickFilterHeaderProps: HeaderProperties = {
  hasSecondRow: true,
  headerClass: 'uni-header-quick-filter',
  slots: [
    { name: 'datePicker', order: 1, class: 'date-picker-cell grow', row: 0 },
    { name: 'actionButtons', order: 2, class: 'flex actions-cell', row: 0 },
    { name: 'advanceFilter', order: 3, class: 'advanced-filter-cell', row: 1 },
    { name: 'searchInput', order: 4, class: 'mr-4', row: 1 },
    { name: 'otherFilter', order: 5, class: 'fast-filter-cell grow', row: 1 },
    { name: 'tableSummary', order: 6, class: 'text-sm summary-cell', row: 1 },
  ],
};

export const QuickFilterHeader: Story = {
  args: {
    headerProperties: quickFilterHeaderProps,
    slots: {
      datePicker: <UniRangePicker />,
      actionButtons: (
        <div className="flex items-center gap-4">
          <UniButton size="small">Add Data</UniButton>
          <UniButton type="primary" size="small">
            Label Data
          </UniButton>
          <span className="action-icons flex items-center gap-4">
            <UniIcon iconName="uni-export" size="20" colorClass="action-icon" />
            <ColumnSelector columnList={mockColumnList} />
            <UniSaveView />
          </span>
        </div>
      ),
      advanceFilter: <UniAdvanceFilter />,
      searchInput: (
        <div style={{ width: 216 }}>
          <UniInput placeholder="Search" />
        </div>
      ),
      otherFilter: (
        <div className="flex gap-4">
          <UniSelect
            style={{ width: 110 }}
            placeholder="Model type"
            options={[
              { label: 'Single', value: 'single' },
              { label: 'Lucy', value: 'lucy' },
            ]}
          />
          <UniSelect
            style={{ width: 100 }}
            placeholder="Data type"
            options={[
              { label: 'Single', value: 'single' },
              { label: 'Lucy', value: 'lucy' },
            ]}
          />
          <UniSelect
            style={{ width: 85 }}
            placeholder="Source"
            options={[
              { label: 'Single', value: 'single' },
              { label: 'Lucy', value: 'lucy' },
            ]}
          />
        </div>
      ),
      tableSummary: <div className="summary-cell">30 Filtered of 2,000 Records</div>,
    },
  },
  render: args => (
    <div className="p-4 bg-white uni-header-quick-filter">
      <TableHeader headerProperties={args.headerProperties} slots={args.slots} />
    </div>
  ),
};
