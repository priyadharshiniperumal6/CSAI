import { useState, useMemo, useEffect } from 'react';
import { UniTable } from '../../components/table/UniTable';
import { UniSearchInput } from '../../components/input/UniSearchInput';
import { UniButton } from '../../components/button/UniButton';
import { ColumnSelector } from '../../components/table/column-selector/ColumnSelector';
import { UniTheatreModal as TheatreModal } from '../../components/table/UniTheatreModal';
import { BulkUpdate } from './components/BulkUpdate';
import { getTableProperties, theatreModeTabs } from './mock-data';
import { actions } from './components/moreOptionData';
import { SizeColumnsToFitGridStrategy } from '@ag-grid-community/core';
import { columnList } from './components/columnList';
import { DummyAudiplayer } from '../../components/table/theatre-modal/DummyAudiplayer';
import { DummyPreview } from '../../components/table/theatre-modal/DummyPreview';

export interface TableAccountsProps {
  singleHeader?: any;
  columnDefs?: any[];
  rowData?: any[];
  tableTheme?: string;
  sidePanel?: any;
  rowSelection?: 'single' | 'multiple';
  defaultToolPanel?: string;
  rowDensityDefault?: boolean | import('../../components/table/UniTable').RowDensity;
}

export const TableAccounts = ({ ...props }: TableAccountsProps) => {
  const [activeRow, setActiveRow] = useState<any>(null);
  const [headerTitle, setHeaderTitle] = useState<string>('');
  const [headerSubtitle, setHeaderSubtitle] = useState<string>('');
  const [isTheatreModalOpen, setIsTheatreModalOpen] = useState(false);
  const [rowDensity, setRowDensity] = useState<boolean | import('../../components/table/UniTable').RowDensity>(
    props.rowDensityDefault ?? true
  );
  const [gridApi, setGridApi] = useState<any>(null);

  useEffect(() => {
    if (props.rowDensityDefault !== undefined) {
      setRowDensity(props.rowDensityDefault);
    }
  }, [props.rowDensityDefault]);

  const handleTheatreModalOpen = () => {
    setIsTheatreModalOpen(true);
  };

  const handleTheatreModalCancel = () => {
    setIsTheatreModalOpen(false);
  };

  const close = () => {
    if (gridApi) {
      gridApi.setSideBarVisible(false);
      setActiveRow(null);
      gridApi.redrawRows();
    }
  };

  const updatedOptions = [
    {
      name: 'View',
      icon: {
        className: 'uni-dropdown-item',
        iconName: 'uni-theatre',
      },
      action: handleTheatreModalOpen,
    },
    ...actions.options,
  ];

  const rowActions = {
    ...actions,
    options: updatedOptions,
    activeRow,
  };
  const rowSelectionMode = (props.rowSelection || 'single') as 'single' | 'multiple';

  const tableProperties = useMemo(
    () =>
      getTableProperties({
        rowDensityDefault: { value: rowDensity },
        activeRow: { value: activeRow },
        handleTheatreModalOpen,
        headerTitle: { value: headerTitle },
        headerSubtitle: { value: headerSubtitle },
        defaultToolPanel: props.defaultToolPanel || 'account',
        rowActions,
        close,
        rowSelection: rowSelectionMode,
      }),
    [rowDensity, activeRow, headerTitle, headerSubtitle, props.defaultToolPanel, rowActions, rowSelectionMode]
  );

  const handleSetActiveRow = (params: any) => {
    const { api, rowIndex, data } = params;

    // Toggle logic: if clicking the already active row, close the panel
    if (activeRow && activeRow.rowIndex === rowIndex) {
      close();
      return;
    }

    setHeaderTitle(data.accountName);
    setHeaderSubtitle(data.slug);

    setActiveRow({
      api,
      rowIndex,
      data,
    });

    api.getRowNode(rowIndex.toString())?.setSelected(true);
  };

  const handleGridReady = (params: any) => {
    setGridApi(params.api);
  };

  const navigateNext = () => {
    if (!activeRow || !gridApi) return;
    const renderedRows = gridApi.getRenderedNodes();
    const nextIndex = activeRow.rowIndex + 1;

    if (renderedRows.length > nextIndex) {
      handleSetActiveRow({
        api: gridApi,
        data: renderedRows[nextIndex].data,
        rowIndex: renderedRows[nextIndex].rowIndex,
      });
    }
  };

  const navigatePrew = () => {
    if (!activeRow || !gridApi) return;
    const renderedRows = gridApi.getRenderedNodes();
    const prevIndex = activeRow.rowIndex - 1;

    if (prevIndex >= 0) {
      handleSetActiveRow({
        api: gridApi,
        data: renderedRows[prevIndex].data,
        rowIndex: renderedRows[prevIndex].rowIndex,
      });
    }
  };

  useEffect(() => {
    if (gridApi) {
      gridApi.setColumnsVisible(['actions'], !activeRow);
    }
  }, [activeRow, gridApi]);

  const columnDefs = useMemo(() => {
    const baseCols = props.columnDefs || tableProperties.columnDefs;
    return baseCols.map((col: any) => {
      if (col.field === 'actions') {
        return {
          ...col,
          cellRendererParams: {
            ...col.cellRendererParams,
            setActiveRow: handleSetActiveRow,
            activeRow: activeRow,
          },
        };
      }
      return col;
    });
  }, [props.columnDefs, tableProperties.columnDefs, handleSetActiveRow, activeRow]);
  const rowData = props.rowData || tableProperties.rowData;
  const singleHeader = props.singleHeader || tableProperties.singleHeader;
  const sidePanel = props.sidePanel !== undefined ? props.sidePanel : tableProperties.sidePanel;
  const defaultToolPanel = props.defaultToolPanel || tableProperties.sidePanel?.defaultToolPanel;

  const autoSizeStrategy: SizeColumnsToFitGridStrategy = {
    type: 'fitGridWidth',
    defaultMinWidth: 100,
  };

  const audioplayer = { component: <DummyAudiplayer />, props: {} };
  const preview = { component: <DummyPreview />, props: {} };

  return (
    <div className="h-full host-container uni-table-container uni-accounts-table" style={{ height: '85vh' }}>
      <UniTable
        columnDefs={columnDefs}
        rowData={rowData}
        // headerProperties={singleHeader} // commented out — header moved to UniPageHeader
        rowSelection={rowSelectionMode}
        className={props.tableTheme}
        autoSizeStrategy={autoSizeStrategy}
        activeRow={activeRow}
        setActiveRow={handleSetActiveRow}
        sidePanel={sidePanel}
        defaultToolPanel={defaultToolPanel || 'account'}
        rowDensityDefault={rowDensity}
        onGridReady={handleGridReady}
        // headerSlots removed — Bulk Actions and Column Selector moved to UniPageHeader toolbarRight
        // headerSlots={{
        //   actionButtons: (
        //     <div className="action-icons flex items-center">
        //       <BulkUpdate selectedUsers={[1, 2, 3]} filteredUsers={[]} />
        //       <ColumnSelector columnList={columnList} setRowDensity={setRowDensity} />
        //       <UniButton
        //         type="primary"
        //         className="ant-btn-with-icon flex mr-4"
        //         size="small"
        //         materialIcon={{
        //           colorClass: 'text-neutral1 ant-button-icon',
        //           iconName: 'add',
        //           size: 16,
        //         }}
        //       >
        //         Add Account
        //       </UniButton>
        //     </div>
        //   ),
        //   searchInput: (
        //     <div className="flex flex-wrap gap-4 items-center">
        //       <UniSearchInput style={{ width: 216, marginLeft: '16px' }} type="text" placeholder="Search" />
        //       <div>{`${rowData.length} Records`}</div>
        //     </div>
        //   ),
        // }}
      />

      <TheatreModal
        title={headerTitle}
        date="08 Jul 2024"
        isModalOpen={isTheatreModalOpen}
        onCancel={handleTheatreModalCancel}
        tabs={theatreModeTabs}
        onNavigateNext={navigateNext}
        onNavigatePrev={navigatePrew}
        audioplayer={audioplayer}
        preview={preview}
      />
    </div>
  );
};
