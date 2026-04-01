export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  roles: string[];
  status: 'Active' | 'Inactive' | 'Pending';
  groups: string[];
  lastLogin: string;
  mfaEnabled: boolean;
  phone?: string;
  authMethod: 'Manual' | 'SSO';
  avatarColor: string;
}

export interface UserGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  createdAt: string;
}

export interface ResourceGroup {
  id: string;
  name: string;
  description: string;
  resources: string[];
}
