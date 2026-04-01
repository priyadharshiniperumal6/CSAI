import type { Meta, StoryObj } from '@storybook/react-vite';

import { UniSkeleton } from './UniSkeleton';

const meta = {
  title: 'ANT/Skeleton',
  component: UniSkeleton,
  tags: ['autodocs'],
} satisfies Meta<typeof UniSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
