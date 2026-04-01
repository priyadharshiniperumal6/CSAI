import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { UniDrawer } from './UniDrawer';
import { UniButton } from '../button/UniButton';

const meta = {
  title: 'REACT-ONLY/Ant/Drawer',
  component: UniDrawer,
  tags: ['autodocs'],
} satisfies Meta<typeof UniDrawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [open, setOpen] = useState(true);
    return (
      <>
        <UniButton onClick={() => setOpen(true)}>Open drawer</UniButton>
        <UniDrawer open={open} onClose={() => setOpen(false)} title="Drawer">
          Drawer body
        </UniDrawer>
      </>
    );
  },
};
