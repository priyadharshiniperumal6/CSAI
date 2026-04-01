import { useState } from 'react';
import dayjs from 'dayjs';

import { UniBreadcrumb } from '../../../components/breadcrumb/UniBreadcrumb';
import { UniButton } from '../../../components/button/UniButton';
import { UniRangePicker } from '../../../components/date-picker/UniDatePicker';
import { UniSearchInput } from '../../../components/input/UniSearchInput';
import { UniMaterialIcon } from '../../../components/icon';
import { UniSelect } from '../../../components/select/UniSelect';
import { TableAccounts } from '../../../views/Accounts/TableAccounts';
import { ViewRouteShell } from '../shared/ViewRouteShell';
import { BulkUpdate } from '../../../views/Accounts/components/BulkUpdate';
import { ColumnSelector } from '../../../components/table/column-selector/ColumnSelector';
import { columnList } from '../../../views/Accounts/components/columnList';

const orgOptions = [
  { value: 'uniphore', label: 'Uniphore' },
  { value: 'demo-org', label: 'Demo Org' },
];

const clusterOptions = [
  { value: 'all', label: 'All Clusters' },
  { value: 'emea', label: 'EMEA' },
  { value: 'apac', label: 'APAC' },
  { value: 'amer', label: 'AMER' },
];

const applicationOptions = [
  { value: 'all', label: 'All Applications' },
  { value: 'contact-center', label: 'Contact Center' },
  { value: 'quality', label: 'Quality Management' },
  { value: 'agent-assist', label: 'Agent Assist' },
];

const disableFutureDate = (current: dayjs.Dayjs) => current && current > dayjs().endOf('day');

export const TableViewDemoRoute = () => {
  const [orgKey, setOrgKey] = useState('uniphore');
  const [clusterKey, setClusterKey] = useState<string | undefined>();
  const [appKey, setAppKey] = useState<string | undefined>();
  const [rowDensity, setRowDensity] = useState<boolean | import('../../../components/table/UniTable').RowDensity>(true);

  return (
    <ViewRouteShell
      title="Accounts"
      description="Account data with search, filtering, and detail side panel."
      breadcrumbs={<UniBreadcrumb items={[{ title: 'Home' }, { title: 'Accounts' }]} />}
      globalFilters={
        <>
          <UniSelect
            variant="filter"
            options={orgOptions}
            value={orgKey}
            onChange={val => setOrgKey(String(val))}
            prefix={<UniMaterialIcon iconName="domain" size={16} />}
          />
          <UniRangePicker
            format="YYYY-MM-DD"
            disabledDate={disableFutureDate}
            placeholder={['Start Date', 'End Date']}
            style={{ width: 260 }}
            prefix={<UniMaterialIcon iconName="calendar_today" size={16} />}
            suffixIcon={null}
          />
        </>
      }
      primaryAction={
        <UniButton type="primary" materialIcon={{ iconName: 'add', size: 16 }}>
          New Account
        </UniButton>
      }
      toolbarLeft={
        <>
          <UniButton type="default" materialIcon={{ iconName: 'tune', size: 16 }} />
          <UniSearchInput placeholder="Search..." style={{ width: 240 }} className="dev-toolbar-search" />
          <UniSelect
            variant="filter"
            placeholder="Cluster"
            options={clusterOptions}
            value={clusterKey}
            onChange={val => setClusterKey(String(val))}
          />
          <UniSelect
            variant="filter"
            placeholder="Application"
            options={applicationOptions}
            value={appKey}
            onChange={val => setAppKey(String(val))}
          />
          <span className="dev-toolbar-record-count">12,340 Records</span>
        </>
      }
      toolbarRight={
        <>
          <BulkUpdate selectedUsers={[1, 2, 3]} filteredUsers={[]} />
          <ColumnSelector columnList={columnList} setRowDensity={setRowDensity} />
        </>
      }
    >
      <TableAccounts rowSelection="multiple" rowDensityDefault={rowDensity} />
    </ViewRouteShell>
  );
};
