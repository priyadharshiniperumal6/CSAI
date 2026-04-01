/**
 * @deprecated Use `<UniSelect variant="filter">` for value-selection toolbar
 * and global filter controls. UniFilterDropdown is a Button+Dropdown
 * composition — only appropriate for action menus (non-value-selection
 * dropdowns). Will be removed in a future release once all value-selection
 * usages are migrated.
 */
import classNames from 'classnames';
import type { DropdownProps } from 'antd';

import { UniDropdown } from '../dropdown/UniDropdown';
import { UniButton } from '../button/UniButton';
import { UniMaterialIcon } from '../icon';
import type { UniDropdownMenuOption } from '../dropdown/UniDropdownMenu';

import './UniFilterDropdown.scss';

export type UniFilterDropdownProps = {
  label: string;
  iconName?: string;
  options?: UniDropdownMenuOption[];
  selectedKey?: string;
  onSelect?: (key: string) => void;
  variant?: 'primary' | 'secondary';
  showChevron?: boolean;
  placement?: DropdownProps['placement'];
  className?: string;
};

export const UniFilterDropdown = ({
  label,
  iconName,
  options = [],
  selectedKey,
  onSelect,
  variant = 'primary',
  showChevron = false,
  placement = 'bottomLeft',
  className,
}: UniFilterDropdownProps) => {
  const selectedOption = selectedKey ? options.find(o => (o.key ?? o.name) === selectedKey) : undefined;
  const displayLabel = selectedOption ? selectedOption.name : label;

  const enrichedOptions = onSelect
    ? options.map(o => ({
        ...o,
        action: (e?: React.MouseEvent) => {
          o.action?.(e);
          onSelect(o.key ?? o.name);
        },
      }))
    : options;

  return (
    <UniDropdown
      options={enrichedOptions}
      placement={placement}
      content={
        <UniButton
          type="default"
          className={classNames(
            'uni-global-filter',
            { 'uni-global-filter--secondary': variant === 'secondary' },
            className
          )}
        >
          {iconName && <UniMaterialIcon iconName={iconName} size={16} />}
          <span>{displayLabel}</span>
          {showChevron && <UniMaterialIcon iconName="keyboard_arrow_down" size={16} />}
        </UniButton>
      }
    />
  );
};
