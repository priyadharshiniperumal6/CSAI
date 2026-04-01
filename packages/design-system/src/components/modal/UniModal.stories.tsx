import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { UniModal } from './UniModal';
import { UniButton } from '../button/UniButton';

const meta = {
  title: 'ANT/Modal',
  component: UniModal,
  tags: ['autodocs'],
} satisfies Meta<typeof UniModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <UniButton type="primary" onClick={() => setOpen(true)}>
          Open Modal
        </UniButton>
        <UniModal
          open={open}
          title="Title"
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          footerOkLabel="Okay"
          footerCancelLabel="Cancel"
          closable={false}
        >
          <p>Basic modal content...</p>
        </UniModal>
      </>
    );
  },
};

export const ModalWithoutFooter: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <UniButton type="primary" onClick={() => setOpen(true)}>
          Open Modal - Modal without footer
        </UniButton>
        <UniModal open={open} title="Title" footer={null} onCancel={() => setOpen(false)}>
          <p>Basic modal content...</p>
        </UniModal>
      </>
    );
  },
};

export const customizeModalWidth: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <UniButton type="primary" onClick={() => setOpen(true)}>
          Open Modal - Customized modal width
        </UniButton>
        <UniModal open={open} title="Title" width={800} footer={null} onCancel={() => setOpen(false)}>
          <p>Customized modal width content...</p>
        </UniModal>
      </>
    );
  },
};

export const fullScreenModal: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <UniButton type="primary" onClick={() => setOpen(true)}>
          Open Modal - full screen modal
        </UniButton>
        <UniModal
          open={open}
          title="Title"
          width="100%"
          footer={null}
          onCancel={() => setOpen(false)}
          wrapClassName="full-view-modal"
        >
          <p>Full screen modal content...</p>
        </UniModal>
      </>
    );
  },
};

export const modalWithAsyncLogic: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleOk = () => {
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 2000);
    };

    return (
      <>
        <UniButton type="primary" onClick={() => setOpen(true)}>
          Open Modal - Async
        </UniButton>
        <UniModal
          open={open}
          title="Title"
          isSubmitBtnLoading={confirmLoading}
          onOk={handleOk}
          onCancel={() => setOpen(false)}
        >
          <p>Click on Ok to view the async logic...</p>
        </UniModal>
      </>
    );
  },
};

export const customizeFooterButtonDisabled: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <UniButton type="primary" onClick={() => setOpen(true)}>
          Open Modal - customizeFooterButtonDisabled
        </UniButton>
        <UniModal
          open={open}
          title="Title"
          isOkBtnDisabled
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        >
          <p>Modal with disabled OK button</p>
        </UniModal>
      </>
    );
  },
};

export const ModalWithoutBackgroundColor: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <UniButton type="primary" onClick={() => setOpen(true)}>
          Open Modal - ModalWithoutBackgroundColor
        </UniButton>
        <UniModal
          open={open}
          title="Title"
          disableModalMaskBgColor
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        >
          <p>Modal with no mask background color</p>
        </UniModal>
      </>
    );
  },
};

export const ModalCloseBlockedOnClickOutside: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <UniButton type="primary" onClick={() => setOpen(true)}>
          Open Modal - ModalCloseBlockedOnClickOutside
        </UniButton>
        <UniModal
          open={open}
          title="Title"
          maskClosable={false}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        >
          <p>Modal that cannot be closed by clicking the mask</p>
        </UniModal>
      </>
    );
  },
};
