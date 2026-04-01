import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UniBreadcrumb, UniButton } from '@uniphore/ut-design-system';
import { ArrowLeftOutlined, DownOutlined, RightOutlined } from '@ant-design/icons';
import { mockTenants, regionOptions } from '../../data/mock-tenants';
import { usePageTabs } from '../../hooks/usePageTabs';
import { TenantSecurityTab } from './components/TenantSecurityTab';
import { TenantApiTab } from './components/TenantApiTab';
import { TenantWebhooksTab } from './components/TenantWebhooksTab';
import { TenantLimitsTab } from './components/TenantLimitsTab';
import { TenantAlertsTab } from './components/TenantAlertsTab';
import { TenantAuditLogTab } from './components/TenantAuditLogTab';

const TAB_LABELS = ['Basic Information', 'Security', 'API', 'Webhooks', 'Limits', 'Alerts', 'Audit Logs'];

const STATUS_STYLES: Record<string, { color: string; dot: string }> = {
  Production: { color: '#15803d', dot: '#22c55e' },
  Scheduled:  { color: '#0369a1', dot: '#3b82f6' },
  Completed:  { color: '#15803d', dot: '#22c55e' },
  Active:     { color: '#0e7490', dot: '#06b6d4' },
  Failed:     { color: '#dc2626', dot: '#ef4444' },
  Trial:      { color: '#b45309', dot: '#f59e0b' },
};

const APP_COLORS: Record<string, { bg: string; color: string }> = {
  SSA:       { bg: '#e0f2fe', color: '#0369a1' },
  RTGA:      { bg: '#dcfce7', color: '#15803d' },
  CIA:       { bg: '#f3e8ff', color: '#7c3aed' },
  KB:        { bg: '#fef3c7', color: '#b45309' },
  Analytics: { bg: '#cffafe', color: '#0e7490' },
};

export function TenantDetailPage() {
  const { tenantId } = useParams<{ tenantId: string }>();
  const navigate = useNavigate();
  const { activeTab } = usePageTabs(TAB_LABELS, 'Basic Information');
  const tenant = mockTenants.find((t) => t.id === tenantId);

  if (!tenant) {
    return <div style={{ padding: 24 }}>Tenant not found</div>;
  }

  const regionLabel = regionOptions.find((r) => r.value === tenant.region)?.label || tenant.region;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Basic Information': return <BasicInfoTab tenant={tenant} regionLabel={regionLabel} appColors={APP_COLORS} />;
      case 'Security':          return <TenantSecurityTab tenant={tenant} />;
      case 'API':               return <TenantApiTab tenant={tenant} />;
      case 'Webhooks':          return <TenantWebhooksTab tenant={tenant} />;
      case 'Limits':            return <TenantLimitsTab tenant={tenant} />;
      case 'Alerts':            return <TenantAlertsTab tenant={tenant} />;
      case 'Audit Logs':        return <TenantAuditLogTab tenant={tenant} />;
      default:                  return null;
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ padding: '12px 24px 0' }}>
        <UniBreadcrumb
          items={[
            { title: 'Administration' },
            { title: <a onClick={() => navigate('/tenants')}>Tenants</a> },
            { title: tenant.name },
          ]}
        />
      </div>

      {/* Page header */}
      <div style={{ padding: '12px 24px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={() => navigate('/tenants')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px', color: '#6b7280', borderRadius: 6, display: 'flex', alignItems: 'center' }}
        >
          <ArrowLeftOutlined style={{ fontSize: 16 }} />
        </button>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#1a1d23', lineHeight: 1.2 }}>{tenant.name}</h1>
      </div>

      {/* Tab content (tabs rendered in HostShell top header) */}
      <div style={{ padding: '0 24px 24px' }}>
        {renderTabContent()}
      </div>
    </div>
  );
}

// ── Basic Information with accordion sections ──────────────────────────────

interface BasicInfoProps {
  tenant: typeof mockTenants[number];
  regionLabel: string;
  appColors: Record<string, { bg: string; color: string }>;
}

function BasicInfoTab({ tenant, regionLabel, appColors }: BasicInfoProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ identity: true });

  const toggle = (key: string) =>
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

  const statusStyle = STATUS_STYLES[tenant.deploymentStatus] ?? { color: '#6b7280', dot: '#9ca3af' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 16 }}>

      {/* ── Tenant Identity ── */}
      <AccordionSection
        title="Tenant Identity"
        isOpen={!!openSections['identity']}
        onToggle={() => toggle('identity')}
      >
        {/* Status + meta summary row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span className="ds-pill" style={{
            border: '1px solid #d1d5db',
            background: '#ffffff',
            color: statusStyle.color,
          }}>
            <span className="ds-pill-dot" style={{ background: statusStyle.dot }} />
            {tenant.deploymentStatus}
          </span>
          <span style={{ color: '#8b919e', fontSize: 13 }}>
            {tenant.slug}&nbsp;·&nbsp;{regionLabel}
          </span>
        </div>
        <div className="info-grid">
          <InfoItem label="Tenant Name"  value={tenant.name} />
          <InfoItem label="Slug"         value={tenant.slug} />
          <InfoItem label="Region"       value={regionLabel} />
          <InfoItem label="Industry"     value={tenant.industry || '—'} />
          <InfoItem label="Created"      value={new Date(tenant.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} />
          <InfoItem label="Description"  value={tenant.description || 'No description provided'} />
        </div>
      </AccordionSection>

      {/* ── Deployment Information ── */}
      <AccordionSection
        title="Deployment Information"
        isOpen={!!openSections['deployment']}
        onToggle={() => toggle('deployment')}
      >
        <div className="info-grid">
          <InfoItem label="Deployment Status" value={tenant.deploymentStatus} />
          <InfoItem label="Total Users"        value={String(tenant.userCount)} />
          <div className="info-grid-item" style={{ gridColumn: '1 / -1' }}>
            <span className="info-grid-label">Deployed Applications</span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 6 }}>
              {tenant.deployedApps.map((app) => {
                const c = appColors[app] ?? { bg: '#f3f4f6', color: '#374151' };
                return (
                  <span key={app} className="ds-badge" style={{ background: c.bg, color: c.color }}>
                    {app}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </AccordionSection>

      {/* ── Order & Licensing ── */}
      <AccordionSection
        title="Order & Licensing"
        isOpen={!!openSections['order']}
        onToggle={() => toggle('order')}
      >
        <div className="info-grid">
          <InfoItem label="Order ID"        value={tenant.orderId       || 'ORD-2025-00142'} />
          <InfoItem label="License Type"    value={tenant.licenseType   || 'Enterprise'} />
          <InfoItem label="License Expiry"  value={tenant.licenseExpiry || 'December 31, 2025'} />
          <InfoItem label="Salesforce Link" value={tenant.salesforceLink || 'SF-0091234'} />
        </div>
      </AccordionSection>

    </div>
  );
}

// ── Accordion section component ────────────────────────────────────────────

function AccordionSection({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div style={{ border: '1px solid #e2e5ea', borderRadius: 8, overflow: 'hidden' }}>
      {/* Header */}
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px',
          background: isOpen ? '#fafbfc' : '#ffffff',
          border: 'none',
          borderBottom: isOpen ? '1px solid #e2e5ea' : 'none',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'background 0.15s',
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 14, color: '#1a1d23' }}>{title}</span>
        <span style={{ color: '#8b919e', fontSize: 13 }}>
          {isOpen ? <DownOutlined /> : <RightOutlined />}
        </span>
      </button>

      {/* Content */}
      {isOpen && (
        <div style={{ padding: '20px', background: '#ffffff' }}>
          {children}
        </div>
      )}
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="info-grid-item">
      <span className="info-grid-label">{label}</span>
      <span className="info-grid-value">{value}</span>
    </div>
  );
}
