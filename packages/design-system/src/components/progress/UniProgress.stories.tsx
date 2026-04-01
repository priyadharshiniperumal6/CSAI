import type { Meta, StoryObj } from '@storybook/react-vite';

import { UniProgress } from './UniProgress';

const meta = {
  title: 'ANT/Progress',
  component: UniProgress,
  tags: ['autodocs'],
} satisfies Meta<typeof UniProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Progress: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <UniProgress percent={30} />
      <UniProgress percent={50} status="active" />
      <UniProgress percent={70} status="exception" />
      <UniProgress percent={100} />
      <UniProgress percent={50} showInfo={false} />
      <div style={{ display: 'flex', gap: '16px' }}>
        <UniProgress type="circle" percent={75} />
        <UniProgress type="circle" percent={70} status="exception" />
        <UniProgress type="circle" percent={100} />
      </div>
    </div>
  ),
};

export const ProgressSizeSmall: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <UniProgress percent={30} size="small" />
      <UniProgress percent={50} status="active" size="small" />
      <UniProgress percent={70} status="exception" size="small" />
      <UniProgress percent={100} size="small" />
      <UniProgress percent={50} showInfo={false} size="small" />
      <div style={{ display: 'flex', gap: '16px' }}>
        <UniProgress type="circle" percent={30} size={80} />
        <UniProgress type="circle" percent={70} size={80} status="exception" />
        <UniProgress type="circle" percent={100} size={80} />
      </div>
    </div>
  ),
};

export const ProgressSteps: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <UniProgress steps={10} percent={10} />
      <UniProgress steps={30} percent={50} size="small" />
      <UniProgress steps={8} percent={70} size={20} />
      <UniProgress steps={15} percent={65} size={[20, 30]} />
    </div>
  ),
};
