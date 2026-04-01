import { UniTag } from '@uniphore/ut-design-system';
import { Progress, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { mockVendorServices } from '../../../data/mock-billing';

const columns: ColumnsType<(typeof mockVendorServices)[number]> = [
  { dataIndex: 'vendor', title: 'Vendor' },
  { dataIndex: 'service', title: 'Service' },
  { dataIndex: 'model', title: 'Model' },
  {
    dataIndex: 'monthlyCost',
    title: 'Monthly Cost',
    render: (value: number) => `$${value?.toLocaleString()}`,
  },
  {
    dataIndex: 'usagePercent',
    title: 'Usage',
    render: (value: number) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Progress
          percent={value}
          size="small"
          style={{ width: 80, margin: 0 }}
          showInfo={false}
        />
        <span>{value}%</span>
      </div>
    ),
  },
  {
    dataIndex: 'status',
    title: 'Status',
    render: (value: string) => (
      <UniTag color={value === 'Active' ? 'green' : 'default'}>{value}</UniTag>
    ),
  },
];

export function VendorServicesTab() {
  return (
    <div style={{ paddingTop: 16 }}>
      <h3 style={{ margin: '0 0 16px' }}>Vendor Services</h3>
      <Table
        rowKey="id"
        dataSource={mockVendorServices}
        columns={columns}
        pagination={false}
        size="middle"
      />
    </div>
  );
}
