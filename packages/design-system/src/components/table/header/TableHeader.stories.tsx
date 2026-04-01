import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableHeader } from './TableHeader';
import { UniButton } from '../../button/UniButton';
import { UniInput } from '../../input/UniInput';
import { UniRangePicker } from '../../date-picker/UniDatePicker';
import { UniAdvanceFilter } from '../../advance-filter/UniAdvanceFilter';
import { UniSaveView } from '../UniSaveView';
import { ColumnSelector } from '../column-selector/ColumnSelector';

import { columnList } from '../../../consts/mocks';

const meta = {
  title: 'Uni-Table/Table Header',
  component: TableHeader,
  tags: ['autodocs'],
  parameters: {
    design: [
      {
        name: 'User Stories',
        type: 'figma',
        url: 'https://www.figma.com/file/ZC9opHXmNGBJhfq5Q5KZEE/UniAnt-2.0---Documentation?node-id=1444%3A47860',
      },
      {
        name: 'States',
        type: 'figma',
        url: 'https://www.figma.com/file/ZC9opHXmNGBJhfq5Q5KZEE/UniAnt-2.0---Documentation?node-id=1444%3A46663',
      },
      {
        name: 'Variable Usage',
        type: 'figma',
        url: 'https://www.figma.com/file/ZC9opHXmNGBJhfq5Q5KZEE/UniAnt-2.0---Documentation?node-id=1444%3A52493',
      },
      {
        name: 'Dimensions',
        type: 'figma',
        url: 'https://www.figma.com/file/ZC9opHXmNGBJhfq5Q5KZEE/UniAnt-2.0---Documentation?node-id=1444%3A45126',
      },
      {
        name: 'Ant Design Specification',
        type: 'figma',
        url: 'https://www.figma.com/file/ZC9opHXmNGBJhfq5Q5KZEE/UniAnt-2.0---Documentation?node-id=1444%3A46728',
      },
    ],
  },
  args: {
    headerProperties: {
      hasSecondRow: true,
      hasSaveActions: true,
      tableTitle: 'Table Title',
      slots: [
        {
          name: 'advanceFilter',
          order: 1,
          row: 0,
        },
        {
          name: 'datePicker',
          order: 2,
          class: 'mx-4 grow',
          // row: 0 is default in Vue if missing
        },
        {
          name: 'actionButtons',
          order: 4,
          class: 'flex',
        },
        {
          name: 'tableSummary',
          order: 1,
          class: 'mr-4 grow',
          row: 1,
        },
        {
          name: 'searchInput',
          order: 2,
          row: 1,
        },
      ],
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
          <ColumnSelector columnList={columnList} />
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
} satisfies Meta<typeof TableHeader>;

export default meta;

export const TwoRowHeader: StoryObj<typeof meta> = {
  render: args => (
    <div
      className="ag-theme-primary-two-tone uni-theme-primary-two-row-header"
      style={{
        padding: 'var(--uni-size-4)',
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
