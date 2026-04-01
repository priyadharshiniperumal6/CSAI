import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form } from 'antd';
import { UniFormElementContainer } from './UniFormElementContainer';
import type { UniFormElementMeta } from './types';

const meta = {
    title: 'ANT/FormElementContainer',
    component: UniFormElementContainer,
    tags: ['autodocs'],
    args: {
        formElementMeta: { key: 'test', label: 'Test', type: 'input' },
        form: {} as any,
        renderChild: () => null,
    },
} satisfies Meta<typeof UniFormElementContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MultiSelectValidation: Story = {
    render: () => {
        const [form] = Form.useForm();
        const managers = [
            { label: 'One', value: 1 },
            { label: 'Two', value: 2 },
            { label: 'Three', value: 3 },
        ];
        const formMeta: UniFormElementMeta = {
            label: 'Assigned Manager',
            key: 'manager',
            type: 'multiselect',
            options: managers,
            rules: [{ required: true }],
        };

        return (
            <Form form={form} initialValues={{ manager: null }}>
                <UniFormElementContainer
                    formElementMeta={formMeta}
                    form={form}
                    renderChild={() => null} // FormElementContainer handles rendering via UniFormElement internally, but the prop is required in types
                />
            </Form>
        );
    },
};
