import { useState } from 'react';
import { UniButton, UniSwitch, UniTag, UniDrawer, UniInput, UniSelect } from '@uniphore/ut-design-system';
import { PlusOutlined, MailOutlined, UserOutlined, SafetyCertificateOutlined, DownOutlined, RightOutlined } from '@ant-design/icons';
import { Table, Form, Steps, Result } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Tenant } from '../../../types/tenant';

interface Props { tenant: Tenant; }

const adminUsers = [
  { id: '1', name: 'Rachel Williams', email: 'rachel.w@uniphore.com', role: 'Super Admin', mfa: true,  lastLogin: '2026-03-30', status: 'Active'  },
  { id: '2', name: 'James Chen',      email: 'j.chen@uniphore.com',   role: 'Admin',       mfa: true,  lastLogin: '2026-03-29', status: 'Active'  },
  { id: '3', name: 'Nina Sharma',     email: 'n.sharma@uniphore.com', role: 'Admin',       mfa: true,  lastLogin: '2026-03-30', status: 'Active'  },
  { id: '4', name: 'David Kim',       email: 'd.kim@uniphore.com',    role: 'Admin',       mfa: false, lastLogin: '2026-03-25', status: 'Pending' },
];

const ROLE_COLORS: Record<string, { bg: string; color: string }> = {
  'Super Admin':     { bg: '#f3e8ff', color: '#7c3aed' },
  'Admin':           { bg: '#e0f2fe', color: '#0369a1' },
  'Security Admin':  { bg: '#fef3c7', color: '#b45309' },
  'Read-Only Admin': { bg: '#f3f4f6', color: '#6b7280' },
};

const STATUS_MAP: Record<string, { bg: string; color: string; dot: string }> = {
  Active:   { bg: '#dcfce7', color: '#15803d', dot: '#22c55e' },
  Pending:  { bg: '#fef3c7', color: '#b45309', dot: '#f59e0b' },
  Inactive: { bg: '#f3f4f6', color: '#6b7280', dot: '#9ca3af' },
};

const roleOptions = [
  { value: 'Super Admin',     label: 'Super Admin' },
  { value: 'Admin',           label: 'Admin' },
  { value: 'Security Admin',  label: 'Security Admin' },
  { value: 'Read-Only Admin', label: 'Read-Only Admin' },
];

const adminColumns: ColumnsType<(typeof adminUsers)[number]> = [
  {
    dataIndex: 'name',
    title: 'Name',
    render: (name: string, record) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: '#e0f2fe', color: '#0369a1',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 600, flexShrink: 0,
        }}>
          {name.split(' ').map((n: string) => n[0]).join('')}
        </div>
        <div>
          <div style={{ fontWeight: 500, fontSize: 14 }}>{name}</div>
          <div style={{ fontSize: 12, color: '#8b919e' }}>{record.email}</div>
        </div>
      </div>
    ),
  },
  {
    dataIndex: 'role',
    title: 'Role',
    render: (role: string) => {
      const s = ROLE_COLORS[role] ?? ROLE_COLORS['Admin'];
      return <span className="ds-badge" style={{ background: s.bg, color: s.color }}>{role}</span>;
    },
  },
  {
    dataIndex: 'mfa',
    title: 'MFA',
    render: (value: boolean) => (
      <span className="ds-pill" style={{
        background: value ? '#dcfce7' : '#fee2e2',
        color:      value ? '#15803d' : '#dc2626',
      }}>
        <span className="ds-pill-dot" style={{ background: value ? '#22c55e' : '#ef4444' }} />
        {value ? 'Enabled' : 'Disabled'}
      </span>
    ),
  },
  {
    dataIndex: 'status',
    title: 'Status',
    render: (status: string) => {
      const s = STATUS_MAP[status] ?? STATUS_MAP.Inactive;
      return (
        <span className="ds-pill" style={{ background: s.bg, color: s.color }}>
          <span className="ds-pill-dot" style={{ background: s.dot }} />
          {status}
        </span>
      );
    },
  },
  {
    dataIndex: 'lastLogin',
    title: 'Last Login',
    render: (v: string) => <span style={{ fontSize: 13, color: '#6b7280' }}>{v}</span>,
  },
];

// ── Shared accordion section (standalone card) ─────────────────────────────

function AccordionSection({
  title,
  subtitle,
  action,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div style={{ border: '1px solid #e2e5ea', borderRadius: 8, overflow: 'hidden' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '14px 20px',
          background: isOpen ? '#fafbfc' : '#ffffff',
          border: 'none', borderBottom: isOpen ? '1px solid #e2e5ea' : 'none',
          cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <span style={{ fontWeight: 600, fontSize: 14, color: '#1a1d23' }}>{title}</span>
          {subtitle && <span style={{ fontSize: 12, color: '#8b919e' }}>{subtitle}</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {action && <div onClick={e => e.stopPropagation()}>{action}</div>}
          <span style={{ color: '#8b919e', fontSize: 12 }}>{isOpen ? <DownOutlined /> : <RightOutlined />}</span>
        </div>
      </button>

      {isOpen && (
        <div style={{ background: '#ffffff' }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

export function TenantSecurityTab({ tenant: _tenant }: Props) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ users: true });
  const [drawerOpen, setDrawerOpen]     = useState(false);
  const [inviteStep, setInviteStep]     = useState(0);
  const [inviteComplete, setInviteComplete] = useState(false);

  const toggle = (key: string) =>
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

  const handleInviteClose = () => { setDrawerOpen(false); setInviteStep(0); setInviteComplete(false); };
  const handleSendInvite  = () => setInviteComplete(true);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 16 }}>

        {/* ── Admin Users ── */}
        <AccordionSection
          title="Admin Users"
          subtitle={`${adminUsers.length} administrators configured`}
          action={
            <UniButton type="primary" icon={<PlusOutlined />} size="small" onClick={() => setDrawerOpen(true)}>
              Invite Admin
            </UniButton>
          }
          isOpen={!!openSections['users']}
          onToggle={() => toggle('users')}
        >
          <Table
            rowKey="id"
            dataSource={adminUsers}
            columns={adminColumns}
            pagination={false}
            size="middle"
            style={{ borderRadius: 0 }}
          />
        </AccordionSection>

        {/* ── MFA ── */}
        <AccordionSection
          title="Multi-Factor Authentication (MFA)"
          isOpen={!!openSections['mfa']}
          onToggle={() => toggle('mfa')}
        >
          <div style={{ display: 'flex', flexDirection: 'column', padding: '16px 20px', gap: 12 }}>
            {[
              { label: 'Enforce MFA for all users',  desc: 'Require all users to set up MFA before accessing the tenant', on: true  },
              { label: 'Allow SMS-based MFA',         desc: 'Enable SMS as a second factor option',                        on: false },
              { label: 'Allow Authenticator App',     desc: 'Allow TOTP authenticator apps as a second factor',            on: true  },
            ].map((item) => (
              <div key={item.label} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 16px', background: '#fafbfc', borderRadius: 8, border: '1px solid #eef0f3',
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#1a1d23' }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: '#8b919e', marginTop: 2 }}>{item.desc}</div>
                </div>
                <UniSwitch defaultChecked={item.on} />
              </div>
            ))}
          </div>
        </AccordionSection>

        {/* ── Password Policy ── */}
        <AccordionSection
          title="Password Policy"
          action={<UniButton size="small">Edit Policy</UniButton>}
          isOpen={!!openSections['password']}
          onToggle={() => toggle('password')}
        >
          <div style={{ padding: '20px' }}>
            <div className="info-grid">
              <InfoItem label="Minimum Length"             value="12 characters" />
              <InfoItem label="Require Uppercase"          value="Yes" />
              <InfoItem label="Require Numbers"            value="Yes" />
              <InfoItem label="Require Special Characters" value="Yes" />
              <InfoItem label="Password Expiry"            value="90 days" />
              <InfoItem label="Password History"           value="Last 5 passwords" />
            </div>
          </div>
        </AccordionSection>

      </div>

      {/* ── Invite Admin Drawer ── */}
      <UniDrawer
        open={drawerOpen}
        onClose={handleInviteClose}
        title="Invite Admin to Tenant"
        styles={{ wrapper: { width: 560 } }}
        placement="right"
        footer={
          !inviteComplete ? (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <UniButton onClick={handleInviteClose}>Cancel</UniButton>
              <div style={{ display: 'flex', gap: 8 }}>
                {inviteStep > 0 && <UniButton onClick={() => setInviteStep(s => s - 1)}>Back</UniButton>}
                {inviteStep < 2
                  ? <UniButton type="primary" onClick={() => setInviteStep(s => s + 1)}>Next</UniButton>
                  : <UniButton type="primary" onClick={handleSendInvite}>Send Invite</UniButton>
                }
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <UniButton type="primary" onClick={handleInviteClose}>Done</UniButton>
            </div>
          )
        }
      >
        {!inviteComplete ? (
          <>
            <Steps
              current={inviteStep}
              size="small"
              style={{ marginBottom: 32 }}
              items={[{ title: 'Admin Details' }, { title: 'Permissions' }, { title: 'Review & Send' }]}
            />
            {inviteStep === 0 && <AdminDetailsStep />}
            {inviteStep === 1 && <PermissionsStep />}
            {inviteStep === 2 && <ReviewStep />}
          </>
        ) : (
          <Result
            status="success"
            title="Admin Invitation Sent!"
            subTitle="The admin user will receive an email invitation to join this tenant. They will need to set up MFA on first login."
            style={{ padding: '40px 0' }}
          />
        )}
      </UniDrawer>
    </>
  );
}

// ── Drawer step components ──────────────────────────────────────────────────

function AdminDetailsStep() {
  return (
    <Form layout="vertical">
      <div style={{ padding: 16, background: '#f0fdfa', borderRadius: 8, border: '1px solid #ccfbf1', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <MailOutlined style={{ color: '#15808C', fontSize: 18, marginTop: 2 }} />
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: '#1a1d23' }}>Invite via Email</div>
            <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>The admin will receive an invitation link to set up their account and configure MFA.</div>
          </div>
        </div>
      </div>
      <Form.Item label="First Name"    required><UniInput placeholder="Enter first name" prefix={<UserOutlined style={{ color: '#8b919e' }} />} /></Form.Item>
      <Form.Item label="Last Name"     required><UniInput placeholder="Enter last name" /></Form.Item>
      <Form.Item label="Email Address" required><UniInput placeholder="admin@company.com" prefix={<MailOutlined style={{ color: '#8b919e' }} />} /></Form.Item>
      <Form.Item label="Role"          required><UniSelect placeholder="Select admin role" options={roleOptions} /></Form.Item>
    </Form>
  );
}

function PermissionsStep() {
  const perms = [
    { icon: <SafetyCertificateOutlined style={{ color: '#7c3aed', fontSize: 18 }} />, title: 'Tenant Management',  desc: 'Create, edit, and delete tenants',            on: true  },
    { icon: <UserOutlined              style={{ color: '#0369a1', fontSize: 18 }} />, title: 'User Management',    desc: 'Manage users, groups, and permissions',       on: true  },
    { icon: <SafetyCertificateOutlined style={{ color: '#15803d', fontSize: 18 }} />, title: 'Security Settings',  desc: 'MFA, password policies, and audit logs',      on: true  },
    { icon: <SafetyCertificateOutlined style={{ color: '#b45309', fontSize: 18 }} />, title: 'Billing & Credits',  desc: 'View and manage billing and payment methods', on: false },
    { icon: <SafetyCertificateOutlined style={{ color: '#dc2626', fontSize: 18 }} />, title: 'API & Integrations', desc: 'Manage API keys and third-party integrations', on: true  },
  ];
  return (
    <div>
      <p style={{ color: '#6b7280', marginBottom: 20, fontSize: 14 }}>Configure the permissions and access scope for this admin.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {perms.map((p) => (
          <div key={p.title} style={{ padding: 16, background: '#fafbfc', borderRadius: 8, border: '1px solid #eef0f3' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                {p.icon}
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{p.title}</div>
                  <div style={{ fontSize: 12, color: '#8b919e' }}>{p.desc}</div>
                </div>
              </div>
              <UniSwitch defaultChecked={p.on} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewStep() {
  return (
    <div>
      <p style={{ color: '#6b7280', marginBottom: 20, fontSize: 14 }}>Review the admin invitation details below before sending.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="section-bordered" style={{ padding: 16 }}>
          <h4 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600 }}>Admin Details</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <ReviewRow label="Name"  value="(will be entered)" />
            <ReviewRow label="Email" value="(will be entered)" />
            <ReviewRow label="Role"  value="Admin" />
          </div>
        </div>
        <div className="section-bordered" style={{ padding: 16 }}>
          <h4 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600 }}>Permissions</h4>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <UniTag color="blue">Tenant Management</UniTag>
            <UniTag color="green">User Management</UniTag>
            <UniTag color="purple">Security Settings</UniTag>
            <UniTag color="cyan">API &amp; Integrations</UniTag>
          </div>
        </div>
        <div style={{ padding: 16, background: '#fffbeb', borderRadius: 8, border: '1px solid #fef3c7' }}>
          <div style={{ fontWeight: 600, fontSize: 13, color: '#b45309', marginBottom: 4 }}>What happens next?</div>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#92400e', lineHeight: 1.8 }}>
            <li>Admin receives an invitation email</li>
            <li>They click the link to set up their password</li>
            <li>MFA setup is required on first login</li>
            <li>Access is granted based on assigned permissions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex' }}>
      <span style={{ width: 120, color: '#8b919e', fontSize: 13 }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 500 }}>{value}</span>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="info-grid-item">
      <span className="info-grid-label">{label}</span>
      <span className="info-grid-value">{value}</span>
    </div>
  );
}
