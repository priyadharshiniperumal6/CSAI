import type { Meta, StoryObj } from '@storybook/react-vite';

import { UniMenu } from './UniMenu';

const meta = {
  title: 'REACT-ONLY/Components/Menu',
  component: UniMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof UniMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { key: '1', label: 'Item 1' },
      { key: '2', label: 'Item 2' },
    ],
  },
};
