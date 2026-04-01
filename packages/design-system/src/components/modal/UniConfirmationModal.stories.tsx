import type { Meta, StoryObj } from '@storybook/react-vite';
import { UniButton } from '../button/UniButton';
import { UniModalConfirm } from './UniModal';

const ConfirmationModalDemo = () => {
    const handleOpen = () => {
        UniModalConfirm({
            title: 'REACT-ONLY/Deactivate Users',
            content: (
                <div>
                    <div>This action will remove access from all Uniphore applications.</div>
                    <br />
                    <div>Are you sure you want to deactivate Remi Richards, Ava Whitehead, Ria Stephens?</div>
                </div>
            ),
            okText: "Yes, Deactivate Users",
            cancelText: "No, Keep Users Activate",
            width: '610px'
        });
    };

    return (
        <UniButton type="primary" onClick={handleOpen}>
            Open the Confirmation
        </UniButton>
    );
};

const meta = {
    title: 'ANT/Confirmation Modal',
    component: ConfirmationModalDemo,
    tags: ['autodocs'],
} satisfies Meta<typeof ConfirmationModalDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
