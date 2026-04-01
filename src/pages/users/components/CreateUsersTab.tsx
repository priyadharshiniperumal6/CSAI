import { useState, useCallback, useMemo } from 'react';
import { UniTable, UniButton, UniDrawer, UniInput, UniSelect, UniSwitch, UniSidePanel } from '@uniphore/ut-design-system';
import { UniNavButton } from '@ds/UniNavButton';
import { SidePanelHeader } from '@ds/SidePanelHeader';
import type { ColDef, GridReadyEvent, GridApi } from '@ag-grid-community/core';
import { Form, Checkbox } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { TableToolbar } from '../../../components/TableToolbar';
import { mockUsers } from '../../../data/mock-users';
import type { User } from '../../../types/user';

interface Props {
  drawerOpen: boolean;
  onCloseDrawer: () => void;
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
  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  const status   = STATUS_MAP[user.status] ?? STATUS_MAP.Active;
  const mfaStyle = user.mfaEnabled
    ? { bg: '#dcfce7', color: '#15803d', dot: '#22c55e' }
    : { bg: '#f3f4f6', color: '#6b7280', dot: '#9ca3af' };

  return (
    <div style={{ padding: '20px 24px', overflowY: 'auto', height: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* ── Details ── */}
      <div>
        <SectionHeading title="Details" />
        <DetailRow label="Name">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 26, height: 26, borderRadius: '50%',
              background: user.avatarColor, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, fontWeight: 700, flexShrink: 0,
            }}>
              {initials}
            </div>
            {user.firstName} {user.lastName}
          </div>
        </DetailRow>
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

      {/* ── Account actions ── */}
      <div>
        <SectionHeading title="Actions" />
        <div style={{ display: 'flex', gap: 8 }}>
          <UniButton style={{ flex: 1 }}>Edit User</UniButton>
          <UniButton danger>Deactivate</UniButton>
        </div>
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
export function CreateUsersTab({ drawerOpen, onCloseDrawer }: Props) {
  const [search, setSearch]         = useState('');
  const [statusFilter, setStatus]   = useState('');
  const [roleFilter, setRole]       = useState('');
  const [gridApi, setGridApi]       = useState<GridApi | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [authMethod, setAuthMethod] = useState<'Manual' | 'SSO'>('Manual');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

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
        const initials = `${params.data.firstName?.[0] ?? ''}${params.data.lastName?.[0] ?? ''}`.toUpperCase();
        const isSelected = selectedUser?.id === params.data.id;
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: '100%' }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: params.data.avatarColor || '#e0f2fe', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, flexShrink: 0,
            }}>
              {initials}
            </div>
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
      cellRenderer: (params: any) => {
        const s = ROLE_COLORS[params.value] ?? ROLE_COLORS['Viewer'];
        return <span className="ds-badge" style={{ background: s.bg, color: s.color }}>{params.value}</span>;
      },
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
        <span className="ds-badge" style={{
          background: params.value === 'SSO' ? '#e0f2fe' : '#f3f4f6',
          color:      params.value === 'SSO' ? '#0369a1' : '#6b7280',
        }}>
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

  return (
    <div style={{ paddingTop: 16 }}>
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

      {/* Add User Drawer */}
      <UniDrawer
        open={drawerOpen}
        onClose={onCloseDrawer}
        title="Add New User"
        styles={{ wrapper: { width: 520 } }}
        placement="right"
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <UniButton onClick={onCloseDrawer}>Cancel</UniButton>
            <UniButton type="primary" onClick={onCloseDrawer}>Save User</UniButton>
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

          {/* Auth method */}
          <Form.Item label="Authentication Method" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['Manual', 'SSO'] as const).map(m => (
                <button
                  key={m} type="button"
                  onClick={() => setAuthMethod(m)}
                  style={{
                    flex: 1, padding: '8px 12px', borderRadius: 8, cursor: 'pointer',
                    fontSize: 13, fontWeight: 500,
                    border: `1.5px solid ${authMethod === m ? '#15808C' : '#e2e5ea'}`,
                    background: authMethod === m ? '#f0fdfa' : '#ffffff',
                    color: authMethod === m ? '#15808C' : '#6b7280',
                  }}
                >
                  {m === 'Manual' ? '🔒 Manual (Password)' : '🛡️ SSO (via IdP)'}
                </button>
              ))}
            </div>
            {authMethod === 'Manual' && (
              <div style={{ marginTop: 10, padding: '10px 14px', background: '#fafbfc', borderRadius: 8, border: '1px solid #eef0f3' }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: '#374151', marginBottom: 8 }}>Invite via</div>
                <div style={{ display: 'flex', gap: 16 }}>
                  {['Email invitation', 'Set password manually'].map(opt => (
                    <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer', color: '#374151' }}>
                      <input type="radio" name="invite-via" defaultChecked={opt === 'Email invitation'} style={{ accentColor: '#15808C' }} />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            )}
            {authMethod === 'SSO' && (
              <div style={{ marginTop: 10, padding: '10px 14px', background: '#f0fdfa', borderRadius: 8, border: '1px solid #a7f3d0', fontSize: 12, color: '#0e7490', lineHeight: 1.5 }}>
                🛡️ Identity verified by your SSO provider (Okta SAML · connected).
              </div>
            )}
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
      </UniDrawer>
    </div>
  );
}
