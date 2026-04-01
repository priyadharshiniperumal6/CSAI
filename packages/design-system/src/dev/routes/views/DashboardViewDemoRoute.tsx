import { useState } from 'react';
import dayjs from 'dayjs';
import { UniCard } from '../../../components/card/UniCard';
import { UniEChart } from '../../../components/echart/UniEChart';
import { UniEmpty } from '../../../components/empty/UniEmpty';
import { UniSkeleton } from '../../../components/skeleton/UniSkeleton';
import { UniTag } from '../../../components/tag/UniTag';
import { UniBreadcrumb } from '../../../components/breadcrumb/UniBreadcrumb';
import { UniButton } from '../../../components/button/UniButton';
import { UniRangePicker } from '../../../components/date-picker/UniDatePicker';
import { UniSearchInput } from '../../../components/input/UniSearchInput';
import { UniSegmented } from '../../../components/segmented/UniSegmented';
import { UniMaterialIcon } from '../../../components/icon';
import { UniSelect } from '../../../components/select/UniSelect';
import { dashboardMetricFixtures } from '../../mocks/fixtures';
import type { DemoViewState } from '../../mocks/demoState';
import { useDemoState } from '../../mocks/demoState';
import { ViewRouteShell } from '../shared/ViewRouteShell';

const orgOptions = [
  { value: 'uniphore', label: 'Uniphore' },
  { value: 'demo-org', label: 'Demo Org' },
];

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
];

const agentOptions = [
  { value: 'all', label: 'All Agents' },
  { value: 'agent-a', label: 'Agent A' },
  { value: 'agent-b', label: 'Agent B' },
  { value: 'agent-c', label: 'Agent C' },
];

const disableFutureDate = (current: dayjs.Dayjs) => current && current > dayjs().endOf('day');

const viewOptions = [
  {
    value: 'table',
    icon: (
      <span className="flex items-center justify-center">
        <UniMaterialIcon iconName="table_rows" size={16} />
      </span>
    ),
  },
  {
    value: 'grid',
    icon: (
      <span className="flex items-center justify-center">
        <UniMaterialIcon iconName="grid_view" size={16} />
      </span>
    ),
  },
];

const bubbleChartOption = {
  tooltip: {
    trigger: 'item',
  },
  xAxis: {
    type: 'value',
    name: 'CSAT',
  },
  yAxis: {
    type: 'value',
    name: 'Containment %',
  },
  series: [
    {
      type: 'scatter',
      data: [
        [71, 62, 340, 'Retail'],
        [83, 76, 540, 'Banking'],
        [66, 54, 210, 'Telecom'],
        [78, 72, 410, 'Insurance'],
        [88, 81, 620, 'Healthcare'],
      ],
      symbolSize: (value: number[]) => Math.max(14, value[2] / 25),
      itemStyle: {
        color: '#0299dc',
        opacity: 0.78,
      },
    },
  ],
};

const histogramChartOption = {
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    name: 'Resolution Time (min)',
    data: ['0-2', '2-4', '4-6', '6-8', '8-10', '10+'],
  },
  yAxis: {
    type: 'value',
    name: 'Conversations',
  },
  series: [
    {
      type: 'bar',
      data: [94, 148, 101, 62, 29, 11],
      itemStyle: {
        color: '#179DAB',
      },
      barWidth: '58%',
    },
  ],
};

const lineChartOption = {
  tooltip: { trigger: 'axis' },
  legend: { data: ['Positive', 'Neutral', 'Negative'] },
  xAxis: {
    type: 'category',
    data: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
  },
  yAxis: {
    type: 'value',
    max: 100,
    name: 'Sentiment %',
  },
  series: [
    {
      name: 'Positive',
      type: 'line',
      smooth: true,
      data: [58, 61, 64, 67, 72, 76],
      itemStyle: { color: '#21b76c' },
    },
    {
      name: 'Neutral',
      type: 'line',
      smooth: true,
      data: [27, 25, 24, 22, 19, 16],
      itemStyle: { color: '#f1a91b' },
    },
    {
      name: 'Negative',
      type: 'line',
      smooth: true,
      data: [15, 14, 12, 11, 9, 8],
      itemStyle: { color: '#d63024' },
    },
  ],
};

const sankeyChartOption = {
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove',
  },
  series: [
    {
      type: 'sankey',
      emphasis: {
        focus: 'adjacency',
      },
      data: [
        { name: 'Inbound' },
        { name: 'Intent Match' },
        { name: 'Knowledge Deflect' },
        { name: 'Agent Assist' },
        { name: 'Escalation' },
        { name: 'Resolved' },
      ],
      links: [
        { source: 'Inbound', target: 'Intent Match', value: 980 },
        { source: 'Intent Match', target: 'Knowledge Deflect', value: 380 },
        { source: 'Intent Match', target: 'Agent Assist', value: 470 },
        { source: 'Intent Match', target: 'Escalation', value: 130 },
        { source: 'Knowledge Deflect', target: 'Resolved', value: 365 },
        { source: 'Agent Assist', target: 'Resolved', value: 432 },
        { source: 'Escalation', target: 'Resolved', value: 114 },
      ],
      lineStyle: {
        color: 'gradient',
        curveness: 0.5,
      },
      nodeWidth: 16,
      nodeGap: 14,
    },
  ],
};

const renderDashboardState = (state: DemoViewState) => {
  if (state === 'loading') {
    return (
      <UniCard className="dev-route-shell__panel">
        <UniSkeleton paragraph={{ rows: 6 }} />
      </UniCard>
    );
  }

  if (state === 'empty') {
    return (
      <UniCard className="dev-route-shell__panel">
        <UniEmpty
          params={{
            props: {
              title: 'No dashboard widgets available',
              description: 'Switch back to default state to render fixture metrics.',
            },
          }}
        />
      </UniCard>
    );
  }

  if (state === 'error') {
    return (
      <UniCard className="dev-route-shell__panel">
        <div className="dev-route-shell__title-row">
          <h2 className="dev-route-shell__subtitle">Dashboard fetch error</h2>
          <UniTag>Error</UniTag>
        </div>
        <p className="dev-route-shell__description">
          The dashboard view route is in an error state. Use `?state=default` to recover.
        </p>
      </UniCard>
    );
  }

  return (
    <>
      <div className="dev-metric-grid">
        {dashboardMetricFixtures.map(metric => (
          <UniCard key={metric.id} className="dev-route-shell__panel">
            <div className="dev-metric-card__label">{metric.label}</div>
            <div className="dev-metric-card__value">{metric.value}</div>
            <UniTag>{metric.delta}</UniTag>
          </UniCard>
        ))}
      </div>
      <div className="dev-dashboard-chart-grid">
        <UniCard className="dev-route-shell__panel" title="Channel Health (Bubble)">
          <UniEChart option={bubbleChartOption} style={{ height: 320 }} />
        </UniCard>
        <UniCard className="dev-route-shell__panel" title="Resolution Histogram">
          <UniEChart option={histogramChartOption} style={{ height: 320 }} />
        </UniCard>
        <UniCard className="dev-route-shell__panel" title="Sentiment Trend (Line)">
          <UniEChart option={lineChartOption} style={{ height: 320 }} />
        </UniCard>
      </div>
      <UniCard className="dev-route-shell__panel" title="Conversation Journey (Sankey)">
        <UniEChart option={sankeyChartOption} style={{ height: 360 }} />
      </UniCard>
    </>
  );
};

export const DashboardViewDemoRoute = () => {
  const { state } = useDemoState();
  const [viewMode, setViewMode] = useState('grid');
  const [orgKey, setOrgKey] = useState('uniphore');
  const [statusKey, setStatusKey] = useState<string | undefined>();
  const [agentKey, setAgentKey] = useState<string | undefined>();

  return (
    <ViewRouteShell
      title="Dashboard"
      description="Dashboard route demo with deterministic state fixtures and HostShell-integrated navigation."
      breadcrumbs={
        <UniBreadcrumb items={[{ title: 'Dashboard' }, { title: state.charAt(0).toUpperCase() + state.slice(1) }]} />
      }
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
          New
        </UniButton>
      }
      toolbarLeft={
        <>
          <UniButton type="default" materialIcon={{ iconName: 'tune', size: 16 }} />
          <UniSearchInput placeholder="Search..." style={{ width: 240 }} className="dev-toolbar-search" />
          <UniSelect
            variant="filter"
            placeholder="Status"
            options={statusOptions}
            value={statusKey}
            onChange={val => setStatusKey(String(val))}
          />
          <UniSelect
            variant="filter"
            placeholder="Agent"
            options={agentOptions}
            value={agentKey}
            onChange={val => setAgentKey(String(val))}
          />
          <span className="dev-toolbar-record-count">28,940 Records</span>
        </>
      }
      toolbarRight={<UniSegmented options={viewOptions} value={viewMode} onChange={val => setViewMode(String(val))} />}
    >
      <div className="dev-dashboard-route-scroll">{renderDashboardState(state)}</div>
    </ViewRouteShell>
  );
};
