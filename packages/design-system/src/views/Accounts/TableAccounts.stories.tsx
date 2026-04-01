import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableAccounts } from './TableAccounts';
// import { allColors } from '../../theme/themeAntDesign';

import { TableParameters } from './components/TableParameters';
import { tableParameters, additionalParameters } from './table-parameters';

const meta = {
  title: 'Uni-Table/TableAccounts',
  component: TableAccounts,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      allowFullscreen: true,
      url: 'https://www.figma.com/file/b6boTncD51rMQAJ1Lga8gT/Accounts?type=design&node-id=1048-143231&mode=design&t=bvl0UtUQpn4aSD4n-0',
    },
  },
} satisfies Meta<typeof TableAccounts>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    rowSelection: 'multiple',
  },
  render: args => (
    <div style={{ height: '800px' }}>
      <TableAccounts {...args} />
    </div>
  ),
};

export const Parameters: Story = {
  render: () => (
    <div style={{ height: '500px' }}>
      <TableParameters tableParameters={tableParameters} />
    </div>
  ),
};

export const AdditionalParameters: Story = {
  render: () => (
    <div style={{ height: '800px' }}>
      <TableParameters tableParameters={additionalParameters} />
    </div>
  ),
};
