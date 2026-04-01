import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

import { UniPopover } from '../popover/UniPopover';
import { UniButton } from '../button/UniButton';

import { UniFormBuilder } from './UniFormBuilder';
import type { UniFormBuilderProps } from './UniFormBuilder';
import type { UniFormBuilderRef } from './types';

type UniPopFormRef = {
  openPopForm: () => void;
  closePopForm: () => void;
  formRef: UniFormBuilderRef | null;
};

export type UniPopFormProps = {
  title: string;
  subTitle?: string;
  saveBtnLabel?: string;
  cancelBtnLabel?: string;
  popOverPlacement?: 'leftTop' | 'topRight' | 'bottomLeft' | 'bottomRight';
  width?: string;
  maxWidth?: string;
  isSubmitLoading?: boolean;
  containerStyle?: CSSProperties;
  dynamicHeight?: string;
  children?: ReactNode;
} & Omit<UniFormBuilderProps, 'onChange'> & {
  onCancel?: () => void;
  onSaveFormData?: (values: Record<string, any>) => void;
  onPopOverClose?: (open: boolean) => void;
};

export const UniPopForm = forwardRef<UniPopFormRef, UniPopFormProps>(
  (
    {
      title,
      subTitle,
      saveBtnLabel = 'Save',
      cancelBtnLabel = 'Cancel',
      popOverPlacement = 'bottomLeft',
      width = '40vw',
      maxWidth = '40vw',
      isSubmitLoading = false,
      containerStyle,
      dynamicHeight,
      uniFormMeta,
      uniFormData,
      onCancel,
      onSaveFormData,
      onPopOverClose,
      children,
      ...formProps
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [loading, setLoading] = useState(isSubmitLoading);
    const [calculatedHeight, setCalculatedHeight] = useState<string | undefined>(dynamicHeight);
    const formRef = useRef<UniFormBuilderRef | null>(null);

    useEffect(() => {
      setLoading(isSubmitLoading);
    }, [isSubmitLoading]);

    useEffect(() => {
      if (dynamicHeight) {
        setCalculatedHeight(dynamicHeight);
        return;
      }

      const setPopoverHeight = () => {
        const viewportHeight = window.innerHeight;
        const maxHeight = viewportHeight * 0.4;
        setCalculatedHeight(`${maxHeight}px`);
      };

      setPopoverHeight();
      window.addEventListener('resize', setPopoverHeight);
      return () => window.removeEventListener('resize', setPopoverHeight);
    }, [dynamicHeight]);

    useImperativeHandle(
      ref,
      () => ({
        openPopForm: () => setOpen(true),
        closePopForm: () => setOpen(false),
        formRef: formRef.current,
      }),
      []
    );

    const contentStyle: CSSProperties = useMemo(
      () => ({
        maxHeight: calculatedHeight,
        overflowY: 'auto',
      }),
      [calculatedHeight]
    );

    const handleCancel = () => {
      formRef.current?.form.resetFields();
      setOpen(false);
      onCancel?.();
    };

    const handleSave = () => {
      formRef.current?.form
        .validateFields()
        .then(values => {
          setOpen(false);
          formRef.current?.form.resetFields();
          onSaveFormData?.(values);
        })
        .catch(() => undefined);
    };

    const handleVisibilityChange = (nextOpen: boolean) => {
      setOpen(nextOpen);
      onPopOverClose?.(nextOpen);
    };

    return (
      <UniPopover
        trigger="click"
        overlayClassName="no-padding form-popover-wrapper"
        placement={popOverPlacement}
        destroyTooltipOnHide
        open={open}
        overlayStyle={{ width, maxWidth }}
        onOpenChange={handleVisibilityChange}
        title={
          <div className="pl-5 pr-3 pt-5">
            <div className="form-title-wrapper text-base font-semibold">{title}</div>
            {subTitle ? <div className="form-sub-title-wrapper pt-3 text-sm font-normal">{subTitle}</div> : null}
          </div>
        }
        content={
          <div className="form-popover-content flex flex-col">
            <div className="pb-2 pl-5" style={containerStyle}>
              <div className="pr-5 pt-6" style={contentStyle}>
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
            <div className="footer-wrapper flex items-center justify-end gap-2.5 rounded-b-lg px-5">
              <UniButton type="text" onClick={handleCancel}>
                {cancelBtnLabel}
              </UniButton>
              <UniButton type="primary" disabled={disableSubmit} onClick={handleSave} loading={loading}>
                {saveBtnLabel}
              </UniButton>
            </div>
          </div>
        }
      >
        {children}
      </UniPopover>
    );
  }
);

UniPopForm.displayName = 'UniPopForm';
