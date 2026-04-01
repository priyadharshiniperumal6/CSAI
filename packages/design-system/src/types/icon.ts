import type { HTMLAttributes, MouseEvent } from 'react';
import type { TooltipProps } from 'antd';

import type { UniBadgeProps } from '../components/badge/UniBadge';

export type UniIconType = HTMLAttributes<HTMLSpanElement> & {
  iconName: string;
  isAfter?: boolean;
  isIconFill?: boolean;
  size?: number | string;
  colorClass?: string;
  title?: TooltipProps['title'];
  placement?: TooltipProps['placement'];
  badge?: UniBadgeProps;
  click?: (event: MouseEvent<HTMLSpanElement>) => void;
};
