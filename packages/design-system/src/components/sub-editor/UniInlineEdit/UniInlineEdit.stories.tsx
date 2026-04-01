import type { Meta, StoryObj } from '@storybook/react-vite';
import { UniInlineEdit } from './UniInlineEdit';

const meta = {
    title: 'REACT-ONLY/UNI-COMPONENTS/InlineEdit',
    component: UniInlineEdit,
    tags: ['autodocs'],
} satisfies Meta<typeof UniInlineEdit>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InlineContent: Story = {
    args: {
        id: '3333',
        data: {
            title: 'We need to know, what is favorite flavour of ice cream?',
            subtitle: 'Voice: Repaired',
            deletable: true,
            inlineEditable: true,
        },
        deleteConfirmMessage: 'Are you sure you want to delete this item?',
    },
};

export const InlineContentMultiple: Story = {
    args: {
        id: 'multiple-edit',
        data: { title: 'dummy' },
    },
    render: () => (
        <div className="flex flex-col gap-4">
            <UniInlineEdit
                id="3856"
                data={{
                    title: 'We need to know, what is favorite flavour of ice cream? ',
                    subtitle: 'Voice: Repaired',
                    deletable: false,
                    inlineEditable: true,
                }}
            />
            <UniInlineEdit
                id="3963"
                data={{
                    title: 'We need to know, what is favorite flavour of ice cream? ',
                    subtitle: '',
                    deletable: false,
                    inlineEditable: true,
                }}
            />
        </div>
    ),
};

export const InlineContentPopover: Story = {
    args: {
        id: 'popover-edit',
        data: {
            title: 'We need to know, what is favorite flavour of ice cream?',
            deletable: true,
            editInForm: true,
        },
        editPopoverForm: {
            title: 'Edit In Popover',
            metadata: [
                {
                    label: 'Dialog',
                    key: 'dialog',
                    type: 'input',
                    rules: [{ required: true }],
                },
                {
                    label: 'Content Type',
                    key: 'contentType',
                    type: 'select',
                    options: [{ label: 'Voice', value: 'Voice' }],
                    rules: [{ required: true, message: 'Please select content type!' }],
                },
            ],
            data: {
                dialog: '',
                contentType: 'Voice',
            },
        },
    },
};
