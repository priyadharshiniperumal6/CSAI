import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UniBreadcrumb, UniButton, UniInput, UniSelect } from '@uniphore/ut-design-system';
import { ArrowLeftOutlined, DownOutlined, RightOutlined } from '@ant-design/icons';
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
  { value: 'enterprise',   label: 'Enterprise' },
  { value: 'professional', label: 'Professional' },
  { value: 'starter',      label: 'Starter' },
  { value: 'trial',        label: 'Trial' },
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

  if (!tenant) return <div style={{ padding: 24 }}>Tenant not found</div>;

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
        <UniBreadcrumb items={[
          { title: 'Administration' },
          { title: <a onClick={() => navigate('/tenants')}>Tenants</a> },
          { title: tenant.name },
        ]} />
      </div>
      <div style={{ padding: '12px 24px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('/tenants')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px', color: '#6b7280', borderRadius: 6, display: 'flex', alignItems: 'center' }}>
          <ArrowLeftOutlined style={{ fontSize: 16 }} />
        </button>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#1a1d23', lineHeight: 1.2 }}>{tenant.name}</h1>
      </div>
      <div style={{ padding: '0 24px 24px' }}>{renderTabContent()}</div>
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

  const [deployment, setDeployment] = useState({
    status:    tenant.deploymentStatus,
    userCount: String(tenant.userCount),
  });

  const [order, setOrder] = useState({
    orderId:        tenant.orderId        || 'ORD-2025-00142',
    licenseType:    tenant.licenseType    || 'enterprise',
    licenseExpiry:  tenant.licenseExpiry  || 'December 31, 2025',
    salesforceLink: tenant.salesforceLink || 'SF-0091234',
  });

  const toggle = (k: string) => setOpenSections(p => ({ ...p, [k]: !p[k] }));
  const statusStyle = STATUS_STYLES[tenant.deploymentStatus] ?? { color: '#6b7280', dot: '#9ca3af' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>

      {/* ── Tenant Identity — always read-only ── */}
      <Section title="Tenant Identity" desc="System-generated identifiers — cannot be modified" isOpen={!!openSections['identity']} onToggle={() => toggle('identity')}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span className="ds-pill" style={{ border: '1px solid #d1d5db', background: '#fff', color: statusStyle.color }}>
            <span className="ds-pill-dot" style={{ background: statusStyle.dot }} />
            {tenant.deploymentStatus}
          </span>
          <span style={{ color: '#8b919e', fontSize: 13 }}>{tenant.slug} · {regionLabel}</span>
        </div>
        <div className="info-grid">
          <Field label="Tenant Name">
            <UniInput value={tenant.name} disabled />
          </Field>
          <Field label="Slug">
            <UniInput value={tenant.slug} disabled />
          </Field>
          <Field label="Region">
            <UniInput value={regionLabel} disabled />
          </Field>
          <Field label="Industry">
            <UniInput value={tenant.industry || '—'} disabled />
          </Field>
          <Field label="Created">
            <UniInput value={new Date(tenant.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} disabled />
          </Field>
          <Field label="Description">
            <UniInput value={tenant.description || 'No description provided'} disabled />
          </Field>
        </div>
      </Section>

      {/* ── Deployment Information — editable ── */}
      <Section title="Deployment Information" desc="Update deployment status and capacity settings" isOpen={!!openSections['deployment']} onToggle={() => toggle('deployment')}>
        <div className="info-grid">
          <Field label="Deployment Status">
            <UniSelect value={deployment.status} options={statusOptions} onChange={(v: string) => setDeployment(p => ({ ...p, status: v }))} />
          </Field>
          <Field label="Total Users">
            <UniInput value={deployment.userCount} onChange={e => setDeployment(p => ({ ...p, userCount: e.target.value }))} />
          </Field>
          <div className="info-grid-item" style={{ gridColumn: '1 / -1' }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: '#6b7280', display: 'block', marginBottom: 8 }}>Deployed Applications</span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {tenant.deployedApps.map(app => {
                const c = appColors[app] ?? { bg: '#f3f4f6', color: '#374151' };
                return <span key={app} className="ds-badge" style={{ background: c.bg, color: c.color }}>{app}</span>;
              })}
            </div>
          </div>
        </div>
        <SaveRow onSave={() => {}} />
      </Section>

      {/* ── Order & Licensing — editable ── */}
      <Section title="Order & Licensing" desc="Manage order details, license type and expiry" isOpen={!!openSections['order']} onToggle={() => toggle('order')}>
        <div className="info-grid">
          <Field label="Order ID">
            <UniInput value={order.orderId} onChange={e => setOrder(p => ({ ...p, orderId: e.target.value }))} />
          </Field>
          <Field label="License Type">
            <UniSelect value={order.licenseType} options={licenseOptions} onChange={(v: string) => setOrder(p => ({ ...p, licenseType: v }))} />
          </Field>
          <Field label="License Expiry">
            <UniInput value={order.licenseExpiry} onChange={e => setOrder(p => ({ ...p, licenseExpiry: e.target.value }))} />
          </Field>
          <Field label="Salesforce Link">
            <UniInput value={order.salesforceLink} onChange={e => setOrder(p => ({ ...p, salesforceLink: e.target.value }))} />
          </Field>
        </div>
        <SaveRow onSave={() => {}} />
      </Section>
    </div>
  );
}

// ── Reusable components ────────────────────────────────────────────────────

function Section({ title, desc, isOpen, onToggle, children }: {
  title: string; desc: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div style={{ border: '1px solid #e2e5ea', borderRadius: 8, overflow: 'hidden' }}>
      <button onClick={onToggle} style={{
        width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        padding: '16px 20px', background: isOpen ? '#fafbfc' : '#ffffff',
        border: 'none', borderBottom: isOpen ? '1px solid #e2e5ea' : 'none',
        cursor: 'pointer', textAlign: 'left', gap: 12,
      }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14, color: '#1a1d23', marginBottom: 2 }}>{title}</div>
          <div style={{ fontSize: 12, color: '#8b919e' }}>{desc}</div>
        </div>
        <span style={{ color: '#8b919e', fontSize: 13, flexShrink: 0, marginTop: 2 }}>
          {isOpen ? <DownOutlined /> : <RightOutlined />}
        </span>
      </button>
      {isOpen && <div style={{ padding: '20px', background: '#ffffff' }}>{children}</div>}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="info-grid-item">
      <span style={{ fontSize: 12, fontWeight: 500, color: '#6b7280', display: 'block', marginBottom: 6 }}>{label}</span>
      {children}
    </div>
  );
}

function SaveRow({ onSave }: { onSave: () => void }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20, paddingTop: 16, borderTop: '1px solid #eef0f3' }}>
      <UniButton type="primary" onClick={onSave}>Save Changes</UniButton>
    </div>
  );
}
