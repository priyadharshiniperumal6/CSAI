import classNames from 'classnames';

import type { SideNavItem } from '../../types/side-nav';

export type SideNavItemTextProps = {
  menuItem: SideNavItem;
  isCollapsed: boolean;
};

export const SideNavItemText = ({ menuItem, isCollapsed }: SideNavItemTextProps) => {
  return (
    <div
      className={classNames('side-nav-item__text', {
        'side-nav-item__text--active': menuItem.active,
        'side-nav-item__text--inactive': !menuItem.active,
        'side-nav-item__text--hidden': isCollapsed,
      })}
    >
      {menuItem.text}
    </div>
  );
};
