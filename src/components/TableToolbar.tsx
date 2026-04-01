/**
 * TableToolbar
 *
 * Reusable toolbar that sits directly above a UniTable (AG Grid) component,
 * matching the Uniphore design system reference:
 *
 *  [⊞ filter] [🔍 Search ] [custom filters…] [N records]  ……  [⊟ Columns] [↓ Export]
 */

import { useState } from 'react';
import { UniSearchInput } from '@uniphore/ut-design-system';
import { FilterOutlined, DownloadOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Popover, Checkbox } from 'antd';
import type { GridApi, ColDef } from '@ag-grid-community/core';

export interface TableToolbarProps {
  /** Controlled search value */
  searchValue?: string;
  onSearch?: (value: string) => void;
  searchPlaceholder?: string;

  /** Slot for custom filter dropdowns / selects */
  filters?: React.ReactNode;

  /** Record count shown in the middle */
  count?: number;
  countLabel?: string;

  /** Pass the GridApi (from onGridReady) to enable the column-selector popover */
  gridApi?: GridApi | null;
  /** Column definitions — used to build the column-selector label list */
  columnDefs?: ColDef[];

  /** Optional extra elements on the right (before the icon buttons) */
  extra?: React.ReactNode;

  /** Called when the export button is clicked */
  onExport?: () => void;
}

export function TableToolbar({
  searchValue = '',
  onSearch,
  searchPlaceholder = 'Search…',
  filters,
  count,
  countLabel = 'records',
  gridApi,
  columnDefs = [],
  extra,
  onExport,
}: TableToolbarProps) {
  const [colVis, setColVis]         = useState<Record<string, boolean>>({});
  const [popOpen, setPopOpen]       = useState(false);
  const [filterActive, setFilterActive] = useState(false);

  /* ── Column selector popover ── */
  const handlePopoverToggle = (open: boolean) => {
    if (open && gridApi) {
      const state = gridApi.getColumnState();
      const map: Record<string, boolean> = {};
      state.forEach(col => { map[col.colId] = !col.hide; });
      setColVis(map);
    }
    setPopOpen(open);
  };

  const toggleCol = (colId: string, visible: boolean) => {
    if (!gridApi) return;
    gridApi.setColumnsVisible([colId], visible);
    setColVis(prev => ({ ...prev, [colId]: visible }));
  };

  /* Filter only columns that have a field/colId and a visible header name */
  const visibleColDefs = columnDefs.filter(
    col => (col.field || col.colId) && col.headerName !== undefined
  );

  const colSelectorContent = (
    <div style={{ width: 210, padding: '4px 0' }}>
      <div style={{ fontWeight: 600, fontSize: 12, color: '#8b919e', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8, padding: '0 4px' }}>
        Show / Hide Columns
      </div>
      {visibleColDefs.map(col => {
        const id    = col.colId ?? col.field ?? '';
        const label = col.headerName ?? col.field ?? id;
        const checked = colVis[id] !== false;
        return (
          <div
            key={id}
            style={{ display: 'flex', alignItems: 'center', padding: '5px 4px', borderRadius: 4, cursor: 'pointer' }}
            onClick={() => toggleCol(id, !checked)}
          >
            <Checkbox checked={checked} onChange={e => toggleCol(id, e.target.checked)} />
            <span style={{ fontSize: 13, color: '#374151', marginLeft: 8 }}>{label}</span>
          </div>
        );
      })}
    </div>
  );

  /* ── Render ── */
  return (
    <div className="table-toolbar">
      {/* ── Left group: filter toggle · search · custom filters · count ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
        {/* Filter-clear toggle */}
        <button
          className={`toolbar-icon-btn${filterActive ? ' active' : ''}`}
          title="Toggle filters"
          onClick={() => {
            if (gridApi) {
              filterActive ? gridApi.setFilterModel(null) : undefined;
            }
            setFilterActive(a => !a);
          }}
        >
          <FilterOutlined />
        </button>

        {/* Search */}
        {onSearch !== undefined && (
          <UniSearchInput
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearch(e.target.value)}
            style={{ width: 240 }}
          />
        )}

        {/* Custom filter slots */}
        {filters}

        {/* Record count */}
        {typeof count === 'number' && (
          <span style={{ fontSize: 13, color: '#8b919e', whiteSpace: 'nowrap', marginLeft: 4 }}>
            {count.toLocaleString()}&nbsp;{countLabel}
          </span>
        )}
      </div>

      {/* ── Right group: extra · column selector · export ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
        {extra}

        {/* Column selector */}
        {gridApi && visibleColDefs.length > 0 && (
          <Popover
            content={colSelectorContent}
            trigger="click"
            open={popOpen}
            onOpenChange={handlePopoverToggle}
            placement="bottomRight"
            arrow={false}
          >
            <button className={`toolbar-icon-btn${popOpen ? ' active' : ''}`} title="Column selector">
              <AppstoreOutlined />
            </button>
          </Popover>
        )}

        {/* Export */}
        <button className="toolbar-icon-btn" title="Export CSV" onClick={onExport}>
          <DownloadOutlined />
        </button>
      </div>
    </div>
  );
}
