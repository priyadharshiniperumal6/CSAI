import type { Meta, StoryObj } from '@storybook/react-vite';
import { UniPill } from '../tag/UniTag';

const meta = {
    title: 'ANT/Pill',
    component: UniPill,
    tags: ['autodocs'],
    args: {
        type: 'pill',
        children: 'United',
    },
} satisfies Meta<typeof UniPill>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
