import type { AuditLogEntry } from '../types/audit';

export const mockAuditLogs: AuditLogEntry[] = [
  { id: '1', timestamp: '2026-03-30T14:32:00Z', actor: 'rachel.w@uniphore.com', action: 'Created', resource: 'TechBridge', resourceType: 'Tenant', details: 'New tenant provisioned in eu-north-1', ipAddress: '192.168.1.100', status: 'Success' },
  { id: '2', timestamp: '2026-03-30T13:15:00Z', actor: 'j.chen@uniphore.com', action: 'Updated', resource: 'API Key - Production', resourceType: 'API Key', details: 'Regenerated production API key', ipAddress: '10.0.0.50', status: 'Success' },
  { id: '3', timestamp: '2026-03-30T11:45:00Z', actor: 'rachel.w@uniphore.com', action: 'Modified', resource: 'Rate Limits', resourceType: 'Configuration', details: 'Increased API rate limit to 10000 req/min', ipAddress: '192.168.1.100', status: 'Success' },
  { id: '4', timestamp: '2026-03-29T16:20:00Z', actor: 's.patel@uniphore.com', action: 'Created', resource: 'Webhook - Slack Notify', resourceType: 'Webhook', details: 'Added Slack notification webhook', ipAddress: '172.16.0.25', status: 'Success' },
  { id: '5', timestamp: '2026-03-29T14:00:00Z', actor: 'm.torres@uniphore.com', action: 'Deleted', resource: 'Test Tenant', resourceType: 'Tenant', details: 'Removed test tenant from staging', ipAddress: '10.0.0.75', status: 'Success' },
  { id: '6', timestamp: '2026-03-29T10:30:00Z', actor: 'rachel.w@uniphore.com', action: 'Updated', resource: 'MFA Policy', resourceType: 'Security', details: 'Enabled mandatory MFA for all admins', ipAddress: '192.168.1.100', status: 'Success' },
  { id: '7', timestamp: '2026-03-28T15:45:00Z', actor: 'j.chen@uniphore.com', action: 'Created', resource: 'e.johnson@uniphore.com', resourceType: 'User', details: 'Invited new admin user', ipAddress: '10.0.0.50', status: 'Success' },
  { id: '8', timestamp: '2026-03-28T12:00:00Z', actor: 'system', action: 'Provisioned', resource: 'CloudNova', resourceType: 'Tenant', details: 'Auto-provisioning completed', ipAddress: 'system', status: 'Success' },
  { id: '9', timestamp: '2026-03-28T09:30:00Z', actor: 'n.sharma@uniphore.com', action: 'Modified', resource: 'Password Policy', resourceType: 'Security', details: 'Updated minimum password length to 12', ipAddress: '172.16.0.30', status: 'Success' },
  { id: '10', timestamp: '2026-03-27T17:00:00Z', actor: 'rachel.w@uniphore.com', action: 'Updated', resource: 'Vertex Dynamics', resourceType: 'Tenant', details: 'Deployment retry triggered', ipAddress: '192.168.1.100', status: 'Failed' },
  { id: '11', timestamp: '2026-03-27T14:20:00Z', actor: 'm.torres@uniphore.com', action: 'Created', resource: 'Alert - CPU Usage', resourceType: 'Alert', details: 'Added CPU usage alert threshold at 85%', ipAddress: '10.0.0.75', status: 'Success' },
  { id: '12', timestamp: '2026-03-27T11:00:00Z', actor: 'j.chen@uniphore.com', action: 'Modified', resource: 'API Rate Limit', resourceType: 'Configuration', details: 'Adjusted burst limit for GlobalTech', ipAddress: '10.0.0.50', status: 'Success' },
];
