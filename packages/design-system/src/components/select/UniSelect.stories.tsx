import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { UniSelect } from './UniSelect';
import { UniSelectAddOption } from './UniSelectAddOption';

const meta = {
  title: 'ANT/Select',
  component: UniSelect,
  tags: ['autodocs'],
} satisfies Meta<typeof UniSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { label: 'Label 1', value: 'value 1' },
  { label: 'Label 2', value: 'value 2', disabled: true },
  { label: 'Label 3', value: 'value 3' },
  { label: 'Label 4', value: 'value 4' },
  { label: 'Label 5', value: 'value 5' },
];

export const Basic: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Select Item',
    allowClear: true,
  },
  render: args => (
    <div style={{ width: '288px' }}>
      <h3>Single Select</h3>
      <UniSelect {...args} />
    </div>
  ),
};

export const MultiSelectWithSearch: Story = {
  args: {
    options: defaultOptions,
    mode: 'multiple',
    placeholder: 'Select Item',
  },
  render: args => (
    <div style={{ width: '288px' }}>
      <h3>Multi Select</h3>
      <UniSelect {...args} />
    </div>
  ),
};

export const SelectAsTags: Story = {
  args: {
    mode: 'tags',
    placeholder: 'Type word and press enter',
    defaultValue: ['chennai', 'madras'],
  },
  render: args => (
    <div style={{ width: '50%' }}>
      <h3>Select with Tag</h3>
      <UniSelect {...args} />
    </div>
  ),
};

export const SelectDisabled: Story = {
  args: {
    options: defaultOptions,
    disabled: true,
    placeholder: 'Select Item',
  },
  render: args => (
    <div style={{ width: '288px' }}>
      <h3>Select Disabled</h3>
      <UniSelect {...args} />
    </div>
  ),
};

export const AddOptionSelect: Story = {
  render: function Render() {
    const [options, setOptions] = useState([
      { label: 'red', value: 'red' },
      { label: 'green', value: 'green' },
      { label: 'blue', value: 'blue' },
      { label: 'cyan', value: 'cyan' },
    ]);
    return (
      <div style={{ width: '288px', marginTop: '32px' }}>
        <h3>Add Option Select</h3>
        <UniSelectAddOption
          options={options}
          onAddValue={value => setOptions(prev => [...prev, { label: value, value }])}
          placeholder="Select Item"
        />
      </div>
    );
  },
};

export const FilterVariant: Story = {
  name: 'Filter variant (toolbar / global filters)',
  render: () => {
    const options = [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
      { label: 'Pending', value: 'pending' },
    ];
    return (
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '16px' }}>
        <UniSelect variant="filter" placeholder="Status" options={options} style={{ minWidth: 100 }} />
        <UniSelect
          variant="filter"
          placeholder="Application"
          options={[
            { label: 'Contact Center', value: 'contact-center' },
            { label: 'Quality Management', value: 'quality' },
            { label: 'Agent Assist', value: 'agent-assist' },
          ]}
        />
      </div>
    );
  },
};

export const SelectWithSearchWithoutIcon: Story = {
  args: {
    options: [
      { label: 'red', value: 'red' },
      { label: 'green', value: 'green' },
      { label: 'blue', value: 'blue' },
      { label: 'cyan', value: 'cyan' },
    ],
    showSearch: true,
    placeholder: 'Add Entity or User Input',
    suffixIcon: null,
  },
  render: args => (
    <div style={{ width: '288px' }}>
      <h3>Select with search</h3>
      <UniSelect {...args} />
    </div>
  ),
};
