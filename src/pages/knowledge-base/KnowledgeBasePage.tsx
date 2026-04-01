import { useState } from 'react';
import { UniBreadcrumb, UniButton, UniInput } from '@uniphore/ut-design-system';
import { PlusOutlined, SearchOutlined, FileTextOutlined, FolderOutlined, EyeOutlined, EditOutlined, DeleteOutlined, StarOutlined } from '@ant-design/icons';

// ── Types ──────────────────────────────────────────────────────────────────
interface KBArticle {
  id: string;
  title: string;
  category: string;
  status: 'Published' | 'Draft' | 'Archived';
  author: string;
  authorInitial: string;
  authorColor: string;
  views: number;
  helpful: number;
  lastUpdated: string;
  tags: string[];
}

interface KBCategory {
  id: string;
  name: string;
  icon: string;
  articleCount: number;
  color: string;
  bg: string;
}

// ── Mock data ──────────────────────────────────────────────────────────────
const categories: KBCategory[] = [
  { id: 'getting-started', name: 'Getting Started',    icon: '🚀', articleCount: 12, color: '#0369a1', bg: '#e0f2fe' },
  { id: 'tenant-mgmt',    name: 'Tenant Management',  icon: '🏢', articleCount:  9, color: '#15803d', bg: '#dcfce7' },
  { id: 'user-admin',     name: 'User Administration', icon: '👥', articleCount: 14, color: '#7c3aed', bg: '#f3e8ff' },
  { id: 'billing',        name: 'Billing & Credits',   icon: '💳', articleCount:  7, color: '#b45309', bg: '#fef3c7' },
  { id: 'integrations',   name: 'Integrations',        icon: '🔗', articleCount: 11, color: '#0e7490', bg: '#ccfbf1' },
  { id: 'security',       name: 'Security & Compliance',icon: '🔒', articleCount:  8, color: '#dc2626', bg: '#fee2e2' },
  { id: 'api',            name: 'API Reference',        icon: '⚡', articleCount: 18, color: '#6b7280', bg: '#f3f4f6' },
  { id: 'troubleshooting',name: 'Troubleshooting',     icon: '🛠️', articleCount: 10, color: '#ea580c', bg: '#ffedd5' },
];

const articles: KBArticle[] = [
  {
    id: '1', title: 'How to Create and Manage Tenants',
    category: 'Tenant Management', status: 'Published',
    author: 'Rachel Williams', authorInitial: 'R', authorColor: '#00897B',
    views: 1240, helpful: 98, lastUpdated: 'Mar 30, 2026',
    tags: ['tenants', 'onboarding', 'admin'],
  },
  {
    id: '2', title: 'Setting Up SSO with Okta',
    category: 'Integrations', status: 'Published',
    author: 'Vlad Vinnikov', authorInitial: 'V', authorColor: '#2563eb',
    views: 892, helpful: 94, lastUpdated: 'Mar 28, 2026',
    tags: ['sso', 'okta', 'authentication'],
  },
  {
    id: '3', title: 'Understanding BAIC Credits and Billing',
    category: 'Billing & Credits', status: 'Published',
    author: 'Sakthivel K', authorInitial: 'S', authorColor: '#ea580c',
    views: 743, helpful: 91, lastUpdated: 'Mar 25, 2026',
    tags: ['billing', 'credits', 'baic'],
  },
  {
    id: '4', title: 'User Role Management and Permissions',
    category: 'User Administration', status: 'Published',
    author: 'Tina Marchetti', authorInitial: 'T', authorColor: '#7c3aed',
    views: 631, helpful: 89, lastUpdated: 'Mar 22, 2026',
    tags: ['roles', 'permissions', 'users'],
  },
  {
    id: '5', title: 'API Console Quick Start Guide',
    category: 'API Reference', status: 'Published',
    author: 'Robert Perry', authorInitial: 'R', authorColor: '#db2777',
    views: 510, helpful: 86, lastUpdated: 'Mar 20, 2026',
    tags: ['api', 'console', 'developer'],
  },
  {
    id: '6', title: 'Configuring GDPR Compliance Settings',
    category: 'Security & Compliance', status: 'Draft',
    author: 'Rachel Williams', authorInitial: 'R', authorColor: '#00897B',
    views: 0, helpful: 0, lastUpdated: 'Mar 31, 2026',
    tags: ['gdpr', 'compliance', 'security'],
  },
  {
    id: '7', title: 'Troubleshooting SSO Login Failures',
    category: 'Troubleshooting', status: 'Published',
    author: 'Vlad Vinnikov', authorInitial: 'V', authorColor: '#2563eb',
    views: 387, helpful: 82, lastUpdated: 'Mar 18, 2026',
    tags: ['sso', 'troubleshooting', 'login'],
  },
  {
    id: '8', title: 'Webhook Configuration Reference',
    category: 'API Reference', status: 'Published',
    author: 'Sakthivel K', authorInitial: 'S', authorColor: '#ea580c',
    views: 324, helpful: 79, lastUpdated: 'Mar 15, 2026',
    tags: ['webhooks', 'api', 'integration'],
  },
];

// ── Status styles ──────────────────────────────────────────────────────────
const STATUS_MAP: Record<string, { bg: string; color: string; dot: string }> = {
  Published: { bg: '#dcfce7', color: '#15803d', dot: '#22c55e' },
  Draft:     { bg: '#f3f4f6', color: '#6b7280', dot: '#9ca3af' },
  Archived:  { bg: '#fef3c7', color: '#b45309', dot: '#f59e0b' },
};

// ── Stats ──────────────────────────────────────────────────────────────────
const stats = [
  { label: 'Total Articles', value: '89',   icon: '📄', color: '#0369a1', bg: '#e0f2fe' },
  { label: 'Published',      value: '71',   icon: '✅', color: '#15803d', bg: '#dcfce7' },
  { label: 'Drafts',         value: '12',   icon: '✏️', color: '#b45309', bg: '#fef3c7' },
  { label: 'Total Views',    value: '18.4K',icon: '👁️', color: '#7c3aed', bg: '#f3e8ff' },
];

// ── Component ──────────────────────────────────────────────────────────────
export function KnowledgeBasePage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'articles' | 'categories'>('articles');

  const filtered = articles.filter(a => {
    const matchSearch = !search || [a.title, a.category, ...a.tags].join(' ').toLowerCase().includes(search.toLowerCase());
    const matchCat = !activeCategory || a.category === categories.find(c => c.id === activeCategory)?.name;
    return matchSearch && matchCat;
  });

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ padding: '12px 24px 0' }}>
        <UniBreadcrumb items={[{ title: 'Administration' }, { title: 'Knowledge Base' }]} />
      </div>

      {/* Header */}
      <div className="page-header-bar">
        <div className="page-header-left">
          <h1 className="page-title">Knowledge Base</h1>
          <span className="page-subtitle">Manage help articles, guides, and documentation for admins and users</span>
        </div>
        <UniButton type="primary" icon={<PlusOutlined />} style={{ borderRadius: 8 }}>
          New Article
        </UniButton>
      </div>

      <div style={{ padding: '16px 24px 24px' }}>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
          {stats.map(s => (
            <div key={s.label} className="section-bordered" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10, background: s.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, flexShrink: 0,
              }}>
                {s.icon}
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: s.color, lineHeight: 1.2 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: '#8b919e', marginTop: 2 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* View toggle + search */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 0, border: '1px solid #e2e5ea', borderRadius: 8, overflow: 'hidden' }}>
            {(['articles', 'categories'] as const).map(v => (
              <button
                key={v}
                onClick={() => setActiveView(v)}
                style={{
                  padding: '7px 18px',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: 'none',
                  background: activeView === v ? '#15808C' : '#ffffff',
                  color: activeView === v ? '#ffffff' : '#6b7280',
                  textTransform: 'capitalize',
                  transition: 'all 0.15s',
                }}
              >
                {v === 'articles' ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FileTextOutlined /> Articles
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FolderOutlined /> Categories
                  </span>
                )}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <UniInput
              placeholder="Search articles…"
              prefix={<SearchOutlined style={{ color: '#9ca3af' }} />}
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              style={{ width: 260 }}
            />
          </div>
        </div>

        {activeView === 'categories' ? (
          /* ── Categories grid ─────────────────────────────────────────── */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
            {categories.map(cat => (
              <div
                key={cat.id}
                className="integration-card"
                onClick={() => { setActiveCategory(cat.id === activeCategory ? null : cat.id); setActiveView('articles'); }}
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                <div className="integration-card-header">
                  <div className="integration-card-icon" style={{ background: cat.bg, fontSize: 22 }}>
                    {cat.icon}
                  </div>
                  <div className="integration-card-info">
                    <div className="integration-card-name">{cat.name}</div>
                    <div className="integration-card-desc" style={{ color: cat.color, fontWeight: 600 }}>
                      {cat.articleCount} articles
                    </div>
                  </div>
                </div>
                <div style={{ height: 4, background: '#f3f4f6', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{
                    width: `${Math.min(100, (cat.articleCount / 20) * 100)}%`,
                    height: '100%', background: cat.color, borderRadius: 2,
                  }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ── Articles list ─────────────────────────────────────────────── */
          <div style={{ display: 'flex', gap: 16 }}>

            {/* Category filter sidebar */}
            <div style={{ width: 200, flexShrink: 0 }}>
              <div className="section-bordered" style={{ padding: '8px 0' }}>
                <div style={{ padding: '6px 14px', fontSize: 11, fontWeight: 700, color: '#8b919e', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Categories
                </div>
                <button
                  onClick={() => setActiveCategory(null)}
                  style={{
                    display: 'flex', alignItems: 'center', width: '100%',
                    padding: '8px 14px', border: 'none', cursor: 'pointer',
                    background: !activeCategory ? 'rgba(21,128,140,0.08)' : 'transparent',
                    color: !activeCategory ? '#15808C' : '#374151',
                    fontWeight: !activeCategory ? 600 : 400,
                    fontSize: 13, gap: 8, borderRadius: 0,
                  }}
                >
                  <span>📋</span> All Articles
                  <span style={{ marginLeft: 'auto', fontSize: 11, color: '#8b919e' }}>{articles.length}</span>
                </button>
                {categories.map(cat => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(isActive ? null : cat.id)}
                      style={{
                        display: 'flex', alignItems: 'center', width: '100%',
                        padding: '8px 14px', border: 'none', cursor: 'pointer',
                        background: isActive ? 'rgba(21,128,140,0.08)' : 'transparent',
                        color: isActive ? '#15808C' : '#374151',
                        fontWeight: isActive ? 600 : 400,
                        fontSize: 13, gap: 8, borderRadius: 0,
                        borderLeft: isActive ? '3px solid #15808C' : '3px solid transparent',
                      }}
                    >
                      <span>{cat.icon}</span>
                      <span style={{ flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {cat.name}
                      </span>
                      <span style={{ fontSize: 11, color: '#8b919e', flexShrink: 0 }}>{cat.articleCount}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Articles table */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {filtered.length === 0 ? (
                <div className="section-bordered" style={{ textAlign: 'center', padding: '48px 24px', color: '#8b919e' }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>📭</div>
                  <div style={{ fontWeight: 600, color: '#374151' }}>No articles found</div>
                  <div style={{ fontSize: 13, marginTop: 4 }}>Try adjusting your search or category filter</div>
                </div>
              ) : (
                <div className="section-bordered" style={{ padding: 0, overflow: 'hidden' }}>
                  {/* Table header */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 160px 100px 80px 90px 100px',
                    padding: '10px 16px',
                    background: '#f7f8fa',
                    borderBottom: '1px solid #e2e5ea',
                    fontSize: 12, fontWeight: 600, color: '#5a6170',
                    gap: 8,
                  }}>
                    <div>Article</div>
                    <div>Category</div>
                    <div>Status</div>
                    <div style={{ textAlign: 'right' }}>Views</div>
                    <div style={{ textAlign: 'right' }}>Helpful %</div>
                    <div style={{ textAlign: 'right' }}>Actions</div>
                  </div>

                  {/* Rows */}
                  {filtered.map((article, idx) => {
                    const status = STATUS_MAP[article.status];
                    return (
                      <div
                        key={article.id}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 160px 100px 80px 90px 100px',
                          padding: '12px 16px',
                          borderBottom: idx < filtered.length - 1 ? '1px solid #eef0f3' : 'none',
                          alignItems: 'center',
                          gap: 8,
                          background: '#ffffff',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#f9fafb')}
                        onMouseLeave={e => (e.currentTarget.style.background = '#ffffff')}
                      >
                        {/* Title + author + tags */}
                        <div style={{ minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                            <div style={{
                              width: 24, height: 24, borderRadius: '50%',
                              background: article.authorColor, color: '#fff',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: 10, fontWeight: 700, flexShrink: 0,
                            }}>
                              {article.authorInitial}
                            </div>
                            <span style={{ fontWeight: 600, fontSize: 13, color: '#1a1d23', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {article.title}
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: 4, paddingLeft: 32 }}>
                            {article.tags.slice(0, 3).map(tag => (
                              <span key={tag} style={{
                                background: '#f3f4f6', color: '#6b7280',
                                fontSize: 11, padding: '1px 6px', borderRadius: 4, fontWeight: 500,
                              }}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Category */}
                        <div style={{ fontSize: 12, color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {article.category}
                        </div>

                        {/* Status */}
                        <div>
                          <span className="ds-pill" style={{ background: status.bg, color: status.color }}>
                            <span className="ds-pill-dot" style={{ background: status.dot }} />
                            {article.status}
                          </span>
                        </div>

                        {/* Views */}
                        <div style={{ textAlign: 'right', fontSize: 13, fontWeight: 600, color: '#1a1d23' }}>
                          {article.views.toLocaleString()}
                        </div>

                        {/* Helpful % */}
                        <div style={{ textAlign: 'right' }}>
                          {article.helpful > 0 ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
                              <StarOutlined style={{ color: '#f59e0b', fontSize: 12 }} />
                              <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1d23' }}>{article.helpful}%</span>
                            </div>
                          ) : (
                            <span style={{ color: '#9ca3af', fontSize: 12 }}>—</span>
                          )}
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
                          <button className="toolbar-icon-btn" title="View">
                            <EyeOutlined style={{ fontSize: 13 }} />
                          </button>
                          <button className="toolbar-icon-btn" title="Edit">
                            <EditOutlined style={{ fontSize: 13 }} />
                          </button>
                          <button className="toolbar-icon-btn" title="Delete" style={{ color: '#dc2626' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#dc2626'; (e.currentTarget as HTMLElement).style.background = '#fee2e2'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e2e5ea'; (e.currentTarget as HTMLElement).style.background = '#ffffff'; }}
                          >
                            <DeleteOutlined style={{ fontSize: 13 }} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Result count */}
              <div style={{ marginTop: 10, fontSize: 12, color: '#8b919e', paddingLeft: 2 }}>
                Showing {filtered.length} of {articles.length} articles
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
