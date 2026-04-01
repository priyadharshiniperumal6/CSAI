import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { UniSelectAddOption } from './UniSelectAddOption';

const meta = {
  title: 'REACT-ONLY/Components/Select/AddOption',
  component: UniSelectAddOption,
} satisfies Meta<typeof UniSelectAddOption>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [options, setOptions] = useState([
      { label: 'Item 1', value: '1' },
      { label: 'Item 2', value: '2' },
    ]);
    return (
      <UniSelectAddOption
        options={options}
        onAddValue={value => setOptions(prev => [...prev, { label: value, value }])}
        placeholder="Select value"
      />
    );
  },
};
