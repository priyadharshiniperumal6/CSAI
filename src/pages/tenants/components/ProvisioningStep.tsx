import { UniTag } from '@uniphore/ut-design-system';
import type { TenantFormData } from '../../../types/tenant';
import { regionOptions } from '../../../data/mock-tenants';

interface Props {
  data: TenantFormData;
}

const APP_LABELS: Record<string, string> = {
  SSA:              'Self Serve Agent (SSA)',
  RTGA:             'Real Time Guidance Agent (RTGA)',
  CIA:              'Conversation Intelligence Agent (CIA)',
  ProcessDiscovery: 'Process Discovery',
  DataAgent:        'Data Agent',
  FineTuning:       'Fine Tuning',
  BAICPlatform:     'BAIC Platform Access',
};

export function ProvisioningStep({ data }: Props) {
  const regionLabel = regionOptions.find((r) => r.value === data.region)?.label || data.region;

  return (
    <div>
      <p style={{ color: 'var(--ut-color-text-subtle)', marginBottom: 24 }}>
        Review the configuration below before provisioning the tenant.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Section title="Tenant Details">
          <InfoRow label="Name" value={data.name} />
          <InfoRow label="Slug" value={data.slug} />
          <InfoRow label="Region" value={regionLabel} />
          <InfoRow label="Description" value={data.description || '—'} />
        </Section>

        <Section title="Order Details">
          <InfoRow label="Order ID" value={data.orderId || '—'} />
          <InfoRow label="License Type" value={data.licenseType || '—'} />
          <InfoRow label="Salesforce Link" value={data.salesforceLink || '—'} />
        </Section>

        <Section title="Applications">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {data.enabledApps.length > 0 ? (
              data.enabledApps.map((app) => (
                <UniTag key={app} color="blue">{APP_LABELS[app] ?? app}</UniTag>
              ))
            ) : (
              <span style={{ color: 'var(--ut-color-text-subtle)' }}>No applications selected</span>
            )}
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 16, border: '1px solid #e2e5ea', borderRadius: 8 }}>
      <h4 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: '#1a1d23' }}>{title}</h4>
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', marginBottom: 8 }}>
      <span style={{ width: 140, color: '#8b919e', fontSize: 13 }}>{label}</span>
      <span style={{ fontSize: 13, color: '#1a1d23' }}>{value}</span>
    </div>
  );
}
