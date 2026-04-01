import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

import { UniAdvanceFilter } from './UniAdvanceFilter';

const meta = {
  title: 'REACT-ONLY/Components/UniAdvanceFilter',
  component: UniAdvanceFilter,
  tags: ['autodocs'],
  args: {
    count: 1,
  },
} satisfies Meta<typeof UniAdvanceFilter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    const [, updateArgs] = useArgs();
    return (
      <UniAdvanceFilter
        {...args}
        onToggle={expanded => {
          updateArgs({ expanded });
        }}
      />
    );
  },
};

export const WithCustomLabel: Story = {
  args: {
    label: 'Toggle advanced filters',
    count: 3,
  },
};
