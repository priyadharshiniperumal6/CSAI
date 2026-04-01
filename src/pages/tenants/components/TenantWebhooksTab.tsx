import { UniButton, UniInput } from '@uniphore/ut-design-system';
import { ReloadOutlined, ThunderboltOutlined } from '@ant-design/icons';
import type { Tenant } from '../../../types/tenant';

interface Props { tenant: Tenant; }

const WEBHOOK_FIELDS = [
  {
    id: 'conversation',
    label: 'Conversation Events Webhook',
    placeholder: 'https://your-domain.com/webhooks/conversation',
    hint: 'Receives: session.start, session.end, transcript.ready, summary.ready',
    defaultValue: '',
  },
  {
    id: 'alerts',
    label: 'Alert & Threshold Webhook',
    placeholder: 'https://your-domain.com/webhooks/alerts',
    hint: 'Receives: concurrency.warning, concurrency.critical, usage.threshold',
    defaultValue: '',
  },
  {
    id: 'transfer',
    label: 'Warm Transfer Callback URL',
    placeholder: 'https://your-domain.com/callbacks/transfer',
    hint: 'Called when an AI Agent initiates a warm transfer to a live agent',
    defaultValue: '',
  },
];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>{children}</div>
  );
}

function FieldHint({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 11, color: '#8b919e', marginTop: 5 }}>{children}</div>
  );
}

export function TenantWebhooksTab({ tenant: _tenant }: Props) {
  return (
    <div style={{ paddingTop: 16 }}>
      {/* Page heading */}
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ margin: '0 0 2px', fontSize: 15, fontWeight: 700, color: '#1a1d23' }}>Webhooks &amp; Callbacks</h3>
        <p style={{ margin: 0, fontSize: 13, color: '#8b919e' }}>Configure endpoint URLs for platform event notifications and callbacks.</p>
      </div>

      <div className="section-bordered" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* URL fields */}
        {WEBHOOK_FIELDS.map((field) => (
          <div key={field.id}>
            <FieldLabel>{field.label}</FieldLabel>
            <div style={{ display: 'flex', gap: 8 }}>
              <UniInput
                placeholder={field.placeholder}
                defaultValue={field.defaultValue}
                style={{ flex: 1 }}
              />
              <UniButton icon={<ThunderboltOutlined />} style={{ whiteSpace: 'nowrap' }}>
                Test Connection
              </UniButton>
            </div>
            <FieldHint>{field.hint}</FieldHint>
          </div>
        ))}

        {/* Divider */}
        <div style={{ borderTop: '1px solid #eef0f3', paddingTop: 20 }}>
          <FieldLabel>Webhook Signing Secret</FieldLabel>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <code style={{
              flex: 1, fontFamily: 'monospace', fontSize: 12, color: '#374151',
              background: '#f9fafb', border: '1px solid #e2e5ea', borderRadius: 6,
              padding: '6px 12px', lineHeight: '20px',
            }}>
              whsec_••••••••••••••••••••••••
            </code>
            <UniButton icon={<ReloadOutlined />} style={{ whiteSpace: 'nowrap' }}>Regenerate</UniButton>
          </div>
          <FieldHint>Used to sign outgoing webhook payloads (HMAC-SHA256). Rotate regularly for security.</FieldHint>
        </div>
      </div>

      {/* Retry Policy */}
      <div className="section-bordered" style={{ marginTop: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1d23', marginBottom: 12 }}>Retry Policy</div>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <FieldLabel>Max Retries</FieldLabel>
            <UniInput type="number" defaultValue="3" style={{ width: '100%' }} />
            <FieldHint>Number of retry attempts on delivery failure</FieldHint>
          </div>
          <div style={{ flex: 1 }}>
            <FieldLabel>Retry Backoff (seconds)</FieldLabel>
            <UniInput type="number" defaultValue="30" style={{ width: '100%' }} />
            <FieldHint>Exponential backoff starting interval</FieldHint>
          </div>
          <div style={{ flex: 1 }}>
            <FieldLabel>Timeout (seconds)</FieldLabel>
            <UniInput type="number" defaultValue="10" style={{ width: '100%' }} />
            <FieldHint>Max wait for endpoint response</FieldHint>
          </div>
        </div>
      </div>

      {/* Save */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
        <UniButton type="primary">Save Changes</UniButton>
      </div>
    </div>
  );
}
