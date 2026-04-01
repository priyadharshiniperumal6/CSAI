import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardView } from './CardView';

const meta = {
  title: 'UNI-COMPONENTS/WithCardView',
  component: CardView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CardView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CardView />,
};
