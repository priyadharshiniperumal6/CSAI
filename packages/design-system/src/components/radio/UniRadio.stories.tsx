import type { Meta, StoryObj } from '@storybook/react-vite';

import { UniRadio, UniRadioGroup } from './UniRadio';

const meta = {
  title: 'ANT/Radio',
  component: UniRadio,
  tags: ['autodocs'],
  args: {
    children: 'Radio',
    checked: true,
  },
} satisfies Meta<typeof UniRadio>;

export default meta;

type Story = StoryObj<typeof meta>;

const options = [
  { label: 'USS', value: 'USS' },
  { label: 'UAssist', value: 'UAssist' },
  { label: 'UAnalyze', value: 'UAnalyze' },
];

export const Default: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '32px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3>Basic</h3>
        <UniRadio {...args}>{args.children}</UniRadio>
      </div>
    </div>
  ),
};

export const RadioGroupWithDefaultType: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3>Button Type</h3>
      <UniRadioGroup options={options} defaultValue="USS" />
    </div>
  ),
};

export const RadioGroupWithButtonType: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3>Button Type</h3>
      <UniRadioGroup options={options} defaultValue="USS" optionType="button" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3>Disabled RadioGroup</h3>
        <UniRadioGroup options={options} defaultValue="USS" optionType="button" disabled />
      </div>
      <div>
        <h3>Disabled Radio Option</h3>
        <UniRadioGroup
          options={[
            { label: 'USS', value: 'USS' },
            { label: 'UAssist', value: 'UAssist', disabled: true },
            { label: 'UAnalyze', value: 'UAnalyze' },
          ]}
          defaultValue="USS"
          optionType="button"
        />
      </div>
    </div>
  ),
};
