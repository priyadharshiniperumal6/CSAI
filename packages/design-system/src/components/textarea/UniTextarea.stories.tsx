import type { Meta, StoryObj } from '@storybook/react-vite';

import { UniTextarea } from './UniTextarea';

const meta = {
  title: 'ANT/Textarea',
  component: UniTextarea,
  tags: ['autodocs'],
} satisfies Meta<typeof UniTextarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    rows: 4,
    placeholder: 'Enter text',
  },
};

export const CharacterCount: Story = {
  args: {
    showCount: true,
    maxLength: 20,
    placeholder: 'Textarea with count',
  },
};

export const ClearIcon: Story = {
  args: {
    allowClear: true,
    placeholder: 'Textarea with clear icon',
  },
};

export const Autosize: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <UniTextarea placeholder="Autosize height based on the lines of content" autoSize />
      <UniTextarea placeholder="Autosize height based on max and min rows" autoSize={{ minRows: 2, maxRows: 5 }} />
    </div>
  ),
};
