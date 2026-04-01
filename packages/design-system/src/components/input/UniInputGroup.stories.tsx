import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from 'antd';

import { UniInputGroup } from './UniInputGroup';

const meta = {
  title: 'REACT-ONLY/Components/UniInputGroup',
  component: UniInputGroup,
  tags: ['autodocs'],
  args: {
    children: (
      <>
        <Input style={{ width: '50%' }} placeholder="First" />
        <Input style={{ width: '50%' }} placeholder="Second" />
      </>
    ),
  },
} satisfies Meta<typeof UniInputGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
