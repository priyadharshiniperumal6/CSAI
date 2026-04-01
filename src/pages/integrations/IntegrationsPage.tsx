import { UniBreadcrumb, UniButton, UniTag } from '@uniphore/ut-design-system';
import { PlusOutlined } from '@ant-design/icons';
import {
  ApiOutlined,
  SlackOutlined,
  BugOutlined,
  AlertOutlined,
  DashboardOutlined,
  SafetyCertificateOutlined,
  CloudServerOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { usePageTabs } from '../../hooks/usePageTabs';

interface Integration {
  id: string;
  name: string;
  description: string;
  status: 'Available' | 'Connected' | 'Live';
  category: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

const allIntegrations: Integration[] = [
  { id: '1', name: 'U-Assist', description: 'Agent real-time guidance and workflow automation.', status: 'Available', category: 'Agent Tools', icon: <ThunderboltOutlined />, iconBg: '#fce7f3', iconColor: '#db2777' },
  { id: '2', name: 'U-Capture', description: 'Gain access to list, share, and act on voice data.', status: 'Live', category: 'Voice', icon: <ApiOutlined />, iconBg: '#dcfce7', iconColor: '#15803d' },
  { id: '3', name: 'U-Analyze', description: 'Analyze conversations for actionable insights to drive performance.', status: 'Available', category: 'Analytics', icon: <DashboardOutlined />, iconBg: '#f3e8ff', iconColor: '#7c3aed' },
  { id: '4', name: 'U-Analyze NG', description: 'Next-gen conversation analytics with advanced insights.', status: 'Live', category: 'Analytics', icon: <DashboardOutlined />, iconBg: '#cffafe', iconColor: '#0e7490' },
  { id: '5', name: 'Salesforce', description: 'CRM integration for customer data sync and enrichment.', status: 'Live', category: 'CRM', icon: <CloudServerOutlined />, iconBg: '#e0f2fe', iconColor: '#0369a1' },
  { id: '6', name: 'Slack', description: 'Real-time notifications and team alerts.', status: 'Live', category: 'Communication', icon: <SlackOutlined />, iconBg: '#fef3c7', iconColor: '#b45309' },
  { id: '7', name: 'Jira', description: 'Issue tracking and project management integration.', status: 'Available', category: 'Project Management', icon: <BugOutlined />, iconBg: '#e0f2fe', iconColor: '#2563eb' },
  { id: '8', name: 'PagerDuty', description: 'Incident management and on-call scheduling.', status: 'Available', category: 'Monitoring', icon: <AlertOutlined />, iconBg: '#fee2e2', iconColor: '#dc2626' },
  { id: '9', name: 'DataDog', description: 'Infrastructure monitoring and APM.', status: 'Live', category: 'Monitoring', icon: <DashboardOutlined />, iconBg: '#f3e8ff', iconColor: '#7c3aed' },
  { id: '10', name: 'Okta', description: 'SSO and identity management integration.', status: 'Live', category: 'Security', icon: <SafetyCertificateOutlined />, iconBg: '#e0f2fe', iconColor: '#0369a1' },
];

const TAB_LABELS = ['Available', 'Deployed'];

export function IntegrationsPage() {
  const { activeTab } = usePageTabs(TAB_LABELS, 'Available');

  const available = allIntegrations.filter((i) => i.status === 'Available');
  const deployed = allIntegrations.filter((i) => i.status === 'Live' || i.status === 'Connected');
  const currentList = activeTab === 'Available' ? available : deployed;
  const isDeployed = activeTab === 'Deployed';

  return (
    <div>
      <div style={{ padding: '12px 24px 0' }}>
        <UniBreadcrumb items={[{ title: 'Administration' }, { title: 'Integrations' }]} />
      </div>
      <div className="page-header-bar" style={{ borderBottom: 'none' }}>
        <div className="page-header-left">
          <h1 className="page-title">Integrations</h1>
          <span className="page-subtitle">Connect third-party services and Uniphore modules</span>
        </div>
        <UniButton type="primary" icon={<PlusOutlined />} style={{ borderRadius: 8 }}>
          Add Integration
        </UniButton>
      </div>
      <div style={{ padding: '0 24px 24px' }}>
        <div className="integration-grid">
          {currentList.map((integration) => (
            <IntegrationCard key={integration.id} integration={integration} isDeployed={isDeployed} />
          ))}
        </div>
      </div>
    </div>
  );
}

function IntegrationCard({ integration, isDeployed }: { integration: Integration; isDeployed: boolean }) {
  const statusStyles: Record<string, { bg: string; color: string; dot: string }> = {
    Available: { bg: '#f3f4f6', color: '#6b7280', dot: '#9ca3af' },
    Connected: { bg: '#dcfce7', color: '#15803d', dot: '#22c55e' },
    Live: { bg: '#dcfce7', color: '#15803d', dot: '#22c55e' },
  };
  const st = statusStyles[integration.status] || statusStyles.Available;

  return (
    <div className="integration-card">
      <div className="integration-card-header">
        <div className="integration-card-icon" style={{ background: integration.iconBg, color: integration.iconColor }}>{integration.icon}</div>
        <div className="integration-card-info"><div className="integration-card-name">{integration.name}</div></div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: st.bg, color: st.color, padding: '2px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: st.dot }} />
          {integration.status}
        </span>
      </div>
      <div className="integration-card-desc">{integration.description}</div>
      <div className="integration-card-footer">
        <UniTag style={{ margin: 0 }}>{integration.category}</UniTag>
        <div style={{ display: 'flex', gap: 8 }}>
          {isDeployed ? (
            <>
              <UniButton size="small" type="link">Details</UniButton>
              <UniButton size="small" type="link">Configuration</UniButton>
            </>
          ) : (
            <UniButton size="small" type="link">Deploy</UniButton>
          )}
        </div>
      </div>
    </div>
  );
}
