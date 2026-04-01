import { useState } from 'react';
import { UniButton, UniInput } from '@uniphore/ut-design-system';
import { CopyOutlined, ReloadOutlined, EyeOutlined, EyeInvisibleOutlined, DownOutlined, RightOutlined, LinkOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import type { Tenant } from '../../../types/tenant';

interface Props { tenant: Tenant; }

const METHOD_COLORS: Record<string, { bg: string; color: string }> = {
  GET:    { bg: '#dcfce7', color: '#15803d' },
  POST:   { bg: '#dbeafe', color: '#1d4ed8' },
  PUT:    { bg: '#fef3c7', color: '#b45309' },
  DELETE: { bg: '#fee2e2', color: '#dc2626' },
};

const SECTIONS = [
  {
    id: 'csai',
    label: 'CS AI',
    count: '2 Public APIs',
    description: 'APIs for integrating CS AI agents with enterprise systems',
    iconBg: '#E8F5E9', iconColor: '#2E7D32',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="8" width="18" height="12" rx="2"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>
      </svg>
    ),
    apis: [
      {
        id: 'export',
        name: 'Bulk Data Export API',
        subtitle: 'Reporting & Warm Transfer',
        description: 'Use this API to push transactional data of any CS AI Agent into your Enterprise data lake or custom reporting databases.',
        key: 'csai_live_k9mXpQ2rTv8nYwZ3aB5cD6eF',
        status: 'Active',
        method: 'POST',
        endpoint: 'https://api.baic.uniphore.com/v1/agents/bulk-export',
        rateLimit: 500, dailyCap: 50000,
        params: [
          { name: 'agent_id',       type: 'string',   required: true,  desc: 'Unique identifier of the CS AI Agent' },
          { name: 'date_from',      type: 'ISO 8601', required: true,  desc: 'Export range start date' },
          { name: 'date_to',        type: 'ISO 8601', required: true,  desc: 'Export range end date' },
          { name: 'format',         type: 'enum',     required: false, desc: 'Output format: json (default) | csv | parquet' },
          { name: 'session_id',     type: 'string',   required: false, desc: 'Filter to a specific session (warm transfer)' },
          { name: 'destination_url',type: 'string',   required: false, desc: 'Webhook URL for delivery to enterprise system' },
        ],
      },
      {
        id: 'digital',
        name: 'Digital Channel API',
        subtitle: 'One API for Chat, WhatsApp & more',
        description: 'Integrate your CS AI Agent with any digital channel — WhatsApp, SMS, web chat, or Telegram.',
        key: 'csai_live_m4nRsT7uVw2xYz8bC3dE9fG',
        status: 'Active',
        method: 'POST',
        endpoint: 'https://api.baic.uniphore.com/v1/agents/digital-channel',
        rateLimit: 1000, dailyCap: 100000,
        params: [
          { name: 'channel',    type: 'enum',   required: true,  desc: 'Channel type: whatsapp | sms | webchat | telegram' },
          { name: 'agent_id',   type: 'string', required: true,  desc: 'Unique identifier of the CS AI Agent' },
          { name: 'message',    type: 'string', required: true,  desc: 'Message payload' },
          { name: 'session_id', type: 'string', required: false, desc: 'Existing session to resume' },
        ],
      },
    ],
  },
  {
    id: 'data',
    label: 'Data Agents',
    count: '2 APIs',
    description: 'APIs for data ingestion and analytics retrieval',
    iconBg: '#EDE7F6', iconColor: '#4527A0',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    apis: [
      {
        id: 'ingest', name: 'Data Ingestion API', subtitle: 'Batch & Stream',
        description: 'High-throughput data ingestion supporting batch uploads and real-time streaming.',
        key: 'baic_live_p7qWxY3zAb6cD9eF2gH5iJ',
        status: 'Active', method: 'POST',
        endpoint: 'https://api.baic.uniphore.com/v1/data/ingest',
        rateLimit: 200, dailyCap: 20000,
        params: [
          { name: 'source',   type: 'string', required: true,  desc: 'Data source identifier' },
          { name: 'payload',  type: 'object', required: true,  desc: 'Data payload to ingest' },
          { name: 'batch_id', type: 'string', required: false, desc: 'Batch identifier for grouping records' },
        ],
      },
      {
        id: 'query', name: 'Query API', subtitle: 'Analytics & Retrieval',
        description: 'Run analytical queries and retrieve processed data from the platform.',
        key: 'baic_live_r9sKlM4nOp1qR6tU8vW2xY',
        status: 'Inactive', method: 'GET',
        endpoint: 'https://api.baic.uniphore.com/v1/data/query',
        rateLimit: 100, dailyCap: 10000,
        params: [
          { name: 'query',   type: 'string', required: true,  desc: 'SQL-like query string' },
          { name: 'limit',   type: 'number', required: false, desc: 'Max rows to return (default 100)' },
          { name: 'offset',  type: 'number', required: false, desc: 'Pagination offset' },
        ],
      },
    ],
  },
  {
    id: 'baic',
    label: 'BAIC Platform Access',
    count: '1 API',
    description: 'Administrative APIs for tenant and platform management',
    iconBg: '#FFF3E0', iconColor: '#E65100',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    apis: [
      {
        id: 'admin', name: 'Admin API', subtitle: 'Tenant Management',
        description: 'Programmatic access to tenant configuration, provisioning, and lifecycle management.',
        key: 'baic_live_t2uVwX5yZa8bC3dE6fG1hI',
        status: 'Active', method: 'GET',
        endpoint: 'https://api.baic.uniphore.com/v1/admin/tenants',
        rateLimit: 100, dailyCap: 10000,
        params: [
          { name: 'tenant_id', type: 'string', required: true,  desc: 'Target tenant identifier' },
          { name: 'fields',    type: 'array',  required: false, desc: 'Fields to include in response' },
        ],
      },
    ],
  },
];

function ParamTypeBadge({ type }: { type: string }) {
  const colors: Record<string, { bg: string; color: string }> = {
    'string':   { bg: '#dbeafe', color: '#1d4ed8' },
    'ISO 8601': { bg: '#dcfce7', color: '#15803d' },
    'enum':     { bg: '#f3e8ff', color: '#7c3aed' },
    'number':   { bg: '#fef3c7', color: '#b45309' },
    'object':   { bg: '#f0fdf4', color: '#15803d' },
    'array':    { bg: '#fdf4ff', color: '#9333ea' },
  };
  const c = colors[type] ?? { bg: '#f3f4f6', color: '#374151' };
  return (
    <span style={{ background: c.bg, color: c.color, padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600, fontFamily: 'monospace' }}>
      {type}
    </span>
  );
}

function ApiCard({ api, sectionIcon, sectionIconBg, sectionIconColor }: {
  api: typeof SECTIONS[0]['apis'][0];
  sectionIcon: React.ReactNode;
  sectionIconBg: string;
  sectionIconColor: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const isActive = api.status === 'Active';
  const mc = METHOD_COLORS[api.method] ?? METHOD_COLORS.GET;

  const maskedKey = api.key.slice(0, 8) + '•'.repeat(16) + api.key.slice(-4);
  const displayKey = showKey ? api.key : maskedKey;

  const handleCopy = () => {
    navigator.clipboard?.writeText(api.key).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={{ border: '1px solid #e2e5ea', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
      {/* API row header */}
      <button
        onClick={() => setExpanded(p => !p)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 20px', background: '#fff', border: 'none',
          borderBottom: expanded ? '1px solid #e2e5ea' : 'none',
          cursor: 'pointer', textAlign: 'left',
        }}
      >
        <div style={{ width: 30, height: 30, borderRadius: 7, background: sectionIconBg, color: sectionIconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {sectionIcon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1d23' }}>
            {api.name} <span style={{ fontWeight: 400, color: '#8b919e' }}>— {api.subtitle}</span>
          </div>
          {expanded && <div style={{ fontSize: 12, color: '#6b7280', marginTop: 3, lineHeight: 1.4 }}>{api.description}</div>}
        </div>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 4, flexShrink: 0,
          background: isActive ? '#dcfce7' : '#f3f4f6',
          color: isActive ? '#15803d' : '#6b7280',
          padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: isActive ? '#22c55e' : '#9ca3af' }} />
          {api.status}
        </span>
        <span style={{ color: '#9ca3af', fontSize: 12, marginLeft: 4 }}>
          {expanded ? <DownOutlined /> : <RightOutlined />}
        </span>
      </button>

      {/* Expanded body */}
      {expanded && (
        <div style={{ padding: '20px', background: '#fafbfc', display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* API Key row */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#8b919e', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>API Key</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <code style={{
                flex: 1, fontFamily: 'monospace', fontSize: 13, color: '#374151',
                background: '#fff', border: '1px solid #e2e5ea', borderRadius: 6, padding: '7px 12px',
                letterSpacing: showKey ? 'normal' : '0.05em',
              }}>
                {displayKey}
              </code>
              <Tooltip title={showKey ? 'Hide key' : 'Show key'}>
                <button onClick={() => setShowKey(p => !p)} style={{ background: 'none', border: '1px solid #e2e5ea', borderRadius: 6, padding: '6px 9px', cursor: 'pointer', color: '#6b7280', display: 'flex', alignItems: 'center', background: '#fff' }}>
                  {showKey ? <EyeInvisibleOutlined style={{ fontSize: 14 }} /> : <EyeOutlined style={{ fontSize: 14 }} />}
                </button>
              </Tooltip>
              <Tooltip title={copied ? 'Copied!' : 'Copy key'}>
                <button onClick={handleCopy} style={{ background: copied ? '#f0fdf4' : '#fff', border: `1px solid ${copied ? '#bbf7d0' : '#e2e5ea'}`, borderRadius: 6, padding: '6px 9px', cursor: 'pointer', color: copied ? '#15803d' : '#6b7280', display: 'flex', alignItems: 'center' }}>
                  <CopyOutlined style={{ fontSize: 14 }} />
                </button>
              </Tooltip>
              <UniButton size="small" icon={<ReloadOutlined />} style={{ flexShrink: 0 }}>Regenerate</UniButton>
            </div>
          </div>

          {/* Endpoint */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#8b919e', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Endpoint</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #e2e5ea', borderRadius: 6, padding: '8px 12px' }}>
              <span style={{ background: mc.bg, color: mc.color, padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700, fontFamily: 'monospace', flexShrink: 0 }}>
                {api.method}
              </span>
              <code style={{ flex: 1, fontFamily: 'monospace', fontSize: 12, color: '#374151', wordBreak: 'break-all' }}>{api.endpoint}</code>
            </div>
          </div>

          {/* Rate limits */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#8b919e', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Rate Limit (req/min)</div>
              <UniInput type="number" defaultValue={String(api.rateLimit)} style={{ width: '100%' }} />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#8b919e', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Daily Cap</div>
              <UniInput type="number" defaultValue={String(api.dailyCap)} style={{ width: '100%' }} />
            </div>
          </div>

          {/* Params table */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#8b919e', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Request Parameters</div>
            <div style={{ border: '1px solid #e2e5ea', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '160px 100px 70px 1fr', padding: '8px 14px', background: '#f7f8fa', borderBottom: '1px solid #e2e5ea', fontSize: 11, fontWeight: 600, color: '#8b919e', textTransform: 'uppercase', letterSpacing: '0.4px', gap: 12 }}>
                <span>Parameter</span><span>Type</span><span>Required</span><span>Description</span>
              </div>
              {api.params.map((p, pi) => (
                <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '160px 100px 70px 1fr', padding: '9px 14px', borderTop: pi === 0 ? 'none' : '1px solid #eef0f3', alignItems: 'center', gap: 12 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 12, color: '#374151', background: '#f3f4f6', padding: '2px 6px', borderRadius: 4 }}>{p.name}</code>
                  <ParamTypeBadge type={p.type} />
                  <span style={{ fontSize: 12, color: p.required ? '#dc2626' : '#6b7280', fontWeight: p.required ? 600 : 400 }}>{p.required ? 'Yes' : 'No'}</span>
                  <span style={{ fontSize: 12, color: '#6b7280' }}>{p.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer links */}
          <div style={{ display: 'flex', gap: 16, paddingTop: 4, borderTop: '1px solid #eef0f3' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#15808C', fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}>
              <LinkOutlined style={{ fontSize: 12 }} /> View Contract
            </button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#15808C', fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}>
              <LinkOutlined style={{ fontSize: 12 }} /> View Docs
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export function TenantApiTab({ tenant: _tenant }: Props) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ csai: true });

  return (
    <div style={{ paddingTop: 16 }}>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ margin: '0 0 2px', fontSize: 15, fontWeight: 700, color: '#1a1d23' }}>API Keys &amp; Rate Limits</h3>
        <p style={{ margin: 0, fontSize: 13, color: '#8b919e' }}>Manage credentials and usage limits per platform area.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {SECTIONS.map((section) => {
          const isOpen = !!openSections[section.id];
          return (
            <div key={section.id} style={{ border: '1px solid #e2e5ea', borderRadius: 8, overflow: 'hidden' }}>
              {/* Section header */}
              <button
                onClick={() => setOpenSections(prev => ({ ...prev, [section.id]: !prev[section.id] }))}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                  padding: '13px 20px',
                  background: isOpen ? '#f8fafc' : '#fff',
                  border: 'none', borderBottom: isOpen ? '1px solid #e2e5ea' : 'none',
                  cursor: 'pointer', textAlign: 'left',
                }}
              >
                <div style={{ width: 30, height: 30, borderRadius: 7, background: section.iconBg, color: section.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {section.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1d23' }}>{section.label}</div>
                  {isOpen && <div style={{ fontSize: 11, color: '#8b919e', marginTop: 1 }}>{section.description}</div>}
                </div>
                <span style={{ fontSize: 11, color: '#8b919e', background: '#f3f4f6', padding: '2px 8px', borderRadius: 10, marginRight: 8 }}>{section.count}</span>
                <span style={{ color: '#9ca3af', fontSize: 12 }}>{isOpen ? <DownOutlined /> : <RightOutlined />}</span>
              </button>

              {isOpen && (
                <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10, background: '#fafbfc' }}>
                  {section.apis.map(api => (
                    <ApiCard
                      key={api.id}
                      api={api}
                      sectionIcon={section.icon}
                      sectionIconBg={section.iconBg}
                      sectionIconColor={section.iconColor}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
