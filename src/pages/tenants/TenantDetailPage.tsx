import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UniBreadcrumb, UniButton, UniInput, UniSelect } from '@uniphore/ut-design-system';
import { ArrowLeftOutlined, DownOutlined, RightOutlined, EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { mockTenants, regionOptions } from '../../data/mock-tenants';
import { usePageTabs } from '../../hooks/usePageTabs';
import { TenantSecurityTab } from './components/TenantSecurityTab';
import { TenantApiTab } from './components/TenantApiTab';
import { TenantWebhooksTab } from './components/TenantWebhooksTab';
import { TenantLimitsTab } from './components/TenantLimitsTab';
import { TenantAlertsTab } from './components/TenantAlertsTab';
import { TenantAuditLogTab } from './components/TenantAuditLogTab';

const TAB_LABELS = ['Details', 'Security', 'API', 'Webhooks', 'Limits', 'Alerts', 'Audit Logs'];

const STATUS_STYLES: Record<string, { color: string; dot: string }> = {
  Production: { color: '#15803d', dot: '#22c55e' },
  Scheduled:  { color: '#0369a1', dot: '#3b82f6' },
  Completed:  { color: '#15803d', dot: '#22c55e' },
  Active:     { color: '#0e7490', dot: '#06b6d4' },
  Failed:     { color: '#dc2626', dot: '#ef4444' },
  Trial:      { color: '#b45309', dot: '#f59e0b' },
};

const APP_COLORS: Record<string, { bg: string; color: string }> = {
  SSA:              { bg: '#e0f2fe', color: '#0369a1' },
  RTGA:             { bg: '#dcfce7', color: '#15803d' },
  CIA:              { bg: '#f3e8ff', color: '#7c3aed' },
  ProcessDiscovery: { bg: '#fff7ed', color: '#c2410c' },
  DataAgent:        { bg: '#f0fdf4', color: '#15803d' },
  FineTuning:       { bg: '#fdf4ff', color: '#9333ea' },
  BAICPlatform:     { bg: '#ecfeff', color: '#0e7490' },
};

const licenseOptions = [
  { value: 'enterprise', label: 'Enterprise' },
  { value: 'professional', label: 'Professional' },
  { value: 'starter', label: 'Starter' },
  { value: 'trial', label: 'Trial' },
];

const statusOptions = [
  { value: 'Production', label: 'Production' },
  { value: 'Scheduled',  label: 'Scheduled' },
  { value: 'Active',     label: 'Active' },
  { value: 'Trial',      label: 'Trial' },
  { value: 'Failed',     label: 'Failed' },
];

export function TenantDetailPage() {
  const { tenantId } = useParams<{ tenantId: string }>();
  const navigate = useNavigate();
  const { activeTab } = usePageTabs(TAB_LABELS, 'Details');
  const tenant = mockTenants.find((t) => t.id === tenantId);

  if (!tenant) {
    return <div style={{ padding: 24 }}>Tenant not found</div>;
  }

  const regionLabel = regionOptions.find((r) => r.value === tenant.region)?.label || tenant.region;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Details':    return <DetailsTab tenant={tenant} regionLabel={regionLabel} appColors={APP_COLORS} />;
      case 'Security':   return <TenantSecurityTab tenant={tenant} />;
      case 'API':        return <TenantApiTab tenant={tenant} />;
      case 'Webhooks':   return <TenantWebhooksTab tenant={tenant} />;
      case 'Limits':     return <TenantLimitsTab tenant={tenant} />;
      case 'Alerts':     return <TenantAlertsTab tenant={tenant} />;
      case 'Audit Logs': return <TenantAuditLogTab tenant={tenant} />;
      default:           return null;
    }
  };

  return (
    <div>
      <div style={{ padding: '12px 24px 0' }}>
        <UniBreadcrumb
          items={[
            { title: 'Administration' },
            { title: <a onClick={() => navigate('/tenants')}>Tenants</a> },
            { title: tenant.name },
          ]}
        />
      </div>
      <div style={{ padding: '12px 24px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={() => navigate('/tenants')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px', color: '#6b7280', borderRadius: 6, display: 'flex', alignItems: 'center' }}
        >
          <ArrowLeftOutlined style={{ fontSize: 16 }} />
        </button>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#1a1d23', lineHeight: 1.2 }}>{tenant.name}</h1>
      </div>
      <div style={{ padding: '0 24px 24px' }}>
        {renderTabContent()}
      </div>
    </div>
  );
}

// ── Details Tab ────────────────────────────────────────────────────────────

interface DetailsTabProps {
  tenant: typeof mockTenants[number];
  regionLabel: string;
  appColors: Record<string, { bg: string; color: string }>;
}

function DetailsTab({ tenant, regionLabel, appColors }: DetailsTabProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    identity: true, deployment: true, order: true,
  });

  // Editable state for Deployment section
  const [deployment, setDeployment] = useState({
    status: tenant.deploymentStatus,
    userCount: String(tenant.userCount),
  });
  const [deploymentEditing, setDeploymentEditing] = useState(false);
  const [deploymentDraft, setDeploymentDraft] = useState(deployment);

  // Editable state for Order & Licensing section
  const [order, setOrder] = useState({
    orderId:       tenant.orderId        || 'ORD-2025-00142',
    licenseType:   tenant.licenseType    || 'enterprise',
    licenseExpiry: tenant.licenseExpiry  || 'December 31, 2025',
    salesforceLink: tenant.salesforceLink || 'SF-0091234',
  });
  const [orderEditing, setOrderEditing] = useState(false);
  const [orderDraft, setOrderDraft] = useState(order);

  const toggle = (key: string) =>
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

  const statusStyle = STATUS_STYLES[tenant.deploymentStatus] ?? { color: '#6b7280', dot: '#9ca3af' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>

      {/* ── Tenant Identity (read-only) ── */}
      <AccordionSection
        title="Tenant Identity"
        isOpen={!!openSections['identity']}
        onToggle={() => toggle('identity')}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span className="ds-pill" style={{ border: '1px solid #d1d5db', background: '#ffffff', color: statusStyle.color }}>
            <span className="ds-pill-dot" style={{ background: statusStyle.dot }} />
            {tenant.deploymentStatus}
          </span>
          <span style={{ color: '#8b919e', fontSize: 13 }}>{tenant.slug}&nbsp;·&nbsp;{regionLabel}</span>
        </div>
        <div className="info-grid">
          <ReadOnlyField label="Tenant Name"  value={tenant.name} />
          <ReadOnlyField label="Slug"         value={tenant.slug} />
          <ReadOnlyField label="Region"       value={regionLabel} />
          <ReadOnlyField label="Industry"     value={tenant.industry || '—'} />
          <ReadOnlyField label="Created"      value={new Date(tenant.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} />
          <ReadOnlyField label="Description"  value={tenant.description || 'No description provided'} />
        </div>
      </AccordionSection>

      {/* ── Deployment Information (editable) ── */}
      <AccordionSection
        title="Deployment Information"
        isOpen={!!openSections['deployment']}
        onToggle={() => toggle('deployment')}
        action={
          deploymentEditing ? (
            <div style={{ display: 'flex', gap: 6 }} onClick={e => e.stopPropagation()}>
              <UniButton size="small" icon={<CloseOutlined />} onClick={() => { setDeploymentEditing(false); setDeploymentDraft(deployment); }}>Cancel</UniButton>
              <UniButton size="small" type="primary" icon={<CheckOutlined />} onClick={() => { setDeployment(deploymentDraft); setDeploymentEditing(false); }}>Save</UniButton>
            </div>
          ) : (
            <UniButton size="small" icon={<EditOutlined />} onClick={e => { e.stopPropagation(); setDeploymentEditing(true); setDeploymentDraft(deployment); }}>Edit</UniButton>
          )
        }
      >
        <div className="info-grid">
          {deploymentEditing ? (
            <>
              <EditField label="Deployment Status">
                <UniSelect
                  value={deploymentDraft.status}
                  options={statusOptions}
                  onChange={(v: string) => setDeploymentDraft(p => ({ ...p, status: v }))}
                />
              </EditField>
              <EditField label="Total Users">
                <UniInput
                  value={deploymentDraft.userCount}
                  onChange={e => setDeploymentDraft(p => ({ ...p, userCount: e.target.value }))}
                />
              </EditField>
            </>
          ) : (
            <>
              <ReadOnlyField label="Deployment Status" value={deployment.status} />
              <ReadOnlyField label="Total Users"       value={deployment.userCount} />
            </>
          )}
          <div className="info-grid-item" style={{ gridColumn: '1 / -1' }}>
            <span className="info-grid-label">Deployed Applications</span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 6 }}>
              {tenant.deployedApps.map((app) => {
                const c = appColors[app] ?? { bg: '#f3f4f6', color: '#374151' };
                return (
                  <span key={app} className="ds-badge" style={{ background: c.bg, color: c.color }}>{app}</span>
                );
              })}
            </div>
          </div>
        </div>
      </AccordionSection>

      {/* ── Order & Licensing (editable) ── */}
      <AccordionSection
        title="Order & Licensing"
        isOpen={!!openSections['order']}
        onToggle={() => toggle('order')}
        action={
          orderEditing ? (
            <div style={{ display: 'flex', gap: 6 }} onClick={e => e.stopPropagation()}>
              <UniButton size="small" icon={<CloseOutlined />} onClick={() => { setOrderEditing(false); setOrderDraft(order); }}>Cancel</UniButton>
              <UniButton size="small" type="primary" icon={<CheckOutlined />} onClick={() => { setOrder(orderDraft); setOrderEditing(false); }}>Save</UniButton>
            </div>
          ) : (
            <UniButton size="small" icon={<EditOutlined />} onClick={e => { e.stopPropagation(); setOrderEditing(true); setOrderDraft(order); }}>Edit</UniButton>
          )
        }
      >
        <div className="info-grid">
          {orderEditing ? (
            <>
              <EditField label="Order ID">
                <UniInput value={orderDraft.orderId} onChange={e => setOrderDraft(p => ({ ...p, orderId: e.target.value }))} />
              </EditField>
              <EditField label="License Type">
                <UniSelect value={orderDraft.licenseType} options={licenseOptions} onChange={(v: string) => setOrderDraft(p => ({ ...p, licenseType: v }))} />
              </EditField>
              <EditField label="License Expiry">
                <UniInput value={orderDraft.licenseExpiry} onChange={e => setOrderDraft(p => ({ ...p, licenseExpiry: e.target.value }))} />
              </EditField>
              <EditField label="Salesforce Link">
                <UniInput value={orderDraft.salesforceLink} onChange={e => setOrderDraft(p => ({ ...p, salesforceLink: e.target.value }))} />
              </EditField>
            </>
          ) : (
            <>
              <ReadOnlyField label="Order ID"        value={order.orderId} />
              <ReadOnlyField label="License Type"    value={order.licenseType} />
              <ReadOnlyField label="License Expiry"  value={order.licenseExpiry} />
              <ReadOnlyField label="Salesforce Link" value={order.salesforceLink} />
            </>
          )}
        </div>
      </AccordionSection>
    </div>
  );
}

// ── Shared components ──────────────────────────────────────────────────────

function AccordionSection({
  title, isOpen, onToggle, children, action,
}: {
  title: string; isOpen: boolean; onToggle: () => void;
  children: React.ReactNode; action?: React.ReactNode;
}) {
  return (
    <div style={{ border: '1px solid #e2e5ea', borderRadius: 8, overflow: 'hidden' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 20px', background: isOpen ? '#fafbfc' : '#ffffff',
          border: 'none', borderBottom: isOpen ? '1px solid #e2e5ea' : 'none',
          cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 14, color: '#1a1d23' }}>{title}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {action}
          <span style={{ color: '#8b919e', fontSize: 13 }}>
            {isOpen ? <DownOutlined /> : <RightOutlined />}
          </span>
        </div>
      </button>
      {isOpen && (
        <div style={{ padding: '20px', background: '#ffffff' }}>{children}</div>
      )}
    </div>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="info-grid-item">
      <span className="info-grid-label">{label}</span>
      <div style={{
        marginTop: 4, padding: '7px 12px',
        background: '#f9fafb', border: '1px solid #e5e7eb',
        borderRadius: 6, fontSize: 13, color: '#6b7280',
        cursor: 'not-allowed',
      }}>
        {value}
      </div>
    </div>
  );
}

function EditField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="info-grid-item">
      <span className="info-grid-label" style={{ marginBottom: 4 }}>{label}</span>
      {children}
    </div>
  );
}
