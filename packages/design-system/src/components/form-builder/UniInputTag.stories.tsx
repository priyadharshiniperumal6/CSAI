import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { UniInputTag } from './UniInputTag';

const meta = {
  title: 'REACT-ONLY/Components/FormBuilder/UniInputTag',
  component: UniInputTag,
  tags: ['autodocs'],
  render: props => {
    const [value, setValue] = useState(['Alpha', 'Beta']);
    return <UniInputTag {...props} value={value} onChange={setValue} />;
  },
} satisfies Meta<typeof UniInputTag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
