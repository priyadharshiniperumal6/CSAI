import { UniBreadcrumb } from '@uniphore/ut-design-system';
import { usePageTabs } from '../../hooks/usePageTabs';
import { PaymentsTab } from './components/PaymentsTab';
import { BasicCreditsTab } from './components/BasicCreditsTab';
import { VendorServicesTab } from './components/VendorServicesTab';

const TAB_LABELS = ['Payments', 'Basic Credits', 'Vendor Services'];

export function BillingPage() {
  const { activeTab } = usePageTabs(TAB_LABELS, 'Payments');

  const renderContent = () => {
    switch (activeTab) {
      case 'Payments': return <PaymentsTab />;
      case 'Basic Credits': return <BasicCreditsTab />;
      case 'Vendor Services': return <VendorServicesTab />;
      default: return null;
    }
  };

  return (
    <div>
      <div style={{ padding: '12px 24px 0' }}>
        <UniBreadcrumb items={[{ title: 'Administration' }, { title: 'Billing' }]} />
      </div>
      <div className="page-header-bar">
        <div className="page-header-left">
          <h1 className="page-title">Billing</h1>
          <span className="page-subtitle">Manage payments, credits, and vendor services</span>
        </div>
      </div>
      <div style={{ padding: '0 24px 24px' }}>
        {renderContent()}
      </div>
    </div>
  );
}
