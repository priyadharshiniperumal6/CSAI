import type { Meta, StoryObj } from '@storybook/react-vite';
import { UniDivider } from './UniDivider';

const meta = {
  title: 'ANT/Divider',
  component: UniDivider,
  tags: ['autodocs'],
} satisfies Meta<typeof UniDivider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    style: { width: '200px' },
  },
};

export const Vertical: Story = {
  args: {
    type: 'vertical',
  },
};
