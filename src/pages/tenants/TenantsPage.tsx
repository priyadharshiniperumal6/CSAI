import { useState, useEffect } from 'react';
import { UniBreadcrumb, UniButton } from '@uniphore/ut-design-system';
import { PlusOutlined } from '@ant-design/icons';
import { TenantListTable } from './components/TenantListTable';
import { TenantCreationDrawer } from './components/TenantCreationDrawer';
import { useTopNav } from '../../context/TopNavContext';
import { useToast } from '../../context/ToastContext';

export function TenantsPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { clearTopNav } = useTopNav();
  const { showToast } = useToast();
  useEffect(() => { clearTopNav(); }, [clearTopNav]);

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ padding: '12px 24px 0' }}>
        <UniBreadcrumb items={[{ title: 'Administration' }, { title: 'Tenants' }]} />
      </div>

      {/* Page Header with prominent Create button */}
      <div className="page-header-bar">
        <div className="page-header-left">
          <h1 className="page-title">Tenants</h1>
          <span className="page-subtitle">Manage and provision all tenant accounts</span>
        </div>
        <UniButton
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setDrawerOpen(true)}
          style={{ borderRadius: 8 }}
        >
          Create Tenant
        </UniButton>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 24px 24px' }}>
        <TenantListTable />
      </div>

      <TenantCreationDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onProvision={() => showToast('Tenant provisioned', 'New tenant has been created and is being set up.')}
      />
    </div>
  );
}
