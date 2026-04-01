import type { Meta, StoryObj } from '@storybook/react-vite';

import { UniCardHeader } from './UniCardHeader';

const meta = {
  title: 'REACT-ONLY/Components/Card/UniCardHeader',
  component: UniCardHeader,
  tags: ['autodocs'],
  args: {
    title: 'Conversation 1234',
    tagText: 'Active',
    showStatus: true,
    statusColor: '#3dbb61',
    children: <div>Additional header content</div>,
  },
} satisfies Meta<typeof UniCardHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutTag: Story = {
  args: {
    tagText: undefined,
  },
};
