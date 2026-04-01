import type { Meta, StoryObj } from '@storybook/react-vite';

import { UniMultiSelect } from './UniMultiSelect';

const meta = {
  title: 'ANT/Multiselect',
  component: UniMultiSelect,
  tags: ['autodocs'],
  args: {
    label: 'Filters',
    dropDownItems: [
      { id: 1, label: 'Alpha' },
      { id: 2, label: 'Beta' },
      { id: 3, label: 'Gamma' },
    ],
  },
} satisfies Meta<typeof UniMultiSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithSearchDisabled: Story = {
  args: {
    disableSearch: true,
  },
};
