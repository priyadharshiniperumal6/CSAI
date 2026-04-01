export interface Payment {
  id: string;
  date: string;
  amount: number;
  currency: string;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Failed';
  invoiceNumber: string;
  description: string;
}

export interface Credit {
  id: string;
  type: string;
  allocated: number;
  used: number;
  remaining: number;
  expiresAt: string;
}

export interface VendorService {
  id: string;
  vendor: string;
  service: string;
  model: string;
  monthlyCost: number;
  status: 'Active' | 'Inactive';
  usagePercent: number;
}
