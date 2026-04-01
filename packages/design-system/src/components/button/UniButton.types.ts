import type { ButtonProps } from 'antd';

import type { UniIconType } from '../../types/icon';
import type { UniBadgeProps } from '../badge/UniBadge';

/**
 * Props for the UniButton component.
 * Extends Ant Design's ButtonProps.
 */
export type UniButtonProps = ButtonProps & {
  /** Optional custom CSS class name */
  className?: string;
  /** Legacy class prop for compatibility */
  class?: string;
  /** Optional badge configuration to display on the button */
  badge?: UniBadgeProps;
  /** Whether the button only contains an icon (adjusts padding) */
  iconOnly?: boolean;
  /** Configuration for a Material-based icon */
  materialIcon?: UniIconType;
  /** Configuration for a Uniphore-branded icon */
  uniIcon?: UniIconType;
};
