import type { Meta, StoryObj } from '@storybook/react-vite';
import { UniMaterialIcon } from './UniMaterialIcon';

const meta = {
    title: 'ICONS/Material-Icon',
    component: UniMaterialIcon,
    tags: ['autodocs'],
    argTypes: {
        iconName: { control: 'text' },
        size: { control: 'number' },
        colorClass: { control: 'text' },
        isIconFill: { control: 'boolean' },
        title: { control: 'text' },
    },
    args: {
        iconName: 'home',
        size: 24,
        isIconFill: false,
    },
} satisfies Meta<typeof UniMaterialIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MaterialIcon: Story = {
    render: (args) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <UniMaterialIcon {...args} iconName="home" />
                <span style={{ fontSize: '12px' }}>home</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <UniMaterialIcon {...args} iconName="settings" />
                <span style={{ fontSize: '12px' }}>settings</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <UniMaterialIcon {...args} iconName="notifications" badge={{ value: 5 }} />
                <span style={{ fontSize: '12px' }}>with badge</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <UniMaterialIcon {...args} iconName="favorite" isIconFill={true} colorClass="text-red-500" />
                <span style={{ fontSize: '12px' }}>filled</span>
            </div>
        </div>
    ),
};
