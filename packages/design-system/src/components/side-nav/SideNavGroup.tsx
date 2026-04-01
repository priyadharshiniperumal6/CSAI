import classNames from 'classnames';
import { useState } from 'react';

import type { SideNavItem } from '../../types/side-nav';
import { SideNavMenuItem } from './SideNavMenuItem';

export type SideNavGroupProps = {
  groupTitle: string;
  menuItems: SideNavItem[];
  isCollapsed: boolean;
  groupIndex?: number;
  onSideMenuClick?: (routeName?: string) => void;
};

export const SideNavGroup = ({
  groupTitle,
  menuItems,
  isCollapsed,
  groupIndex = 0,
  onSideMenuClick,
}: SideNavGroupProps) => {
  const [isGroupExpanded, setIsGroupExpanded] = useState(true);

  const handleToggle = () => {
    if (!isCollapsed) {
      setIsGroupExpanded(value => !value);
    }
  };

  const groupLabelId = `side-nav-group-${groupIndex}`;

  return (
    <div className="side-nav-group" aria-label={`${groupTitle} navigation`}>
      <button
        type="button"
        className={classNames('side-nav-group__toggle', {
          'side-nav-group__toggle--hidden': isCollapsed,
        })}
        aria-expanded={isGroupExpanded}
        aria-controls={groupLabelId}
        onClick={handleToggle}
      >
        <span className="side-nav-group__toggle-label">{groupTitle}</span>
        <span
          className={classNames('material-symbols-outlined side-nav-group__toggle-icon', {
            'side-nav-group__toggle-icon--collapsed': !isGroupExpanded,
          })}
          aria-hidden="true"
        >
          expand_more
        </span>
      </button>

      <ul
        id={groupLabelId}
        className={classNames('side-nav-group__list', {
          'side-nav-group__list--collapsed': !isCollapsed && !isGroupExpanded,
        })}
      >
        {menuItems?.map(menuItem => (
          <SideNavMenuItem key={menuItem.id} menuItem={menuItem} isCollapsed={isCollapsed} onClick={onSideMenuClick} />
        ))}
      </ul>
    </div>
  );
};
