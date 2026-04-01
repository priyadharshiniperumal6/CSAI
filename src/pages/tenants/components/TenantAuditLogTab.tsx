import { UniTag } from '@uniphore/ut-design-system';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { mockAuditLogs } from '../../../data/mock-audit-logs';
import type { Tenant } from '../../../types/tenant';

interface Props {
  tenant: Tenant;
}

const columns: ColumnsType<(typeof mockAuditLogs)[number]> = [
  {
    dataIndex: 'timestamp',
    title: 'Timestamp',
    render: (value: string) => {
      if (!value) return '';
      return new Date(value).toLocaleString();
    },
  },
  { dataIndex: 'actor', title: 'Actor' },
  { dataIndex: 'action', title: 'Action' },
  { dataIndex: 'resource', title: 'Resource' },
  { dataIndex: 'resourceType', title: 'Type' },
  { dataIndex: 'details', title: 'Details' },
  {
    dataIndex: 'status',
    title: 'Status',
    render: (value: string) => (
      <UniTag color={value === 'Success' ? 'green' : 'red'}>{value}</UniTag>
    ),
  },
];

export function TenantAuditLogTab({ tenant: _tenant }: Props) {
  return (
    <div style={{ paddingTop: 16 }}>
      <h3 style={{ margin: '0 0 16px' }}>Audit Logs</h3>
      <Table
        rowKey="id"
        dataSource={mockAuditLogs}
        columns={columns}
        pagination={false}
        size="middle"
      />
    </div>
  );
}
