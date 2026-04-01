import type { Meta, StoryObj } from '@storybook/react-vite';
import { UniTag } from './UniTag';

const meta = {
  title: 'ANT/Tag',
  component: UniTag,
  tags: ['autodocs'],
  args: {
    children: 'United',
  },
} satisfies Meta<typeof UniTag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <UniTag {...args} type="tag">
        {args.children}
      </UniTag>
      <UniTag
        {...args}
        type="tag"
        size="small"
        bordered={false}
        startIcon={{ iconName: 'visibility_off', size: 14 }}
      >
        {args.children}
      </UniTag>
      <UniTag
        {...args}
        type="tag"
        closable
        onClose={() => console.log('close')}
        textColor="#0052cc"
        borderColor="#2684ff"
        backgroundColor="#deebff"
      >
        {args.children}
      </UniTag>
    </div>
  ),
};
