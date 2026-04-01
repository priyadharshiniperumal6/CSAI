import { useState } from 'react';
import { UniTable } from '../../components/table/UniTable';
import { UniInput } from '../../components/input/UniInput';
import { Role } from './components/Role';
import { SizeColumnsToFitGridStrategy } from '@ag-grid-community/core';

export interface TableUsersProps {
  columnDefs?: any[];
  rowData?: any[];
  rowSelection?: string;
  tableTheme?: string;
  singleHeader?: any;
}

export const TableUsers = ({
  columnDefs: propsColumnDefs,
  rowData: propsRowData,
  rowSelection = 'multiple',
  tableTheme = 'ag-theme-primary ag-theme-alpine',
  singleHeader,
}: TableUsersProps) => {
  const [gridApi, setGridApi] = useState<any>(null);

  const defaultColumnDefs = [
    {
      headerName: 'Name',
      field: 'name',
      filter: true,
    },
    {
      headerName: 'Role',
      field: 'role',
      cellRenderer: (params: any) => <Role value={params.value} />,
      filter: true,
    },
  ];

  const defaultRowData = [
    {
      name: 'Kade Hancock',
      slug: 'name',
      role: {
        tags: [{ value: 'Account Admin' }],
      },
    },
    {
      name: 'Remi Richards',
      slug: 'name',
      role: {
        tags: [{ value: 'Sales Supervisor' }],
      },
    },
    {
      name: 'Trinity Walton',
      slug: 'name',
      role: {
        tags: [{ value: 'Business Analyst' }],
      },
    },
  ];

  const columnDefs = propsColumnDefs || defaultColumnDefs;
  const rowData = propsRowData || defaultRowData;

  const headerProperties = singleHeader || {
    slots: [
      {
        name: 'searchInput',
        order: 1,
        className: 'uni-ml16 grow',
      },
      {
        name: 'tableSummary',
        order: 2,
        className: 'uni-mr16',
      },
    ],
  };

  const autoSizeStrategy: SizeColumnsToFitGridStrategy = {
    type: 'fitGridWidth',
    defaultMinWidth: 100,
  };

  const handleGridReady = (params: any) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  return (
    <div className="h-full host-container uni-table-container uni-table-in-side-panel" style={{ height: '60vh' }}>
      <UniTable
        columnDefs={columnDefs}
        rowData={rowData}
        headerProperties={headerProperties}
        className={tableTheme}
        autoSizeStrategy={autoSizeStrategy}
        onGridReady={handleGridReady}
        rowSelection={rowSelection as 'single' | 'multiple'}
        headerSlots={{
          searchInput: <UniInput style={{ width: '200px', margin: '0 8px' }} type="text" placeholder="Search" />,
          tableSummary: <div className="uni-mr8">{rowData?.length} Records</div>,
        }}
      />
    </div>
  );
};
