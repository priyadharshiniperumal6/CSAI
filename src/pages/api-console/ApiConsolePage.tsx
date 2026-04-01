import { useEffect } from 'react';
import { UniBreadcrumb, UniCard, UniButton, UniSelect, UniInput } from '@uniphore/ut-design-system';
import { useTopNav } from '../../context/TopNavContext';

const endpoints = [
  { method: 'GET', path: '/api/v1/tenants', description: 'List all tenants' },
  { method: 'POST', path: '/api/v1/tenants', description: 'Create a new tenant' },
  { method: 'GET', path: '/api/v1/tenants/:id', description: 'Get tenant by ID' },
  { method: 'PUT', path: '/api/v1/tenants/:id', description: 'Update a tenant' },
  { method: 'DELETE', path: '/api/v1/tenants/:id', description: 'Delete a tenant' },
  { method: 'GET', path: '/api/v1/users', description: 'List all users' },
  { method: 'POST', path: '/api/v1/users', description: 'Create a new user' },
  { method: 'GET', path: '/api/v1/billing/credits', description: 'Get credit balance' },
];

const METHOD_STYLES: Record<string, { bg: string; color: string }> = {
  GET: { bg: '#dcfce7', color: '#15803d' },
  POST: { bg: '#e0f2fe', color: '#0369a1' },
  PUT: { bg: '#fef3c7', color: '#b45309' },
  DELETE: { bg: '#fee2e2', color: '#dc2626' },
};

export function ApiConsolePage() {
  const { clearTopNav } = useTopNav();
  useEffect(() => { clearTopNav(); }, [clearTopNav]);

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ padding: '12px 24px 0' }}>
        <UniBreadcrumb items={[{ title: 'Administration' }, { title: 'API Console' }]} />
      </div>

      {/* Page Header */}
      <div className="page-header-bar">
        <div className="page-header-left">
          <h1 className="page-title">API Console</h1>
          <span className="page-subtitle">Test and explore available API endpoints</span>
        </div>
      </div>

      <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <UniCard title="API Explorer">
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <UniSelect
              defaultValue="GET"
              options={[
                { value: 'GET', label: 'GET' },
                { value: 'POST', label: 'POST' },
                { value: 'PUT', label: 'PUT' },
                { value: 'DELETE', label: 'DELETE' },
              ]}
              style={{ width: 120 }}
            />
            <UniInput placeholder="Enter API endpoint..." style={{ flex: 1 }} />
            <UniButton type="primary" style={{ borderRadius: 8 }}>Send</UniButton>
          </div>
        </UniCard>

        <UniCard title="Available Endpoints">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {endpoints.map((ep, i) => {
              const ms = METHOD_STYLES[ep.method] || { bg: '#f3f4f6', color: '#374151' };
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: '1px solid #eef0f3',
                    background: '#fff',
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: 11,
                      padding: '2px 10px',
                      borderRadius: 4,
                      background: ms.bg,
                      color: ms.color,
                      fontFamily: 'monospace',
                      minWidth: 60,
                      textAlign: 'center',
                    }}
                  >
                    {ep.method}
                  </span>
                  <span style={{ fontFamily: 'monospace', fontSize: 13, flex: 1, color: '#1a1d23' }}>{ep.path}</span>
                  <span style={{ fontSize: 13, color: '#8b919e' }}>{ep.description}</span>
                </div>
              );
            })}
          </div>
        </UniCard>
      </div>
    </div>
  );
}
