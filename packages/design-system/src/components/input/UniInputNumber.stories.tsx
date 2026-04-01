import type { Meta, StoryObj } from '@storybook/react-vite';
import { UniInputNumber } from './UniInputNumber';

const meta = {
    title: 'ANT/Input-Number',
    component: UniInputNumber,
    tags: ['autodocs'],
    args: {
        placeholder: 'Enter Number',
    },
} satisfies Meta<typeof UniInputNumber>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const CustomUpDownIcons: Story = {
    args: {
        placeholder: 'Custom Icons Placeholder',
        // In Antd React, custom icons for InputNumber are often handled via controls or CSS
        controls: true,
    },
};
