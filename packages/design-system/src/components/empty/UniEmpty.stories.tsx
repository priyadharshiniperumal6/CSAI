import type { Meta, StoryObj } from '@storybook/react-vite';
import { UniEmpty } from './UniEmpty';
import emptyImage from '../../assets/images/empty-img-default.svg';


const meta = {
  title: 'Ant/Empty',
  component: UniEmpty,
  tags: ['autodocs'],
  args: {
    params: {
      props: {
        image: emptyImage || '',
        title: 'No items found.',
        description: 'Try adjusting your filters',
      },
    },
  },
} satisfies Meta<typeof UniEmpty>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
