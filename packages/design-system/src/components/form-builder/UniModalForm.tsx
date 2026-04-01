import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import { UniModal } from '../modal/UniModal';
import { UniButton } from '../button/UniButton';

import { UniFormBuilder } from './UniFormBuilder';
import type { UniFormBuilderProps } from './UniFormBuilder';
import type { UniFormBuilderRef } from './types';

export type UniModalFormProps = {
  title: string;
  subTitle?: string;
  saveBtnLabel?: string;
  cancelBtnLabel?: string;
  open?: boolean;
  closable?: boolean;
  isSubmitLoading?: boolean;
  children?: ReactNode;
} & Omit<UniFormBuilderProps, 'onChange'> & {
  onOpenChange?: (open: boolean) => void;
  onCancel?: () => void;
  onClose?: () => void;
  onSaveFormData?: (values: Record<string, any>) => void;
};

export type UniModalFormRef = {
  formRef: UniFormBuilderRef | null;
};

export const UniModalForm = forwardRef<UniModalFormRef, UniModalFormProps>(
  (
    {
      title,
      subTitle,
      saveBtnLabel = 'Save',
      cancelBtnLabel = 'Cancel',
      open,
      closable = true,
      isSubmitLoading = false,
      children,
      uniFormMeta,
      uniFormData,
      onOpenChange,
      onCancel,
      onClose,
      onSaveFormData,
      ...formProps
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState(open ?? false);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [loading, setLoading] = useState(isSubmitLoading);
    const formRef = useRef<UniFormBuilderRef | null>(null);

    useEffect(() => {
      if (open !== undefined) {
        setInternalOpen(open);
      }
    }, [open]);

    useEffect(() => {
      setLoading(isSubmitLoading);
    }, [isSubmitLoading]);

    useImperativeHandle(ref, () => ({ formRef: formRef.current }), []);

    const closeModal = () => {
      setInternalOpen(false);
      onOpenChange?.(false);
      formRef.current?.form.resetFields();
    };

    const handleCancel = () => {
      closeModal();
      onCancel?.();
    };

    const handleClose = () => {
      closeModal();
      onClose?.();
    };

    const handleSave = () => {
      formRef.current?.form
        .validateFields()
        .then(values => {
          closeModal();
          onSaveFormData?.(values);
        })
        .catch(() => undefined);
    };

    return (
      <>
        {children}
        <UniModal
          title={title}
          open={internalOpen}
          onCancel={handleClose}
          footer={null}
          maskClosable={false}
          keyboard={false}
          closable={closable}
          className="modal-form-wrapper"
        >
          <div className="modal-form-content flex w-full flex-col">
            <div className="px-5">
              {subTitle ? <div className="form-sub-title-wrapper text-sm font-normal">{subTitle}</div> : null}
              <div className="pt-6">
                <UniFormBuilder
                  {...formProps}
                  uniFormMeta={uniFormMeta}
                  uniFormData={uniFormData}
                  ref={instance => {
                    formRef.current = instance;
                  }}
                  onIsUniFormValid={valid => {
                    setDisableSubmit(!valid);
                    formProps.onIsUniFormValid?.(valid);
                  }}
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2.5 pr-5 pt-1">
              <UniButton onClick={handleCancel}>{cancelBtnLabel}</UniButton>
              <UniButton type="primary" disabled={disableSubmit} loading={loading} onClick={handleSave}>
                {saveBtnLabel}
              </UniButton>
            </div>
          </div>
        </UniModal>
      </>
    );
  }
);

UniModalForm.displayName = 'UniModalForm';
