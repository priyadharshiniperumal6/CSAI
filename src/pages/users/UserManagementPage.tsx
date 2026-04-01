import { useState } from 'react';
import { UniBreadcrumb, UniButton } from '@uniphore/ut-design-system';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { usePageTabs } from '../../hooks/usePageTabs';
import { CreateUsersTab } from './components/CreateUsersTab';
import { SsoTab } from './components/SsoTab';
import { UserGroupsTab } from './components/UserGroupsTab';
import { AccessManagementTab } from './components/AccessManagementTab';
import { TokenKeyMgmtTab } from './components/TokenKeyMgmtTab';

const TAB_LABELS = ['Users', 'SSO', 'User Groups', 'Access Management', 'Token Key Mgmt'];

export function UserManagementPage() {
  const { activeTab } = usePageTabs(TAB_LABELS, 'Users');
  const [createUserOpen, setCreateUserOpen] = useState(false);
  const [createGroupOpen, setCreateGroupOpen] = useState(false);
  const [bulkUploadOpen, setBulkUploadOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'Users':             return <CreateUsersTab modalOpen={createUserOpen} onCloseModal={() => setCreateUserOpen(false)} bulkUploadOpen={bulkUploadOpen} onCloseBulkUpload={() => setBulkUploadOpen(false)} />;
      case 'SSO':               return <SsoTab />;
      case 'User Groups':       return <UserGroupsTab drawerOpen={createGroupOpen} onCloseDrawer={() => setCreateGroupOpen(false)} />;
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
          <UniButton
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateUserOpen(true)}
            style={{ borderRadius: 8 }}
          >
            Add User
          </UniButton>
        </div>
      );
    }
    if (activeTab === 'User Groups') {
      return (
        <UniButton
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setCreateGroupOpen(true)}
          style={{ borderRadius: 8 }}
        >
          Add Group
        </UniButton>
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
