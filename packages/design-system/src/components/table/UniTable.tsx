import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { AgGridReact } from '@ag-grid-community/react';
import type { AgGridReactProps } from '@ag-grid-community/react';
import type {
  CellClickedEvent,
  CellDoubleClickedEvent,
  GridApi,
  GridOptions,
  GridReadyEvent,
  IRowNode,
  Module,
  NavigateToNextCellParams,
  RowClassParams,
  RowSelectedEvent,
  SelectionChangedEvent,
  SideBarDef,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { CsvExportModule } from '@ag-grid-community/csv-export';
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';
import { LicenseManager } from '@ag-grid-enterprise/core';
import { AdvancedFilterModule } from '@ag-grid-enterprise/advanced-filter';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { SideBarModule } from '@ag-grid-enterprise/side-bar';

import { UniEmpty } from '../empty/UniEmpty';

import './UniTable.scss';
import { UniTableHeader, type HeaderProperties, type HeaderSlotRenderers } from './UniTableHeader';
import { UniTableCardView, type UniTableCardViewProps } from './UniTableCardView';

const LICENSE_KEY =
  'Using_this_{AG_Grid}_Enterprise_key_{AG-054141}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{Uniphore_Inc}_is_granted_a_{Multiple_Applications}_Developer_License_for_{5}_Front-End_JavaScript_developers___All_Front-End_JavaScript_developers_need_to_be_licensed_in_addition_to_the_ones_working_with_{AG_Grid}_Enterprise___This_key_has_been_granted_a_Deployment_License_Add-on_for_{1}_Production_Environment___This_key_works_with_{AG_Grid}_Enterprise_versions_released_before_{24_January_2025}____[v3]_[01]_MTczNzY3NjgwMDAwMA==90a2fa2e611b8fb140faa9b71adf6438';

const registerModulesOnce = (() => {
  let registered = false;
  return () => {
    if (registered) return;
    const modules: Module[] = [
      ClientSideRowModelModule,
      CsvExportModule,
      InfiniteRowModelModule,
      SideBarModule,
      RangeSelectionModule,
      SetFilterModule,
      MenuModule,
      AdvancedFilterModule,
      ExcelExportModule,
      ServerSideRowModelModule,
      MasterDetailModule,
      RowGroupingModule,
    ];
    ModuleRegistry.registerModules(modules);
    registered = true;
  };
})();

const applyLicenseKey = (() => {
  let applied = false;
  return () => {
    if (applied) return;
    try {
      LicenseManager.setLicenseKey(LICENSE_KEY);
      applied = true;
    } catch {
      // ignore if running without enterprise build
    }
  };
})();

registerModulesOnce();
applyLicenseKey();

const DENSE_SIZE = 52;
const DEFAULT_ROW_SIZE = 35;
const DOUBLE_ROW_SIZE = 66;

export type RowDensity = 'large' | 'compact' | 'double';

const ROW_HEIGHT_MAP: Record<RowDensity, number> = {
  large: DENSE_SIZE,
  compact: DEFAULT_ROW_SIZE,
  double: DOUBLE_ROW_SIZE,
};

const HEADER_HEIGHT_MAP: Record<RowDensity, number> = {
  large: DENSE_SIZE,
  compact: DEFAULT_ROW_SIZE,
  double: DENSE_SIZE,
};

function normalizeRowDensity(value?: boolean | RowDensity): RowDensity {
  if (value === true) return 'large';
  if (value === false || value === undefined) return 'compact';
  return value;
}

type OverlayParams = {
  title?: string;
  description?: string;
};

const DefaultNoRowsOverlay = ({ params }: { params?: OverlayParams }) => (
  <div className="uni-table-no-rows">
    <UniEmpty
      params={{
        props: {
          title: params?.title ?? 'No Data Found',
          description: params?.description ?? 'Try adjusting your filter criteria',
        },
      }}
    />
  </div>
);

const DefaultLoadingOverlay = () => (
  <div className="uni-table-loading-overlay" role="status" aria-live="polite">
    <span className="uni-table-loading-spinner" />
    <span className="sr-only">Loading</span>
  </div>
);

export type ActiveRowPayload<TData = any> = {
  api: GridApi<TData>;
  rowIndex: number | null;
  data?: TData;
  rowDensity?: number;
  node?: IRowNode<TData>;
};

export type UniTableProps<TData = any> = Omit<
  AgGridReactProps<TData>,
  | 'rowSelection'
  | 'onGridReady'
  | 'onCellClicked'
  | 'onCellDoubleClicked'
  | 'onSelectionChanged'
  | 'onRowSelected'
  | 'navigateToNextCell'
  | 'getRowClass'
> & {
  className?: string;
  rowSelection?: 'single' | 'multiple';
  rowDensityDefault?: boolean | RowDensity;
  sidePanel?: SideBarDef | boolean;
  defaultToolPanel?: string;
  noRowsOverlayProps?: OverlayParams;
  view?: 'table' | 'card';
  gridViewProperties?: UniTableCardViewProps<TData>;
  setActiveRow?: (payload: ActiveRowPayload<TData>) => void;
  activeRow?: Partial<ActiveRowPayload<TData>>;
  headerProperties?: HeaderProperties;
  headerSlots?: HeaderSlotRenderers;
  renderHeaderSlot?: (slotName: string) => React.ReactNode;
  onGridReady?: (event: GridReadyEvent<TData>) => void;
  onCellClicked?: (event: CellClickedEvent<TData>) => void;
  onCellDoubleClicked?: (event: CellDoubleClickedEvent<TData>) => void;
  onSelectionChanged?: (event: SelectionChangedEvent<TData>) => void;
  onRowSelected?: (event: RowSelectedEvent<TData>) => void;
  navigateToNextCell?: (params: NavigateToNextCellParams<TData>) => void;
  getRowClass?: GridOptions['getRowClass'];
};

export const UniTable = <TData,>({
  className,
  rowSelection = 'single',
  rowDensityDefault,
  rowHeight,
  headerHeight,
  sidePanel,
  defaultToolPanel,
  noRowsOverlayProps,
  view = 'table',
  gridViewProperties,
  setActiveRow,
  activeRow,
  headerProperties,
  headerSlots,
  renderHeaderSlot,
  loadingOverlayComponent,
  noRowsOverlayComponent,
  onGridReady,
  onCellClicked,
  onCellDoubleClicked,
  onSelectionChanged,
  onRowSelected,
  navigateToNextCell,
  getRowClass,
  ...rest
}: UniTableProps<TData>) => {
  const gridApiRef = useRef<GridApi<TData> | null>(null);
  const activeRowIndexRef = useRef<number | null>(null);
  const lastHighlightedRowRef = useRef<IRowNode<TData> | null>(null);
  const LAST_SELECTED_ROW_CLASS = 'uni-ag-row-active';
  const [renderKey] = useState(() => Math.random().toString(36));

  const isMultiSelect = rowSelection === 'multiple';
  const density = normalizeRowDensity(rowDensityDefault);
  const computedRowHeight = rowDensityDefault !== undefined ? ROW_HEIGHT_MAP[density] : (rowHeight ?? DEFAULT_ROW_SIZE);
  const computedHeaderHeight =
    rowDensityDefault !== undefined ? HEADER_HEIGHT_MAP[density] : (headerHeight ?? DEFAULT_ROW_SIZE);
  const hasPinnedColumns = useMemo(
    () => Boolean(rest.columnDefs?.some(column => (column as any).pinned)),
    [rest.columnDefs]
  );

  const overlayParams = useMemo(
    () => ({
      title: noRowsOverlayProps?.title ?? 'No Data Found',
      description: noRowsOverlayProps?.description ?? 'Try adjusting your filter criteria',
    }),
    [noRowsOverlayProps]
  );

  const gridClassName = classNames(
    'ag-theme-uniphore ag-theme-primary ag-theme-alpine uni-ag-table',
    {
      'uni-ag-table-multiple': isMultiSelect,
      'uni-has--side-panel': !!sidePanel,
      'uni--side-panel-active': !!(sidePanel && activeRow?.rowIndex !== undefined && activeRow?.rowIndex !== null),
      'uni-ag-table-has-pinned': hasPinnedColumns,
      'uni-ag-table-double': density === 'double',
    },
    className
  );

  const setSideBarVisible = useCallback(
    (visible: boolean) => {
      if (!sidePanel) return;
      const api = gridApiRef.current;
      if (!api || !api.setSideBarVisible) return;
      api.setSideBarVisible(visible);
    },
    [sidePanel]
  );

  const handleOpenSideBar = useCallback(() => {
    if (!sidePanel) return;
    const api = gridApiRef.current;
    if (!api?.openToolPanel) return;
    api.openToolPanel(defaultToolPanel as string);
  }, [defaultToolPanel, sidePanel]);

  const updateRowHighlight = useCallback((rowIndex: number | null) => {
    const api = gridApiRef.current;
    if (!api) return;

    activeRowIndexRef.current = rowIndex;
    const redrawNodes: IRowNode<TData>[] = [];

    if (rowIndex !== null && rowIndex !== undefined && rowIndex >= 0) {
      const currentNode = api.getRenderedNodes().find(node => node.rowIndex === rowIndex);
      if (currentNode) {
        redrawNodes.push(currentNode);
        lastHighlightedRowRef.current = currentNode;
      }
    } else {
      lastHighlightedRowRef.current = null;
    }

    if (lastHighlightedRowRef.current && lastHighlightedRowRef.current.rowIndex !== rowIndex) {
      redrawNodes.push(lastHighlightedRowRef.current);
    }

    if (redrawNodes.length > 0) {
      api.redrawRows({ rowNodes: redrawNodes });
    }
  }, []);

  const setRowSelected = useCallback((rowIndex?: number | null) => {
    const api = gridApiRef.current;
    if (api && typeof rowIndex === 'number' && rowIndex >= 0) {
      const node = api.getRowNode(rowIndex.toString());
      if (node) {
        node.setSelected(!node.isSelected());
      }
    }
  }, []);

  const emitActiveRow = useCallback(
    (payload: { rowIndex?: number | null; data?: TData; node?: IRowNode<TData> }) => {
      if (!setActiveRow || !gridApiRef.current) return;
      setActiveRow({
        api: gridApiRef.current,
        rowIndex: payload.rowIndex ?? null,
        data: payload.data,
        node: payload.node,
        rowDensity: computedRowHeight,
      });
    },
    [computedRowHeight, setActiveRow]
  );

  const handleGridReadyInternal = useCallback(
    (event: GridReadyEvent<TData>) => {
      gridApiRef.current = event.api;
      if (!hasPinnedColumns) {
        event.api.sizeColumnsToFit();
      }
      onGridReady?.(event);
    },
    [hasPinnedColumns, onGridReady]
  );

  const handleCellClickedInternal = useCallback(
    (event: CellClickedEvent<TData>) => {
      onCellClicked?.(event);

      // Ignore clicks on buttons or other interactive elements within the cell
      const target = event.event?.target as HTMLElement;
      if (!target || target.closest('button') || target.closest('.ant-btn') || target.closest('.uni-action-icon')) {
        return;
      }

      if (isMultiSelect) {
        setRowSelected(event.rowIndex);
      } else {
        emitActiveRow({ rowIndex: event.rowIndex, data: event.data, node: event.node });
      }
    },
    [emitActiveRow, isMultiSelect, onCellClicked, setRowSelected]
  );

  const handleCellDoubleClickedInternal = useCallback(
    (event: CellDoubleClickedEvent<TData>) => {
      onCellDoubleClicked?.(event);

      // Ignore double clicks on buttons
      const target = event.event?.target as HTMLElement;
      if (!target || target.closest('button') || target.closest('.ant-btn')) {
        return;
      }

      if (isMultiSelect) {
        setRowSelected(event.rowIndex);
      }
      emitActiveRow({ rowIndex: event.rowIndex, data: event.data, node: event.node });
    },
    [emitActiveRow, isMultiSelect, onCellDoubleClicked, setRowSelected]
  );

  const handleSelectionChangedInternal = useCallback(
    (event: SelectionChangedEvent<TData>) => {
      onSelectionChanged?.(event);
    },
    [onSelectionChanged]
  );

  const handleRowSelectedInternal = useCallback(
    (event: RowSelectedEvent<TData>) => {
      onRowSelected?.(event);
    },
    [onRowSelected]
  );

  const handleNavigateToNextCellInternal = useCallback(
    (params: NavigateToNextCellParams<TData>) => {
      navigateToNextCell?.(params);
      const suggested = params.nextCellPosition;
      const isArrowKey = params.key === 'ArrowDown' || params.key === 'ArrowUp';

      if (!isArrowKey && !isMultiSelect) {
        return suggested;
      }

      if (isMultiSelect) {
        setRowSelected(suggested?.rowIndex);
      }

      const nextRowIndex = suggested?.rowIndex;
      if (typeof nextRowIndex === 'number') {
        const api = gridApiRef.current;
        const node = api?.getRenderedNodes().find(item => item.rowIndex === nextRowIndex);
        emitActiveRow({ rowIndex: nextRowIndex, data: node?.data, node });
      }

      return suggested;
    },
    [emitActiveRow, isMultiSelect, navigateToNextCell, setRowSelected]
  );

  const getRowClassInternal = useCallback(
    (params: RowClassParams<TData>) => {
      const isActive = activeRowIndexRef.current !== null && params.rowIndex === activeRowIndexRef.current;
      const highlightClass = isActive ? LAST_SELECTED_ROW_CLASS : '';
      if (!getRowClass) {
        return highlightClass;
      }
      const userClass = getRowClass(params);
      return classNames(userClass, highlightClass);
    },
    [getRowClass]
  );

  useEffect(() => {
    const api = gridApiRef.current;
    if (api) {
      api.resetRowHeights();
    }
  }, [computedRowHeight]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const handleResize = () => {
      if (sidePanel && activeRow?.rowIndex !== undefined && activeRow?.rowIndex !== null) {
        return;
      }
      if (!gridApiRef.current) return;
      if (!hasPinnedColumns && gridApiRef.current.sizeColumnsToFit) {
        gridApiRef.current.sizeColumnsToFit();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeRow?.rowIndex, hasPinnedColumns, sidePanel]);

  useEffect(() => {
    const rowIndex = activeRow?.rowIndex ?? null;
    if (rowIndex !== null && rowIndex !== undefined && rowIndex >= 0) {
      setSideBarVisible(true);
      handleOpenSideBar();
    } else {
      if (!hasPinnedColumns && gridApiRef.current?.sizeColumnsToFit) {
        gridApiRef.current.sizeColumnsToFit();
      }
    }
    updateRowHighlight(rowIndex);
  }, [activeRow?.rowIndex, handleOpenSideBar, hasPinnedColumns, setSideBarVisible, updateRowHighlight]);

  const renderHeader = () =>
    headerProperties ? (
      <UniTableHeader headerProperties={headerProperties} renderSlot={renderHeaderSlot} headerSlots={headerSlots} />
    ) : null;

  const handleCardSelection = useCallback(
    (item: TData | null) => {
      gridViewProperties?.onActiveSelected?.(item);
      gridViewProperties?.activeSelected?.(item);
      if (!setActiveRow || !gridApiRef.current) {
        return;
      }
      setActiveRow({
        api: gridApiRef.current,
        rowIndex: null,
        data: item ?? undefined,
        rowDensity: computedRowHeight,
      });
    },
    [computedRowHeight, gridViewProperties, setActiveRow]
  );

  if (view === 'card') {
    return (
      <div className={classNames('uni-table flex flex-col', className)} data-testid="uni-table-card">
        {renderHeader()}
        <div className="uni-table-card-view grow">
          <UniTableCardView
            {...(gridViewProperties ?? ({} as UniTableCardViewProps<TData>))}
            activeItem={gridViewProperties?.activeItem ?? (activeRow?.data as TData | null) ?? null}
            onActiveSelected={handleCardSelection}
            suppressHighlight={gridViewProperties?.suppressHighlight}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={classNames('uni-table flex flex-col h-full', className)} data-testid="uni-table">
      {renderHeader()}
      <div className="grow">
        <AgGridReact<TData>
          key={renderKey}
          className={gridClassName}
          reactiveCustomComponents
          suppressRowClickSelection
          suppressContextMenu
          suppressDragLeaveHidesColumns
          alwaysShowHorizontalScroll
          rowSelection={rowSelection}
          rowHeight={computedRowHeight}
          headerHeight={computedHeaderHeight}
          rowMultiSelectWithClick={isMultiSelect}
          loadingOverlayComponent={loadingOverlayComponent ?? DefaultLoadingOverlay}
          noRowsOverlayComponent={noRowsOverlayComponent ?? DefaultNoRowsOverlay}
          noRowsOverlayComponentParams={overlayParams}
          onGridReady={handleGridReadyInternal}
          onCellClicked={handleCellClickedInternal}
          onCellDoubleClicked={handleCellDoubleClickedInternal}
          onSelectionChanged={handleSelectionChangedInternal}
          onRowSelected={handleRowSelectedInternal}
          navigateToNextCell={handleNavigateToNextCellInternal}
          getRowClass={getRowClassInternal}
          sideBar={sidePanel as AgGridReactProps<TData>['sideBar']}
          {...rest}
        />
      </div>
    </div>
  );
};

export default UniTable;
