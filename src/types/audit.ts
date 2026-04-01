export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  resource: string;
  resourceType: string;
  details: string;
  ipAddress: string;
  status: 'Success' | 'Failed';
}
