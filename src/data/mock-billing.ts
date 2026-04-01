import type { Payment, Credit, VendorService } from '../types/billing';

export const mockPayments: Payment[] = [
  { id: '1', date: '2026-03-01', amount: 15000, currency: 'USD', status: 'Paid', invoiceNumber: 'INV-2026-001', description: 'Monthly platform subscription' },
  { id: '2', date: '2026-02-01', amount: 15000, currency: 'USD', status: 'Paid', invoiceNumber: 'INV-2026-002', description: 'Monthly platform subscription' },
  { id: '3', date: '2026-01-01', amount: 12500, currency: 'USD', status: 'Paid', invoiceNumber: 'INV-2026-003', description: 'Monthly platform subscription' },
  { id: '4', date: '2026-03-15', amount: 3200, currency: 'USD', status: 'Pending', invoiceNumber: 'INV-2026-004', description: 'LLM API overage charges' },
  { id: '5', date: '2026-02-15', amount: 1800, currency: 'USD', status: 'Paid', invoiceNumber: 'INV-2026-005', description: 'Additional storage' },
  { id: '6', date: '2025-12-01', amount: 12500, currency: 'USD', status: 'Paid', invoiceNumber: 'INV-2025-012', description: 'Monthly platform subscription' },
];

export const mockCredits: Credit[] = [
  { id: '1', type: 'Platform Credits', allocated: 50000, used: 32450, remaining: 17550, expiresAt: '2026-12-31' },
  { id: '2', type: 'LLM API Credits', allocated: 25000, used: 18700, remaining: 6300, expiresAt: '2026-06-30' },
  { id: '3', type: 'Storage Credits', allocated: 10000, used: 4200, remaining: 5800, expiresAt: '2026-12-31' },
  { id: '4', type: 'Compute Credits', allocated: 15000, used: 11000, remaining: 4000, expiresAt: '2026-09-30' },
];

export const mockVendorServices: VendorService[] = [
  { id: '1', vendor: 'OpenAI', service: 'GPT-4o', model: 'gpt-4o-2024-11-20', monthlyCost: 4500, status: 'Active', usagePercent: 78 },
  { id: '2', vendor: 'Anthropic', service: 'Claude', model: 'claude-sonnet-4-6', monthlyCost: 3200, status: 'Active', usagePercent: 65 },
  { id: '3', vendor: 'Google', service: 'Gemini Pro', model: 'gemini-2.0-pro', monthlyCost: 2100, status: 'Active', usagePercent: 42 },
  { id: '4', vendor: 'AWS', service: 'Bedrock', model: 'amazon.titan-text-premier', monthlyCost: 1800, status: 'Active', usagePercent: 35 },
  { id: '5', vendor: 'Cohere', service: 'Command R+', model: 'command-r-plus', monthlyCost: 900, status: 'Inactive', usagePercent: 0 },
];
