import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableUsers } from './TableUsers';

const meta = {
    title: 'Uni-Table/TableUsers',
    component: TableUsers,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            allowFullscreen: true,
            url: 'https://www.figma.com/file/b6boTncD51rMQAJ1Lga8gT/Accounts?type=design&node-id=1048-143231&mode=design&t=bvl0UtUQpn4aSD4n-0',
        },
    },
} satisfies Meta<typeof TableUsers>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: (args) => (
        <div style={{ height: '600px' }}>
            <TableUsers {...args} />
        </div>
    ),
};
