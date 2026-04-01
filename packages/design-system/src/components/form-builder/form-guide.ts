import type { Rule } from 'antd/es/form';

import type { UniFormElementMeta } from './types';

export function getFormRules(meta: UniFormElementMeta[]): Record<string, Rule[]> {
  return meta.reduce<Record<string, Rule[]>>((acc, item) => {
    if (item.bindProps?.disabled || item.hide) {
      return acc;
    }

    if (item.children) {
      Object.assign(acc, getFormRules(item.children));
    }

    if (item.rules) {
      acc[item.key] = item.rules as Rule[];
    }

    return acc;
  }, {});
}
