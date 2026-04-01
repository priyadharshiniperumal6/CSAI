import type { Meta, StoryObj } from '@storybook/react-vite';

import { UniPopConfirm } from './UniPopConfirm';
import { UniButton } from '../button/UniButton';

const meta = {
  title: 'ANT/Popconfirm',
  component: UniPopConfirm,
  tags: ['autodocs'],
  args: {
    title: 'Are you sure?',
  },
} satisfies Meta<typeof UniPopConfirm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render() {
    return (
      <div style={{ padding: '20px' }}>
        <UniPopConfirm
          title="Are you sure delete this item?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => console.log('confirm')}
          onCancel={() => console.log('cancel')}
        >
          <UniButton type="primary">Click me</UniButton>
        </UniPopConfirm>
      </div>
    );
  },
};
