import { useState } from 'react';
import { UniButton } from '@uniphore/ut-design-system';
import { Switch } from 'antd';
import type { Tenant } from '../../../types/tenant';

interface Props { tenant: Tenant; }

const THRESHOLDS = [
  {
    id:    'warning',
    level: 'Warning',
    desc:  'Approaching limit — monitor and prepare scale-up',
    value: 70,
    bg:    '#fef9c3',
    color: '#a16207',
  },
  {
    id:    'high',
    level: 'High',
    desc:  'High utilisation — consider increasing session limits',
    value: 85,
    bg:    '#fed7aa',
    color: '#c2410c',
  },
  {
    id:       'critical',
    level:    'Critical',
    desc:     'Near capacity — immediate action required',
    value:    95,
    bg:       '#fecaca',
    color:    '#b91c1c',
  },
];

const CHANNELS = [
  { id: 'email',    label: 'Email notification to tenant admin(s)',          defaultOn: true  },
  { id: 'webhook',  label: 'Alert webhook (configured in Webhooks tab)',      defaultOn: true  },
  { id: 'slack',    label: 'Slack integration',                               defaultOn: false },
  { id: 'pagerduty', label: 'PagerDuty integration',                         defaultOn: false },
];

export function TenantAlertsTab({ tenant: _tenant }: Props) {
  const [thresholds, setThresholds] = useState<Record<string, number>>(
    Object.fromEntries(THRESHOLDS.map(t => [t.id, t.value]))
  );
  const [channels, setChannels] = useState<Record<string, boolean>>(
    Object.fromEntries(CHANNELS.map(c => [c.id, c.defaultOn]))
  );

  const setThreshold = (id: string, val: number) =>
    setThresholds(prev => ({ ...prev, [id]: val }));

  const toggleChannel = (id: string) =>
    setChannels(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div style={{ paddingTop: 16 }}>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ margin: '0 0 2px', fontSize: 15, fontWeight: 700, color: '#1a1d23' }}>Alerts</h3>
        <p style={{ margin: 0, fontSize: 13, color: '#8b919e' }}>Define when alerts fire based on session limit utilisation percentage.</p>
      </div>

      {/* Threshold table */}
      <div className="section-bordered" style={{ padding: 0, marginBottom: 16, overflow: 'hidden' }}>
        {/* Table header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '90px 1fr 120px',
          gap: 12, padding: '10px 16px',
          background: '#f7f8fa',
          borderBottom: '1px solid #e2e5ea',
          fontSize: 11, fontWeight: 600, color: '#8b919e',
          textTransform: 'uppercase', letterSpacing: '0.4px',
        }}>
          <span>Level</span>
          <span>Description</span>
          <span>Threshold</span>
        </div>

        {THRESHOLDS.map((t, i) => (
          <div
            key={t.id}
            style={{
              display: 'grid', gridTemplateColumns: '90px 1fr 120px',
              gap: 12, alignItems: 'center',
              padding: '14px 16px',
              borderBottom: i < THRESHOLDS.length - 1 ? '1px solid #eef0f3' : 'none',
              background: '#ffffff',
            }}
          >
            <span style={{
              display: 'inline-block',
              background: t.bg, color: t.color,
              padding: '3px 10px', borderRadius: 6,
              fontSize: 12, fontWeight: 600,
              textAlign: 'center',
            }}>
              {t.level}
            </span>
            <span style={{ fontSize: 13, color: '#374151' }}>{t.desc}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input
                type="number"
                value={thresholds[t.id]}
                min={0} max={100}
                onChange={e => setThreshold(t.id, Number(e.target.value))}
                style={{
                  width: 60, border: '1px solid #e2e5ea', borderRadius: 6,
                  padding: '5px 8px', fontSize: 13, color: '#1a1d23',
                  outline: 'none', textAlign: 'right',
                }}
              />
              <span style={{ fontSize: 13, color: '#8b919e' }}>%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Notification channels */}
      <div className="section-bordered">
        <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1d23', marginBottom: 14 }}>Notification Channels</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {CHANNELS.map((ch) => (
            <div
              key={ch.id}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <span style={{ fontSize: 13, color: '#374151' }}>{ch.label}</span>
              <Switch
                checked={channels[ch.id]}
                onChange={() => toggleChannel(ch.id)}
                style={channels[ch.id] ? { background: '#15808C' } : {}}
                size="small"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Save */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
        <UniButton type="primary">Save Changes</UniButton>
      </div>
    </div>
  );
}
