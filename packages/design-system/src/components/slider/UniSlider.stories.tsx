import type { Meta, StoryObj } from '@storybook/react-vite';
import { UniSlider } from './UniSlider';
import { UniSliderProgress } from './UniSliderProgress';

const meta = {
  title: 'Ant/Slider',
  component: UniSlider,
  tags: ['autodocs'],
} satisfies Meta<typeof UniSlider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Slider: Story = {
  args: {
    defaultValue: 30,
  },
};

export const Range: Story = {
  args: {
    range: true,
    defaultValue: [20, 60],
  },
};

export const SliderProgress: Story = {
  render: () => <UniSliderProgress defaultValue={50} />,
};
