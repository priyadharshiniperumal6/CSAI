import type { Meta, StoryObj } from '@storybook/react-vite';

import { UniButton } from '../button/UniButton';
import { useNotification, type NotificationProps } from './useNotification';

const NotificationGallery = () => {
  const { openNotification } = useNotification();

  const handleOpen = (type?: NotificationProps['type']) =>
    openNotification({
      message: 'Title Message',
      description: 'Description',
      type: type,
      duration: 0,
    });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '310px' }}>
      <UniButton type="primary" onClick={() => handleOpen()} style={{ width: '100%' }}>
        Open the Notification
      </UniButton>
      <UniButton type="primary" onClick={() => handleOpen('success')} style={{ width: '100%' }}>
        Open the Success Notification
      </UniButton>
      <UniButton type="primary" onClick={() => handleOpen('error')} style={{ width: '100%' }}>
        Open the Error Notification
      </UniButton>
      <UniButton type="primary" onClick={() => handleOpen('info')} style={{ width: '100%' }}>
        Open the Info Notification
      </UniButton>
      <UniButton type="primary" onClick={() => handleOpen('warning')} style={{ width: '100%' }}>
        Open the Warning Notification
      </UniButton>
    </div>
  );
};

const meta = {
  title: 'ANT/Notification',
  component: NotificationGallery,
  tags: ['autodocs'],
} satisfies Meta<typeof NotificationGallery>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
