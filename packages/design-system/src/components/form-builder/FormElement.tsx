import { createElement, Fragment } from 'react';
import { DatePicker, Form, Input, InputNumber, Select, Switch, TreeSelect, Upload } from 'antd';
import type { FormInstance } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import { UniInput } from '../input/UniInput';
import { UniInputPassword } from '../input/UniInputPassword';
import { UniTextarea } from '../textarea/UniTextarea';
import { UniCheckbox } from '../checkbox/UniCheckbox';
import { UniCheckboxGroup } from '../checkbox/UniCheckboxGroup';
import { UniRadio, UniRadioGroup } from '../radio/UniRadio';
import { UniButton } from '../button/UniButton';
import { UniRangePicker } from '../date-picker/UniDatePicker';
import { UniTimePicker } from '../time-picker/UniTimePicker';
import { UniInputTag } from './UniInputTag';

import type { UniFormElementMeta, UniFormSelectOption } from './types';

type Props = {
  formElementMeta: UniFormElementMeta;
  form: FormInstance;
  onBlur?: (values: Record<string, any>) => void;
  onCustomComponentValid?: (status: boolean) => void;
  onDropdownVisibleChange?: (options?: UniFormSelectOption[]) => void;
  renderChild: (childMeta: UniFormElementMeta) => React.ReactNode;
};

export const UniFormElement = ({
  formElementMeta,
  form,
  onBlur,
  onCustomComponentValid,
  onDropdownVisibleChange,
  renderChild,
}: Props) => {
  const componentProps = formElementMeta.bindProps ?? {};
  const eventProps = formElementMeta.onEvent ?? {};
  const sharedProps = { ...componentProps, ...eventProps };
  const value = Form.useWatch(formElementMeta.key, form);

  const triggerBlur = () => {
    onBlur?.(form.getFieldsValue(true));
  };

  const handleDropdownVisible = (visible: boolean) => {
    if (visible && formElementMeta.options) {
      onDropdownVisibleChange?.(formElementMeta.options);
    }
  };

  switch (formElementMeta.type) {
    case 'input':
      return <UniInput {...sharedProps} autoComplete="off" onBlur={triggerBlur} />;
    case 'password':
      return <UniInputPassword {...sharedProps} autoComplete="off" onBlur={triggerBlur} />;
    case 'textarea':
      return <UniTextarea {...sharedProps} rows={2} onBlur={triggerBlur} />;
    case 'inputNumber':
      return <InputNumber {...sharedProps} type="number" onBlur={triggerBlur} />;
    case 'checkbox':
      return (
        <UniCheckbox {...sharedProps} onBlur={triggerBlur}>
          <div className="flex items-center gap-1">
            {formElementMeta.label}
            {formElementMeta.labelInfo ? createElement(Fragment, {}, formElementMeta.labelInfo.icon) : null}
          </div>
        </UniCheckbox>
      );
    case 'checkbox-group':
      return (
        <UniCheckboxGroup {...sharedProps}>
          {formElementMeta.options?.map(option => (
            <UniCheckbox key={option.value} value={option.value}>
              {option.label}
            </UniCheckbox>
          ))}
        </UniCheckboxGroup>
      );
    case 'radio-group':
      return (
        <UniRadioGroup {...sharedProps}>
          {formElementMeta.options?.map(option => (
            <UniRadio key={option.value} value={option.value}>
              {option.label}
            </UniRadio>
          ))}
        </UniRadioGroup>
      );
    case 'select':
      return (
        <Select
          {...sharedProps}
          options={formElementMeta.options}
          onDropdownVisibleChange={handleDropdownVisible}
          onBlur={triggerBlur}
        />
      );
    case 'multiselect':
      return (
        <Select
          {...sharedProps}
          mode="multiple"
          options={formElementMeta.options?.map(option => ({
            ...option,
            value: formElementMeta.keyForValueInOptions ? (option.value as any)?.[formElementMeta.keyForValueInOptions] : option.value,
          }))}
          onBlur={triggerBlur}
        />
      );
    case 'tree-select':
      return <TreeSelect {...sharedProps} />;
    case 'switch':
      return <Switch {...sharedProps} />;
    case 'rangePicker':
      return <UniRangePicker {...sharedProps} onBlur={triggerBlur} />;
    case 'date':
      return <DatePicker {...sharedProps} onBlur={triggerBlur} />;
    case 'time-picker':
      return <UniTimePicker {...sharedProps} onBlur={triggerBlur} />;
    case 'formItem-group':
      return <div {...formElementMeta.bindProps}>{formElementMeta.children?.map(child => renderChild(child))}</div>;
    case 'input-group':
      return (
        <Input.Group compact {...formElementMeta.bindProps}>
          {formElementMeta.children?.map(child => (
            <Form.Item key={child.key} name={child.key} rules={child.rules} {...child.containerBindProps}>
          <UniFormElement
            formElementMeta={child}
            form={form}
            onBlur={onBlur}
            onCustomComponentValid={onCustomComponentValid}
            onDropdownVisibleChange={onDropdownVisibleChange}
            renderChild={renderChild}
          />
            </Form.Item>
          ))}
        </Input.Group>
      );
    case 'label':
      return <span {...formElementMeta.bindProps}>{value}</span>;
    case 'button':
      return (
        <UniButton {...sharedProps} onBlur={triggerBlur}>
          {typeof formElementMeta.content === 'object' ? formElementMeta.content : formElementMeta.content}
        </UniButton>
      );
    case 'file-drag-drop':
      return (
        <Upload.Dragger {...sharedProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            {formElementMeta.bindProps?.placeholder || 'Click or drag file to this area'}
          </p>
        </Upload.Dragger>
      );
    case 'tag-input':
      return <UniInputTag {...sharedProps} />;
    case 'custom':
      return formElementMeta.component
        ? createElement(formElementMeta.component, {
            ...formElementMeta.bindProps,
            onBlur: triggerBlur,
            onIsCustomComponentValid: onCustomComponentValid,
          })
        : null;
    case 'custom-slot':
      return typeof formElementMeta.renderSlot === 'function'
        ? (formElementMeta.renderSlot(formElementMeta) as React.ReactElement)
        : null;
    default:
      return null;
  }
};
