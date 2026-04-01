import { UniBreadcrumb } from '@uniphore/ut-design-system';
import { usePageTabs } from '../../hooks/usePageTabs';
import { PaymentsTab } from './components/PaymentsTab';
import { BasicCreditsTab } from './components/BasicCreditsTab';
import { VendorServicesTab } from './components/VendorServicesTab';
import { CreditActualsTab } from '../users/components/CreditActualsTab';

const TAB_LABELS = ['Payments', 'BAIC Credits', 'Vendor Services', 'Credit Actuals'];

export function BillingPage() {
  const { activeTab } = usePageTabs(TAB_LABELS, 'Payments');

  const renderContent = () => {
    switch (activeTab) {
      case 'Payments':        return <PaymentsTab />;
      case 'BAIC Credits':    return <BasicCreditsTab />;
      case 'Vendor Services': return <VendorServicesTab />;
      case 'Credit Actuals':  return <CreditActualsTab />;
      default:                return null;
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
          <span className="page-subtitle">Manage payments, BAIC credits, vendor services and credit actuals</span>
        </div>
      </div>
      <div style={{ padding: '0 24px 24px' }}>
        {renderContent()}
      </div>
    </div>
  );
}
