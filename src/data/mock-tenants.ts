import type { Tenant } from '../types/tenant';

export const mockTenants: Tenant[] = [
  { id: '1', name: 'Acme Corp', slug: 'acme-corp', region: 'us-east-1', deployedApps: ['SSA', 'RTGA'], userCount: 34, deploymentStatus: 'Production', createdAt: '2025-01-15', industry: 'Technology' },
  { id: '2', name: 'GlobalTech Solutions', slug: 'globaltech', region: 'eu-west-1', deployedApps: ['SSA', 'KB', 'Analytics'], userCount: 123, deploymentStatus: 'Production', createdAt: '2025-02-20', industry: 'Consulting' },
  { id: '3', name: 'NexaVentures', slug: 'nexaventures', region: 'ap-southeast-1', deployedApps: ['SSA', 'RTGA', 'Analytics'], userCount: 45, deploymentStatus: 'Production', createdAt: '2025-03-10', industry: 'Finance' },
  { id: '4', name: 'BlueFinancial', slug: 'bluefinancial', region: 'us-west-2', deployedApps: ['CIA', 'SSA', 'KB'], userCount: 123, deploymentStatus: 'Scheduled', createdAt: '2025-04-01', industry: 'Banking' },
  { id: '5', name: 'Orion Systems', slug: 'orion-sys', region: 'us-east-2', deployedApps: ['RTGA', 'KB'], userCount: 57, deploymentStatus: 'Completed', createdAt: '2025-04-15', industry: 'Healthcare' },
  { id: '6', name: 'Zenith Labs', slug: 'zenith-labs', region: 'eu-central-1', deployedApps: ['RTGA', 'KB'], userCount: 78, deploymentStatus: 'Scheduled', createdAt: '2025-05-01', industry: 'Research' },
  { id: '7', name: 'NovaEdge', slug: 'novaedge', region: 'ap-south-1', deployedApps: ['RTGA', 'KB', 'Analytics'], userCount: 45, deploymentStatus: 'Production', createdAt: '2025-05-20', industry: 'Retail' },
  { id: '8', name: 'QuantumCorp', slug: 'quantumcorp', region: 'us-west-1', deployedApps: ['SSA', 'RTGA'], userCount: 23, deploymentStatus: 'Production', createdAt: '2025-06-10', industry: 'Manufacturing' },
  { id: '9', name: 'Apex Innovations', slug: 'apex-innov', region: 'eu-west-2', deployedApps: ['SSA', 'RTGA', 'KB'], userCount: 90, deploymentStatus: 'Active', createdAt: '2025-06-25', industry: 'Technology' },
  { id: '10', name: 'Vertex Dynamics', slug: 'vertex-dyn', region: 'ap-northeast-1', deployedApps: ['SSA', 'RTGA'], userCount: 12, deploymentStatus: 'Failed', createdAt: '2025-07-01', industry: 'Logistics' },
  { id: '11', name: 'Pulse Technologies', slug: 'pulse-tech', region: 'us-east-1', deployedApps: ['SSA', 'RTGA', 'KB'], userCount: 45, deploymentStatus: 'Production', createdAt: '2025-07-15', industry: 'Telecom' },
  { id: '12', name: 'CoreLogic Systems', slug: 'corelogic', region: 'eu-central-1', deployedApps: ['CIA', 'KB', 'Analytics'], userCount: 65, deploymentStatus: 'Scheduled', createdAt: '2025-08-01', industry: 'Insurance' },
  { id: '13', name: 'SkyBridge Solutions', slug: 'skybridge', region: 'ap-southeast-2', deployedApps: ['CIA', 'KB', 'Analytics'], userCount: 234, deploymentStatus: 'Production', createdAt: '2025-08-20', industry: 'Media' },
  { id: '14', name: 'AlphaWave', slug: 'alphawave', region: 'us-west-2', deployedApps: ['SSA', 'RTGA'], userCount: 97, deploymentStatus: 'Trial', createdAt: '2025-09-01', industry: 'Energy' },
  { id: '15', name: 'DeltaWorks', slug: 'deltaworks', region: 'eu-west-1', deployedApps: ['CIA', 'Analytics', 'KB'], userCount: 74, deploymentStatus: 'Production', createdAt: '2025-09-15', industry: 'Construction' },
  { id: '16', name: 'Sigma Enterprises', slug: 'sigma-ent', region: 'ap-south-1', deployedApps: ['SSA', 'RTGA', 'Analytics', 'KB'], userCount: 54, deploymentStatus: 'Production', createdAt: '2025-10-01', industry: 'Government' },
  { id: '17', name: 'CloudNova', slug: 'cloudnova', region: 'us-east-2', deployedApps: ['SSA', 'RTGA', 'Analytics', 'KB'], userCount: 233, deploymentStatus: 'Production', createdAt: '2025-10-20', industry: 'SaaS' },
  { id: '18', name: 'TechBridge', slug: 'techbridge', region: 'eu-north-1', deployedApps: ['SSA', 'RTGA', 'KB'], userCount: 56, deploymentStatus: 'Production', createdAt: '2025-11-01', industry: 'Education' },
];

export const regionOptions = [
  { value: 'us-east-1', label: 'US East (N. Virginia)' },
  { value: 'us-east-2', label: 'US East (Ohio)' },
  { value: 'us-west-1', label: 'US West (N. California)' },
  { value: 'us-west-2', label: 'US West (Oregon)' },
  { value: 'eu-west-1', label: 'EU (Ireland)' },
  { value: 'eu-west-2', label: 'EU (London)' },
  { value: 'eu-central-1', label: 'EU (Frankfurt)' },
  { value: 'eu-north-1', label: 'EU (Stockholm)' },
  { value: 'ap-south-1', label: 'Asia Pacific (Mumbai)' },
  { value: 'ap-southeast-1', label: 'Asia Pacific (Singapore)' },
  { value: 'ap-southeast-2', label: 'Asia Pacific (Sydney)' },
  { value: 'ap-northeast-1', label: 'Asia Pacific (Tokyo)' },
];
