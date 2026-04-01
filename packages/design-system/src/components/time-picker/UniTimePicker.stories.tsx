import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';

import { UniTimePicker } from './UniTimePicker';

const meta = {
  title: 'ANT/TimePicker',
  component: UniTimePicker,
  tags: ['autodocs'],
} satisfies Meta<typeof UniTimePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    use12Hours: true,
    format: 'hh:mm A',
    placeholder: 'Select time',
  },
};

export const TwelveHourFormat: Story = {
  args: {
    use12Hours: true,
    defaultValue: dayjs('10:00', 'HH:mm'),
    format: 'hh:mm A',
    placeholder: 'Select time',
  },
};

export const TwentyFourHourFormat: Story = {
  args: {
    defaultValue: dayjs('10:00', 'HH:mm'),
    format: 'HH:mm',
    placeholder: 'Select time',
  },
};
