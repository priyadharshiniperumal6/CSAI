import type { Meta, StoryObj } from '@storybook/react-vite';
import { UniPopover } from './UniPopover';
import { UniButton } from '../button/UniButton';
import { UniInput } from '../input/UniInput';
import { UniIcon } from '../icon/UniIcon';

const meta = {
  title: 'ANT/Popover',
  component: UniPopover,
  tags: ['autodocs'],
} satisfies Meta<typeof UniPopover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render(args) {
    return (
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center', padding: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <UniPopover
            {...args}
            title="Title1"
            content={
              <div>
                <p>Content1</p>
                <p>Content2</p>
              </div>
            }
            placement="right"
            destroyTooltipOnHide
          >
            <UniButton type="primary">Hover me</UniButton>
          </UniPopover>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <UniPopover
            {...args}
            trigger="click"
            title="Title"
            content={
              <div>
                <p>Content1</p>
                <p>Content2</p>
              </div>
            }
            placement="right"
            destroyTooltipOnHide
          >
            <UniButton type="primary">Click me</UniButton>
          </UniPopover>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <UniPopover
            {...args}
            trigger="click"
            placement="bottom"
            title={<div>Add New Intent</div>}
            destroyTooltipOnHide
            content={
              <div style={{ padding: '20px', position: 'relative', width: '400px', height: '192px' }}>
                <div style={{ display: 'flex', marginBottom: '16px', alignItems: 'center' }}>
                  <div style={{ width: '40%' }}>Intent Name</div>
                  <div style={{ width: '60%' }}>
                    <UniInput type="text" className="w-full" />
                  </div>
                </div>
                <div style={{ display: 'flex', marginBottom: '16px', alignItems: 'center' }}>
                  <div style={{ width: '40%' }}>Intent Description</div>
                  <div style={{ width: '60%' }}>
                    <UniInput type="text" className="w-full" />
                  </div>
                </div>
                <div style={{ position: 'absolute', bottom: '16px', right: '16px', display: 'flex', gap: '8px' }}>
                  <UniButton type="default">Cancel</UniButton>
                  <UniButton type="primary">Add Intent</UniButton>
                </div>
              </div>
            }
          >
            <UniButton type="primary">
              <UniIcon iconName="uni-add" size={16} colorClass="text-primary6 align-text-bottom mr-1" />
              Add New Intent
            </UniButton>
          </UniPopover>
        </div>
      </div>
    );
  },
};
