import type { Meta, StoryObj } from '@storybook/react-vite';

import { UniMaterialIcon } from '../icon';
import { UniSegmented } from './UniSegmented';

const meta = {
  title: 'REACT-ONLY/Components/Segmented',
  component: UniSegmented,
  tags: ['autodocs'],
} satisfies Meta<typeof UniSegmented>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: ['Daily', 'Weekly', 'Monthly'],
    defaultValue: 'Daily',
  },
};

export const WithIcons: Story = {
  name: 'With icons (view toggle)',
  args: {
    defaultValue: 'grid',
    options: [
      {
        value: 'table',
        icon: (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UniMaterialIcon iconName="table_rows" size={16} />
          </span>
        ),
      },
      {
        value: 'grid',
        icon: (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UniMaterialIcon iconName="grid_view" size={16} />
          </span>
        ),
      },
    ],
  },
};
