import { useState } from 'react';
import { UniButton, UniInput } from '@uniphore/ut-design-system';
import { TeamOutlined, CheckCircleFilled, PlusOutlined } from '@ant-design/icons';

interface AccessItem {
  id: string;
  name: string;
  description: string;
  assignedGroups: string[];
}

const mockAgents: AccessItem[] = [
  { id: '1', name: 'Customer Support Bot', description: 'Handles inbound customer queries via chat and voice.', assignedGroups: ['Support Team', 'Tier-1 Agents'] },
  { id: '2', name: 'Sales Qualifier', description: 'Qualifies inbound leads and routes to sales reps.', assignedGroups: ['Sales Team'] },
  { id: '3', name: 'HR Onboarding Agent', description: 'Guides new hires through onboarding steps.', assignedGroups: [] },
  { id: '4', name: 'IT Helpdesk Agent', description: 'Resolves common IT tickets and password resets.', assignedGroups: ['IT Staff', 'Helpdesk'] },
  { id: '5', name: 'Collections Agent', description: 'Handles payment reminders and collections workflows.', assignedGroups: ['Finance Team'] },
];

const mockKBs: AccessItem[] = [
  { id: '1', name: 'Product Documentation', description: 'Full product docs, release notes, and FAQs.', assignedGroups: ['All Users', 'Support Team'] },
  { id: '2', name: 'HR Policies & Handbook', description: 'Internal HR guidelines, leave policies, and benefits.', assignedGroups: ['HR Team', 'Managers'] },
  { id: '3', name: 'Compliance Library', description: 'Regulatory docs, audit reports, compliance checklists.', assignedGroups: ['Compliance Officers'] },
  { id: '4', name: 'Sales Playbooks', description: 'Objection handling scripts, competitor intel, pricing.', assignedGroups: [] },
];

const allGroups = ['All Users', 'Support Team', 'Tier-1 Agents', 'Sales Team', 'IT Staff', 'Helpdesk', 'Finance Team', 'HR Team', 'Managers', 'Compliance Officers'];

interface SectionProps {
  title: string;
  subtitle: string;
  emoji: string;
  emojibg: string;
  items: AccessItem[];
  searchPlaceholder: string;
  emptyLabel: string;
}

function AccessSection({ title, subtitle, emoji, emojibg, items, searchPlaceholder, emptyLabel }: SectionProps & { emojibg: string }) {
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<AccessItem | null>(items[0] ?? null);
  const [groupSearch, setGroupSearch] = useState('');

  const filtered = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="section-bordered" style={{ marginBottom: 12, padding: 0 }}>
      {/* Header */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', cursor: 'pointer', background: '#fafbfc', borderBottom: open ? '1px solid #eef0f3' : 'none', borderRadius: open ? '8px 8px 0 0' : 8 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, background: emojibg, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{emoji}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{title}</div>
            <div style={{ fontSize: 11, color: '#8b919e', marginTop: 2 }}>{subtitle}</div>
          </div>
        </div>
        <span style={{ color: '#8b919e', fontSize: 18, transform: open ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s' }}>▾</span>
      </div>

      {open && (
        <div style={{ padding: '14px 16px' }}>
          {/* Search */}
          <div style={{ marginBottom: 12 }}>
            <UniInput
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSearch(e.target.value); setSelected(null); }}
              style={{ width: '100%' }}
            />
          </div>

          {/* Split layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 12, minHeight: 260 }}>
            {/* Left list */}
            <div style={{ border: '1px solid #eef0f3', borderRadius: 8, overflow: 'hidden', background: 'white' }}>
              {filtered.length === 0 && (
                <div style={{ padding: 24, textAlign: 'center', color: '#8b919e', fontSize: 13 }}>No results</div>
              )}
              {filtered.map(item => (
                <div
                  key={item.id}
                  onClick={() => setSelected(item)}
                  style={{
                    padding: '10px 14px',
                    borderBottom: '1px solid #eef0f3',
                    cursor: 'pointer',
                    background: selected?.id === item.id ? '#E0F2F1' : 'white',
                    borderLeft: selected?.id === item.id ? '3px solid #00897B' : '3px solid transparent',
                    transition: 'background 0.15s',
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: 13, color: '#1a1d23' }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: '#8b919e', marginTop: 2 }}>
                    {item.assignedGroups.length > 0 ? `${item.assignedGroups.length} group${item.assignedGroups.length > 1 ? 's' : ''} assigned` : 'No groups assigned'}
                  </div>
                </div>
              ))}
            </div>

            {/* Right detail */}
            <div style={{ border: '1px solid #eef0f3', borderRadius: 8, background: 'white', padding: 16 }}>
              {!selected ? (
                <div style={{ height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b919e', fontSize: 13 }}>
                  {emptyLabel}
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{selected.name}</div>
                      <div style={{ fontSize: 12, color: '#8b919e', marginTop: 4 }}>{selected.description}</div>
                    </div>
                    <UniButton size="small" type="primary" icon={<PlusOutlined />}>Assign Group</UniButton>
                  </div>

                  <div style={{ fontSize: 11, fontWeight: 700, color: '#8b919e', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>Assigned User Groups</div>

                  {/* Group search */}
                  <UniInput
                    placeholder="Search groups to assign…"
                    value={groupSearch}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGroupSearch(e.target.value)}
                    style={{ width: '100%', marginBottom: 12 }}
                  />

                  {/* Assigned groups */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                    {selected.assignedGroups.length === 0 ? (
                      <div style={{ padding: '12px 0', color: '#8b919e', fontSize: 13 }}>No groups assigned yet.</div>
                    ) : (
                      selected.assignedGroups.map(g => (
                        <div key={g} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#f9fafb', borderRadius: 6, border: '1px solid #eef0f3' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <TeamOutlined style={{ color: '#00897B' }} />
                            <span style={{ fontSize: 13 }}>{g}</span>
                          </div>
                          <CheckCircleFilled style={{ color: '#22c55e', fontSize: 14 }} />
                        </div>
                      ))
                    )}
                  </div>

                  {/* Available groups */}
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#8b919e', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>Available Groups</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {allGroups
                      .filter(g => !selected.assignedGroups.includes(g) && g.toLowerCase().includes(groupSearch.toLowerCase()))
                      .slice(0, 5)
                      .map(g => (
                        <div key={g} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'white', borderRadius: 6, border: '1px solid #eef0f3' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <TeamOutlined style={{ color: '#8b919e' }} />
                            <span style={{ fontSize: 13 }}>{g}</span>
                          </div>
                          <UniButton size="small" type="link">Assign</UniButton>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function AccessManagementTab() {
  return (
    <div style={{ paddingTop: 16 }}>
      <AccessSection
        title="AI Agents Access"
        subtitle="Search and assign user groups to AI Agents"
        emoji="🤖"
        emojibg="#E8F5E9"
        items={mockAgents}
        searchPlaceholder="Search AI Agents by name…"
        emptyLabel="Select an AI Agent to manage access"
      />
      <AccessSection
        title="Knowledge Base Access"
        subtitle="Search and assign user groups to Knowledge Bases"
        emoji="📚"
        emojibg="#E3F2FD"
        items={mockKBs}
        searchPlaceholder="Search Knowledge Bases by name…"
        emptyLabel="Select a Knowledge Base to manage access"
      />
    </div>
  );
}
