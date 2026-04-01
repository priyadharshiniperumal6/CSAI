import { useState } from 'react';
import { UniButton, UniInput } from '@uniphore/ut-design-system';
import { CopyOutlined, CaretRightOutlined, LinkOutlined, CodeOutlined, DownOutlined, RightOutlined } from '@ant-design/icons';

interface ApiKey {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  status: 'Active' | 'Inactive';
  key: string;
  keyDisplay: string;
  method: string;
  endpoint: string;
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
  params: { name: string; type: string; required: boolean; desc: string }[];
}

// SVG icon components
const IconDownload = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const IconChat = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const IconAnthropic = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
);
const IconOpenAI = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 8v4l3 3"/>
  </svg>
);

const csaiKeys: ApiKey[] = [
  {
    id: 'bde',
    name: 'Bulk Data Export API',
    subtitle: 'Reporting & Warm Transfer',
    description: 'Use this API to push transactional data of any CS AI Agent into your Enterprise data lake or custom reporting databases. Also supports warm agent transfer into your Enterprise telephony system.',
    status: 'Active',
    key: 'csai_4xK9mL2pQr8nVtW3uZ6y1a2f',
    keyDisplay: 'csai_••••••••••••••••7a2f',
    method: 'POST',
    endpoint: 'https://api.baic.uniphore.com/v1/agents/bulk-export',
    iconBg: '#E8F5E9', iconColor: '#2E7D32',
    icon: <IconDownload color="#2E7D32" />,
    params: [
      { name: 'agent_id',       type: 'string',   required: true,  desc: 'Unique identifier of the CS AI Agent' },
      { name: 'date_from',      type: 'ISO 8601',  required: true,  desc: 'Export range start date' },
      { name: 'date_to',        type: 'ISO 8601',  required: true,  desc: 'Export range end date' },
      { name: 'format',         type: 'enum',      required: false, desc: 'Output format: json (default) | csv | parquet' },
      { name: 'session_id',     type: 'string',   required: false, desc: 'Filter to a specific session (warm transfer)' },
      { name: 'destination_url',type: 'string',   required: false, desc: 'Webhook URL for delivery to enterprise system' },
    ],
  },
  {
    id: 'dca',
    name: 'Digital Channel API',
    subtitle: 'One API for Chat, WhatsApp & more',
    description: 'Integrate your CS AI Agent with any digital channel — WhatsApp, SMS, web chat, or Telegram — enabling seamless omnichannel customer engagement.',
    status: 'Active',
    key: 'csai_7rN1eP4sFm2hBk5wXv9c3b9d',
    keyDisplay: 'csai_••••••••••••••••3b9d',
    method: 'POST',
    endpoint: 'https://api.baic.uniphore.com/v1/channels/send',
    iconBg: '#E3F2FD', iconColor: '#1565C0',
    icon: <IconChat color="#1565C0" />,
    params: [
      { name: 'channel',    type: 'enum',    required: true,  desc: 'Channel type: whatsapp | sms | webchat | telegram' },
      { name: 'session_id', type: 'string',  required: true,  desc: 'Unique session identifier' },
      { name: 'agent_id',   type: 'string',  required: true,  desc: 'CS AI Agent to handle the session' },
      { name: 'message',    type: 'object',  required: true,  desc: 'Message payload — type, content, sender' },
      { name: 'language',   type: 'string',  required: false, desc: 'BCP-47 language code (default: en-US)' },
      { name: 'metadata',   type: 'object',  required: false, desc: 'Additional channel-specific metadata' },
    ],
  },
];

const llmKeys: ApiKey[] = [
  {
    id: 'llm-ant',
    name: 'Anthropic Claude API',
    subtitle: 'claude-3-5-sonnet · claude-3-haiku',
    description: 'Access Anthropic Claude models for advanced reasoning, analysis, and generation tasks across your AI Agents.',
    status: 'Active',
    key: 'llm_ant_K8pW2mNqR4vL9sX1tZ5e6b3c',
    keyDisplay: 'llm_ant_••••••••••••••••6b3c',
    method: 'POST',
    endpoint: 'https://api.anthropic.com/v1/messages',
    iconBg: '#EDE7F6', iconColor: '#4527A0',
    icon: <IconAnthropic color="#4527A0" />,
    params: [
      { name: 'model',      type: 'string',  required: true,  desc: 'Model ID e.g. claude-3-5-sonnet-20241022' },
      { name: 'max_tokens', type: 'integer', required: true,  desc: 'Maximum tokens in response' },
      { name: 'messages',   type: 'array',   required: true,  desc: 'Array of conversation messages' },
    ],
  },
  {
    id: 'llm-oai',
    name: 'OpenAI API',
    subtitle: 'gpt-4o · gpt-4o-mini · o1',
    description: 'Access OpenAI GPT models including GPT-4o for high-quality text generation and reasoning workloads.',
    status: 'Active',
    key: 'llm_oai_F3hY7nBjT1kM8wP2uQ9xG5d7v',
    keyDisplay: 'llm_oai_••••••••••••••••5d7v',
    method: 'POST',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    iconBg: '#E8F5E9', iconColor: '#2E7D32',
    icon: <IconOpenAI color="#2E7D32" />,
    params: [
      { name: 'model',       type: 'string', required: true,  desc: 'Model ID e.g. gpt-4o' },
      { name: 'messages',    type: 'array',  required: true,  desc: 'Array of conversation messages' },
      { name: 'temperature', type: 'number', required: false, desc: 'Sampling temperature (0–2)' },
    ],
  },
];

// ── API Card ───────────────────────────────────────────────────────────────
function ApiCard({ apiKey }: { apiKey: ApiKey }) {
  const [showContract, setShowContract] = useState(false);
  const [copied, setCopied]             = useState(false);
  const [showKey, setShowKey]           = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey.key).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={{ border: '1px solid #eef0f3', borderRadius: 8, overflow: 'hidden', background: '#ffffff', marginBottom: 10 }}>
      {/* Card top */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 16px' }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10, flexShrink: 0,
          background: apiKey.iconBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {apiKey.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#1a1d23', lineHeight: '20px' }}>
            {apiKey.name}
            <span style={{ fontWeight: 400, color: '#8b919e' }}> — {apiKey.subtitle}</span>
          </div>
          <div style={{ fontSize: 12, color: '#8b919e', marginTop: 4, lineHeight: 1.6 }}>{apiKey.description}</div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flexShrink: 0 }}>
          <span className="ds-pill" style={{
            background: apiKey.status === 'Active' ? '#dcfce7' : '#f3f4f6',
            color:      apiKey.status === 'Active' ? '#15803d' : '#6b7280',
          }}>
            <span className="ds-pill-dot" style={{ background: apiKey.status === 'Active' ? '#22c55e' : '#9ca3af' }} />
            {apiKey.status}
          </span>
          <UniButton
            size="small"
            icon={<CodeOutlined />}
            onClick={() => setShowContract(s => !s)}
            title="View API Contract"
          >
            Contract {showContract ? <DownOutlined style={{ fontSize: 10 }} /> : <RightOutlined style={{ fontSize: 10 }} />}
          </UniButton>
        </div>
      </div>

      {/* Key row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 16px', background: '#fafbfc',
        borderTop: '1px solid #eef0f3', flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#8b919e', textTransform: 'uppercase', letterSpacing: '0.5px', flexShrink: 0 }}>
          API Key
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 0 }}>
          <code style={{
            fontFamily: 'monospace', fontSize: 13, color: '#1a1d23',
            background: '#ffffff', border: '1px solid #e2e5ea',
            padding: '3px 10px', borderRadius: 5, letterSpacing: '1px',
          }}>
            {showKey ? apiKey.key : apiKey.keyDisplay}
          </code>
          <UniButton size="small" type="link" onClick={() => setShowKey(s => !s)} style={{ padding: '0 4px' }}>
            {showKey ? 'Hide' : 'Show'}
          </UniButton>
          <UniButton size="small" icon={<CopyOutlined />} onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy'}
          </UniButton>
        </div>
        <div style={{ display: 'flex', gap: 8, marginLeft: 'auto', flexShrink: 0 }}>
          <UniButton size="small" type="primary" icon={<CaretRightOutlined />}>Validate Key</UniButton>
          <UniButton size="small" icon={<LinkOutlined />} style={{ borderColor: '#15808C', color: '#15808C' }}>
            View Docs
          </UniButton>
        </div>
      </div>

      {/* API Contract (collapsible) */}
      {showContract && (
        <div style={{ padding: '14px 16px', background: '#f8fafc', borderTop: '1px solid #eef0f3' }}>
          {/* Endpoint row */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14,
            background: '#ffffff', border: '1px solid #e2e5ea',
            borderRadius: 6, padding: '8px 12px',
          }}>
            <span style={{
              background: '#0369a1', color: '#ffffff',
              fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 4,
              fontFamily: 'monospace', flexShrink: 0,
            }}>
              {apiKey.method}
            </span>
            <code style={{ fontFamily: 'monospace', fontSize: 12, color: '#374151', flex: 1, wordBreak: 'break-all' }}>
              {apiKey.endpoint}
            </code>
          </div>

          {/* Params table */}
          <div style={{ fontSize: 11, fontWeight: 700, color: '#8b919e', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
            Request Parameters
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, border: '1px solid #eef0f3', borderRadius: 6, overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: '#f3f4f6' }}>
                {['Parameter', 'Type', 'Required', 'Description'].map(h => (
                  <th key={h} style={{ padding: '7px 10px', textAlign: 'left', borderBottom: '1px solid #eef0f3', fontWeight: 600, color: '#6b7280', fontSize: 11 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {apiKey.params.map(p => (
                <tr key={p.name} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '7px 10px' }}>
                    <code style={{ background: '#eef0f3', padding: '2px 6px', borderRadius: 4, fontSize: 11, fontFamily: 'monospace' }}>{p.name}</code>
                  </td>
                  <td style={{ padding: '7px 10px' }}>
                    <span style={{ background: '#ede9fe', color: '#4c1d95', padding: '2px 7px', borderRadius: 4, fontSize: 11, fontWeight: 500 }}>{p.type}</span>
                  </td>
                  <td style={{ padding: '7px 10px' }}>
                    <span style={{ color: p.required ? '#dc2626' : '#6b7280', fontWeight: 700, fontSize: 11 }}>{p.required ? 'Yes' : 'No'}</span>
                  </td>
                  <td style={{ padding: '7px 10px', color: '#6b7280', lineHeight: 1.5 }}>{p.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── Collapsible Section ────────────────────────────────────────────────────
function Section({ title, badge, desc, items }: { title: string; badge: string; desc: string; items: ApiKey[] }) {
  const [open, setOpen]     = useState(true);
  const [search, setSearch] = useState('');
  const filtered = items.filter(k => k.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="section-bordered" style={{ marginBottom: 12, padding: 0 }}>
      {/* Section header */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 16px', cursor: 'pointer',
          background: '#fafbfc',
          borderBottom: open ? '1px solid #eef0f3' : 'none',
          borderRadius: open ? '8px 8px 0 0' : 8,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: '#8b919e', fontSize: 14, transition: 'transform 0.2s', display: 'inline-block', transform: open ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▾</span>
          <span style={{ fontWeight: 700, fontSize: 14, color: '#1a1d23' }}>{title}</span>
          <span className="ds-badge" style={{ background: '#e5e7eb', color: '#374151' }}>{badge}</span>
        </div>
        <span style={{ fontSize: 12, color: '#8b919e' }}>{desc}</span>
      </div>

      {open && (
        <div style={{ padding: '14px 16px' }}>
          <div style={{ marginBottom: 12 }}>
            <UniInput
              placeholder={`Search ${title} keys…`}
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              style={{ width: 280 }}
            />
          </div>
          {filtered.length > 0
            ? filtered.map(k => <ApiCard key={k.id} apiKey={k} />)
            : <div style={{ textAlign: 'center', padding: '24px', color: '#8b919e', fontSize: 13 }}>No keys match your search</div>
          }
        </div>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export function TokenKeyMgmtTab() {
  return (
    <div style={{ paddingTop: 16 }}>
      <Section
        title="CS AI"
        badge="2 Public APIs"
        desc="APIs for integrating CS AI agents with enterprise systems"
        items={csaiKeys}
      />
      <Section
        title="LLM Models"
        badge="2 Vendor Keys"
        desc="Vendor API keys for LLM provider integrations"
        items={llmKeys}
      />
    </div>
  );
}
