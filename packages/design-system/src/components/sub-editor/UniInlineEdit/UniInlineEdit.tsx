import { ChangeEvent, ComponentProps, useEffect, useMemo, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import classNames from 'classnames';

import { UniInput } from '../../input/UniInput';
import { UniMaterialIcon } from '../../icon';
import { UniPopConfirm } from '../../popconfirm/UniPopConfirm';
import { UniPopForm } from '../../form-builder/UniPopForm';
import type { UniPopFormProps } from '../../form-builder/UniPopForm';
import type { UniFormBuilderRef } from '../../form-builder/types';

import './UniInlineEdit.scss';

export type InlineEditData = {
  title: string;
  subtitle?: string;
  deletable?: boolean;
  inlineEditable?: boolean;
  editInForm?: boolean;
};

export type InlineEditPopoverForm = Omit<UniPopFormProps, 'children' | 'onCancel' | 'onSaveFormData' | 'onPopOverClose'>;

export type UniInlineEditProps = {
  data: InlineEditData;
  id: string;
  editPopoverForm?: InlineEditPopoverForm;
  deleteConfirmMessage?: string;
  additionalProps?: Partial<ComponentProps<typeof UniInput>>;
  inputPattern?: string;
  disableSaveIcon?: boolean;
  onInlineEdit?: (id: string) => void;
  onInlineEditDelete?: (id: string) => void;
  onInlineEditSave?: (payload: { data: string; id: string }) => void;
  onInineEditCancel?: (id: string) => void;
  onPopoverSave?: (values: Record<string, any>) => void;
  onPopoverCancel?: () => void;
  onPopoverClose?: (values: Record<string, any>) => void;
  onConfirmDelete?: (id: string) => void;
  onCancelDelete?: (id: string) => void;
};

type UniPopFormHandle = {
  openPopForm: () => void;
  closePopForm: () => void;
  formRef: UniFormBuilderRef | null;
};

const POPOVER_CANCEL_BUTTON_LABEL = 'Cancel';
const POPOVER_SAVE_BUTTON_LABEL = 'Save';
const POPOVER_DELETE_CONFIRM_LABEL = 'Confirm';
const POPOVER_DELETE_CANCEL_LABEL = 'No';
const DEFAULT_DELETE_CONFIRM_MESSAGE = 'Are you sure you want to delete this item?';

export const UniInlineEdit = ({
  data,
  id,
  editPopoverForm,
  deleteConfirmMessage = DEFAULT_DELETE_CONFIRM_MESSAGE,
  additionalProps,
  inputPattern,
  disableSaveIcon = false,
  onInlineEdit,
  onInlineEditDelete,
  onInlineEditSave,
  onInineEditCancel,
  onPopoverSave,
  onPopoverCancel,
  onPopoverClose,
  onConfirmDelete,
  onCancelDelete,
}: UniInlineEditProps) => {
  const [inEditMode, setInEditMode] = useState(false);
  const [title, setTitle] = useState(data.title ?? '');

  const inputRef = useRef<InputRef | null>(null);
  const popFormRef = useRef<UniPopFormHandle | null>(null);

  useEffect(() => {
    setTitle(data.title ?? '');
  }, [data.title]);

  const regex = useMemo(() => {
    if (!inputPattern) {
      return null;
    }
    try {
      return new RegExp(inputPattern);
    } catch {
      return null;
    }
  }, [inputPattern]);

  const displayIcon = !inEditMode || (inEditMode && data.editInForm);

  const handleEditClick = () => {
    if (data.inlineEditable) {
      inputRef.current?.focus({ cursor: 'end' });
    }
    setInEditMode(true);
    onInlineEdit?.(id);
  };

  const handleDeleteClick = () => {
    setInEditMode(true);
    onInlineEditDelete?.(id);
  };

  const handleSave = () => {
    if (disableSaveIcon) {
      return;
    }
    if (regex && !regex.test(title ?? '')) {
      return;
    }
    setInEditMode(false);
    onInlineEditSave?.({ data: title ?? '', id });
  };

  const handleCancel = () => {
    setInEditMode(false);
    onInineEditCancel?.(id);
  };

  const handlePopoverSave = (values: Record<string, any>) => {
    setInEditMode(false);
    onPopoverSave?.(values);
  };

  const handlePopoverCancel = () => {
    setInEditMode(false);
    onPopoverCancel?.();
  };

  const handlePopoverClose = (open: boolean) => {
    if (open) {
      return;
    }
    const values = popFormRef.current?.formRef?.form?.getFieldsValue?.();
    if (values) {
      setInEditMode(false);
      onPopoverClose?.(values);
    }
  };

  const displaySaveActions = inEditMode && data.inlineEditable;

  const editIcon = (
    <UniMaterialIcon
      iconName="edit"
      size={16}
      colorClass="inline-edit-icon"
      className="icon-init icon-display"
      onClick={handleEditClick}
      aria-label="Edit inline content"
    />
  );

  const renderEditAction = () => {
    if (!displayIcon) {
      return null;
    }
    if (data.inlineEditable) {
      return editIcon;
    }
    if (data.editInForm && editPopoverForm) {
      return (
        <UniPopForm
          {...editPopoverForm}
          ref={instance => {
            popFormRef.current = instance;
          }}
          onCancel={handlePopoverCancel}
          onSaveFormData={handlePopoverSave}
          onPopOverClose={handlePopoverClose}
          saveBtnLabel={editPopoverForm.saveBtnLabel ?? POPOVER_SAVE_BUTTON_LABEL}
          cancelBtnLabel={editPopoverForm.cancelBtnLabel ?? POPOVER_CANCEL_BUTTON_LABEL}
        >
          {editIcon}
        </UniPopForm>
      );
    }
    return null;
  };

  return (
    <div className="w-full uni-inline-edit">
      <div className="inline-content-edit">
        <div className="inline-content">
          <UniInput
            ref={inputRef}
            id={`input-${id}`}
            readOnly={!inEditMode}
            type="text"
            className={classNames('panel-row-title', { 'panel-row-title-with-border': inEditMode })}
            value={title}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
            {...additionalProps}
          />
          <div className="icons-wrapper">
            {renderEditAction()}
            {displayIcon && data.deletable ? (
              <UniPopConfirm
                title={deleteConfirmMessage}
                arrow={{ pointAtCenter: true }}
                placement="left"
                okText={POPOVER_DELETE_CONFIRM_LABEL}
                cancelText={POPOVER_DELETE_CANCEL_LABEL}
                onConfirm={() => {
                  setInEditMode(false);
                  onConfirmDelete?.(id);
                }}
                onCancel={() => {
                  setInEditMode(false);
                  onCancelDelete?.(id);
                }}
              >
                <UniMaterialIcon
                  iconName="delete"
                  size={18}
                  colorClass="inline-delete-icon icon-init icon-display"
                  onClick={handleDeleteClick}
                  aria-label="Delete inline content"
                />
              </UniPopConfirm>
            ) : null}
          </div>
        </div>
        {displaySaveActions ? (
          <div className="panel-row-section">
            <div className={classNames('save-inline-edits-Icons-wrap', { visible: inEditMode })}>
              <UniMaterialIcon
                className={classNames('save-inline-submit-icon', {
                  'cursor-not-allowed': disableSaveIcon,
                  'cursor-pointer': !disableSaveIcon,
                })}
                iconName="done"
                size={20}
                colorClass="text-neutral-100"
                onClick={handleSave}
                aria-label="Save inline edit"
              />
              <UniMaterialIcon
                className="save-inline-cancel-icon cursor-pointer"
                iconName="close"
                size={20}
                colorClass="text-neutral-100"
                onClick={handleCancel}
                aria-label="Cancel inline edit"
              />
            </div>
          </div>
        ) : null}
      </div>
      {data.subtitle ? <pre className="panel-row-subtitle m-0">{data.subtitle}</pre> : null}
    </div>
  );
};
