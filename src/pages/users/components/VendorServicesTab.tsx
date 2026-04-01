import { useState } from 'react';
import { UniTable, UniButton } from '@uniphore/ut-design-system';
import type { ColDef } from '@ag-grid-community/core';
import { DownloadOutlined, DownOutlined, RightOutlined } from '@ant-design/icons';

type Range = '7d' | '30d' | '90d';

interface LlmRow { period: string; input: string; output: string; total: string; vendor: string; agent: string; cost: string; }
interface VendorData {
  badge: string;
  stats: { label: string; value: string; color?: string; sub: string }[];
  agentBars: { name: string; value: number; color: string }[];
  table?: LlmRow[];
}
interface RangeData {
  asr: { badge: string; total: string; primary: string; cost: string };
  tts: { badge: string; total: string; primary: string; cost: string };
  llm: VendorData;
}

const rangeData: Record<Range, RangeData> = {
  '7d': {
    asr: { badge: '560K turns',   total: '560K',  primary: '560K',  cost: '$840'    },
    tts: { badge: '4.3M chars',   total: '4.3M',  primary: '4.3M',  cost: '$645'    },
    llm: {
      badge: '980M tokens',
      stats: [
        { label: 'Total Tokens', value: '980M',  sub: 'This period' },
        { label: 'Anthropic',    value: '415M',  color: '#7c3aed', sub: 'claude-3-5-sonnet' },
        { label: 'OpenAI',       value: '280M',  color: '#15803d', sub: 'gpt-4o' },
        { label: 'Gemini',       value: '181M',  color: '#b45309', sub: 'gemini-1.5-pro' },
        { label: 'SLMs',         value: '98M',   color: '#0e7490', sub: 'u-intent-v2' },
      ],
      agentBars: [
        { name: 'Customer Support', value: 42, color: '#15808C' },
        { name: 'Sales Qualifier',  value: 28, color: '#2563eb' },
        { name: 'HR Onboarding',    value: 15, color: '#7c3aed' },
        { name: 'IT Helpdesk',      value: 10, color: '#ea580c' },
        { name: 'Collections',      value:  5, color: '#db2777' },
      ],
      table: [
        { period: 'Mon Mar 24', input: '145M', output: '95M',  total: '240M', vendor: 'Anthropic', agent: 'Customer Support', cost: '$288' },
        { period: 'Tue Mar 25', input: '162M', output: '108M', total: '270M', vendor: 'OpenAI',    agent: 'Research Asst.',   cost: '$324' },
        { period: 'Wed Mar 26', input: '150M', output: '98M',  total: '248M', vendor: 'Anthropic', agent: 'Customer Support', cost: '$298' },
        { period: 'Thu Mar 27', input: '142M', output: '92M',  total: '234M', vendor: 'Gemini',    agent: 'Analytics Bot',    cost: '$234' },
        { period: 'Fri Mar 28', input: '175M', output: '115M', total: '290M', vendor: 'Anthropic', agent: 'Customer Support', cost: '$348' },
        { period: 'Sat Mar 29', input: '158M', output: '105M', total: '263M', vendor: 'OpenAI',    agent: 'Research Asst.',   cost: '$316' },
        { period: 'Sun Mar 30', input: '198M', output: '130M', total: '328M', vendor: 'Anthropic', agent: 'Customer Support', cost: '$394' },
      ],
    },
  },
  '30d': {
    asr: { badge: '2.4M turns',  total: '2.4M',  primary: '2.4M',  cost: '$3,600'  },
    tts: { badge: '18.6M chars', total: '18.6M', primary: '18.6M', cost: '$2,790'  },
    llm: {
      badge: '4.2B tokens',
      stats: [
        { label: 'Total Tokens', value: '4.2B',  sub: 'This period' },
        { label: 'Anthropic',    value: '1.78B', color: '#7c3aed', sub: 'claude-3-5-sonnet' },
        { label: 'OpenAI',       value: '1.2B',  color: '#15803d', sub: 'gpt-4o' },
        { label: 'Gemini',       value: '780M',  color: '#b45309', sub: 'gemini-1.5-pro' },
        { label: 'SLMs',         value: '420M',  color: '#0e7490', sub: 'u-intent-v2' },
      ],
      agentBars: [
        { name: 'Customer Support', value: 44, color: '#15808C' },
        { name: 'Sales Qualifier',  value: 27, color: '#2563eb' },
        { name: 'HR Onboarding',    value: 14, color: '#7c3aed' },
        { name: 'IT Helpdesk',      value: 10, color: '#ea580c' },
        { name: 'Collections',      value:  5, color: '#db2777' },
      ],
      table: [
        { period: 'Week 1 (Mar 1–7)',   input: '620M', output: '420M', total: '1.04B', vendor: 'Anthropic', agent: 'Customer Support', cost: '$1,248' },
        { period: 'Week 2 (Mar 8–14)',  input: '720M', output: '500M', total: '1.22B', vendor: 'Anthropic', agent: 'Customer Support', cost: '$1,464' },
        { period: 'Week 3 (Mar 15–21)', input: '660M', output: '420M', total: '1.08B', vendor: 'OpenAI',    agent: 'Analytics Bot',    cost: '$1,296' },
        { period: 'Week 4 (Mar 22–28)', input: '830M', output: '580M', total: '1.41B', vendor: 'Anthropic', agent: 'Customer Support', cost: '$1,692' },
      ],
    },
  },
  '90d': {
    asr: { badge: '7.1M turns',  total: '7.1M',  primary: '7.1M',  cost: '$10,650' },
    tts: { badge: '55.8M chars', total: '55.8M', primary: '55.8M', cost: '$8,370'  },
    llm: {
      badge: '12.6B tokens',
      stats: [
        { label: 'Total Tokens', value: '12.6B', sub: 'This quarter' },
        { label: 'Anthropic',    value: '5.3B',  color: '#7c3aed', sub: 'claude-3-5-sonnet' },
        { label: 'OpenAI',       value: '3.6B',  color: '#15803d', sub: 'gpt-4o' },
        { label: 'Gemini',       value: '2.3B',  color: '#b45309', sub: 'gemini-1.5-pro' },
        { label: 'SLMs',         value: '1.26B', color: '#0e7490', sub: 'u-intent-v2' },
      ],
      agentBars: [
        { name: 'Customer Support', value: 43, color: '#15808C' },
        { name: 'Sales Qualifier',  value: 28, color: '#2563eb' },
        { name: 'HR Onboarding',    value: 14, color: '#7c3aed' },
        { name: 'IT Helpdesk',      value: 10, color: '#ea580c' },
        { name: 'Collections',      value:  5, color: '#db2777' },
      ],
      table: [
        { period: 'January 2025',  input: '3.8B', output: '2.6B', total: '6.4B', vendor: 'Anthropic', agent: 'Customer Support', cost: '$7,680' },
        { period: 'February 2025', input: '3.2B', output: '2.2B', total: '5.4B', vendor: 'Anthropic', agent: 'Customer Support', cost: '$6,480' },
        { period: 'March 2025',    input: '3.6B', output: '2.4B', total: '6.0B', vendor: 'OpenAI',    agent: 'Analytics Bot',    cost: '$7,200' },
      ],
    },
  },
};

const VENDOR_COLORS: Record<string, { bg: string; color: string }> = {
  Anthropic: { bg: '#EDE7F6', color: '#7c3aed' },
  OpenAI:    { bg: '#dcfce7', color: '#15803d' },
  Gemini:    { bg: '#fef3c7', color: '#b45309' },
};

const llmColumnDefs: ColDef<LlmRow>[] = [
  { headerName: 'Period',   field: 'period', width: 160, cellStyle: { color: '#8b919e', fontSize: 13 } },
  { headerName: 'Input',    field: 'input',  width: 100, cellStyle: { fontSize: 13 } },
  { headerName: 'Output',   field: 'output', width: 100, cellStyle: { fontSize: 13 } },
  { headerName: 'Total',    field: 'total',  width: 110, cellStyle: { fontWeight: 700, fontSize: 13 } },
  {
    headerName: 'Vendor',
    field: 'vendor',
    width: 130,
    cellRenderer: (p: any) => {
      const s = VENDOR_COLORS[p.value] ?? { bg: '#f3f4f6', color: '#6b7280' };
      return <span className="ds-badge" style={{ background: s.bg, color: s.color }}>{p.value}</span>;
    },
  },
  { headerName: 'AI Agent', field: 'agent', flex: 1, minWidth: 150, cellStyle: { fontSize: 13, color: '#374151' } },
  { headerName: 'Est. Cost', field: 'cost', width: 110, cellStyle: { fontWeight: 600, color: '#b45309', fontSize: 13 } },
];

// ── Sub-components ──────────────────────────────────────────────────────────

function StatGrid({ items }: { items: { label: string; value: string; color?: string; sub: string }[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: 10, marginBottom: 14 }}>
      {items.map(s => (
        <div key={s.label} style={{ background: '#ffffff', border: '1px solid #e2e5ea', borderRadius: 8, padding: '12px 14px' }}>
          <div style={{ fontSize: 12, color: '#8b919e', marginBottom: 2 }}>{s.label}</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: s.color || '#1a1d23' }}>{s.value}</div>
          <div style={{ fontSize: 11, color: '#8b919e', marginTop: 2 }}>{s.sub}</div>
        </div>
      ))}
    </div>
  );
}

function AgentBars({ bars }: { bars: { name: string; value: number; color: string }[] }) {
  return (
    <div style={{ background: '#ffffff', border: '1px solid #e2e5ea', borderRadius: 8, padding: '14px 16px', marginBottom: 14 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#8b919e', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>
        Distribution by AI Agent
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {bars.map(b => (
          <div key={b.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, color: '#6b7280', width: 160, flexShrink: 0 }}>{b.name}</span>
            <div style={{ flex: 1, height: 6, background: '#f3f4f6', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${b.value}%`, height: '100%', background: b.color, borderRadius: 3 }} />
            </div>
            <span style={{ fontSize: 12, color: '#6b7280', width: 36, textAlign: 'right', flexShrink: 0 }}>{b.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CollapsibleSection({
  title, subtitle, iconBg, iconContent, badge, children,
}: {
  title: string; subtitle: string; iconBg: string; iconContent: string; badge: string; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ border: '1px solid #e2e5ea', borderRadius: 8, overflow: 'hidden', marginBottom: 20 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 12,
          padding: '13px 20px', background: open ? '#f8fafc' : '#ffffff',
          border: 'none', borderBottom: open ? '1px solid #e2e5ea' : 'none',
          cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s',
        }}
      >
        <div style={{ width: 36, height: 36, background: iconBg, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
          {iconContent}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#1a1d23' }}>{title}</div>
          <div style={{ fontSize: 11, color: '#8b919e', marginTop: 2 }}>{subtitle}</div>
        </div>
        <span className="ds-badge" style={{ background: '#e5e7eb', color: '#374151', marginRight: 8 }}>{badge}</span>
        <span style={{ color: '#8b919e', fontSize: 12 }}>{open ? <DownOutlined /> : <RightOutlined />}</span>
      </button>
      {open && <div style={{ padding: '16px 20px' }}>{children}</div>}
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

export function VendorServicesTab() {
  const [range, setRange] = useState<Range>('7d');
  const data = rangeData[range];

  return (
    <div style={{ paddingTop: 16 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 2px', color: '#1a1d23' }}>Vendor Services Consumption</h3>
          <div style={{ fontSize: 12, color: '#8b919e' }}>ASR · TTS · LLM</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Range toggle */}
          <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: 8, padding: 2, gap: 2 }}>
            {(['7d', '30d', '90d'] as Range[]).map(r => (
              <button
                key={r}
                onClick={() => setRange(r)}
                style={{
                  padding: '5px 14px', borderRadius: 6, border: 'none', cursor: 'pointer',
                  fontSize: 13, fontWeight: 600,
                  background: range === r ? '#ffffff' : 'transparent',
                  color: range === r ? '#15808C' : '#6b7280',
                  boxShadow: range === r ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.15s',
                }}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>
          <UniButton icon={<DownloadOutlined />}>Export All</UniButton>
        </div>
      </div>

      {/* ASR */}
      <CollapsibleSection title="ASR — Automatic Speech Recognition" subtitle="Deepgram · Nova-2 · Enterprise" iconBg="#E8F5E9" iconContent="🎙️" badge={data.asr.badge}>
        <StatGrid items={[
          { label: 'Total Turns',     value: data.asr.total,   sub: 'All AI Agents' },
          { label: 'Deepgram',        value: data.asr.primary, color: '#15808C', sub: 'Primary vendor' },
          { label: 'Avg Turn Length', value: '14.2s',          sub: 'Per ASR call' },
          { label: 'Est. Cost (USD)', value: data.asr.cost,    color: '#b45309', sub: 'This period' },
        ]} />
        <AgentBars bars={[
          { name: 'Customer Support', value: 45, color: '#15808C' },
          { name: 'Sales Qualifier',  value: 28, color: '#2563eb' },
          { name: 'IT Helpdesk',      value: 18, color: '#ea580c' },
          { name: 'Collections',      value:  9, color: '#db2777' },
        ]} />
      </CollapsibleSection>

      {/* TTS */}
      <CollapsibleSection title="TTS — Text to Speech" subtitle="Cartesia · sonic-english · sonic-multilingual" iconBg="#E3F2FD" iconContent="🔊" badge={data.tts.badge}>
        <StatGrid items={[
          { label: 'Total Characters', value: data.tts.total,   sub: 'This period' },
          { label: 'Cartesia',         value: data.tts.primary, color: '#15808C', sub: 'sonic-english · sonic-multilingual' },
          { label: 'Voice Profiles',   value: '6',              sub: 'Active voices' },
          { label: 'Est. Cost (USD)',  value: data.tts.cost,    color: '#b45309', sub: 'This period' },
        ]} />
        <AgentBars bars={[
          { name: 'Customer Support', value: 52, color: '#15808C' },
          { name: 'Collections',      value: 24, color: '#db2777' },
          { name: 'Sales Qualifier',  value: 15, color: '#2563eb' },
          { name: 'HR Onboarding',    value:  9, color: '#7c3aed' },
        ]} />
      </CollapsibleSection>

      {/* LLM */}
      <CollapsibleSection title="LLM — Large Language Models" subtitle="Anthropic · OpenAI · Gemini · Uniphore SLMs" iconBg="#EDE7F6" iconContent="🧠" badge={data.llm.badge}>
        <StatGrid items={data.llm.stats} />
        <AgentBars bars={data.llm.agentBars} />
        {data.llm.table && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#8b919e', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>
              Usage Detail
            </div>
            <div style={{ height: data.llm.table.length * 48 + 44, minHeight: 200, border: '1px solid #e2e5ea', borderRadius: 8, overflow: 'hidden' }}>
              <UniTable
                rowData={data.llm.table}
                columnDefs={llmColumnDefs}
                rowHeight={48}
                headerHeight={40}
                autoSizeStrategy={{ type: 'fitGridWidth', defaultMinWidth: 80 }}
                suppressMovableColumns
                suppressCellFocus
              />
            </div>
          </div>
        )}
      </CollapsibleSection>
    </div>
  );
}
