import type { Meta, StoryObj } from '@storybook/react-vite';

import { UniConfigProvider } from './UniConfigProvider';
import { UniButton } from '../button/UniButton';

const meta = {
  title: 'REACT-ONLY/Components/ConfigProvider',
  component: UniConfigProvider,
} satisfies Meta<typeof UniConfigProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UniConfigProvider>
      <UniButton type="primary">Inside provider</UniButton>
    </UniConfigProvider>
  ),
};
