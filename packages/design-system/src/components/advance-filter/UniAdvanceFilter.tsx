import { HTMLAttributes, useMemo, useState } from 'react';
import classNames from 'classnames';

import { UniButton } from '../button/UniButton';
import type { UniButtonProps } from '../button/UniButton';
import { UniMaterialIcon } from '../icon';

import './UniAdvanceFilter.scss';

export type UniAdvanceFilterProps = {
  /**
   * Number of active advanced filters.
   */
  count?: number;
  /**
   * Controlled expanded state.
   */
  expanded?: boolean;
  /**
   * Initial expanded state when uncontrolled.
   */
  defaultExpanded?: boolean;
  /**
   * Accessible label for the trigger button.
   */
  label?: string;
  /**
   * Called whenever the toggle state changes.
   */
  onToggle?: (expanded: boolean) => void;
} & Omit<UniButtonProps, 'type' | 'onClick'> &
  HTMLAttributes<HTMLButtonElement>;

export const UniAdvanceFilter = ({
  count = 0,
  expanded,
  defaultExpanded = false,
  label = 'Advanced filters',
  onToggle,
  className,
  ...buttonProps
}: UniAdvanceFilterProps) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

  const isExpanded = useMemo(() => expanded ?? internalExpanded, [expanded, internalExpanded]);

  const handleToggle = () => {
    const next = !isExpanded;
    if (expanded === undefined) {
      setInternalExpanded(next);
    }
    onToggle?.(next);
  };

  return (
    <UniButton
      {...buttonProps}
      type="text"
      aria-label={label}
      className={classNames('uni-advance-filter flex items-center', className)}
      onClick={handleToggle}
      data-testid="uni-advance-filter"
    >
      <UniMaterialIcon
        iconName={isExpanded ? 'expand_more' : 'navigate_next'}
        size={20}
        className="arrow-icon text-primary"
        aria-hidden
      />
      <UniMaterialIcon iconName="filter_alt" size={20} className="filter-icon text-primary" aria-hidden />
      <span className="ml-1 count-section text-primary-dark">{count}</span>
    </UniButton>
  );
};
