import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { UniModalForm } from './UniModalForm';
import { UniButton } from '../button/UniButton';
import type { UniFormElementMeta } from './types';

const uniFormData = {
    name: 'Name',
    url: 'https://example.com',
    description: 'Sample description',
    type: 'female',
    checkbox: true,
    switch: true,
    radio: 'EXPORT_METADATA_FORMAT_CSV',
};

const uniFormMeta: UniFormElementMeta[] = [
    {
        label: 'Checkbox',
        key: 'checkbox',
        type: 'checkbox',
        rules: [{ required: true }],
    },
    {
        label: 'Name',
        key: 'name',
        type: 'input',
        rules: [{ required: true }],
    },
    {
        label: 'URL',
        key: 'url',
        type: 'input',
        bindProps: { addonBefore: 'https://' },
        rules: [{ required: true }],
    },
    {
        label: 'Description',
        key: 'description',
        type: 'textarea',
        rules: [{ required: true }],
    },
    {
        label: 'Type',
        key: 'type',
        type: 'select',
        options: [
            { label: 'Male', value: 'male', disabled: true },
            { label: 'Female', value: 'female' },
        ],
        rules: [{ required: true, message: 'Please select your gender!' }],
    },
    {
        label: 'Radio',
        key: 'radio',
        type: 'radio-group',
        options: [
            { label: 'CSV', value: 'EXPORT_METADATA_FORMAT_CSV' },
            { label: 'JSON', value: 'EXPORT_METADATA_FORMAT_JSON' },
        ],
    },
    {
        label: 'Toggle Me',
        key: 'switch',
        type: 'switch',
    },
];

const meta = {
    title: 'REACT-ONLY/Ant/ModalForm',
    component: UniModalForm,
    tags: ['autodocs'],
    args: {
        title: 'Create New Intent',
        subTitle: 'Add new Intent for a User',
        saveBtnLabel: 'Save',
        cancelBtnLabel: 'Cancel',
        uniFormData,
        uniFormMeta,
    },
} satisfies Meta<typeof UniModalForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    render: (args) => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <UniButton type="primary" onClick={() => setOpen(true)}>
                    Open ModalForm
                </UniButton>
                <UniModalForm {...args} open={open} onOpenChange={setOpen} />
            </>
        );
    },
};
