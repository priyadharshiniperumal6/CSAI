import { useState, useCallback } from 'react';
import { UniTable } from '@uniphore/ut-design-system';
import type { ColDef, GridReadyEvent, GridApi } from '@ag-grid-community/core';
import { TableToolbar } from '../../../components/TableToolbar';

const stats = [
  { label: 'Total Credits', value: '50,000', sub: 'Allocated this month',  color: undefined   },
  { label: 'Consumed',      value: '31,240', sub: '62.5% used',            color: '#b45309'   },
  { label: 'Remaining',     value: '18,760', sub: 'Resets Apr 1',          color: '#15803d'   },
  { label: 'Overage Risk',  value: 'Low',    sub: 'At current usage rate', color: '#dc2626'   },
];

const rows = [
  { name: 'Vlad Vinnikov',  initial: 'V', avatarColor: '#00897B', role: 'Admin',     credits: 8400, pct: 27, trend: '↑ 4%', trendDir: 'up'   },
  { name: 'Sakthivel K',    initial: 'S', avatarColor: '#2563eb', role: 'Developer', credits: 6200, pct: 20, trend: '→ 0%', trendDir: 'flat' },
  { name: 'Robert Perry',   initial: 'R', avatarColor: '#ea580c', role: 'Developer', credits: 5100, pct: 16, trend: '↓ 2%', trendDir: 'down' },
  { name: 'Tina Marchetti', initial: 'T', avatarColor: '#7c3aed', role: 'Analyst',   credits: 4800, pct: 15, trend: '↑ 1%', trendDir: 'up'   },
  { name: 'Sara Kim',       initial: 'S', avatarColor: '#db2777', role: 'Viewer',    credits: 3200, pct: 10, trend: '→ 0%', trendDir: 'flat' },
  { name: 'Dev User',       initial: 'D', avatarColor: '#0e7490', role: 'Developer', credits: 2140, pct:  7, trend: '↑ 3%', trendDir: 'up'   },
  { name: 'New Hire',       initial: 'N', avatarColor: '#78716c', role: 'Viewer',    credits:  400, pct:  1, trend: '→ 0%', trendDir: 'flat' },
];

const ROLE_COLORS: Record<string, { bg: string; color: string }> = {
  Admin:     { bg: '#dbeafe', color: '#1d4ed8' },
  Developer: { bg: '#ccfbf1', color: '#0e7490' },
  Analyst:   { bg: '#e0e7ff', color: '#4338ca' },
  Viewer:    { bg: '#f3f4f6', color: '#6b7280' },
};

const TREND_COLORS: Record<string, string> = {
  up:   '#15803d',
  down: '#dc2626',
  flat: '#8b919e',
};

const columnDefs: ColDef[] = [
  {
    headerName: 'User',
    field: 'name',
    flex: 1,
    minWidth: 180,
    sortable: true,
    filter: true,
    cellRenderer: (params: any) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: '100%' }}>
        <div style={{
          width: 30, height: 30, borderRadius: '50%',
          background: params.data.avatarColor, color: '#ffffff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700, flexShrink: 0,
        }}>
          {params.data.initial}
        </div>
        <span style={{ fontWeight: 500, fontSize: 13 }}>{params.value}</span>
      </div>
    ),
  },
  {
    headerName: 'Role',
    field: 'role',
    width: 130,
    sortable: true,
    filter: true,
    cellRenderer: (params: any) => {
      const s = ROLE_COLORS[params.value] ?? ROLE_COLORS.Viewer;
      return <span className="ds-badge" style={{ background: s.bg, color: s.color }}>{params.value}</span>;
    },
  },
  {
    headerName: 'Credits Used',
    field: 'credits',
    width: 140,
    sortable: true,
    cellStyle: { fontWeight: 600, fontSize: 13 },
    valueFormatter: (p: any) => p.value.toLocaleString(),
  },
  {
    headerName: '% of Total',
    field: 'pct',
    width: 160,
    sortable: true,
    cellRenderer: (params: any) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: '100%' }}>
        <div style={{ flex: 1, height: 6, background: '#f3f4f6', borderRadius: 3, overflow: 'hidden', maxWidth: 80 }}>
          <div style={{ width: `${params.value}%`, height: '100%', background: '#15808C', borderRadius: 3 }} />
        </div>
        <span style={{ fontSize: 12, color: '#6b7280', flexShrink: 0 }}>{params.value}%</span>
      </div>
    ),
  },
  {
    headerName: 'Trend',
    field: 'trend',
    width: 100,
    sortable: true,
    cellRenderer: (params: any) => (
      <span style={{ fontWeight: 600, fontSize: 13, color: TREND_COLORS[params.data.trendDir] }}>
        {params.value}
      </span>
    ),
  },
];

export function CreditActualsTab() {
  const totalUsed = rows.reduce((s, r) => s + r.credits, 0);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const onGridReady = useCallback((e: GridReadyEvent) => setGridApi(e.api), []);

  return (
    <div style={{ paddingTop: 16 }}>
      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
        {stats.map(s => (
          <div key={s.label} className="section-bordered" style={{ padding: '14px 16px' }}>
            <div style={{ fontSize: 12, color: '#8b919e', marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.color || '#1a1d23' }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#8b919e', marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Consumption progress */}
      <div className="section-bordered" style={{ padding: '14px 16px', marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1d23' }}>Credit Consumption</span>
          <span style={{ fontSize: 12, color: '#8b919e' }}>{totalUsed.toLocaleString()} / 50,000 credits used</span>
        </div>
        <div style={{ background: '#f3f4f6', borderRadius: 6, height: 8, overflow: 'hidden' }}>
          <div style={{ width: `${(totalUsed / 50000) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #15808C, #14b8a6)', borderRadius: 6 }} />
        </div>
        <div style={{ fontSize: 11, color: '#8b919e', marginTop: 6 }}>
          {((totalUsed / 50000) * 100).toFixed(1)}% of monthly allocation consumed
        </div>
      </div>

      {/* Credit usage table */}
      <TableToolbar
        count={rows.length}
        countLabel="users"
        gridApi={gridApi}
        columnDefs={columnDefs}
        onExport={() => gridApi?.exportDataAsCsv?.({ fileName: 'credit-usage.csv' })}
        extra={
          <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1d23', marginRight: 8 }}>
            Credit Usage by User
          </span>
        }
      />
      <div className="has-toolbar" style={{ height: 380 }}>
        <UniTable
          rowData={rows}
          columnDefs={columnDefs}
          rowHeight={48}
          headerHeight={40}
          autoSizeStrategy={{ type: 'fitGridWidth', defaultMinWidth: 100 }}
          suppressMovableColumns
          suppressCellFocus
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
}
