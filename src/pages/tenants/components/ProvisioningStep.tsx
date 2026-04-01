import { UniTag } from '@uniphore/ut-design-system';
import type { TenantFormData } from '../../../types/tenant';
import { regionOptions } from '../../../data/mock-tenants';

interface Props {
  data: TenantFormData;
}

export function ProvisioningStep({ data }: Props) {
  const regionLabel = regionOptions.find((r) => r.value === data.region)?.label || data.region;

  return (
    <div>
      <p style={{ color: 'var(--ut-color-text-subtle)', marginBottom: 24 }}>
        Review the configuration below before provisioning the tenant.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Section title="Tenant Identity">
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

        <Section title="Deployed Applications">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {data.enabledApps.length > 0 ? (
              data.enabledApps.map((app) => (
                <UniTag key={app} color="blue">{app}</UniTag>
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
    <div
      style={{
        padding: 16,
        border: '1px solid var(--ut-color-border-default, #e5e7eb)',
        borderRadius: 8,
      }}
    >
      <h4 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600 }}>{title}</h4>
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', marginBottom: 8 }}>
      <span style={{ width: 140, color: 'var(--ut-color-text-subtle)', fontSize: 13 }}>
        {label}
      </span>
      <span style={{ fontSize: 13 }}>{value}</span>
    </div>
  );
}
