import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ColDef } from '@ag-grid-community/core';

import { UniTable } from './UniTable';
// import type { HeaderProperties, HeaderSlotRenderers } from './UniTableHeader';
// import type { UniTableCardViewProps } from './UniTableCardView';
// import { UniButton } from '../button/UniButton';
// import { UniRangePicker } from '../date-picker/UniDatePicker';
// import { UniInput } from '../input/UniInput';
// import { UniCard } from '../card/UniCard';

const columnDefs: ColDef[] = [
  { headerName: 'Name', field: 'name', filter: true },
  { headerName: 'Application', field: 'application', filter: true },
];

const rowData = [
  { name: 'Kade Hancock', application: 'U-Analyze' },
  { name: 'Remi Richards', application: 'U-Assist' },
  { name: 'Trinity Walton', application: 'U-SS' },
];

const meta = {
  title: 'REACT-ONLY/UniTable',
  component: UniTable,
  tags: ['autodocs'],
  args: {
    columnDefs,
    rowData,
    rowSelection: 'single',
    autoSizeStrategy: {
      type: 'fitGridWidth',
      defaultMinWidth: 100,
    },
  },
} satisfies Meta<typeof UniTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: args => (
    <div style={{ height: '35vh' }}>
      <UniTable {...args} />
    </div>
  ),
};

const doubleRowData = [
  { name: 'Kade Hancock', application: 'U-Analyze', subtitle: 'Senior Engineer', appVersion: 'v2.4.1' },
  { name: 'Remi Richards', application: 'U-Assist', subtitle: 'Product Manager', appVersion: 'v1.8.0' },
  { name: 'Trinity Walton', application: 'U-SS', subtitle: 'QA Lead', appVersion: 'v3.1.2' },
];

const DoubleCellRenderer = (params: any) => {
  const { value, colDef, data } = params;
  const secondaryField = colDef.cellRendererParams?.secondaryField;
  const secondaryValue = secondaryField ? data?.[secondaryField] : null;

  if (!secondaryValue) {
    return <span>{value}</span>;
  }

  return (
    <div className="uni-cell-double-content">
      <span className="uni-cell-primary-text">{value}</span>
      <span className="uni-cell-secondary-text">{secondaryValue}</span>
    </div>
  );
};

const doubleColumnDefs: ColDef[] = [
  {
    headerName: 'Name',
    field: 'name',
    filter: true,
    cellRenderer: DoubleCellRenderer,
    cellRendererParams: { secondaryField: 'subtitle' },
  },
  {
    headerName: 'Application',
    field: 'application',
    filter: true,
    cellRenderer: DoubleCellRenderer,
    cellRendererParams: { secondaryField: 'appVersion' },
  },
];

export const DoubleDensity: Story = {
  render: args => (
    <div style={{ height: '35vh' }}>
      <UniTable {...args} columnDefs={doubleColumnDefs} rowData={doubleRowData} rowDensityDefault="double" />
    </div>
  ),
};
