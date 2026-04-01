import { useMemo, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type {
  ColDef,
  ICellRendererParams,
  SelectionChangedEvent,
  SizeColumnsToFitGridStrategy,
} from '@ag-grid-community/core';

import { UniButton } from '../../components/button/UniButton';
import { UniDropdown } from '../../components/dropdown/UniDropdown';
import { UniTable } from '../../components/table/UniTable';
import { UniTag } from '../../components/tag/UniTag';
import type { UniDropdownMenuOption } from '../../components/dropdown/UniDropdownMenu';
import { EmptyState, ErrorState, LoadingState } from '../_shared';
import { UniPageHeader } from '../../components/page-header/UniPageHeader';

export type TableViewRow = Record<string, unknown>;

export type TableViewToolbarConfig = {
  leftSlot?: ReactNode;
  filtersSlot?: ReactNode;
  searchSlot?: ReactNode;
  rightSlot?: ReactNode;
  exportSlot?: ReactNode;
  shareSlot?: ReactNode;
  actionsSlot?: ReactNode;
};

export type TableViewRowAction = {
  key: string;
  label: string;
  materialIcon?: string;
  disabled?: (row: TableViewRow) => boolean;
  onClick?: (row: TableViewRow) => void;
};

export type TableViewBulkAction = {
  key: string;
  label: string;
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  disabled?: (rows: TableViewRow[]) => boolean;
  onClick?: (rows: TableViewRow[]) => void;
};

export type TableViewConfig = {
  columns: ColDef<TableViewRow>[];
  toolbar?: TableViewToolbarConfig;
  rowActions?: TableViewRowAction[];
  bulkActions?: TableViewBulkAction[];
  paginationSlot?: ReactNode;
};

export type TableViewProps = {
  title?: ReactNode;
  description?: ReactNode;
  breadcrumbsSlot?: ReactNode;
  primaryActionsSlot?: ReactNode;
  secondaryActionsSlot?: ReactNode;
  globalFiltersSlot?: ReactNode;

  // Backward-compatible aliases from the page-header refactor.
  breadcrumbs?: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  globalFilters?: ReactNode;
  data?: TableViewRow[];
  config?: TableViewConfig;
  rowSelection?: 'single' | 'multiple';
  tableClassName?: string;
  tableHeight?: CSSProperties['height'];
  isLoading?: boolean;
  isEmpty?: boolean;
  error?: string | ReactNode | null;
  onRetry?: () => void;
  onSelectionChange?: (rows: TableViewRow[]) => void;
};

const defaultRows: TableViewRow[] = [
  { name: 'Kade Hancock', application: 'U-Analyze', owner: 'CX Ops', status: 'Active' },
  { name: 'Remi Richards', application: 'U-Assist', owner: 'Support', status: 'Pending' },
  { name: 'Trinity Walton', application: 'U-SS', owner: 'Revenue Ops', status: 'Active' },
  { name: 'Amara Davis', application: 'U-Capture', owner: 'Field Team', status: 'Paused' },
];

const renderStatus = (params: ICellRendererParams<TableViewRow>) => {
  const value = params.value;
  if (typeof value !== 'string') {
    return null;
  }

  return <UniTag>{value}</UniTag>;
};

const defaultConfig: TableViewConfig = {
  columns: [
    { headerName: 'Name', field: 'name', filter: true },
    { headerName: 'Application', field: 'application', filter: true },
    { headerName: 'Owner', field: 'owner', filter: true },
    { headerName: 'Status', field: 'status', filter: true, cellRenderer: renderStatus },
  ],
};

const autoSizeStrategy: SizeColumnsToFitGridStrategy = {
  type: 'fitGridWidth',
  defaultMinWidth: 120,
};

const normalizeErrorDescription = (error: string | ReactNode | null | undefined) => {
  if (!error) {
    return undefined;
  }
  if (typeof error === 'string') {
    return error;
  }
  return error;
};

export const TableView = ({
  title = 'Objects',
  description = 'Manage records with filtering, actions, and bulk workflows.',
  breadcrumbsSlot,
  primaryActionsSlot,
  secondaryActionsSlot,
  globalFiltersSlot,
  breadcrumbs,
  primaryAction,
  secondaryAction,
  globalFilters,
  data = defaultRows,
  config = defaultConfig,
  rowSelection = 'multiple',
  tableClassName,
  tableHeight = 420,
  isLoading = false,
  isEmpty = false,
  error = null,
  onRetry,
  onSelectionChange,
}: TableViewProps = {}) => {
  const [selectedRows, setSelectedRows] = useState<TableViewRow[]>([]);
  const resolvedBreadcrumbsSlot = breadcrumbsSlot ?? breadcrumbs;
  const resolvedPrimaryActionsSlot = primaryActionsSlot ?? primaryAction;
  const resolvedSecondaryActionsSlot = secondaryActionsSlot ?? secondaryAction;
  const resolvedGlobalFiltersSlot = globalFiltersSlot ?? globalFilters;

  const rowActions = useMemo(() => config.rowActions ?? [], [config.rowActions]);
  const bulkActions = useMemo(() => config.bulkActions ?? [], [config.bulkActions]);

  const rowActionColumn = useMemo<ColDef<TableViewRow>>(
    () => ({
      headerName: 'Actions',
      field: '__rowActions',
      width: 88,
      minWidth: 88,
      maxWidth: 88,
      sortable: false,
      filter: false,
      suppressMenu: true,
      suppressMovable: true,
      pinned: 'right',
      cellRenderer: (params: ICellRendererParams<TableViewRow>) => {
        if (!params.data || rowActions.length === 0) {
          return null;
        }

        const options: UniDropdownMenuOption[] = rowActions.map(action => ({
          key: action.key,
          name: action.label,
          materialIcon: action.materialIcon ? { iconName: action.materialIcon, size: 16 } : undefined,
          disabled: action.disabled?.(params.data as TableViewRow),
          action: () => action.onClick?.(params.data as TableViewRow),
        }));

        return (
          <UniDropdown
            options={options}
            placement="bottomRight"
            openButtonProps={{
              type: 'text',
              iconOnly: true,
              materialIcon: { iconName: 'more_vert', size: 18 },
            }}
          />
        );
      },
    }),
    [rowActions]
  );

  const columns = useMemo(() => {
    if (rowActions.length === 0) {
      return config.columns;
    }

    return [...config.columns, rowActionColumn];
  }, [config.columns, rowActionColumn, rowActions.length]);

  const handleSelectionChanged = (event: SelectionChangedEvent<TableViewRow>) => {
    const nextRows = event.api.getSelectedRows();
    setSelectedRows(nextRows);
    onSelectionChange?.(nextRows);
  };

  const hasData = data.length > 0;
  const showEmptyState = isEmpty || (!isLoading && !error && !hasData);

  return (
    <div className="flex h-full flex-col gap-4">
      <UniPageHeader
        title={title}
        description={description}
        breadcrumbsSlot={resolvedBreadcrumbsSlot}
        primaryActionsSlot={resolvedPrimaryActionsSlot}
        secondaryActionsSlot={resolvedSecondaryActionsSlot}
        globalFiltersSlot={resolvedGlobalFiltersSlot}
        toolbarLeftSlot={
          config.toolbar ? (
            <>
              {config.toolbar.leftSlot}
              {config.toolbar.filtersSlot}
              {config.toolbar.searchSlot}
            </>
          ) : undefined
        }
        toolbarRightSlot={
          config.toolbar ? (
            <>
              {config.toolbar.rightSlot}
              {config.toolbar.exportSlot}
              {config.toolbar.shareSlot}
              {config.toolbar.actionsSlot}
            </>
          ) : undefined
        }
      />

      {bulkActions.length > 0 && selectedRows.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2 rounded border border-neutral-300 bg-neutral-25 px-3 py-2">
          <UniTag>{selectedRows.length} selected</UniTag>
          {bulkActions.map(action => (
            <UniButton
              key={action.key}
              type={action.type ?? 'default'}
              disabled={action.disabled?.(selectedRows) ?? false}
              onClick={() => action.onClick?.(selectedRows)}
            >
              {action.label}
            </UniButton>
          ))}
        </div>
      ) : null}

      <div className="grow">
        {isLoading ? (
          <LoadingState title="Loading table" description="Preparing records and schema." />
        ) : error ? (
          <ErrorState title="Unable to load records" description={normalizeErrorDescription(error)} onRetry={onRetry} />
        ) : showEmptyState ? (
          <EmptyState title="No records found" description="Try changing search or filter criteria." />
        ) : (
          <div className="uni-table-container" style={{ height: tableHeight }}>
            <UniTable
              className={tableClassName}
              columnDefs={columns}
              rowData={data}
              rowSelection={rowSelection}
              autoSizeStrategy={autoSizeStrategy}
              onSelectionChanged={handleSelectionChanged}
            />
          </div>
        )}
      </div>

      {config.paginationSlot ? <div className="flex items-center justify-end">{config.paginationSlot}</div> : null}
    </div>
  );
};
