import type { Meta, StoryObj } from '@storybook/react-vite';

import { UniMentions } from './UniMentions';

const meta = {
  title: 'ANT/Mentions',
  component: UniMentions,
  tags: ['autodocs'],
} satisfies Meta<typeof UniMentions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    options: [
      { value: 'Location', label: 'Location' },
      { value: 'From_City', label: 'From_City' },
      { value: 'To_City', label: 'To_City' },
    ],
    placeholder: 'Input @ to mention entities',
  },
};

export const CustomizeTriggerPrefixWithSearch: Story = {
  args: {
    prefix: ['@', '#'],
    options: [
      { value: 'From_City', label: 'From_City' },
      { value: '1.0', label: '1.0' },
    ],
    placeholder: 'Input @ to mention entity, # to mention tag',
  },
};

export const WarningAndErrorStatus: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <UniMentions {...args} status="warning" placeholder="Warning status" />
      <UniMentions {...args} status="error" placeholder="Error status" />
    </div>
  ),
  args: {
    options: [
      { value: 'Location', label: 'Location' },
    ],
  },
};
