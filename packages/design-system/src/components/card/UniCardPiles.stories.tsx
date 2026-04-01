import type { Meta, StoryObj } from '@storybook/react-vite';

import { UniCardPiles } from './UniCardPiles';

const meta = {
  title: 'REACT-ONLY/Components/Card/UniCardPiles',
  component: UniCardPiles,
  tags: ['autodocs'],
  args: {
    piles: ['Sales', 'Renewal', 'Escalation', 'Expansion', 'Churn Risk'],
    maxPiles: 3,
  },
} satisfies Meta<typeof UniCardPiles>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ShowAll: Story = {
  args: {
    maxPiles: 0,
  },
};
