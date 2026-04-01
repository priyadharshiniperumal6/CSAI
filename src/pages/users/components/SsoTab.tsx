import { useState } from 'react';
import { UniButton, UniSwitch } from '@uniphore/ut-design-system';

// ── Inline Section accordion component ────────────────────────────────────
function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ border: '1px solid #e2e5ea', borderRadius: 8, overflow: 'hidden', background: '#ffffff' }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 20px', background: '#f7f8fa', border: 'none',
          cursor: 'pointer', borderBottom: open ? '1px solid #e2e5ea' : 'none',
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 700, color: '#1a1d23' }}>{title}</span>
        <span style={{
          fontSize: 12, color: '#8b919e',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
          display: 'inline-block',
        }}>▼</span>
      </button>
      {open && (
        <div style={{ padding: '20px' }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ── SSO Provider Card ──────────────────────────────────────────────────────
interface ProviderCardProps {
  icon: string;
  name: string;
  status: 'connected' | 'not-configured';
}

function ProviderCard({ icon, name, status }: ProviderCardProps) {
  const isConnected = status === 'connected';
  return (
    <div style={{
      border: `1.5px solid ${isConnected ? '#a7f3d0' : '#e2e5ea'}`,
      borderRadius: 10,
      padding: '20px',
      background: isConnected ? '#f0fdfa' : '#ffffff',
      display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center',
      textAlign: 'center',
    }}>
      {/* Icon */}
      <div style={{
        width: 52, height: 52, borderRadius: 12,
        background: isConnected ? '#d1fae5' : '#f3f4f6',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 26,
      }}>
        {icon}
      </div>

      {/* Name */}
      <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1d23' }}>{name}</div>

      {/* Status badge */}
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '3px 10px', borderRadius: 20,
        fontSize: 12, fontWeight: 600,
        background: isConnected ? '#dcfce7' : '#f3f4f6',
        color: isConnected ? '#15803d' : '#6b7280',
      }}>
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: isConnected ? '#22c55e' : '#9ca3af',
          display: 'inline-block',
        }} />
        {isConnected ? 'Connected' : 'Not Configured'}
      </span>

      {/* Action button */}
      <UniButton
        size="small"
        type={isConnected ? 'default' : 'primary'}
        style={{ width: '100%', borderRadius: 6 }}
      >
        {isConnected ? 'Manage' : 'Configure'}
      </UniButton>
    </div>
  );
}

// ── SSO Settings row ───────────────────────────────────────────────────────
function SettingRow({ label, description, defaultChecked = false }: { label: string; description?: string; defaultChecked?: boolean }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 0', borderBottom: '1px solid #f0f1f3',
    }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1d23' }}>{label}</div>
        {description && <div style={{ fontSize: 12, color: '#8b919e', marginTop: 2 }}>{description}</div>}
      </div>
      <UniSwitch defaultChecked={defaultChecked} />
    </div>
  );
}

// ── Main SsoTab ────────────────────────────────────────────────────────────
export function SsoTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 16 }}>
      {/* Page header */}
      <div>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1a1d23', margin: 0, marginBottom: 4 }}>
          Single Sign-On (SSO) Configuration
        </h2>
        <p style={{ fontSize: 13, color: '#8b919e', margin: 0 }}>
          Connect and manage identity providers for SSO authentication.
        </p>
      </div>

      {/* SSO Providers */}
      <Section title="SSO Providers">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <ProviderCard icon="🔷" name="Okta"            status="connected"       />
          <ProviderCard icon="☁️"  name="Azure AD"        status="not-configured"  />
          <ProviderCard icon="🔵" name="Google Workspace" status="not-configured"  />
        </div>
      </Section>

      {/* SSO Settings */}
      <Section title="SSO Settings">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <SettingRow
            label="Enforce SSO for all users"
            description="Require all users to authenticate via SSO. Password login will be disabled."
            defaultChecked={false}
          />
          <SettingRow
            label="Allow fallback to password login"
            description="Users can use their password if SSO is unavailable."
            defaultChecked={true}
          />
          <div style={{ padding: '14px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1d23' }}>Auto-provision users on first login</div>
                <div style={{ fontSize: 12, color: '#8b919e', marginTop: 2 }}>
                  Automatically create a user account when a new SSO user logs in for the first time.
                </div>
              </div>
              <UniSwitch defaultChecked={false} />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
