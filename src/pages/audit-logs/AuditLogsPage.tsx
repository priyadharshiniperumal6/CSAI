import { UniBreadcrumb } from '@uniphore/ut-design-system';
import { AuditLogsTab } from '../users/components/AuditLogsTab';

export function AuditLogsPage() {
  return (
    <div>
      <div style={{ padding: '12px 24px 0' }}>
        <UniBreadcrumb items={[{ title: 'Administration' }, { title: 'Audit Logs' }]} />
      </div>
      <div className="page-header-bar">
        <div className="page-header-left">
          <h1 className="page-title">Audit Logs</h1>
          <span className="page-subtitle">Track all system events, user actions, and security activity</span>
        </div>
      </div>
      <div style={{ padding: '0 24px 24px' }}>
        <AuditLogsTab />
      </div>
    </div>
  );
}
