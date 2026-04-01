import type { Meta, StoryObj } from '@storybook/react-vite';

import { UniEChart } from './UniEChart';

const weeklyVolumeOption = {
  tooltip: { trigger: 'axis' },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'Call volume',
      type: 'bar',
      data: [820, 932, 901, 934, 1290, 1330, 1020],
      itemStyle: {
        color: '#15808C',
      },
    },
  ],
};

const sentimentTrendOption = {
  tooltip: { trigger: 'axis' },
  legend: { data: ['Positive', 'Negative'] },
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'Positive',
      type: 'line',
      smooth: true,
      data: [64, 68, 66, 71, 75, 78],
    },
    {
      name: 'Negative',
      type: 'line',
      smooth: true,
      data: [21, 19, 22, 18, 15, 13],
    },
  ],
};

const meta = {
  title: 'Components/Charts/UniEChart',
  component: UniEChart,
  tags: ['autodocs'],
  args: {
    option: weeklyVolumeOption,
    style: { height: 360 },
  },
} satisfies Meta<typeof UniEChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Bar: Story = {};

export const Line: Story = {
  args: {
    option: sentimentTrendOption,
  },
};
