import { useState } from 'react';
import { UniButton, UniInput } from '@uniphore/ut-design-system';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import type { Tenant } from '../../../types/tenant';

interface Props { tenant: Tenant; }

const SECTIONS = [
  {
    id: 'csai',
    label: 'CS AI',
    iconBg: '#E8F5E9',
    iconColor: '#2E7D32',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="8" width="18" height="12" rx="2"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>
      </svg>
    ),
    agents: [
      { id: 'ssa',  name: 'Self Serve Agent (SSA)',                desc: 'AI-powered self-service conversations', sessions: 50   },
      { id: 'rtga', name: 'Real-Time Guidance Agent (RTGA)',       desc: 'Live next-best-action coaching',        sessions: 1000 },
      { id: 'cia',  name: 'Conversation Intelligence Agent (CIA)', desc: 'Post-call analytics and QA',            sessions: 500  },
    ],
  },
  {
    id: 'data',
    label: 'Data Agents',
    iconBg: '#EDE7F6',
    iconColor: '#4527A0',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    agents: [
      { id: 'kb',        name: 'Knowledge Base Agent', desc: 'Document ingestion and retrieval',  sessions: 200 },
      { id: 'analytics', name: 'Analytics Agent',      desc: 'Reporting and data lake queries',   sessions: 100 },
    ],
  },
  {
    id: 'baic',
    label: 'BAIC Platform',
    iconBg: '#FFF3E0',
    iconColor: '#E65100',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    agents: [
      { id: 'admin-api', name: 'Admin API Sessions', desc: 'Management plane concurrent calls', sessions: 50 },
    ],
  },
];

type OverflowMode = 'hard' | 'queue';

export function TenantLimitsTab({ tenant: _tenant }: Props) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ csai: true });
  const [overflow, setOverflow]         = useState<OverflowMode>('hard');

  const toggleSection = (id: string) =>
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div style={{ paddingTop: 16 }}>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ margin: '0 0 2px', fontSize: 15, fontWeight: 700, color: '#1a1d23' }}>Session Limits</h3>
        <p style={{ margin: 0, fontSize: 13, color: '#8b919e' }}>Configure maximum concurrent sessions per platform area and define overflow behaviour.</p>
      </div>

      {/* Separate card per section, 20px gap */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {SECTIONS.map((section) => {
          const isOpen = !!openSections[section.id];
          return (
            <div
              key={section.id}
              style={{ border: '1px solid #e2e5ea', borderRadius: 8, overflow: 'hidden' }}
            >
              {/* Section header */}
              <button
                onClick={() => toggleSection(section.id)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                  padding: '13px 20px',
                  background: isOpen ? '#f8fafc' : '#ffffff',
                  border: 'none',
                  borderBottom: isOpen ? '1px solid #e2e5ea' : 'none',
                  cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s',
                }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: section.iconBg, color: section.iconColor,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {section.icon}
                </div>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: '#1a1d23' }}>{section.label}</span>
                <span style={{ color: '#8b919e', fontSize: 12 }}>{isOpen ? <DownOutlined /> : <RightOutlined />}</span>
              </button>

              {/* Expanded body */}
              {isOpen && (
                <div style={{ padding: '20px' }}>
                  {/* Agent table header */}
                  <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 180px',
                    padding: '8px 12px',
                    background: '#f7f8fa',
                    borderRadius: '6px 6px 0 0',
                    border: '1px solid #e2e5ea',
                    borderBottom: 'none',
                  }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#8b919e', textTransform: 'uppercase', letterSpacing: '0.4px' }}>AI Agent Type</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#8b919e', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Max Concurrent Sessions</span>
                  </div>

                  {/* Agent rows */}
                  {section.agents.map((agent, ai) => (
                    <div
                      key={agent.id}
                      style={{
                        display: 'grid', gridTemplateColumns: '1fr 180px',
                        alignItems: 'center', padding: '13px 12px',
                        border: '1px solid #e2e5ea',
                        borderTop: ai === 0 ? '1px solid #e2e5ea' : 'none',
                        borderRadius: ai === section.agents.length - 1 ? '0 0 6px 6px' : 0,
                        background: '#ffffff',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1d23' }}>{agent.name}</div>
                        <div style={{ fontSize: 11, color: '#8b919e', marginTop: 2 }}>{agent.desc}</div>
                      </div>
                      <UniInput type="number" defaultValue={String(agent.sessions)} style={{ width: 120 }} />
                    </div>
                  ))}

                  {/* Overflow behaviour */}
                  <div style={{ marginTop: 20 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1d23', marginBottom: 10 }}>Overflow Behaviour</div>
                    <div style={{ display: 'flex', gap: 12 }}>
                      {([
                        { id: 'hard'  as OverflowMode, title: 'Hard Cap',     desc: 'Reject new sessions immediately when limit is reached.' },
                        { id: 'queue' as OverflowMode, title: 'Queue & Wait', desc: 'Hold sessions in queue; process when a slot opens. Max wait: 30s.' },
                      ]).map((opt) => (
                        <div
                          key={opt.id}
                          onClick={() => setOverflow(opt.id)}
                          style={{
                            flex: 1, padding: '12px 14px', borderRadius: 8, cursor: 'pointer',
                            border: `1px solid ${overflow === opt.id ? '#15808C' : '#e2e5ea'}`,
                            background: overflow === opt.id ? '#f0fdfa' : '#ffffff',
                            boxShadow: overflow === opt.id ? '0 0 0 1px #15808C' : 'none',
                            transition: 'all 0.15s',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                            <div style={{
                              width: 14, height: 14, borderRadius: '50%', flexShrink: 0,
                              border: `2px solid ${overflow === opt.id ? '#15808C' : '#d1d5db'}`,
                              background: overflow === opt.id ? '#15808C' : 'transparent',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                              {overflow === opt.id && <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#ffffff' }} />}
                            </div>
                            <span style={{ fontSize: 13, fontWeight: 600, color: overflow === opt.id ? '#15808C' : '#1a1d23' }}>{opt.title}</span>
                          </div>
                          <div style={{ fontSize: 12, color: '#6b7280', paddingLeft: 22 }}>{opt.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Save */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
        <UniButton type="primary">Save Changes</UniButton>
      </div>
    </div>
  );
}
