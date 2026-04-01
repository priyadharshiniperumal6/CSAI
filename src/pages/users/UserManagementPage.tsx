import { useState } from 'react';
import { UniBreadcrumb, UniButton, UniInput, UniSelect, UniSwitch } from '@uniphore/ut-design-system';
import { PlusOutlined, UploadOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Popover, Checkbox } from 'antd';
import { usePageTabs } from '../../hooks/usePageTabs';
import { useToast } from '../../context/ToastContext';
import { CreateUsersTab } from './components/CreateUsersTab';
import { SsoTab } from './components/SsoTab';
import { UserGroupsTab } from './components/UserGroupsTab';
import { AccessManagementTab } from './components/AccessManagementTab';
import { TokenKeyMgmtTab } from './components/TokenKeyMgmtTab';

const TAB_LABELS = ['Users', 'SSO', 'User Groups', 'Access Management', 'Token Key Mgmt'];

const ALL_ROLES = [
  { key: 'Admin',              label: 'Admin',              desc: 'Full platform control' },
  { key: 'AI Agent Designer',  label: 'AI Agent Designer',  desc: 'Manage AI Agent lifecycle' },
  { key: 'AI Agent Developer', label: 'AI Agent Developer', desc: 'Manages API & function tools' },
  { key: 'AI Agent Support',   label: 'AI Agent Support',   desc: 'Edit & Test agents, no Prod access' },
  { key: 'BI Viewer',          label: 'BI Viewer',          desc: 'View Dashboards & Reports' },
  { key: 'BI Designer',        label: 'BI Designer',        desc: 'Create custom Dashboards & Reports' },
];

const GROUP_OPTIONS = ['Platform Admins', 'DevOps', 'Analytics Team', 'Engineering', 'Support Team', 'QA'];

function AddUserPopoverContent({ onClose, onSave }: { onClose: () => void; onSave: (name: string) => void }) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <div style={{ width: 520 }}>
      {/* Header */}
      <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid #eef0f3' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#1a1d23' }}>Add New User</div>
        <div style={{ fontSize: 12, color: '#8b919e', marginTop: 2 }}>Fill in the details to invite a new user</div>
      </div>

      {/* Body - scrollable */}
      <div style={{ padding: '16px 20px', maxHeight: 480, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Name row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 5 }}>First Name <span style={{ color: '#dc2626' }}>*</span></label>
            <UniInput placeholder="e.g. John" value={firstName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 5 }}>Last Name <span style={{ color: '#dc2626' }}>*</span></label>
            <UniInput placeholder="e.g. Smith" value={lastName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)} />
          </div>
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 5 }}>Email Address <span style={{ color: '#dc2626' }}>*</span></label>
          <UniInput placeholder="john.smith@company.com" prefix={<MailOutlined style={{ color: '#8b919e' }} />} />
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 5 }}>Phone <span style={{ fontSize: 11, color: '#8b919e', fontWeight: 400 }}>(optional)</span></label>
          <UniInput placeholder="+1 (555) 000-0000" prefix={<PhoneOutlined style={{ color: '#8b919e' }} />} />
        </div>

        {/* Roles */}
        <div>
          <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 8 }}>Assign Roles <span style={{ color: '#dc2626' }}>*</span></label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {ALL_ROLES.map(r => (
              <label key={r.key} style={{
                display: 'flex', alignItems: 'flex-start', gap: 8, padding: '7px 10px',
                borderRadius: 8,
                border: `1.5px solid ${selectedRoles.includes(r.key) ? '#15808C' : '#e2e5ea'}`,
                background: selectedRoles.includes(r.key) ? '#f0fdfa' : '#ffffff',
                cursor: 'pointer',
              }}>
                <Checkbox checked={selectedRoles.includes(r.key)} onChange={e => setSelectedRoles(prev => e.target.checked ? [...prev, r.key] : prev.filter(x => x !== r.key))} style={{ marginTop: 1 }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#1a1d23' }}>{r.label}</div>
                  <div style={{ fontSize: 11, color: '#8b919e' }}>{r.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Groups */}
        <div>
          <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 5 }}>User Groups</label>
          <UniSelect mode="multiple" placeholder="Select groups…" options={GROUP_OPTIONS.map(g => ({ value: g, label: g }))} style={{ width: '100%' }} />
        </div>

        {/* MFA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <UniSwitch defaultChecked />
          <span style={{ fontSize: 12, color: '#6b7280' }}>Require MFA for this user</span>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '12px 20px', borderTop: '1px solid #eef0f3', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <UniButton onClick={onClose}>Cancel</UniButton>
        <UniButton type="primary" onClick={() => onSave(`${firstName} ${lastName}`.trim() || 'New User')}>Save User</UniButton>
      </div>
    </div>
  );
}

export function UserManagementPage() {
  const { activeTab } = usePageTabs(TAB_LABELS, 'Users');
  const { showToast } = useToast();
  const [addUserPopoverOpen, setAddUserPopoverOpen] = useState(false);
  const [addGroupPopoverOpen, setAddGroupPopoverOpen] = useState(false);
  const [bulkUploadOpen, setBulkUploadOpen] = useState(false);

  const handleSaveUser = (_name: string) => {
    setAddUserPopoverOpen(false);
    showToast('User added successfully', 'The user has been invited and will receive an email notification.');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Users':             return <CreateUsersTab bulkUploadOpen={bulkUploadOpen} onCloseBulkUpload={() => setBulkUploadOpen(false)} showToast={showToast} />;
      case 'SSO':               return <SsoTab />;
      case 'User Groups':       return <UserGroupsTab drawerOpen={addGroupPopoverOpen} onCloseDrawer={() => setAddGroupPopoverOpen(false)} showToast={showToast} />;
      case 'Access Management': return <AccessManagementTab />;
      case 'Token Key Mgmt':    return <TokenKeyMgmtTab />;
      default:                  return null;
    }
  };

  const renderHeaderAction = () => {
    if (activeTab === 'Users') {
      return (
        <div style={{ display: 'flex', gap: 8 }}>
          <UniButton
            icon={<UploadOutlined />}
            onClick={() => setBulkUploadOpen(true)}
            style={{ borderRadius: 8 }}
          >
            Bulk Upload
          </UniButton>
          <Popover
            placement="bottomRight"
            trigger="click"
            arrow={false}
            open={addUserPopoverOpen}
            onOpenChange={setAddUserPopoverOpen}
            overlayStyle={{ width: 520, padding: 0 }}
            overlayInnerStyle={{ padding: 0, borderRadius: 12, overflow: 'hidden' }}
            content={
              <AddUserPopoverContent
                onClose={() => setAddUserPopoverOpen(false)}
                onSave={handleSaveUser}
              />
            }
          >
            <UniButton
              type="primary"
              icon={<PlusOutlined />}
              style={{ borderRadius: 8 }}
            >
              Add User
            </UniButton>
          </Popover>
        </div>
      );
    }
    if (activeTab === 'User Groups') {
      return (
        <Popover
          placement="bottomRight"
          trigger="click"
          arrow={false}
          open={addGroupPopoverOpen}
          onOpenChange={setAddGroupPopoverOpen}
          overlayStyle={{ width: 480, padding: 0 }}
          overlayInnerStyle={{ padding: 0, borderRadius: 12, overflow: 'hidden' }}
          content={
            <AddGroupPopoverContent
              onClose={() => setAddGroupPopoverOpen(false)}
              onSave={() => {
                setAddGroupPopoverOpen(false);
                showToast('Group created', 'New user group has been created successfully.');
              }}
            />
          }
        >
          <UniButton
            type="primary"
            icon={<PlusOutlined />}
            style={{ borderRadius: 8 }}
          >
            Add Group
          </UniButton>
        </Popover>
      );
    }
    return null;
  };

  return (
    <div>
      <div style={{ padding: '12px 24px 0' }}>
        <UniBreadcrumb items={[{ title: 'Administration' }, { title: 'User Management' }]} />
      </div>
      <div className="page-header-bar">
        <div className="page-header-left">
          <h1 className="page-title">User Management</h1>
          <span className="page-subtitle">Create and manage users, groups, access and tokens</span>
        </div>
        {renderHeaderAction()}
      </div>
      <div style={{ padding: '0 24px 24px' }}>
        {renderContent()}
      </div>
    </div>
  );
}

// ── Add Group Popover Content ──────────────────────────────────────────────
import { mockUsers } from '../../data/mock-users';

const userOptions = mockUsers.map(u => ({
  value: u.id,
  label: `${u.firstName} ${u.lastName} (${u.email})`,
}));

function AddGroupPopoverContent({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  const [groupName, setGroupName] = useState('');
  const [groupDesc, setGroupDesc] = useState('');
  const [groupMembers, setGroupMembers] = useState<string[]>([]);

  return (
    <div style={{ width: 480 }}>
      {/* Header */}
      <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid #eef0f3' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#1a1d23' }}>Create User Group</div>
        <div style={{ fontSize: 12, color: '#8b919e', marginTop: 2 }}>Set up a new group to organize users</div>
      </div>

      {/* Body */}
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 5 }}>Group Name <span style={{ color: '#dc2626' }}>*</span></label>
          <UniInput
            placeholder="Enter group name"
            value={groupName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGroupName(e.target.value)}
          />
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 5 }}>Description</label>
          <UniInput
            placeholder="Describe this group's purpose"
            value={groupDesc}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGroupDesc(e.target.value)}
          />
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 5 }}>Add Members</label>
          <UniSelect
            mode="multiple"
            placeholder="Search and select users…"
            options={userOptions}
            value={groupMembers}
            onChange={(v: string[]) => setGroupMembers(v)}
            style={{ width: '100%' }}
            showSearch
            filterOption={(input: string, option: any) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
          />
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '12px 20px', borderTop: '1px solid #eef0f3', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <UniButton onClick={onClose}>Cancel</UniButton>
        <UniButton type="primary" onClick={onSave}>Create Group</UniButton>
      </div>
    </div>
  );
}
