import { UniSwitch } from '@uniphore/ut-design-system';
import {
  CustomerServiceOutlined,
  RobotOutlined,
  BarChartOutlined,
  ReadOutlined,
  FundOutlined,
} from '@ant-design/icons';
import type { TenantFormData, DeployedApp } from '../../../types/tenant';

interface Props {
  data: TenantFormData;
  onToggle: (app: DeployedApp) => void;
}

const AVAILABLE_APPS: {
  key: DeployedApp;
  label: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}[] = [
  {
    key: 'SSA',
    label: 'Self-Service Analytics',
    description: 'Customer self-service analytics and dashboards',
    icon: <BarChartOutlined />,
    iconBg: '#e0f2fe',
    iconColor: '#0369a1',
  },
  {
    key: 'RTGA',
    label: 'Real-Time Guidance & Assist',
    description: 'Real-time agent guidance and live assistance',
    icon: <RobotOutlined />,
    iconBg: '#dcfce7',
    iconColor: '#15803d',
  },
  {
    key: 'CIA',
    label: 'Conversational Intelligence',
    description: 'Post-call analytics and conversation insights',
    icon: <CustomerServiceOutlined />,
    iconBg: '#f3e8ff',
    iconColor: '#7c3aed',
  },
  {
    key: 'KB',
    label: 'Knowledge Base',
    description: 'Centralized knowledge management system',
    icon: <ReadOutlined />,
    iconBg: '#fef3c7',
    iconColor: '#b45309',
  },
  {
    key: 'Analytics',
    label: 'Advanced Analytics',
    description: 'Advanced reporting and business intelligence',
    icon: <FundOutlined />,
    iconBg: '#cffafe',
    iconColor: '#0e7490',
  },
];

export function FeatureConfigStep({ data, onToggle }: Props) {
  return (
    <div>
      <p style={{ color: '#6b7280', marginBottom: 20, fontSize: 14 }}>
        Select the applications to deploy for this tenant.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {AVAILABLE_APPS.map((app) => {
          const isActive = data.enabledApps.includes(app.key);
          return (
            <div
              key={app.key}
              className={`feature-card ${isActive ? 'active' : ''}`}
            >
              <div
                className="feature-card-icon"
                style={{ background: app.iconBg, color: app.iconColor, fontSize: 22 }}
              >
                {app.icon}
              </div>
              <div className="feature-card-body" style={{ flex: 1 }}>
                <div className="feature-card-title">{app.label}</div>
                <div className="feature-card-desc">{app.description}</div>
              </div>
              <UniSwitch
                checked={isActive}
                onChange={() => onToggle(app.key)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
