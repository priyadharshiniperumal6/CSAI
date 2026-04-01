import { useState } from 'react';
import { UniBreadcrumb, UniButton } from '@uniphore/ut-design-system';
import { PlusOutlined } from '@ant-design/icons';
import { usePageTabs } from '../../hooks/usePageTabs';
import { CreateUsersTab } from './components/CreateUsersTab';
import { UserGroupsTab } from './components/UserGroupsTab';
import { AccessManagementTab } from './components/AccessManagementTab';
import { TokenKeyMgmtTab } from './components/TokenKeyMgmtTab';
import { AuditLogsTab } from './components/AuditLogsTab';
import { CreditActualsTab } from './components/CreditActualsTab';
import { VendorServicesTab } from './components/VendorServicesTab';

const TAB_LABELS = ['Users', 'User Groups', 'Access Management', 'Token Key Mgmt', 'Audit Logs', 'Credit Actuals', 'Vendor Services'];

export function UserManagementPage() {
  const { activeTab } = usePageTabs(TAB_LABELS, 'Users');
  const [createUserOpen, setCreateUserOpen] = useState(false);
  const [createGroupOpen, setCreateGroupOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'Users':             return <CreateUsersTab drawerOpen={createUserOpen} onCloseDrawer={() => setCreateUserOpen(false)} />;
      case 'User Groups':       return <UserGroupsTab drawerOpen={createGroupOpen} onCloseDrawer={() => setCreateGroupOpen(false)} />;
      case 'Access Management': return <AccessManagementTab />;
      case 'Token Key Mgmt':    return <TokenKeyMgmtTab />;
      case 'Audit Logs':        return <AuditLogsTab />;
      case 'Credit Actuals':    return <CreditActualsTab />;
      case 'Vendor Services':   return <VendorServicesTab />;
      default:                  return null;
    }
  };

  const renderHeaderAction = () => {
    if (activeTab === 'Users') {
      return (
        <UniButton
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setCreateUserOpen(true)}
          style={{ borderRadius: 8 }}
        >
          Add User
        </UniButton>
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
          <span className="page-subtitle">Create and manage users, groups, access, tokens, and service consumption</span>
        </div>
        {renderHeaderAction()}
      </div>
      <div style={{ padding: '0 24px 24px' }}>
        {renderContent()}
      </div>
    </div>
  );
}
