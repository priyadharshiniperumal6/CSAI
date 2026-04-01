import { useEffect } from 'react';
import { UniBreadcrumb } from '@uniphore/ut-design-system';
import { useTopNav } from '../../context/TopNavContext';

export function ApiConsolePage() {
  const { clearTopNav } = useTopNav();
  useEffect(() => { clearTopNav(); }, [clearTopNav]);

  return (
    <div>
      <div style={{ padding: '12px 24px 0' }}>
        <UniBreadcrumb items={[{ title: 'Administration' }, { title: 'API Console' }]} />
      </div>
      <div className="page-header-bar">
        <div className="page-header-left">
          <h1 className="page-title">API Console</h1>
          <span className="page-subtitle">Test and explore available API endpoints</span>
        </div>
      </div>
    </div>
  );
}
