import { useState } from 'react';
import { UniButton, UniInput } from '@uniphore/ut-design-system';
import { CopyOutlined, ReloadOutlined, DownOutlined, RightOutlined } from '@ant-design/icons';
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
    apis: [
      { id: 'export',  name: 'Export API',         subtitle: 'Reporting & Data Lake', key: 'baic_exp_••••••••••••4f2a', status: 'Active',   rateLimit: 500,  dailyCap: 50000  },
      { id: 'digital', name: 'Digital Channel API', subtitle: 'Chat & Messaging',      key: 'baic_dig_••••••••••••7c1b', status: 'Active',   rateLimit: 1000, dailyCap: 100000 },
    ],
  },
  {
    id: 'data',
    label: 'Data Agents',
    iconBg: '#EDE7F6',
    iconColor: '#4527A0',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    apis: [
      { id: 'ingest', name: 'Data Ingestion API', subtitle: 'Batch & Stream',        key: 'baic_ing_••••••••••••2e9f', status: 'Active',   rateLimit: 200, dailyCap: 20000 },
      { id: 'query',  name: 'Query API',           subtitle: 'Analytics & Retrieval', key: 'baic_qry_••••••••••••5b3c', status: 'Inactive', rateLimit: 100, dailyCap: 10000 },
    ],
  },
  {
    id: 'baic',
    label: 'BAIC Platform Access',
    iconBg: '#FFF3E0',
    iconColor: '#E65100',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    apis: [
      { id: 'admin', name: 'Admin API', subtitle: 'Tenant Management', key: 'baic_adm_••••••••••••9a3d', status: 'Active', rateLimit: 100, dailyCap: 10000 },
    ],
  },
];

export function TenantApiTab({ tenant: _tenant }: Props) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ csai: true });
  const [openApi, setOpenApi] = useState<string>('');

  const toggleSection = (id: string) =>
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleApi = (id: string) =>
    setOpenApi(prev => prev === id ? '' : id);

  return (
    <div style={{ paddingTop: 16 }}>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ margin: '0 0 2px', fontSize: 15, fontWeight: 700, color: '#1a1d23' }}>API Keys &amp; Rate Limits</h3>
        <p style={{ margin: 0, fontSize: 13, color: '#8b919e' }}>Manage credentials and usage limits per platform area.</p>
      </div>

      {/* One card per section, 20px gap */}
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
                <span style={{ fontSize: 11, color: '#8b919e', marginRight: 8 }}>
                  {section.apis.length} {section.apis.length === 1 ? 'API' : 'APIs'}
                </span>
                <span style={{ color: '#8b919e', fontSize: 12 }}>
                  {isOpen ? <DownOutlined /> : <RightOutlined />}
                </span>
              </button>

              {/* APIs list */}
              {isOpen && (
                <div>
                  {section.apis.map((api, ai) => {
                    const isApiOpen = openApi === api.id;
                    const isActive  = api.status === 'Active';
                    return (
                      <div key={api.id} style={{ borderTop: ai === 0 ? 'none' : '1px solid #eef0f3' }}>
                        {/* API row */}
                        <button
                          onClick={() => toggleApi(api.id)}
                          style={{
                            width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                            padding: '12px 20px 12px 40px',
                            background: '#ffffff', border: 'none',
                            borderBottom: isApiOpen ? '1px solid #eef0f3' : 'none',
                            cursor: 'pointer', textAlign: 'left',
                          }}
                        >
                          <div style={{
                            width: 28, height: 28, borderRadius: 6,
                            background: section.iconBg, color: section.iconColor,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          }}>
                            {section.icon}
                          </div>
                          <div style={{ flex: 1 }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1d23' }}>{api.name}</span>
                            <span style={{ fontSize: 13, color: '#8b919e' }}> — {api.subtitle}</span>
                          </div>
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: 4, flexShrink: 0,
                            background: isActive ? '#dcfce7' : '#f3f4f6',
                            color: isActive ? '#15803d' : '#6b7280',
                            padding: '2px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500,
                          }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: isActive ? '#22c55e' : '#9ca3af' }} />
                            {api.status}
                          </span>
                          <span style={{ color: '#8b919e', fontSize: 12, marginLeft: 8 }}>
                            {isApiOpen ? <DownOutlined /> : <RightOutlined />}
                          </span>
                        </button>

                        {/* Expanded body */}
                        {isApiOpen && (
                          <div style={{ padding: '16px 20px 20px 40px', background: '#fafbfc', borderBottom: '1px solid #eef0f3' }}>
                            {/* API Key */}
                            <div style={{ marginBottom: 16 }}>
                              <div style={{ fontSize: 11, fontWeight: 600, color: '#8b919e', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 6 }}>API Key</div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <code style={{
                                  flex: 1, fontFamily: 'monospace', fontSize: 13, color: '#374151',
                                  background: '#ffffff', border: '1px solid #e2e5ea', borderRadius: 6,
                                  padding: '6px 12px',
                                }}>
                                  {api.key}
                                </code>
                                <UniButton size="small" icon={<CopyOutlined />}>Copy</UniButton>
                                <UniButton size="small" icon={<ReloadOutlined />}>Regenerate Key</UniButton>
                              </div>
                            </div>
                            {/* Rate limit inputs */}
                            <div style={{ display: 'flex', gap: 16 }}>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 11, fontWeight: 600, color: '#8b919e', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 6 }}>Rate Limit (req/min)</div>
                                <UniInput type="number" defaultValue={String(api.rateLimit)} style={{ width: '100%' }} />
                              </div>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 11, fontWeight: 600, color: '#8b919e', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 6 }}>Daily Cap</div>
                                <UniInput type="number" defaultValue={String(api.dailyCap)} style={{ width: '100%' }} />
                              </div>
                              <div style={{ flex: 2 }} />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Save footer */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
        <UniButton type="primary">Save Changes</UniButton>
      </div>
    </div>
  );
}
