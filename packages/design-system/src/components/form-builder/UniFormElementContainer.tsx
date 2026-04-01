import classNames from 'classnames';
import { Button, Tooltip, Form } from 'antd';
import type { FormInstance } from 'antd';
import type { ReactNode } from 'react';

import { UniFormElement } from './FormElement';
import type { UniFormElementMeta, UniFormSelectOption } from './types';

import './UniFormBuilder.scss';

type Props = {
  formElementMeta: UniFormElementMeta;
  form: FormInstance;
  className?: string;
  onDelete?: () => void;
  onBlur?: (values: Record<string, any>) => void;
  onDropdownVisibleChange?: (options?: UniFormSelectOption[]) => void;
  onCustomComponentValid?: (status: boolean) => void;
  renderChild: (child: UniFormElementMeta) => ReactNode;
};

const valuePropNameMap: Partial<Record<UniFormElementMeta['type'], string>> = {
  checkbox: 'checked',
  switch: 'checked',
  'file-drag-drop': 'fileList',
};

export const UniFormElementContainer = ({
  formElementMeta,
  form,
  className,
  onDelete,
  onBlur,
  onDropdownVisibleChange,
  onCustomComponentValid,
  renderChild,
}: Props) => {
  if (formElementMeta.hide) {
    return null;
  }

  const showDelete = formElementMeta.deleteConfig?.showDelete;
  const deleteClass = showDelete ? 'block' : formElementMeta.deleteConfig?.keepSpaceWhenHide ? 'invisible' : 'hidden';
  const required = formElementMeta.rules?.some(rule => (rule as any).required);

  const label =
    !formElementMeta.hideLabel && formElementMeta.type !== 'checkbox' ? (
      <div className="form-label-wrapper">
        <div
          className={classNames('flex items-center gap-1 text-sm font-normal text-primary-dark', {
            'ant-form-item-required': required,
          })}
          {...formElementMeta.labelBindProps}
        >
          {formElementMeta.label}
          {formElementMeta.labelInfo ? (
            <Tooltip title={formElementMeta.labelInfo.tooltip.title} {...formElementMeta.labelInfo.tooltip.bindProps}>
              <span>{formElementMeta.labelInfo.icon}</span>
            </Tooltip>
          ) : null}
        </div>
        {formElementMeta.secondaryLabel ? (
          <div className="text-sm font-normal text-primary-dark">{formElementMeta.secondaryLabel}</div>
        ) : null}
      </div>
    ) : undefined;

  return (
    <Form.Item
      name={formElementMeta.key}
      label={label}
      rules={formElementMeta.rules}
      help={formElementMeta.help}
      className={classNames(
        `${className ?? ''} uni-form-item-wrapper mb-4`,
        formElementMeta.secondaryLabel && 'form-secondary-label'
      )}
      valuePropName={valuePropNameMap[formElementMeta.type]}
      {...formElementMeta.containerBindProps}
    >
      <div className="w-full">
        <div className="uni-form-element-wrapper flex grow">
          <UniFormElement
            formElementMeta={formElementMeta}
            form={form}
            onBlur={onBlur}
            onCustomComponentValid={onCustomComponentValid}
            onDropdownVisibleChange={onDropdownVisibleChange}
            renderChild={renderChild}
          />
        </div>
        <div className={classNames('ml-3 flex items-center', deleteClass)}>
          <Button type="text" className="flex items-center p-0 text-color-icon" onClick={onDelete}>
            <span className="material-symbols-outlined">delete</span>
          </Button>
        </div>
      </div>
    </Form.Item>
  );
};
