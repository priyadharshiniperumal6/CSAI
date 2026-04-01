import { useState } from 'react';
import { UniButton, UniInput, UniSelect } from '@uniphore/ut-design-system';
import { TeamOutlined, CalendarOutlined } from '@ant-design/icons';
import { Form, Modal } from 'antd';
import { mockUserGroups, mockUsers } from '../../../data/mock-users';
import type { UserGroup } from '../../../types/user';

interface Props {
  drawerOpen: boolean;
  onCloseDrawer: () => void;
  showToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
}

// Mock members per group for richer detail panel
const GROUP_MEMBERS: Record<string, { name: string; email: string; role: string }[]> = {
  '1': [
    { name: 'Rachel Williams', email: 'rachel.w@uniphore.com', role: 'Super Admin' },
    { name: 'James Chen',      email: 'j.chen@uniphore.com',   role: 'Admin' },
    { name: 'Nina Sharma',     email: 'n.sharma@uniphore.com', role: 'Admin' },
    { name: 'David Kim',       email: 'd.kim@uniphore.com',    role: 'Admin' },
  ],
  '2': [
    { name: 'Arjun Mehta',   email: 'a.mehta@uniphore.com',  role: 'Engineer' },
    { name: 'Priya Nair',    email: 'p.nair@uniphore.com',   role: 'Engineer' },
    { name: 'Carlos Rivera', email: 'c.rivera@uniphore.com', role: 'DevOps Lead' },
  ],
  '3': [
    { name: 'Sofia Martins', email: 's.martins@uniphore.com', role: 'Analyst' },
    { name: 'Wei Zhang',     email: 'w.zhang@uniphore.com',   role: 'Analyst' },
    { name: 'Aisha Patel',   email: 'a.patel@uniphore.com',   role: 'Analyst' },
    { name: 'John Park',     email: 'j.park@uniphore.com',    role: 'Analytics Lead' },
    { name: 'Emma Davis',    email: 'e.davis@uniphore.com',   role: 'Analyst' },
  ],
};

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

const AVATAR_COLORS = [
  { bg: '#e0f2fe', color: '#0369a1' },
  { bg: '#dcfce7', color: '#15803d' },
  { bg: '#f3e8ff', color: '#7c3aed' },
  { bg: '#fef3c7', color: '#b45309' },
  { bg: '#cffafe', color: '#0e7490' },
];

// User options from mockUsers for member selection
const userOptions = mockUsers.map(u => ({
  value: u.id,
  label: `${u.firstName} ${u.lastName} (${u.email})`,
}));

export function UserGroupsTab({ drawerOpen, onCloseDrawer, showToast }: Props) {
  const [selected, setSelected] = useState<UserGroup>(mockUserGroups[0]);

  // Add Group modal state
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDesc, setNewGroupDesc] = useState('');
  const [newGroupMembers, setNewGroupMembers] = useState<string[]>([]);

  // Edit Group modal state
  const [editOpen, setEditOpen] = useState(false);
  const [editGroup, setEditGroup] = useState<UserGroup | null>(null);
  const [editGroupName, setEditGroupName] = useState('');
  const [editGroupDesc, setEditGroupDesc] = useState('');
  const [editGroupMembers, setEditGroupMembers] = useState<string[]>([]);

  const members = GROUP_MEMBERS[selected.id] || [];

  const handleOpenEdit = (group: UserGroup) => {
    setEditGroup(group);
    setEditGroupName(group.name);
    setEditGroupDesc(group.description || '');
    // Pre-fill members from GROUP_MEMBERS if available
    const existingMembers = (GROUP_MEMBERS[group.id] || []).map(m => {
      const found = mockUsers.find(u => u.email === m.email);
      return found ? found.id : '';
    }).filter(Boolean);
    setEditGroupMembers(existingMembers);
    setEditOpen(true);
  };

  const handleCloseAdd = () => {
    onCloseDrawer();
    setNewGroupName('');
    setNewGroupDesc('');
    setNewGroupMembers([]);
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
    setEditGroup(null);
    setEditGroupName('');
    setEditGroupDesc('');
    setEditGroupMembers([]);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 16, paddingTop: 16, alignItems: 'start' }}>

      {/* ── Left: nav-style group list ── */}
      <div style={{ border: '1px solid #e2e5ea', borderRadius: 8, overflow: 'hidden', background: '#ffffff' }}>
        {/* List header */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e5ea', background: '#f7f8fa' }}>
          <span style={{ fontSize: 12, color: '#8b919e', fontWeight: 500 }}>{mockUserGroups.length} groups</span>
        </div>

        {/* Group rows */}
        {mockUserGroups.map((group, i) => {
          const isActive = selected.id === group.id;
          return (
            <div
              key={group.id}
              onClick={() => setSelected(group)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px',
                borderTop: i === 0 ? 'none' : '1px solid #eef0f3',
                borderLeft: `3px solid ${isActive ? '#15808C' : 'transparent'}`,
                background: isActive ? '#f0fdfa' : '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: isActive ? '#15808C' : '#1a1d23', marginBottom: 2 }}>
                  {group.name}
                </div>
                <div style={{ fontSize: 12, color: '#8b919e' }}>{group.memberCount} members</div>
              </div>
              {isActive && (
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#15808C', flexShrink: 0,
                }} />
              )}
            </div>
          );
        })}
      </div>

      {/* ── Right: group detail panel ── */}
      <div style={{ border: '1px solid #e2e5ea', borderRadius: 8, overflow: 'hidden', background: '#ffffff' }}>
        {/* Panel header */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          padding: '16px 20px', borderBottom: '1px solid #e2e5ea',
        }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#1a1d23', marginBottom: 3 }}>{selected.name}</div>
            <div style={{ fontSize: 13, color: '#8b919e' }}>{selected.description}</div>
          </div>
          <UniButton size="small" onClick={() => handleOpenEdit(selected)}>Edit Group</UniButton>
        </div>

        {/* Panel body */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f0fdfa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TeamOutlined style={{ color: '#15808C', fontSize: 15 }} />
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#1a1d23' }}>{selected.memberCount}</div>
                <div style={{ fontSize: 11, color: '#8b919e' }}>Members</div>
              </div>
            </div>
            <div style={{ width: 1, background: '#eef0f3' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CalendarOutlined style={{ color: '#8b919e', fontSize: 15 }} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1d23' }}>{selected.createdAt}</div>
                <div style={{ fontSize: 11, color: '#8b919e' }}>Created</div>
              </div>
            </div>
          </div>

          {/* Members section */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#8b919e', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>
              Members
            </div>

            {members.length > 0 ? (
              <div style={{ border: '1px solid #e2e5ea', borderRadius: 8, overflow: 'hidden' }}>
                {/* Table header */}
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr',
                  padding: '8px 16px', background: '#f7f8fa',
                  borderBottom: '1px solid #e2e5ea',
                  fontSize: 11, fontWeight: 600, color: '#8b919e',
                  textTransform: 'uppercase', letterSpacing: '0.4px',
                }}>
                  <span>Name</span>
                  <span>Role</span>
                </div>

                {/* Member rows */}
                {members.map((member, mi) => {
                  const av = AVATAR_COLORS[mi % AVATAR_COLORS.length];
                  return (
                    <div
                      key={member.email}
                      style={{
                        display: 'grid', gridTemplateColumns: '1fr 1fr',
                        alignItems: 'center', padding: '10px 16px',
                        borderTop: mi === 0 ? 'none' : '1px solid #eef0f3',
                        background: '#ffffff',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 30, height: 30, borderRadius: '50%',
                          background: av.bg, color: av.color,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 11, fontWeight: 700, flexShrink: 0,
                        }}>
                          {getInitials(member.name)}
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 500, color: '#1a1d23' }}>{member.name}</div>
                          <div style={{ fontSize: 11, color: '#8b919e' }}>{member.email}</div>
                        </div>
                      </div>
                      <span style={{
                        display: 'inline-block',
                        background: '#f3f4f6', color: '#6b7280',
                        padding: '2px 10px', borderRadius: 6,
                        fontSize: 12, fontWeight: 500,
                        width: 'fit-content',
                      }}>
                        {member.role}
                      </span>
                    </div>
                  );
                })}

              </div>
            ) : (
              <div style={{
                border: '1px solid #e2e5ea', borderRadius: 8,
                padding: '32px', textAlign: 'center',
                color: '#8b919e', fontSize: 13,
              }}>
                No members in this group yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Add Group Modal ── */}
      <Modal
        open={drawerOpen}
        onCancel={handleCloseAdd}
        title="Create User Group"
        width={520}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <UniButton onClick={handleCloseAdd}>Cancel</UniButton>
            <UniButton type="primary" onClick={() => { handleCloseAdd(); showToast('Group created', 'New user group has been created successfully.'); }}>Create Group</UniButton>
          </div>
        }
      >
        <Form layout="vertical">
          <Form.Item label="Group Name" required style={{ marginBottom: 16 }}>
            <UniInput
              placeholder="Enter group name"
              value={newGroupName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewGroupName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Description" style={{ marginBottom: 16 }}>
            <UniInput
              placeholder="Describe this group's purpose"
              value={newGroupDesc}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewGroupDesc(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Add Members" style={{ marginBottom: 0 }}>
            <UniSelect
              mode="multiple"
              placeholder="Search and select users…"
              options={userOptions}
              value={newGroupMembers}
              onChange={(v: string[]) => setNewGroupMembers(v)}
              style={{ width: '100%' }}
              showSearch
              filterOption={(input: string, option: any) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* ── Edit Group Modal ── */}
      <Modal
        open={editOpen}
        onCancel={handleCloseEdit}
        title="Edit Group"
        width={520}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <UniButton onClick={handleCloseEdit}>Cancel</UniButton>
            <UniButton type="primary" onClick={() => { handleCloseEdit(); showToast('Group updated', 'Group changes saved successfully.'); }}>Save Changes</UniButton>
          </div>
        }
      >
        <Form layout="vertical">
          <Form.Item label="Group Name" required style={{ marginBottom: 16 }}>
            <UniInput
              placeholder="Enter group name"
              value={editGroupName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditGroupName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Description" style={{ marginBottom: 16 }}>
            <UniInput
              placeholder="Describe this group's purpose"
              value={editGroupDesc}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditGroupDesc(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Members" style={{ marginBottom: 0 }}>
            <UniSelect
              mode="multiple"
              placeholder="Search and select users…"
              options={userOptions}
              value={editGroupMembers}
              onChange={(v: string[]) => setEditGroupMembers(v)}
              style={{ width: '100%' }}
              showSearch
              filterOption={(input: string, option: any) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
