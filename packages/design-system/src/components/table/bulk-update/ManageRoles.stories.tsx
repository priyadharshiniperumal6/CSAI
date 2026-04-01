import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ManageRoles } from './ManageRoles';

const roles = [
    { label: 'Admin 1', value: '1' },
    { label: 'SelfServe Editor', value: '2' },
    { label: 'Assist Viewer', value: '3' },
    { label: 'Assist Viewer 1', value: '4' },
    { label: 'Assist Viewer 2', value: '5' },
];

const meta = {
    title: 'Uni-Table/ManageRoles',
    component: ManageRoles,
    tags: ['autodocs'],
    args: {
        roles,
        handleSubmit: (result) => console.log('Submit:', result),
        handleOpen: () => console.log('Open'),
    },
    argTypes: {
        isOpen: {
            description: 'Controls the visibility of the dropdown.',
            control: 'boolean',
            table: { defaultValue: { summary: 'false' } },
        },
        roles: {
            description: 'List of all available roles.',
            table: { type: { summary: '{ label: string; value: string }[]' } },
        },
        selected: {
            description: 'Initial list of selected role IDs.',
            table: { type: { summary: 'string[]' } },
        },
        selectedUsers: {
            description: 'List of selected users for bulk action.',
            table: { type: { summary: 'any[]' } },
        },
        filteredUsers: {
            description: 'List of all filtered users for bulk action.',
            table: { type: { summary: 'any[]' } },
        },
        handleClose: {
            description: 'Callback when the modal/dropdown is closed.',
            table: { type: { summary: '() => void' } },
        },
        handleSubmit: {
            description: 'Callback when "Apply Changes" is clicked. Returns the selected action and roles/users.',
            table: { type: { summary: '(result: any) => void' } },
        },
        handleOpen: {
            description: 'Callback to open the modal/dropdown.',
            table: { type: { summary: '() => void' } },
        },
    },
} satisfies Meta<typeof ManageRoles>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        selected: ['1', '2', '3'],
    },
    render: (args) => {
        const [isOpen, setIsOpen] = useState(true);

        return (
            <div className="uni-container" style={{ minHeight: '310px', display: 'flex', gap: '16px' }}>
                <ManageRoles
                    {...args}
                    isOpen={isOpen}
                    handleClose={() => setIsOpen(false)}
                    handleOpen={() => setIsOpen(true)}
                />
            </div>
        );
    },
};
