import type { Meta, StoryObj } from '@storybook/react-vite';

import { UniTree } from './UniTree';

const treeData = [
  {
    title: 'REACT-ONLY/Parent',
    key: '0-0',
    children: [
      { title: 'Child 1', key: '0-0-0' },
      { title: 'Child 2', key: '0-0-1' },
    ],
  },
];

const meta = {
  title: 'ANT/Tree',
  component: UniTree,
  tags: ['autodocs'],
} satisfies Meta<typeof UniTree>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
Default.args = {
  treeData,
};
