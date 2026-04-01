import { useState, useCallback } from 'react';
import { UniTable, UniSelect } from '@uniphore/ut-design-system';
import type { ColDef, GridReadyEvent, GridApi } from '@ag-grid-community/core';
import { TableToolbar } from '../../../components/TableToolbar';

interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  target: string;
  ip: string;
  status: 'Success' | 'Failed' | 'Warning';
}

const mockAuditLogs: AuditLog[] = [
  { id: '1',  timestamp: '2026-03-31 09:42:15', actor: 'vlad.vinnikov@acme.com', action: 'User Created', target: 'sara.k@acme.com',        ip: '192.168.1.10', status: 'Success' },
  { id: '2',  timestamp: '2026-03-31 09:30:02', actor: 'sakthivel.k@acme.com',  action: 'Login',        target: 'sakthivel.k@acme.com',   ip: '10.0.0.45',    status: 'Success' },
  { id: '3',  timestamp: '2026-03-31 09:15:44', actor: 'vlad.vinnikov@acme.com', action: 'Role Changed', target: 'robert.p@acme.com',      ip: '192.168.1.10', status: 'Success' },
  { id: '4',  timestamp: '2026-03-31 08:58:33', actor: 'system@okta',           action: 'SSO Sync',     target: 'All Users',              ip: '—',            status: 'Success' },
  { id: '5',  timestamp: '2026-03-30 17:22:11', actor: 'unknown@external.com',  action: 'Login',        target: 'vlad.vinnikov@acme.com', ip: '203.45.67.89', status: 'Failed'  },
  { id: '6',  timestamp: '2026-03-30 16:45:09', actor: 'robert.p@acme.com',     action: 'User Created', target: 'new.hire@acme.com',      ip: '10.0.0.82',    status: 'Success' },
  { id: '7',  timestamp: '2026-03-30 15:10:00', actor: 'vlad.vinnikov@acme.com', action: 'Role Changed', target: 'tina.m@acme.com',       ip: '192.168.1.10', status: 'Success' },
  { id: '8',  timestamp: '2026-03-30 14:05:55', actor: 'sakthivel.k@acme.com',  action: 'Login',        target: 'sakthivel.k@acme.com',   ip: '10.0.0.45',    status: 'Success' },
  { id: '9',  timestamp: '2026-03-29 11:32:22', actor: 'system@okta',           action: 'SSO Sync',     target: 'All Users',              ip: '—',            status: 'Warning' },
  { id: '10', timestamp: '2026-03-29 10:20:14', actor: 'vlad.vinnikov@acme.com', action: 'User Created', target: 'dev.user@acme.com',     ip: '192.168.1.10', status: 'Success' },
  { id: '11', timestamp: '2026-03-29 09:55:37', actor: 'robert.p@acme.com',     action: 'Login',        target: 'robert.p@acme.com',      ip: '10.0.0.82',    status: 'Success' },
  { id: '12', timestamp: '2026-03-28 18:11:02', actor: 'unknown@external.com',  action: 'Login',        target: 'robert.p@acme.com',      ip: '88.12.34.56',  status: 'Failed'  },
];

const STATUS_MAP: Record<string, { bg: string; color: string; dot: string }> = {
  Success: { bg: '#dcfce7', color: '#15803d', dot: '#22c55e' },
  Failed:  { bg: '#fee2e2', color: '#dc2626', dot: '#ef4444' },
  Warning: { bg: '#fef3c7', color: '#b45309', dot: '#f59e0b' },
};

const ACTION_COLORS: Record<string, { bg: string; color: string }> = {
  'User Created': { bg: '#dcfce7', color: '#15803d' },
  'Role Changed': { bg: '#e0f2fe', color: '#0369a1' },
  'Login':        { bg: '#f3e8ff', color: '#7c3aed' },
  'SSO Sync':     { bg: '#fef3c7', color: '#b45309' },
};

const columnDefs: ColDef<AuditLog>[] = [
  {
    headerName: 'Timestamp',
    field: 'timestamp',
    width: 170,
    sortable: true,
    cellStyle: { fontFamily: 'monospace', fontSize: 12, color: '#8b919e' },
  },
  {
    headerName: 'Actor',
    field: 'actor',
    flex: 1,
    minWidth: 200,
    sortable: true,
    filter: true,
    cellStyle: { fontSize: 13, color: '#1a1d23' },
  },
  {
    headerName: 'Action',
    field: 'action',
    width: 150,
    sortable: true,
    filter: true,
    cellRenderer: (params: any) => {
      const s = ACTION_COLORS[params.value] ?? { bg: '#f3f4f6', color: '#6b7280' };
      return <span className="ds-badge" style={{ background: s.bg, color: s.color }}>{params.value}</span>;
    },
  },
  {
    headerName: 'Target',
    field: 'target',
    flex: 1,
    minWidth: 180,
    sortable: true,
    cellStyle: { fontSize: 13, color: '#374151' },
  },
  {
    headerName: 'IP Address',
    field: 'ip',
    width: 140,
    cellStyle: { fontFamily: 'monospace', fontSize: 12, color: '#8b919e' },
  },
  {
    headerName: 'Status',
    field: 'status',
    width: 120,
    sortable: true,
    filter: true,
    cellRenderer: (params: any) => {
      const s = STATUS_MAP[params.value] ?? STATUS_MAP.Success;
      return (
        <span className="ds-pill" style={{ background: s.bg, color: s.color }}>
          <span className="ds-pill-dot" style={{ background: s.dot }} />
          {params.value}
        </span>
      );
    },
  },
];

const actionOptions = [
  { value: '',             label: 'All Actions'  },
  { value: 'User Created', label: 'User Created' },
  { value: 'Role Changed', label: 'Role Changed' },
  { value: 'Login',        label: 'Login'        },
  { value: 'SSO Sync',     label: 'SSO Sync'     },
];

const rangeOptions = [
  { value: '7d',     label: 'Last 7 days'  },
  { value: '30d',    label: 'Last 30 days' },
  { value: 'custom', label: 'Custom range' },
];

export function AuditLogsTab() {
  const [search, setSearch]             = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [range, setRange]               = useState('7d');
  const [gridApi, setGridApi]           = useState<GridApi | null>(null);

  const onGridReady = useCallback((e: GridReadyEvent) => setGridApi(e.api), []);

  const filtered = mockAuditLogs.filter(log => {
    const matchSearch = [log.actor, log.action, log.target].join(' ').toLowerCase().includes(search.toLowerCase());
    const matchAction = !actionFilter || log.action === actionFilter;
    return matchSearch && matchAction;
  });

  const filterSlot = (
    <>
      <UniSelect
        value={actionFilter}
        options={actionOptions}
        onChange={(v: string) => setActionFilter(v)}
        style={{ width: 160 }}
      />
      <UniSelect
        value={range}
        options={rangeOptions}
        onChange={(v: string) => setRange(v)}
        style={{ width: 150 }}
      />
    </>
  );

  return (
    <div style={{ paddingTop: 16 }}>
      <TableToolbar
        searchValue={search}
        onSearch={setSearch}
        searchPlaceholder="Search logs…"
        filters={filterSlot}
        count={filtered.length}
        countLabel="entries"
        gridApi={gridApi}
        columnDefs={columnDefs}
        onExport={() => gridApi?.exportDataAsCsv?.({ fileName: 'audit-logs.csv' })}
      />

      <div className="has-toolbar" style={{ height: 520 }}>
        <UniTable
          rowData={filtered}
          columnDefs={columnDefs}
          rowHeight={48}
          headerHeight={40}
          autoSizeStrategy={{ type: 'fitGridWidth', defaultMinWidth: 100 }}
          suppressMovableColumns
          suppressCellFocus
          onGridReady={onGridReady}
          noRowsOverlayProps={{ title: 'No logs found', description: 'Try adjusting your search or filters.' }}
        />
      </div>
    </div>
  );
}
