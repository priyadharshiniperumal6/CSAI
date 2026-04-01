import type { Meta, StoryObj } from '@storybook/react-vite';
import { UniIcon } from './UniIcon';

const meta = {
    title: 'ICONS/Uniphore-Icon',
    component: UniIcon,
    tags: ['autodocs'],
    argTypes: {
        iconName: { control: 'text' },
        size: { control: 'number' },
        colorClass: { control: 'text' },
        title: { control: 'text' },
    },
    args: {
        iconName: 'uni-home',
        size: 24,
    },
} satisfies Meta<typeof UniIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MaterialIcon: Story = {
    render: (args) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <UniIcon {...args} iconName="uni-home" />
                <span style={{ fontSize: '12px' }}>uni-home</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <UniIcon {...args} iconName="uni-bell" badge={{ value: 3 }} />
                <span style={{ fontSize: '12px' }}>with badge</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <UniIcon {...args} iconName="uni-user" size={40} />
                <span style={{ fontSize: '12px' }}>large</span>
            </div>
        </div>
    ),
};
