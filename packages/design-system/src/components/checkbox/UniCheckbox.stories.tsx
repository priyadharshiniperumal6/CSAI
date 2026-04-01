import type { Meta, StoryObj } from '@storybook/react-vite';
import { UniCheckbox } from './UniCheckbox';
import { UniCheckboxGroup } from './UniCheckboxGroup';

const meta = {
  title: 'ANT/Checkbox',
  component: UniCheckbox,
  tags: ['autodocs'],
  args: {
    checked: true,
    disabled: true,
  },
} satisfies Meta<typeof UniCheckbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render(args) {
    return (
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', gap: '32px' }}>
          <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
            <h3>Checked</h3>
            <UniCheckbox checked={args.checked} />
            <UniCheckbox checked={args.checked}>Select all</UniCheckbox>
            <UniCheckbox checked={args.checked} disabled={args.disabled}>
              Select all
            </UniCheckbox>
          </div>
          <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
            <h3>Unchecked</h3>
            <UniCheckbox checked={!args.checked} />
            <UniCheckbox checked={!args.checked}>Select all</UniCheckbox>
            <UniCheckbox checked={!args.checked} disabled={args.disabled}>
              Select all
            </UniCheckbox>
          </div>
          <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
            <h3>Indeterminate</h3>
            <UniCheckbox checked={args.checked} indeterminate={args.checked} />
            <UniCheckbox checked={args.checked} indeterminate={args.checked}>
              Select all
            </UniCheckbox>
            <UniCheckbox checked={args.checked} indeterminate={args.checked} disabled={args.disabled}>
              Select all
            </UniCheckbox>
          </div>
        </div>
        <h2 style={{ marginTop: '32px', marginBottom: '16px' }}>States</h2>
        <div style={{ display: 'flex', gap: '32px' }}>
          <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
            <h3>Default</h3>
            <UniCheckbox checked={args.checked}>Select all</UniCheckbox>
          </div>
          <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
            <h3>Hover</h3>
            <UniCheckbox checked={args.checked}>Select all</UniCheckbox>
          </div>
          <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
            <h3>Focused</h3>
            <UniCheckbox checked={args.checked}>Select all</UniCheckbox>
          </div>
          <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
            <h3>Disabled</h3>
            <UniCheckbox checked={args.checked} disabled={args.disabled}>
              Select all
            </UniCheckbox>
          </div>
        </div>
      </div>
    );
  },
};

export const Group: Story = {
  render: function Render() {
    return (
      <div style={{ padding: '20px' }}>
        <UniCheckboxGroup options={['A', 'B', 'C']} defaultValue={['A']} />
      </div>
    );
  },
};
