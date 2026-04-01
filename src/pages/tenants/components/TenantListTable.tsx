import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UniSearchInput, UniSelect } from '@uniphore/ut-design-system';
import { FilterOutlined, AppstoreOutlined, DownloadOutlined } from '@ant-design/icons';
import { Table, Popover, Checkbox } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { mockTenants, regionOptions } from '../../../data/mock-tenants';
import type { Tenant, DeployedApp, DeploymentStatus } from '../../../types/tenant';

const APP_STYLES: Record<DeployedApp, { bg: string; color: string }> = {
  SSA: { bg: '#e0f2fe', color: '#0369a1' },
  RTGA: { bg: '#dcfce7', color: '#15803d' },
  CIA: { bg: '#f3e8ff', color: '#7c3aed' },
  KB: { bg: '#fef3c7', color: '#b45309' },
  Analytics: { bg: '#cffafe', color: '#0e7490' },
};

const STATUS_STYLES: Record<DeploymentStatus, { bg: string; color: string; dot: string }> = {
  Production: { bg: '#dcfce7', color: '#15803d', dot: '#22c55e' },
  Scheduled: { bg: '#e0f2fe', color: '#0369a1', dot: '#3b82f6' },
  Completed: { bg: '#dcfce7', color: '#15803d', dot: '#22c55e' },
  Active: { bg: '#cffafe', color: '#0e7490', dot: '#06b6d4' },
  Failed: { bg: '#fee2e2', color: '#dc2626', dot: '#ef4444' },
  Trial: { bg: '#fef3c7', color: '#b45309', dot: '#f59e0b' },
};

const columns: ColumnsType<Tenant> = [
  {
    title: 'Tenant',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (name: string, record: Tenant) => (
      <div>
        <div style={{ fontWeight: 600, fontSize: 14, color: '#1a1d23' }}>{name}</div>
        <div style={{ fontSize: 12, color: '#8b919e' }}>{record.industry}</div>
      </div>
    ),
  },
  { title: 'Slug', dataIndex: 'slug', key: 'slug', render: (v: string) => <span style={{ fontFamily: 'monospace', fontSize: 13, color: '#6b7280' }}>{v}</span> },
  { title: 'Region', dataIndex: 'region', key: 'region', render: (v: string) => <span style={{ fontSize: 13 }}>{v}</span> },
  {
    title: 'Deployed Applications',
    dataIndex: 'deployedApps',
    key: 'deployedApps',
    render: (apps: DeployedApp[]) => (
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {apps?.map((app) => {
          const s = APP_STYLES[app] ?? { bg: '#f3f4f6', color: '#374151' };
          return (
            <span key={app} className="ds-badge" style={{ background: s.bg, color: s.color }}>
              {app}
            </span>
          );
        })}
      </div>
    ),
  },
  {
    title: 'Users',
    dataIndex: 'userCount',
    key: 'userCount',
    sorter: (a, b) => a.userCount - b.userCount,
    render: (v: number) => <span style={{ fontWeight: 500 }}>{v}</span>,
  },
  {
    title: 'Deployment Status',
    dataIndex: 'deploymentStatus',
    key: 'deploymentStatus',
    render: (status: DeploymentStatus) => {
      const s = STATUS_STYLES[status] ?? { bg: '#f3f4f6', color: '#374151', dot: '#9ca3af' };
      return (
        <span className="ds-pill" style={{ background: s.bg, color: s.color }}>
          <span className="ds-pill-dot" style={{ background: s.dot }} />
          {status}
        </span>
      );
    },
  },
];

/* Column visibility keys for the selector */
const COL_KEYS: { key: string; label: string }[] = [
  { key: 'name',             label: 'Tenant'                },
  { key: 'slug',             label: 'Slug'                  },
  { key: 'region',           label: 'Region'                },
  { key: 'deployedApps',     label: 'Deployed Applications' },
  { key: 'userCount',        label: 'Users'                 },
  { key: 'deploymentStatus', label: 'Deployment Status'     },
];

export function TenantListTable() {
  const navigate = useNavigate();
  const [searchText, setSearchText]     = useState('');
  const [regionFilter, setRegionFilter] = useState<string | undefined>(undefined);
  const [hiddenCols, setHiddenCols]     = useState<Set<string>>(new Set());
  const [colPopOpen, setColPopOpen]     = useState(false);

  const filteredData = mockTenants.filter((t) => {
    const matchesSearch =
      !searchText ||
      t.name.toLowerCase().includes(searchText.toLowerCase()) ||
      t.slug.toLowerCase().includes(searchText.toLowerCase());
    const matchesRegion = !regionFilter || t.region === regionFilter;
    return matchesSearch && matchesRegion;
  });

  const visibleColumns = columns.filter(col => !hiddenCols.has(col.key as string));

  const colSelectorContent = (
    <div style={{ width: 210, padding: '4px 0' }}>
      <div style={{ fontWeight: 600, fontSize: 12, color: '#8b919e', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8, padding: '0 4px' }}>
        Show / Hide Columns
      </div>
      {COL_KEYS.map(({ key, label }) => (
        <div
          key={key}
          style={{ display: 'flex', alignItems: 'center', padding: '5px 4px', borderRadius: 4, cursor: 'pointer' }}
          onClick={() => setHiddenCols(prev => {
            const next = new Set(prev);
            next.has(key) ? next.delete(key) : next.add(key);
            return next;
          })}
        >
          <Checkbox checked={!hiddenCols.has(key)} onChange={() => {}} />
          <span style={{ fontSize: 13, color: '#374151', marginLeft: 8 }}>{label}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {/* Toolbar */}
      <div className="table-toolbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
          <button className="toolbar-icon-btn" title="Filter"><FilterOutlined /></button>
          <UniSearchInput
            placeholder="Search tenants…"
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 260 }}
          />
          <UniSelect
            placeholder="All Regions"
            options={[{ value: '', label: 'All Regions' }, ...regionOptions]}
            onChange={(val) => setRegionFilter(val || undefined)}
            style={{ width: 200 }}
            allowClear
          />
          <span style={{ fontSize: 13, color: '#8b919e', whiteSpace: 'nowrap', marginLeft: 4 }}>
            {filteredData.length.toLocaleString()} tenants
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Popover
            content={colSelectorContent}
            trigger="click"
            open={colPopOpen}
            onOpenChange={setColPopOpen}
            placement="bottomRight"
            arrow={false}
          >
            <button className={`toolbar-icon-btn${colPopOpen ? ' active' : ''}`} title="Column selector">
              <AppstoreOutlined />
            </button>
          </Popover>
          <button className="toolbar-icon-btn" title="Export"><DownloadOutlined /></button>
        </div>
      </div>

      <div>
        <Table<Tenant>
          dataSource={filteredData}
          columns={visibleColumns}
          rowKey="id"
          pagination={{ pageSize: 20, showSizeChanger: false }}
          onRow={(record) => ({
            onClick: () => navigate(`/tenants/${record.id}`),
            style: { cursor: 'pointer' },
          })}
          size="middle"
        />
      </div>
    </div>
  );
}
