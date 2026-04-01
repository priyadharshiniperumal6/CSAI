import classNames from 'classnames';
import { Tooltip } from 'antd';

import type { SideNavItem } from '../../types/side-nav';
import { SideNavItemIcon } from './SideNavItemIcon';
import { SideNavItemText } from './SideNavItemText';

export type SideNavMenuItemProps = {
  menuItem: SideNavItem;
  isCollapsed: boolean;
  onClick?: (routeName?: string) => void;
};

export const SideNavMenuItem = ({ menuItem, isCollapsed, onClick }: SideNavMenuItemProps) => {
  const handleClick = () => {
    onClick?.(menuItem.routeName);
  };

  return (
    <li className="side-nav-group__item">
      <button
        type="button"
        onClick={handleClick}
        className={classNames('side-nav-group__item-button', {
          'side-nav-group__item-button--active': menuItem.active,
          'side-nav-group__item-button--collapsed': isCollapsed,
        })}
        id={menuItem.id}
        aria-current={menuItem.active ? 'page' : undefined}
        aria-label={menuItem.tooltip || menuItem.text}
      >
        <Tooltip placement="right" title={isCollapsed ? menuItem.tooltip : undefined}>
          <span>
            <SideNavItemIcon menuItem={menuItem} isCollapsed={isCollapsed} />
          </span>
        </Tooltip>
        <SideNavItemText menuItem={menuItem} isCollapsed={isCollapsed} />
      </button>
    </li>
  );
};
