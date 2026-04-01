import type { Meta, StoryObj } from '@storybook/react-vite';
import { UniInputPassword } from './UniInputPassword';

const meta = {
    title: 'ANT/Input-Password',
    component: UniInputPassword,
    tags: ['autodocs'],
    args: {
        placeholder: 'Enter password',
    },
} satisfies Meta<typeof UniInputPassword>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const CopyIcon: Story = {
    args: {
        placeholder: 'Password with custom icon',
        iconRender: (visible) => (visible ? <span>Visible</span> : <span>Hidden</span>),
    },
};
