import { UniTag } from '@uniphore/ut-design-system';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { mockPayments } from '../../../data/mock-billing';

const statusColors: Record<string, string> = {
  Paid: 'green',
  Pending: 'orange',
  Overdue: 'red',
  Failed: 'red',
};

const columns: ColumnsType<(typeof mockPayments)[number]> = [
  { dataIndex: 'invoiceNumber', title: 'Invoice' },
  { dataIndex: 'date', title: 'Date' },
  { dataIndex: 'description', title: 'Description' },
  {
    dataIndex: 'amount',
    title: 'Amount',
    render: (value: number) => `$${value?.toLocaleString()}`,
  },
  {
    dataIndex: 'status',
    title: 'Status',
    render: (value: string) => (
      <UniTag color={statusColors[value] || 'default'}>{value}</UniTag>
    ),
  },
];

export function PaymentsTab() {
  return (
    <div style={{ paddingTop: 16 }}>
      <h3 style={{ margin: '0 0 16px' }}>Payment History</h3>
      <Table
        rowKey="id"
        dataSource={mockPayments}
        columns={columns}
        pagination={false}
        size="middle"
      />
    </div>
  );
}
