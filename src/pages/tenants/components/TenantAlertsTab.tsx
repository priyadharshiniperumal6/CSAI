import { useState } from 'react';
import { UniButton } from '@uniphore/ut-design-system';
import { Switch } from 'antd';
import type { Tenant } from '../../../types/tenant';

interface Props { tenant: Tenant; }

const THRESHOLDS = [
  { id: 'warning',  level: 'Warning',  desc: 'Approaching limit',  value: 70, bg: '#fef9c3', color: '#a16207' },
  { id: 'high',     level: 'High',     desc: 'High utilisation',   value: 85, bg: '#fed7aa', color: '#c2410c' },
  { id: 'critical', level: 'Critical', desc: 'Near capacity',      value: 95, bg: '#fecaca', color: '#b91c1c' },
];

const CHANNELS = [
  { id: 'email',     label: 'Email',     defaultOn: true  },
  { id: 'webhook',   label: 'Webhook',   defaultOn: true  },
  { id: 'slack',     label: 'Slack',     defaultOn: false },
  { id: 'pagerduty', label: 'PagerDuty', defaultOn: false },
];

const PLATFORM_SECTIONS = [
  {
    id:    'csai',
    title: 'CS AI',
    desc:  'Conversation Intelligence & Real-Time Guidance alerts',
    color: '#0369a1',
    bg:    '#e0f2fe',
  },
  {
    id:    'agents',
    title: 'Agents',
    desc:  'Self-Serve Agent & Process Discovery alerts',
    color: '#15803d',
    bg:    '#dcfce7',
  },
  {
    id:    'baic',
    title: 'BAIC Platform',
    desc:  'BAIC Platform Access, Data Agent & Fine Tuning alerts',
    color: '#0e7490',
    bg:    '#ecfeff',
  },
];

function AlertSection({ sectionId }: { sectionId: string }) {
  const [thresholds, setThresholds] = useState<Record<string, number>>(
    Object.fromEntries(THRESHOLDS.map(t => [t.id, t.value]))
  );
  const [channels, setChannels] = useState<Record<string, boolean>>(
    Object.fromEntries(CHANNELS.map(c => [c.id, c.defaultOn]))
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

      {/* Thresholds */}
      <div className="section-bordered" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{
          padding: '10px 14px', background: '#f7f8fa',
          borderBottom: '1px solid #e2e5ea',
          fontSize: 11, fontWeight: 600, color: '#8b919e',
          textTransform: 'uppercase', letterSpacing: '0.4px',
        }}>
          Alert Thresholds
        </div>
        {THRESHOLDS.map((t, i) => (
          <div
            key={`${sectionId}-${t.id}`}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 14px',
              borderBottom: i < THRESHOLDS.length - 1 ? '1px solid #eef0f3' : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{
                background: t.bg, color: t.color,
                padding: '2px 8px', borderRadius: 5,
                fontSize: 11, fontWeight: 600, minWidth: 58, textAlign: 'center',
              }}>
                {t.level}
              </span>
              <span style={{ fontSize: 12, color: '#374151' }}>{t.desc}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <input
                type="number"
                value={thresholds[t.id]}
                min={0} max={100}
                onChange={e => setThresholds(prev => ({ ...prev, [t.id]: Number(e.target.value) }))}
                style={{
                  width: 52, border: '1px solid #e2e5ea', borderRadius: 6,
                  padding: '4px 6px', fontSize: 12, color: '#1a1d23',
                  outline: 'none', textAlign: 'right',
                }}
              />
              <span style={{ fontSize: 12, color: '#8b919e' }}>%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Notification channels */}
      <div className="section-bordered" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{
          padding: '10px 14px', background: '#f7f8fa',
          borderBottom: '1px solid #e2e5ea',
          fontSize: 11, fontWeight: 600, color: '#8b919e',
          textTransform: 'uppercase', letterSpacing: '0.4px',
        }}>
          Notification Channels
        </div>
        {CHANNELS.map((ch, i) => (
          <div
            key={`${sectionId}-${ch.id}`}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '11px 14px',
              borderBottom: i < CHANNELS.length - 1 ? '1px solid #eef0f3' : 'none',
            }}
          >
            <span style={{ fontSize: 13, color: '#374151' }}>{ch.label}</span>
            <Switch
              checked={channels[ch.id]}
              onChange={() => setChannels(prev => ({ ...prev, [ch.id]: !prev[ch.id] }))}
              style={channels[ch.id] ? { background: '#15808C' } : {}}
              size="small"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TenantAlertsTab({ tenant: _tenant }: Props) {
  const [open, setOpen] = useState<Record<string, boolean>>({ csai: true });

  return (
    <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {PLATFORM_SECTIONS.map((section) => (
        <div key={section.id} style={{ border: '1px solid #e2e5ea', borderRadius: 8, overflow: 'hidden' }}>
          {/* Section header */}
          <button
            onClick={() => setOpen(prev => ({ ...prev, [section.id]: !prev[section.id] }))}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 20px',
              background: open[section.id] ? '#fafbfc' : '#ffffff',
              border: 'none',
              borderBottom: open[section.id] ? '1px solid #e2e5ea' : 'none',
              cursor: 'pointer', textAlign: 'left',
            }}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 28, height: 28, borderRadius: 6,
              background: section.bg, color: section.color,
              fontSize: 12, fontWeight: 700, flexShrink: 0,
            }}>
              {section.title.slice(0, 2)}
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#1a1d23' }}>{section.title}</div>
              <div style={{ fontSize: 12, color: '#8b919e', marginTop: 1 }}>{section.desc}</div>
            </div>
            <span style={{ color: '#8b919e', fontSize: 13 }}>
              {open[section.id] ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4L6 8L10 4" stroke="#8b919e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                : <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2L8 6L4 10" stroke="#8b919e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </span>
          </button>

          {/* Section content */}
          {open[section.id] && (
            <div style={{ padding: '16px 20px', background: '#ffffff' }}>
              <AlertSection sectionId={section.id} />
            </div>
          )}
        </div>
      ))}

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <UniButton type="primary">Save Changes</UniButton>
      </div>
    </div>
  );
}
