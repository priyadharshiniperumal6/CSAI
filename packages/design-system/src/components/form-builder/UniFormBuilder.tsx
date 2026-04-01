import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo } from 'react';
import { Form } from 'antd';
import type { FormInstance, FormProps } from 'antd';
import { cloneDeep } from 'lodash-es';

import { getFormRules } from './form-guide';
import type {
  UniFormBuilderRef,
  UniFormElementMeta,
  UniFormSelectOption,
  UniFormTypes,
  UniFormLayout,
} from './types';
import { UniFormElementContainer } from './UniFormElementContainer';

import './UniFormBuilder.scss';

export type UniFormBuilderProps = {
  uniFormMeta: UniFormElementMeta[];
  uniFormData: Record<string, any>;
  formContentLayout?: UniFormLayout;
  labelCol?: FormProps['labelCol'];
  wrapperCol?: FormProps['wrapperCol'];
  className?: string;
  keepValidationOnDisabledFields?: boolean;
  keepValidationOnHiddenFields?: boolean;
  onIsUniFormValid?: (valid: boolean) => void;
  onIsCustomComponentValid?: (valid: boolean) => void;
  onBlurEventTrigger?: (values: Record<string, any>) => void;
  onDropdownOpenEventTrigger?: (options?: UniFormSelectOption[]) => void;
  onChange?: (values: Record<string, any>) => void;
};

const removeRulesFromMeta = (
  formMeta: UniFormElementMeta[],
  keepDisabled: boolean,
  keepHidden: boolean
): UniFormElementMeta[] => {
  return formMeta.map(item => {
    const copy = { ...item };
    if (copy.children) {
      copy.children = removeRulesFromMeta(copy.children, keepDisabled, keepHidden);
    }
    if ((!keepHidden && copy.hide) || (!keepDisabled && copy.bindProps?.disabled)) {
      copy.rules = [];
    }
    return copy;
  });
};

export const UniFormBuilder = forwardRef<UniFormBuilderRef, UniFormBuilderProps>(
  (
    {
      uniFormMeta,
      uniFormData,
      formContentLayout = 'vertical',
      labelCol,
      wrapperCol,
      className,
      keepValidationOnDisabledFields = false,
      keepValidationOnHiddenFields = false,
      onIsUniFormValid,
      onIsCustomComponentValid,
      onBlurEventTrigger,
      onDropdownOpenEventTrigger,
      onChange,
    },
    ref
  ) => {
    const [form] = Form.useForm();

    const metaWithRules = useMemo(
      () =>
        removeRulesFromMeta(
          cloneDeep(uniFormMeta),
          keepValidationOnDisabledFields,
          keepValidationOnHiddenFields
        ),
      [uniFormMeta, keepValidationOnDisabledFields, keepValidationOnHiddenFields]
    );

    useEffect(() => {
      form.setFieldsValue(uniFormData);
    }, [form, uniFormData]);

    useImperativeHandle(
      ref,
      () => ({
        form,
        resetForm: () => form.resetFields(),
      }),
      [form]
    );

    const handleBlur = useCallback(() => {
      onBlurEventTrigger?.(form.getFieldsValue(true));
    }, [form, onBlurEventTrigger]);

    const handleDropdown = useCallback(
      (options?: UniFormSelectOption[]) => {
        onDropdownOpenEventTrigger?.(options);
      },
      [onDropdownOpenEventTrigger]
    );

    const renderChild = (childMeta: UniFormElementMeta) => (
      <UniFormElementContainer
        key={childMeta.key}
        formElementMeta={childMeta}
        form={form}
        onBlur={handleBlur}
        onDropdownVisibleChange={handleDropdown}
        onCustomComponentValid={onIsCustomComponentValid}
        renderChild={renderChild}
      />
    );

    const runValidation = () => {
      form
        .validateFields()
        .then(() => onIsUniFormValid?.(true))
        .catch(() => onIsUniFormValid?.(false));
    };

    useEffect(() => {
      runValidation();
    }, [metaWithRules]);

    const handleValuesChange: FormProps['onValuesChange'] = (_, allValues) => {
      onChange?.(allValues);
      runValidation();
    };

    return (
      <Form
        form={form}
        layout={formContentLayout}
        className={className}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        onValuesChange={handleValuesChange}
      >
        {metaWithRules.map(meta => (
          <UniFormElementContainer
            key={meta.key}
            formElementMeta={meta}
            form={form}
            onBlur={handleBlur}
            onDropdownVisibleChange={handleDropdown}
            onCustomComponentValid={onIsCustomComponentValid}
            renderChild={renderChild}
          />
        ))}
      </Form>
    );
  }
);

UniFormBuilder.displayName = 'UniFormBuilder';
