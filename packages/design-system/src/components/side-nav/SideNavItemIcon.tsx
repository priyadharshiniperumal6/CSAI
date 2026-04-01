import classNames from 'classnames';

import type { SideNavItem } from '../../types/side-nav';
import { resolveNavIcon } from '../host-shell/NavIconResolver';

export type SideNavItemIconProps = {
  menuItem: SideNavItem;
  isCollapsed: boolean;
};

export const SideNavItemIcon = ({ menuItem }: SideNavItemIconProps) => {
  if (menuItem.iconClass) {
    return (
      <span
        className={classNames('side-nav-item__icon', menuItem.iconClass, {
          'side-nav-item__icon--active': menuItem.active,
          'side-nav-item__icon--inactive': !menuItem.active,
        })}
      />
    );
  }

  if (menuItem.icon) {
    return (
      <span
        aria-hidden="true"
        className={classNames('side-nav-item__icon', {
          'side-nav-item__icon--active': menuItem.active,
          'side-nav-item__icon--inactive': !menuItem.active,
        })}
      >
        {resolveNavIcon(menuItem.icon)}
      </span>
    );
  }

  return null;
};
