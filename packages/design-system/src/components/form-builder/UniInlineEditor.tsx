import { useEffect, useMemo, useState } from 'react';
import { Form } from 'antd';

import type { UniFormElementEditMeta } from './types';
import { UniFormElementContainer } from './UniFormElementContainer';
import { UniButton } from '../button/UniButton';

import './UniInlineEditor.scss';

export type UniInlineEditorProps = {
  field: UniFormElementEditMeta<any>;
  displayText?: string | number | null;
  editModeEnabled?: boolean;
  fieldValue?: any;
  showProgress?: boolean;
  onEnableEdit?: (fieldKey: string) => void;
  onCancelEdit?: (fieldKey: string) => void;
  onSaveEdit?: (value: Record<string, any>) => void;
};

export const UniInlineEditor = ({
  field,
  displayText,
  editModeEnabled = false,
  fieldValue,
  showProgress = false,
  onEnableEdit,
  onCancelEdit,
  onSaveEdit,
}: UniInlineEditorProps) => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(editModeEnabled);
  const [saveEnabled, setSaveEnabled] = useState(true);

  useEffect(() => {
    if (editModeEnabled) {
      form.setFieldsValue({ [field.key]: fieldValue });
    }
    setIsEditing(editModeEnabled);
  }, [editModeEnabled, field.key, fieldValue, form]);

  const valueToDisplay = useMemo(() => {
    if (displayText !== undefined && displayText !== null) {
      return displayText;
    }
    return fieldValue ?? '';
  }, [displayText, fieldValue]);

  const handleEnable = () => {
    if (field.allowEdit !== false) {
      setIsEditing(true);
      form.setFieldsValue({ [field.key]: fieldValue });
      onEnableEdit?.(field.key);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    onCancelEdit?.(field.key);
  };

  const handleSave = () => {
    form
      .validateFields()
      .then(values => {
        setIsEditing(false);
        onSaveEdit?.(values);
      })
      .catch(() => undefined);
  };

  return (
    <div className="uni-inline-editor">
      {!isEditing ? (
        <div
          role="button"
          className="inline-display"
          onClick={handleEnable}
          tabIndex={0}
          onKeyDown={event => event.key === 'Enter' && handleEnable()}
        >
          {valueToDisplay ?? '-'}
        </div>
      ) : (
        <div className="inline-editor">
          <Form
            form={form}
            layout="vertical"
            onFieldsChange={(_, allFields) => {
              const hasError = allFields.some(fieldState => (fieldState.errors?.length ?? 0) > 0);
              setSaveEnabled(!hasError);
            }}
          >
            <UniFormElementContainer
              formElementMeta={field}
              form={form}
              className="mb-0"
              onBlur={() => undefined}
              onDropdownVisibleChange={() => undefined}
              onCustomComponentValid={() => undefined}
              renderChild={() => null}
            />
          </Form>
          <div className="inline-actions">
            <UniButton
              id="save"
              type="text"
              size="small"
              loading={showProgress}
              disabled={!saveEnabled}
              onClick={handleSave}
            >
              <span className="material-symbols-outlined text-sm">done</span>
            </UniButton>
            <UniButton id="cancel" type="text" size="small" onClick={handleCancel}>
              <span className="material-symbols-outlined text-sm">close</span>
            </UniButton>
          </div>
        </div>
      )}
    </div>
  );
};
