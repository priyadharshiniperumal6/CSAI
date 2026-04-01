export type DeploymentStatus =
  | 'Production'
  | 'Scheduled'
  | 'Completed'
  | 'Active'
  | 'Failed'
  | 'Trial';

export type DeployedApp = 'SSA' | 'RTGA' | 'CIA' | 'ProcessDiscovery' | 'DataAgent' | 'FineTuning' | 'BAICPlatform';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  region: string;
  deployedApps: DeployedApp[];
  userCount: number;
  deploymentStatus: DeploymentStatus;
  description?: string;
  createdAt: string;
  industry?: string;
}

export interface TenantFormData {
  // Step 1 - Identity
  name: string;
  slug: string;
  region: string;
  description: string;
  // Step 2 - Order Details
  orderId: string;
  licenseType: string;
  salesforceLink: string;
  // Step 3 - Feature Configuration
  enabledApps: DeployedApp[];
}
