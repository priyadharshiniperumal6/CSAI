import type { User, UserGroup, ResourceGroup } from '../types/user';

export const mockUsers: User[] = [
  {
    id: '1', firstName: 'Rachel', lastName: 'Williams', email: 'rachel.w@uniphore.com',
    role: 'Super Admin', roles: ['Admin', 'AI Agent Designer'],
    status: 'Active', groups: ['Platform Admins'],
    lastLogin: '2026-03-30T14:30:00Z', mfaEnabled: true,
    phone: '+1 (415) 555-0101', authMethod: 'SSO', avatarColor: '#0e7490',
  },
  {
    id: '2', firstName: 'James', lastName: 'Chen', email: 'j.chen@uniphore.com',
    role: 'Admin', roles: ['Admin', 'AI Agent Developer'],
    status: 'Active', groups: ['Platform Admins', 'DevOps'],
    lastLogin: '2026-03-29T09:15:00Z', mfaEnabled: true,
    phone: '+1 (212) 555-0188', authMethod: 'SSO', avatarColor: '#2563eb',
  },
  {
    id: '3', firstName: 'Sarah', lastName: 'Patel', email: 's.patel@uniphore.com',
    role: 'Analyst', roles: ['BI Designer', 'BI Viewer'],
    status: 'Active', groups: ['Analytics Team'],
    lastLogin: '2026-03-28T16:45:00Z', mfaEnabled: false,
    phone: '+91 98765 43210', authMethod: 'SSO', avatarColor: '#7c3aed',
  },
  {
    id: '4', firstName: 'Michael', lastName: 'Torres', email: 'm.torres@uniphore.com',
    role: 'Developer', roles: ['AI Agent Developer', 'BI Viewer'],
    status: 'Active', groups: ['DevOps', 'Engineering'],
    lastLogin: '2026-03-30T11:00:00Z', mfaEnabled: true,
    phone: '+44 7700 900123', authMethod: 'SSO', avatarColor: '#ea580c',
  },
  {
    id: '5', firstName: 'Emily', lastName: 'Johnson', email: 'e.johnson@uniphore.com',
    role: 'Admin', roles: ['Admin'],
    status: 'Pending', groups: ['Platform Admins'],
    lastLogin: '', mfaEnabled: false,
    phone: '', authMethod: 'Manual', avatarColor: '#db2777',
  },
  {
    id: '6', firstName: 'David', lastName: 'Kim', email: 'd.kim@uniphore.com',
    role: 'Viewer', roles: ['BI Viewer'],
    status: 'Active', groups: ['Support Team'],
    lastLogin: '2026-03-27T10:30:00Z', mfaEnabled: false,
    phone: '+1 (650) 555-0144', authMethod: 'Manual', avatarColor: '#059669',
  },
  {
    id: '7', firstName: 'Lisa', lastName: 'Garcia', email: 'l.garcia@uniphore.com',
    role: 'Analyst', roles: ['AI Agent Designer', 'BI Viewer'],
    status: 'Active', groups: ['Analytics Team', 'QA'],
    lastLogin: '2026-03-30T08:00:00Z', mfaEnabled: true,
    phone: '+91 99887 65432', authMethod: 'SSO', avatarColor: '#b45309',
  },
  {
    id: '8', firstName: 'Robert', lastName: 'Anderson', email: 'r.anderson@uniphore.com',
    role: 'Developer', roles: ['AI Agent Support'],
    status: 'Inactive', groups: ['Engineering'],
    lastLogin: '2026-02-15T14:00:00Z', mfaEnabled: true,
    phone: '+1 (512) 555-0177', authMethod: 'Manual', avatarColor: '#78716c',
  },
  {
    id: '9', firstName: 'Nina', lastName: 'Sharma', email: 'n.sharma@uniphore.com',
    role: 'Admin', roles: ['Admin', 'AI Agent Designer'],
    status: 'Active', groups: ['Platform Admins'],
    lastLogin: '2026-03-30T13:20:00Z', mfaEnabled: true,
    phone: '+91 98765 11111', authMethod: 'SSO', avatarColor: '#0369a1',
  },
  {
    id: '10', firstName: 'Alex', lastName: 'Wright', email: 'a.wright@uniphore.com',
    role: 'Viewer', roles: ['BI Viewer', 'AI Agent Support'],
    status: 'Active', groups: ['Support Team', 'QA'],
    lastLogin: '2026-03-29T15:45:00Z', mfaEnabled: false,
    phone: '+1 (310) 555-0199', authMethod: 'Manual', avatarColor: '#6d28d9',
  },
];

export const mockUserGroups: UserGroup[] = [
  { id: '1', name: 'Platform Admins',  description: 'Full administrative access to the platform', memberCount: 4, createdAt: '2025-01-01' },
  { id: '2', name: 'DevOps',           description: 'Development and operations team',              memberCount: 3, createdAt: '2025-01-15' },
  { id: '3', name: 'Analytics Team',   description: 'Data analytics and reporting',                 memberCount: 5, createdAt: '2025-02-01' },
  { id: '4', name: 'Engineering',      description: 'Software engineering team',                    memberCount: 8, createdAt: '2025-02-15' },
  { id: '5', name: 'Support Team',     description: 'Customer support and operations',              memberCount: 6, createdAt: '2025-03-01' },
  { id: '6', name: 'QA',              description: 'Quality assurance team',                       memberCount: 4, createdAt: '2025-03-15' },
];

export const mockResourceGroups: ResourceGroup[] = [
  { id: '1', name: 'Production Resources',  description: 'All production environment resources',  resources: ['Prod DB', 'Prod API', 'Prod CDN'] },
  { id: '2', name: 'Development Resources', description: 'Development environment resources',     resources: ['Dev DB', 'Dev API', 'Dev Storage'] },
  { id: '3', name: 'Analytics Resources',   description: 'Data and analytics resources',          resources: ['Data Warehouse', 'BI Dashboard', 'ETL Pipeline'] },
];
