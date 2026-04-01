import { UniSwitch } from '@uniphore/ut-design-system';
import {
  CustomerServiceOutlined,
  RobotOutlined,
  BarChartOutlined,
  DeploymentUnitOutlined,
  DatabaseOutlined,
  ExperimentOutlined,
  CloudServerOutlined,
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
    label: 'Self Serve Agent (SSA)',
    description: 'Omnichannel self-service powered by AI agents',
    icon: <BarChartOutlined />,
    iconBg: '#e0f2fe',
    iconColor: '#0369a1',
  },
  {
    key: 'RTGA',
    label: 'Real Time Guidance Agent (RTGA)',
    description: 'Real-time guidance and next best action for agents',
    icon: <RobotOutlined />,
    iconBg: '#dcfce7',
    iconColor: '#15803d',
  },
  {
    key: 'CIA',
    label: 'Conversation Intelligence Agent (CIA)',
    description: 'Post-call analytics, QA and conversation insights',
    icon: <CustomerServiceOutlined />,
    iconBg: '#f3e8ff',
    iconColor: '#7c3aed',
  },
  {
    key: 'ProcessDiscovery',
    label: 'Process Discovery',
    description: 'Automated process mining and workflow analysis',
    icon: <DeploymentUnitOutlined />,
    iconBg: '#fff7ed',
    iconColor: '#c2410c',
  },
  {
    key: 'DataAgent',
    label: 'Data Agent',
    description: 'Intelligent data extraction and enrichment agent',
    icon: <DatabaseOutlined />,
    iconBg: '#f0fdf4',
    iconColor: '#15803d',
  },
  {
    key: 'FineTuning',
    label: 'Fine Tuning',
    description: 'Custom model fine-tuning on tenant-specific data',
    icon: <ExperimentOutlined />,
    iconBg: '#fdf4ff',
    iconColor: '#9333ea',
  },
  {
    key: 'BAICPlatform',
    label: 'BAIC Platform Access',
    description: 'Full access to the BAIC platform and APIs',
    icon: <CloudServerOutlined />,
    iconBg: '#ecfeff',
    iconColor: '#0e7490',
  },
];

export function FeatureConfigStep({ data, onToggle }: Props) {
  return (
    <div>
      <p style={{ color: '#6b7280', marginBottom: 20, fontSize: 14 }}>
        Select the applications to deploy for this tenant.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {AVAILABLE_APPS.map((app) => {
          const isActive = data.enabledApps.includes(app.key);
          return (
            <div key={app.key} className={`feature-card ${isActive ? 'active' : ''}`}>
              <div
                className="feature-card-icon"
                style={{ background: app.iconBg, color: app.iconColor, fontSize: 20 }}
              >
                {app.icon}
              </div>
              <div className="feature-card-body" style={{ flex: 1 }}>
                <div className="feature-card-title">{app.label}</div>
                <div className="feature-card-desc">{app.description}</div>
              </div>
              <UniSwitch checked={isActive} onChange={() => onToggle(app.key)} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
