import type { CSSProperties, ReactNode } from 'react';
import type { Rule } from 'antd/es/form';

export type UniFormTypes =
  | 'input'
  | 'select'
  | 'input-group'
  | 'radio-group'
  | 'checkbox'
  | 'inputNumber'
  | 'label'
  | 'switch'
  | 'multiselect'
  | 'checkbox-group'
  | 'textarea'
  | 'rangePicker'
  | 'date'
  | 'formItem-group'
  | 'password'
  | 'file-drag-drop'
  | 'tag-input'
  | 'button'
  | 'custom'
  | 'custom-slot'
  | 'tree-select'
  | 'time-picker';

export type UniFormSelectOption = {
  label: string;
  value: any;
  disabled?: boolean;
};

export interface UniFormElementDeleteConfig {
  showDelete?: boolean;
  keepSpaceWhenHide?: boolean;
}

export interface UniFormElementMeta {
  label: string | null;
  labelInfo?: {
    tooltip: { title: string; bindProps?: Record<string, any> };
    icon: ReactNode;
  };
  secondaryLabel?: string | null;
  labelBindProps?: Record<string, any>;
  key: string;
  type: UniFormTypes;
  rules?: Rule[];
  options?: UniFormSelectOption[];
  content?: string | ReactNode;
  keyForValueInOptions?: string;
  children?: UniFormElementMeta[];
  bindProps?: Record<string, any>;
  containerBindProps?: Record<string, any>;
  onEvent?: Record<string, any>;
  hide?: boolean;
  hideLabel?: boolean;
  help?: string;
  deleteConfig?: UniFormElementDeleteConfig;
  dynamicRules?: (formItem: UniFormElementMeta, formState: any, additionalData?: any) => void;
  additionalSettings?: Record<string, any>;
  component?: React.ComponentType<any>;
  className?: string;
  slotName?: string;
  renderSlot?: (meta: UniFormElementMeta) => ReactNode;
}

export interface UniFormElementEditMeta<T> extends UniFormElementMeta {
  showBottomBorder?: boolean;
  allowEdit?: boolean;
  displayText?: (data: any) => any;
  fieldValue?: (data: any) => any;
  show?: (data: any | null) => boolean;
  updateValue?: (
    fieldKey: string,
    editFormState: { [x: string]: any },
    endPointDetails: any,
    additionalData?: any
  ) => T;
}

export type UniFormLayout = 'horizontal' | 'vertical' | 'inline';

export type UniFormBuilderRef = {
  form: import('antd').FormInstance;
  resetForm: () => void;
};
