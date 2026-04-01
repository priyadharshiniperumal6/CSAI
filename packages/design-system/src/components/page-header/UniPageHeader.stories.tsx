import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';

import { UniAdvanceFilter } from '../advance-filter/UniAdvanceFilter';
import { UniBreadcrumb } from '../breadcrumb/UniBreadcrumb';
import { UniButton } from '../button/UniButton';
import { UniRangePicker } from '../date-picker/UniDatePicker';
import type { UniDropdownMenuOption } from '../dropdown/UniDropdownMenu';
import { UniFilterDropdown } from '../filter-dropdown/UniFilterDropdown';
import { UniSearchInput } from '../input/UniSearchInput';
import { UniInput } from '../input/UniInput';
import { UniRadioGroup } from '../radio/UniRadio';
import { UniSelect } from '../select/UniSelect';
import { UniSaveView } from '../table/UniSaveView';
import { ColumnSelector } from '../table/column-selector/ColumnSelector';
import { BulkUpdate } from '../../views/Accounts/components/BulkUpdate';
import { columnList } from '../../views/Accounts/components/columnList';
import { UniPageHeader } from './UniPageHeader';

import './UniPageHeader.stories.scss';

const orgOptions: UniDropdownMenuOption[] = [
  { key: 'uniphore', name: 'Uniphore' },
  { key: 'demo-org', name: 'Demo Org' },
];

const clusterOptions: UniDropdownMenuOption[] = [
  { key: 'all', name: 'All Clusters' },
  { key: 'emea', name: 'EMEA' },
  { key: 'amer', name: 'AMER' },
];

const appFlowOptions: UniDropdownMenuOption[] = [
  { key: 'basic-inbound', name: 'Basic Inbound' },
  { key: 'advanced-inbound', name: 'Advanced Inbound' },
];

const disableFutureDate = (current: dayjs.Dayjs) => current && current > dayjs().endOf('day');

const renderDateRangePicker = (className = 'uni-page-header-story__range-picker') => (
  <UniRangePicker
    className={className}
    format="YYYY-MM-DD"
    disabledDate={disableFutureDate}
    placeholder={['Start Date', 'End Date']}
  />
);

const audiencesToolbarLeft = (
  <>
    <UniButton type="default" materialIcon={{ iconName: 'tune', size: 16 }} />
    <UniSearchInput placeholder="Search" style={{ width: 220 }} />
    <UniFilterDropdown label="Name" showChevron options={[{ key: 'name', name: 'Name' }]} selectedKey="name" />
    <UniFilterDropdown
      label="Status"
      showChevron
      options={[
        { key: 'all', name: 'All Statuses' },
        { key: 'active', name: 'Active' },
        { key: 'paused', name: 'Paused' },
      ]}
      selectedKey="all"
    />
    <UniFilterDropdown label="User" showChevron options={[{ key: 'user', name: 'User' }]} selectedKey="user" />
    <span className="uni-page-header-story__count">60 of 100 audiences</span>
  </>
);

const audiencesToolbarRight = (
  <>
    <UniButton type="default" iconOnly materialIcon={{ iconName: 'star_border', size: 16 }} />
    <UniButton type="default" iconOnly materialIcon={{ iconName: 'view_column', size: 16 }} />
    <UniButton type="default" iconOnly materialIcon={{ iconName: 'output', size: 16 }} />
    <UniButton type="default" iconOnly materialIcon={{ iconName: 'table_rows', size: 16 }} />
    <UniButton type="default" iconOnly materialIcon={{ iconName: 'grid_view', size: 16 }} />
  </>
);

const meta = {
  title: 'Components/Page Header',
  component: UniPageHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <div className="uni-page-header-story-frame">
        <Story />
      </div>
    ),
  ],
  args: {
    title: 'Audiences',
  },
} satisfies Meta<typeof UniPageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FigmaAudiencesWithBreadcrumbs: Story = {
  name: 'Figma: Audiences (With Breadcrumbs)',
  args: {
    title: 'Audiences',
    breadcrumbsSlot: <UniBreadcrumb items={[{ title: 'Marketing Suite' }, { title: 'Audiences' }]} />,
    globalFiltersSlot: (
      <>
        <UniFilterDropdown
          label="Uniphore"
          iconName="domain"
          showChevron
          options={orgOptions}
          selectedKey="uniphore"
          placement="bottomRight"
        />
        {renderDateRangePicker()}
      </>
    ),
    primaryActionsSlot: <UniButton type="primary">Create Audience</UniButton>,
    toolbarLeftSlot: audiencesToolbarLeft,
    toolbarRightSlot: audiencesToolbarRight,
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/hl4xUrAKXdtDCJAh7aRSKz/U-Assist-Q3-2025?node-id=1390-4065&t=HF50tsKcZpJgmVGg-4',
    },
  },
};

export const FigmaAudiencesWithoutBreadcrumbs: Story = {
  name: 'Figma: Audiences (No Breadcrumbs, No Description)',
  args: {
    title: 'Audiences',
    globalFiltersSlot: (
      <>
        <UniFilterDropdown
          label="Uniphore"
          iconName="domain"
          showChevron
          options={orgOptions}
          selectedKey="uniphore"
          placement="bottomRight"
        />
        {renderDateRangePicker()}
      </>
    ),
    primaryActionsSlot: <UniButton type="primary">Create Audience</UniButton>,
    toolbarLeftSlot: audiencesToolbarLeft,
    toolbarRightSlot: audiencesToolbarRight,
  },
};

export const FigmaBasicInboundWithTabNavigation: Story = {
  name: 'Figma: Basic Inbound (Tab Navigation)',
  args: {
    title: 'Basic Inbound',
    breadcrumbsSlot: <UniBreadcrumb items={[{ title: 'Agent Studio' }, { title: 'Basic Inbound' }]} />,
    globalFiltersSlot: (
      <>
        <a href="#" className="uni-page-header-story__version-link">
          Version 1.11.1
        </a>
        <UniFilterDropdown
          label="Actions"
          showChevron
          options={[
            { key: 'duplicate', name: 'Duplicate' },
            { key: 'archive', name: 'Archive' },
          ]}
          selectedKey="duplicate"
          placement="bottomRight"
        />
      </>
    ),
    primaryActionsSlot: (
      <UniButton type="primary" materialIcon={{ iconName: 'play_arrow', size: 16 }}>
        Preview
      </UniButton>
    ),
    toolbarLeftSlot: (
      <>
        <UniButton type="default" materialIcon={{ iconName: 'tune', size: 16 }} />
        <UniSearchInput placeholder="Search" style={{ width: 220 }} />
        <UniFilterDropdown
          label="Basic Inbound"
          showChevron
          options={appFlowOptions}
          selectedKey="basic-inbound"
          variant="secondary"
        />
        <UniFilterDropdown
          label="Agent Application Flow"
          showChevron
          options={[{ key: 'agent-flow', name: 'Agent Application Flow' }]}
          selectedKey="agent-flow"
          variant="secondary"
        />
        <span className="uni-page-header-story__count">2 nodes</span>
      </>
    ),
    toolbarRightSlot: (
      <UniRadioGroup
        size="small"
        optionType="button"
        defaultValue="Flow"
        options={[
          { label: 'Flow', value: 'Flow' },
          { label: 'Nodes', value: 'Nodes' },
          { label: 'Entities', value: 'Entities' },
          { label: 'Content', value: 'Content' },
          { label: 'Rules', value: 'Rules' },
        ]}
      />
    ),
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/hl4xUrAKXdtDCJAh7aRSKz/U-Assist-Q3-2025?node-id=1390-3540&t=HF50tsKcZpJgmVGg-4',
    },
  },
};

export const WithDescriptionAndBreadcrumbs: Story = {
  args: {
    title: 'Accounts',
    description: 'Account data with search, filtering, and detail side panel.',
    breadcrumbsSlot: <UniBreadcrumb items={[{ title: 'Home' }, { title: 'Accounts' }]} />,
    globalFiltersSlot: (
      <>
        <UniFilterDropdown
          label="Org"
          iconName="domain"
          showChevron
          options={orgOptions}
          selectedKey="uniphore"
          placement="bottomRight"
        />
        {renderDateRangePicker()}
      </>
    ),
    secondaryActionsSlot: <UniButton>Import</UniButton>,
    primaryActionsSlot: (
      <UniButton type="primary" materialIcon={{ iconName: 'add', size: 16 }}>
        New Account
      </UniButton>
    ),
    toolbarLeftSlot: (
      <>
        <UniButton type="default" materialIcon={{ iconName: 'tune', size: 16 }} />
        <UniSearchInput placeholder="Search..." style={{ width: 240 }} />
        <UniFilterDropdown label="Cluster" variant="secondary" showChevron options={clusterOptions} selectedKey="all" />
        <span className="uni-page-header-story__count">12,340 Records</span>
      </>
    ),
    toolbarRightSlot: (
      <>
        <BulkUpdate selectedUsers={[1, 2, 3]} filteredUsers={[]} />
        <ColumnSelector columnList={columnList} />
      </>
    ),
  },
};

export const TableHeaderMigrationAllElements: Story = {
  render: args => {
    const [rowDensity, setRowDensity] = useState(true);
    const densityLabel = rowDensity ? 'Large Rows' : 'Compact Rows';

    return (
      <UniPageHeader
        {...args}
        toolbarLeftSlot={
          <>
            <UniAdvanceFilter />
            <UniSearchInput placeholder="Search records" style={{ width: 220 }} />
            {renderDateRangePicker()}
            <UniSelect
              style={{ width: 140 }}
              placeholder="Cluster"
              options={[
                { label: 'All Clusters', value: 'all' },
                { label: 'EMEA', value: 'emea' },
                { label: 'AMER', value: 'amer' },
              ]}
              defaultValue="all"
            />
            <UniSelect
              style={{ width: 180 }}
              placeholder="Application"
              options={[
                { label: 'All Applications', value: 'all' },
                { label: 'Agent Assist', value: 'agent-assist' },
                { label: 'Quality Management', value: 'quality' },
              ]}
              defaultValue="all"
            />
            <UniInput style={{ width: 160 }} placeholder="Tag / Owner" />
            <span className="uni-page-header-story__count">30 Filtered of 2,000 Records · {densityLabel}</span>
          </>
        }
        toolbarRightSlot={
          <>
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
            <UniButton type="default" iconOnly materialIcon={{ iconName: 'output', size: 16 }} />
            <BulkUpdate selectedUsers={[1, 2, 3]} filteredUsers={[]} />
            <ColumnSelector columnList={columnList} setRowDensity={setRowDensity} />
            <UniSaveView />
          </>
        }
      />
    );
  },
  args: {
    title: 'Accounts',
    description: 'Migration target: move existing Table Header controls into UniPageHeader.',
    breadcrumbsSlot: <UniBreadcrumb items={[{ title: 'Home' }, { title: 'Accounts' }]} />,
    globalFiltersSlot: (
      <>
        <UniFilterDropdown label="Org" iconName="domain" showChevron options={orgOptions} selectedKey="uniphore" />
      </>
    ),
    secondaryActionsSlot: <UniButton>Import CSV</UniButton>,
    primaryActionsSlot: (
      <UniButton type="primary" materialIcon={{ iconName: 'add', size: 16 }}>
        New Account
      </UniButton>
    ),
  },
};
