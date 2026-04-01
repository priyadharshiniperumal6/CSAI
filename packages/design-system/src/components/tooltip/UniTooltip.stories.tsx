import type { Meta, StoryObj } from '@storybook/react-vite';

import { UniTooltip } from './UniTooltip';
import { UniButton } from '../button/UniButton';
import { UniMaterialIcon } from '../icon/UniMaterialIcon';

const meta = {
  title: 'ANT/Tooltip',
  component: UniTooltip,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    placement: { control: 'select', options: ['top', 'bottom', 'right', 'left'] },
    color: { control: 'color' },
  },
  args: {
    title: 'Tooltip title',
    placement: 'top',
    color: '#333',
  },
} satisfies Meta<typeof UniTooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <UniTooltip {...args} arrow={false}>
          <span>Hover me</span>
        </UniTooltip>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <UniTooltip {...args} trigger="click">
          <UniButton type="primary">Click me</UniButton>
        </UniTooltip>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <UniTooltip {...args} trigger="click">
          <UniMaterialIcon iconName="grade" size="20px" />
        </UniTooltip>
      </div>
    </div>
  ),
};
