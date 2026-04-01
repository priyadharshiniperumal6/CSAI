import type { Meta, StoryObj } from '@storybook/react-vite';
import { UniSwitch } from './UniSwitch';

const meta = {
  title: 'REACT-ONLY/Ant/Switch',
  component: UniSwitch,
  tags: ['autodocs'],
} satisfies Meta<typeof UniSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: function Render() {
    return (
      <div style={{ display: 'flex', gap: '32px', padding: '20px', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3>Basic</h3>
          <UniSwitch defaultChecked />
          <UniSwitch />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3>Small</h3>
          <UniSwitch size="small" defaultChecked />
          <UniSwitch size="small" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3>Disabled</h3>
          <UniSwitch disabled defaultChecked />
          <UniSwitch disabled />
        </div>
      </div>
    );
  },
};
