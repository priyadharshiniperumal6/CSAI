import type { UniFormElementMeta } from '../form-builder';

export const REASON_KEY = 'reason';
export const SUB_REASON_KEY = 'sub-reason';
export const ANSWER_KEY = 'answer';

export const FEEDBACK_FORM_STATE = {
  [REASON_KEY]: undefined,
  [SUB_REASON_KEY]: undefined,
  [ANSWER_KEY]: '',
};

export const THUMBS_UP_FEEDBACK_META: UniFormElementMeta[] = [
  {
    label: 'Reason',
    key: REASON_KEY,
    type: 'select',
    bindProps: {
      className: 'w-full',
      placeholder: 'Select a reason',
    },
    options: [
      { label: 'Clear Response', value: 'Clear Response' },
      { label: 'Correct Information', value: 'Correct Information' },
      { label: 'Good Response Length', value: 'Good Response Length' },
    ],
  },
  {
    label: 'Please describe in a few words',
    key: ANSWER_KEY,
    type: 'textarea',
    bindProps: {
      className: 'w-full',
      placeholder: 'What did you find particularly helpful or impressive?',
      autoSize: { minRows: 2, maxRows: 5 },
    },
  },
];

export const THUMBS_DOWN_FEEDBACK_META: UniFormElementMeta[] = [
  {
    label: 'Reason',
    key: REASON_KEY,
    type: 'select',
    bindProps: {
      className: 'w-full',
      placeholder: 'Select a reason',
    },
    options: [
      { label: "Don't like the style", value: "Don't like the style" },
      { label: 'Not factually correct', value: 'Not factually correct' },
      { label: 'Unsafe', value: 'Unsafe' },
      { label: 'Other', value: 'Other' },
      { label: 'User Behavior Based', value: 'User Behavior Based' },
    ],
  },
  {
    label: 'Sub Reason',
    key: SUB_REASON_KEY,
    type: 'select',
    hideLabel: true,
    hide: true,
    bindProps: {
      className: 'w-full',
      placeholder: "Select a reason for 'Not factually correct'",
    },
    options: [
      { label: 'Incorrect Document', value: 'Incorrect Document' },
      { label: 'Incorrect Passage Used', value: 'Incorrect Passage Used' },
      { label: 'Hallucination', value: 'Hallucination' },
      { label: 'Misinterpreted Passage', value: 'Misinterpreted Passage' },
    ],
    dynamicRules: (formItem: UniFormElementMeta, formState: Record<string, any>) => {
      if (formState?.[REASON_KEY] === 'Not factually correct') {
        formItem.hide = false;
      } else {
        if (formState) {
          formState[SUB_REASON_KEY] = undefined;
        }
        formItem.hide = true;
      }
    },
  },
  {
    label: 'Please describe in a few words',
    key: ANSWER_KEY,
    type: 'textarea',
    bindProps: {
      placeholder: 'What was unsatisfying about this response?',
      autoSize: { minRows: 2, maxRows: 5 },
    },
  },
];

export const DEFAULT_ICON_CONFIG = {
  icon: 'flare',
  iconBgColor: '#F8F0FE',
  iconColor: '#8C53CF',
  iconBorderColor: '#e7e7e7',
  tooltip: 'Search Result',
};
