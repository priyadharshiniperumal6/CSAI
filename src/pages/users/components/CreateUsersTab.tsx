import { useState, useCallback, useMemo } from 'react';
import { UniTable, UniButton, UniInput, UniSelect, UniSwitch, UniSidePanel } from '@uniphore/ut-design-system';
import { UniNavButton } from '@ds/UniNavButton';
import { SidePanelHeader } from '@ds/SidePanelHeader';
import type { ColDef, GridReadyEvent, GridApi } from '@ag-grid-community/core';
import { Form, Checkbox, Dropdown, Modal } from 'antd';
import { MailOutlined, PhoneOutlined, DownOutlined, UploadOutlined, CheckCircleFilled, InboxOutlined } from '@ant-design/icons';
import { TableToolbar } from '../../../components/TableToolbar';
import { mockUsers } from '../../../data/mock-users';
import type { User } from '../../../types/user';

interface Props {
  modalOpen: boolean;
  onCloseModal: () => void;
  bulkUploadOpen: boolean;
  onCloseBulkUpload: () => void;
}

const ROLE_COLORS: Record<string, { bg: string; color: string }> = {
  'Super Admin':        { bg: '#f3e8ff', color: '#7c3aed' },
  'Admin':              { bg: '#e0f2fe', color: '#0369a1' },
  'AI Agent Designer':  { bg: '#dcfce7', color: '#15803d' },
  'AI Agent Developer': { bg: '#ccfbf1', color: '#0e7490' },
  'AI Agent Support':   { bg: '#fef3c7', color: '#b45309' },
  'BI Viewer':          { bg: '#f3f4f6', color: '#6b7280' },
  'BI Designer':        { bg: '#e0e7ff', color: '#4338ca' },
  'Developer':          { bg: '#ccfbf1', color: '#0e7490' },
  'Analyst':            { bg: '#e0e7ff', color: '#4338ca' },
  'Viewer':             { bg: '#f3f4f6', color: '#6b7280' },
};

const STATUS_MAP: Record<string, { bg: string; color: string; dot: string }> = {
  Active:   { bg: '#dcfce7', color: '#15803d', dot: '#22c55e' },
  Inactive: { bg: '#f3f4f6', color: '#6b7280', dot: '#9ca3af' },
  Pending:  { bg: '#fef3c7', color: '#b45309', dot: '#f59e0b' },
};

const ALL_ROLES = [
  { key: 'Admin',              label: 'Admin',              desc: 'Full platform control' },
  { key: 'AI Agent Designer',  label: 'AI Agent Designer',  desc: 'Manage AI Agent lifecycle' },
  { key: 'AI Agent Developer', label: 'AI Agent Developer', desc: 'Manages API & function tools' },
  { key: 'AI Agent Support',   label: 'AI Agent Support',   desc: 'Edit & Test agents, no Prod access' },
  { key: 'BI Viewer',          label: 'BI Viewer',          desc: 'View Dashboards & Reports' },
  { key: 'BI Designer',        label: 'BI Designer',        desc: 'Create custom Dashboards & Reports' },
];

const GROUP_OPTIONS = ['Platform Admins', 'DevOps', 'Analytics Team', 'Engineering', 'Support Team', 'QA'];

function formatLastLogin(val: string) {
  if (!val) return 'Never';
  const d = new Date(val);
  const now = new Date();
  const diffH = Math.floor((now.getTime() - d.getTime()) / 3600000);
  if (diffH < 1)  return 'Just now';
  if (diffH < 24) return `${diffH}h ago`;
  const diffD = Math.floor(diffH / 24);
  if (diffD < 7)  return `${diffD}d ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ── Shared row components ──────────────────────────────────────────────────
const SectionHeading = ({ title }: { title: string }) => (
  <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1d23', marginBottom: 12 }}>{title}</div>
);

const DetailRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', padding: '7px 0', gap: 12 }}>
    <span style={{ fontSize: 13, color: '#8b919e', width: 100, flexShrink: 0 }}>{label}</span>
    <span style={{ fontSize: 13, color: '#1a1d23', fontWeight: 500, flex: 1, overflowWrap: 'break-word', minWidth: 0 }}>{children}</span>
  </div>
);

// ── Panel Tab: Profile details ─────────────────────────────────────────────
function UserProfileTab({ user }: { user?: User }) {
  if (!user) return null;
  const status   = STATUS_MAP[user.status] ?? STATUS_MAP.Active;
  const mfaStyle = user.mfaEnabled
    ? { bg: '#dcfce7', color: '#15803d', dot: '#22c55e' }
    : { bg: '#f3f4f6', color: '#6b7280', dot: '#9ca3af' };

  const actionItems = {
    items: [
      { key: 'edit',       label: 'Edit User' },
      { key: 'deactivate', label: 'Deactivate', danger: true },
    ],
  };

  return (
    <div style={{ padding: '16px 24px 20px', overflowY: 'auto', height: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ── Actions button at top ── */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Dropdown menu={actionItems} trigger={['click']} placement="bottomRight">
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 14px', borderRadius: 6, cursor: 'pointer',
            fontSize: 13, fontWeight: 500,
            border: '1px solid #e2e5ea', background: '#ffffff', color: '#1a1d23',
          }}>
            Actions <DownOutlined style={{ fontSize: 11 }} />
          </button>
        </Dropdown>
      </div>

      {/* ── Details ── */}
      <div>
        <SectionHeading title="Details" />
        <DetailRow label="Name">{user.firstName} {user.lastName}</DetailRow>
        <DetailRow label="Email">{user.email}</DetailRow>
        <DetailRow label="Phone">{user.phone || '—'}</DetailRow>
        <DetailRow label="Auth Method">{user.authMethod === 'SSO' ? 'SSO / Okta' : 'Manual'}</DetailRow>
        <DetailRow label="Status">
          <span className="ds-pill" style={{ background: status.bg, color: status.color }}>
            <span className="ds-pill-dot" style={{ background: status.dot }} />
            {user.status}
          </span>
        </DetailRow>
        <DetailRow label="MFA">
          <span className="ds-pill" style={{ background: mfaStyle.bg, color: mfaStyle.color }}>
            <span className="ds-pill-dot" style={{ background: mfaStyle.dot }} />
            {user.mfaEnabled ? 'Enabled' : 'Disabled'}
          </span>
        </DetailRow>
        <DetailRow label="Last Login">{formatLastLogin(user.lastLogin)}</DetailRow>
      </div>
    </div>
  );
}

// ── Panel Tab: Roles & Groups ──────────────────────────────────────────────
function UserRolesTab({ user }: { user?: User }) {
  if (!user) return null;
  return (
    <div style={{ padding: '20px 24px', overflowY: 'auto', height: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* ── Roles ── */}
      <div>
        <SectionHeading title="Roles" />
        {user.roles.map(r => {
          const c = ROLE_COLORS[r] ?? { bg: '#f3f4f6', color: '#374151' };
          return (
            <DetailRow key={r} label={r}>
              <span className="ds-badge" style={{ background: c.bg, color: c.color }}>{r}</span>
            </DetailRow>
          );
        })}
      </div>

      {/* ── User Groups ── */}
      <div>
        <SectionHeading title="User Groups" />
        {user.groups.length > 0
          ? user.groups.map(g => (
              <DetailRow key={g} label={g}>
                <span className="ds-badge" style={{ background: '#f3f4f6', color: '#374151' }}>{g}</span>
              </DetailRow>
            ))
          : <span style={{ fontSize: 13, color: '#8b919e' }}>No groups assigned</span>
        }
      </div>
    </div>
  );
}

// ── Main Tab Component ─────────────────────────────────────────────────────
export function CreateUsersTab({ modalOpen, onCloseModal, bulkUploadOpen, onCloseBulkUpload }: Props) {
  const [search, setSearch]         = useState('');
  const [statusFilter, setStatus]   = useState('');
  const [roleFilter, setRole]       = useState('');
  const [gridApi, setGridApi]       = useState<GridApi | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [csvFile, setCsvFile]       = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const onGridReady = useCallback((e: GridReadyEvent) => setGridApi(e.api), []);

  const filtered = mockUsers.filter(u => {
    const matchSearch = `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || u.status === statusFilter;
    const matchRole   = !roleFilter   || u.role   === roleFilter;
    return matchSearch && matchStatus && matchRole;
  });

  // Build UniSidePanel config whenever selectedUser changes
  const sidePanelParams = useMemo(() => {
    if (!selectedUser) return null;
    const fullName = `${selectedUser.firstName} ${selectedUser.lastName}`;
    return {
      toolPanels: [{ width: 420, minWidth: 380, maxWidth: 480 }],
      header: {
        component: SidePanelHeader,
        params: {
          title: fullName,
          rowDensityDefault: true,
          close: () => setSelectedUser(null),
        },
      },
      tabs: [
        {
          id: 'profile',
          title: 'Profile',
          component: UserProfileTab,
          componentProps: { user: selectedUser },
          nav: {
            component: UniNavButton,
            props: {
              type: 'text',
              iconOnly: true,
              materialIcon: { iconName: 'person', size: 22 },
            },
          },
        },
        {
          id: 'roles',
          title: 'Roles & Groups',
          component: UserRolesTab,
          componentProps: { user: selectedUser },
          nav: {
            component: UniNavButton,
            props: {
              type: 'text',
              iconOnly: true,
              materialIcon: { iconName: 'shield_person', size: 22 },
            },
          },
        },
      ],
    };
  }, [selectedUser]);

  const columnDefs: ColDef[] = [
    {
      headerName: 'Name',
      field: 'firstName',
      flex: 1,
      minWidth: 200,
      sortable: true,
      filter: true,
      cellRenderer: (params: any) => {
        const isSelected = selectedUser?.id === params.data.id;
        return (
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <div>
              <div style={{ fontWeight: 500, fontSize: 13, color: isSelected ? '#15808C' : '#1a1d23', lineHeight: '18px' }}>
                {params.data.firstName} {params.data.lastName}
              </div>
              <div style={{ fontSize: 11, color: '#8b919e', lineHeight: '16px' }}>{params.data.email}</div>
            </div>
          </div>
        );
      },
    },
    {
      headerName: 'Role',
      field: 'role',
      width: 140,
      sortable: true,
      filter: true,
      cellRenderer: (params: any) => (
        <span className="ds-badge" style={{ background: '#f3f4f6', color: '#374151' }}>{params.value}</span>
      ),
    },
    {
      headerName: 'Status',
      field: 'status',
      width: 120,
      sortable: true,
      filter: true,
      cellRenderer: (params: any) => {
        const s = STATUS_MAP[params.value] ?? STATUS_MAP.Inactive;
        return (
          <span className="ds-pill" style={{ background: s.bg, color: s.color }}>
            <span className="ds-pill-dot" style={{ background: s.dot }} />
            {params.value}
          </span>
        );
      },
    },
    {
      headerName: 'Auth',
      field: 'authMethod',
      width: 100,
      sortable: true,
      cellRenderer: (params: any) => (
        <span className="ds-badge" style={{ background: '#f3f4f6', color: '#374151' }}>
          {params.value}
        </span>
      ),
    },
    {
      headerName: 'MFA',
      field: 'mfaEnabled',
      width: 80,
      sortable: true,
      cellRenderer: (params: any) => (
        <span className="ds-badge" style={{
          background: params.value ? '#dcfce7' : '#f3f4f6',
          color:      params.value ? '#15803d' : '#6b7280',
        }}>
          {params.value ? 'On' : 'Off'}
        </span>
      ),
    },
    {
      headerName: 'Last Login',
      field: 'lastLogin',
      width: 130,
      sortable: true,
      cellRenderer: (params: any) => (
        <span style={{ color: '#6b7280', fontSize: 13 }}>{formatLastLogin(params.value)}</span>
      ),
    },
  ];

  const filterSlot = (
    <>
      <UniSelect
        value={statusFilter}
        options={[
          { value: '', label: 'All Statuses' },
          { value: 'Active',   label: 'Active'   },
          { value: 'Inactive', label: 'Inactive' },
          { value: 'Pending',  label: 'Pending'  },
        ]}
        onChange={(v: string) => setStatus(v)}
        style={{ width: 150 }}
      />
      <UniSelect
        value={roleFilter}
        options={[
          { value: '', label: 'All Roles' },
          { value: 'Super Admin', label: 'Super Admin' },
          { value: 'Admin',       label: 'Admin'       },
          { value: 'Developer',   label: 'Developer'   },
          { value: 'Analyst',     label: 'Analyst'     },
          { value: 'Viewer',      label: 'Viewer'      },
        ]}
        onChange={(v: string) => setRole(v)}
        style={{ width: 140 }}
      />
    </>
  );

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.csv')) {
      setCsvFile(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCsvFile(file);
  };

  return (
    <div>
      <TableToolbar
        searchValue={search}
        onSearch={setSearch}
        searchPlaceholder="Search users…"
        filters={filterSlot}
        count={filtered.length}
        countLabel="users"
        gridApi={gridApi}
        columnDefs={columnDefs}
        onExport={() => gridApi?.exportDataAsCsv?.({ fileName: 'users.csv' })}
      />

      {/* Table + UniSidePanel — fills remaining viewport height */}
      <div
        className="ag-panel-container"
        style={{
          display: 'flex',
          border: '1px solid #e2e5ea',
          borderRadius: 8,
          overflow: 'hidden',
          height: 'calc(100vh - 240px)',
        }}
      >
        <div style={{ flex: 1, minWidth: 0, height: '100%' }}>
          <UniTable
            rowData={filtered}
            columnDefs={columnDefs}
            rowHeight={52}
            headerHeight={40}
            autoSizeStrategy={{ type: 'fitGridWidth', defaultMinWidth: 80 }}
            suppressMovableColumns
            suppressCellFocus
            onGridReady={onGridReady}
            onRowClicked={(e) => setSelectedUser(e.data as User)}
            getRowStyle={(params: any) => params.data?.id === selectedUser?.id ? { background: '#f0fdfa' } : undefined}
          />
        </div>

        {selectedUser && sidePanelParams && (
          <div style={{ borderLeft: '1px solid #e2e5ea', height: '100%', overflow: 'hidden', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
            <UniSidePanel params={sidePanelParams} />
          </div>
        )}
      </div>

      {/* Add User Modal */}
      <Modal
        open={modalOpen}
        onCancel={onCloseModal}
        title="Add New User"
        width={560}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <UniButton onClick={onCloseModal}>Cancel</UniButton>
            <UniButton type="primary" onClick={onCloseModal}>Save User</UniButton>
          </div>
        }
      >
        <Form layout="vertical">
          {/* Name row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Form.Item label="First Name" required style={{ marginBottom: 16 }}>
              <UniInput placeholder="e.g. John" />
            </Form.Item>
            <Form.Item label="Last Name" required style={{ marginBottom: 16 }}>
              <UniInput placeholder="e.g. Smith" />
            </Form.Item>
          </div>

          <Form.Item label="Email Address" required style={{ marginBottom: 16 }}>
            <UniInput placeholder="john.smith@company.com" prefix={<MailOutlined style={{ color: '#8b919e' }} />} />
          </Form.Item>

          <Form.Item
            label={<span>Phone Number <span style={{ color: '#8b919e', fontWeight: 400 }}>(optional)</span></span>}
            style={{ marginBottom: 16 }}
          >
            <UniInput placeholder="+1 (555) 000-0000" prefix={<PhoneOutlined style={{ color: '#8b919e' }} />} />
          </Form.Item>

          <div style={{ borderTop: '1px solid #eef0f3', margin: '4px 0 16px' }} />

          {/* Roles */}
          <Form.Item label={<span>Assign Roles <span style={{ color: '#dc2626' }}>*</span></span>} style={{ marginBottom: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {ALL_ROLES.map(r => (
                <label key={r.key} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 8, padding: '8px 10px',
                  borderRadius: 8,
                  border: `1.5px solid ${selectedRoles.includes(r.key) ? '#15808C' : '#e2e5ea'}`,
                  background: selectedRoles.includes(r.key) ? '#f0fdfa' : '#ffffff',
                  cursor: 'pointer',
                }}>
                  <Checkbox
                    checked={selectedRoles.includes(r.key)}
                    onChange={e => setSelectedRoles(prev =>
                      e.target.checked ? [...prev, r.key] : prev.filter(x => x !== r.key)
                    )}
                    style={{ marginTop: 1 }}
                  />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#1a1d23' }}>{r.label}</div>
                    <div style={{ fontSize: 11, color: '#8b919e', marginTop: 2 }}>{r.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </Form.Item>

          <div style={{ borderTop: '1px solid #eef0f3', margin: '4px 0 16px' }} />

          {/* Groups */}
          <Form.Item label="Assign User Groups" style={{ marginBottom: 16 }}>
            <UniSelect
              mode="multiple"
              placeholder="Select groups…"
              options={GROUP_OPTIONS.map(g => ({ value: g, label: g }))}
              style={{ width: '100%' }}
            />
          </Form.Item>

          {/* MFA */}
          <Form.Item label="Require MFA" style={{ marginBottom: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <UniSwitch defaultChecked />
              <span style={{ fontSize: 13, color: '#6b7280' }}>Enforce multi-factor authentication for this user</span>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* Bulk Upload Modal */}
      <Modal
        open={bulkUploadOpen}
        onCancel={() => { onCloseBulkUpload(); setCsvFile(null); }}
        title="Bulk Upload Users"
        width={480}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <UniButton onClick={() => { onCloseBulkUpload(); setCsvFile(null); }}>Cancel</UniButton>
            <UniButton type="primary" icon={<UploadOutlined />} onClick={() => { onCloseBulkUpload(); setCsvFile(null); }}>
              Upload &amp; Import
            </UniButton>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '8px 0' }}>
          {/* Drop zone */}
          <div
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById('csv-file-input')?.click()}
            style={{
              border: `2px dashed ${isDragging ? '#15808C' : '#d1d5db'}`,
              borderRadius: 12,
              padding: '36px 24px',
              textAlign: 'center',
              cursor: 'pointer',
              background: isDragging ? '#f0fdfa' : '#fafbfc',
              transition: 'all 0.15s',
            }}
          >
            <input
              id="csv-file-input"
              type="file"
              accept=".csv"
              style={{ display: 'none' }}
              onChange={handleFileInput}
            />
            {csvFile ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <CheckCircleFilled style={{ fontSize: 32, color: '#22c55e' }} />
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1d23' }}>{csvFile.name}</div>
                <div style={{ fontSize: 12, color: '#8b919e' }}>File selected — ready to import</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <InboxOutlined style={{ fontSize: 36, color: '#9ca3af' }} />
                <div style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>Drag CSV file here or click to browse</div>
                <div style={{ fontSize: 12, color: '#8b919e' }}>Download template to get started</div>
              </div>
            )}
          </div>

          {/* Download template link */}
          <div style={{ textAlign: 'center' }}>
            <button
              type="button"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#15808C', fontSize: 13, fontWeight: 500,
                textDecoration: 'underline', padding: 0,
              }}
            >
              Download Template
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
