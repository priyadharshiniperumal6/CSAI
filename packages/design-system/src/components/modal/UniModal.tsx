import { forwardRef, useImperativeHandle } from 'react';
import { Modal } from 'antd';
import type { ModalProps } from 'antd';

import { UniButton } from '../button/UniButton';

export type UniModalProps = ModalProps & {
  footerOkLabel?: string;
  footerCancelLabel?: string;
  isCancelBtnDisabled?: boolean;
  isOkBtnDisabled?: boolean;
  isSubmitBtnLoading?: boolean;
  showCancelBtn?: boolean;
  disableModalMaskBgColor?: boolean;
  maskClosable?: boolean;
};

export const UniModal = forwardRef<{ okModalEventHandler: () => void; cancelModalEventHandler: () => void }, UniModalProps>(
  (
    {
      footerOkLabel = 'Ok',
      footerCancelLabel = 'Cancel',
      isCancelBtnDisabled,
      isOkBtnDisabled,
      isSubmitBtnLoading,
      showCancelBtn = true,
      disableModalMaskBgColor,
      maskClosable,
      onOk,
      onCancel,
      ...rest
    },
    ref
  ) => {
    const okModalEventHandler = () => {
      onOk?.(undefined as any);
    };
    const cancelModalEventHandler = () => {
      onCancel?.(undefined as any);
    };

    useImperativeHandle(ref, () => ({
      okModalEventHandler,
      cancelModalEventHandler,
    }));

    return (
      <Modal
        {...rest}
        onOk={okModalEventHandler}
        onCancel={cancelModalEventHandler}
        maskClosable={maskClosable}
        maskStyle={disableModalMaskBgColor ? { background: 'unset' } : {}}
        footer={
          <div>
            {showCancelBtn ? (
              <UniButton onClick={cancelModalEventHandler} disabled={isCancelBtnDisabled}>
                {footerCancelLabel}
              </UniButton>
            ) : null}
            <UniButton type="primary" onClick={okModalEventHandler} disabled={isOkBtnDisabled} loading={isSubmitBtnLoading}>
              {footerOkLabel}
            </UniButton>
          </div>
        }
      />
    );
  }
);

UniModal.displayName = 'UniModal';

export const UniModalConfirm = Modal.confirm;
export const UniModalInfo = Modal.info;
export const UniModalSuccess = Modal.success;
export const UniModalError = Modal.error;
export const UniModalWarning = Modal.warning;
