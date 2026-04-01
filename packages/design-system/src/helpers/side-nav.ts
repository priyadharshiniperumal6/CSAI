import type { MenuProps } from 'antd';

import type { SideNavItem } from '../types/side-nav';

export const getTopMenuItems = (items: SideNavItem[] | undefined, roles: string[]): MenuProps['items'] => {
  if (!items?.length) {
    return [];
  }
  const filtered = items.filter(item => item.roles?.some(role => roles.includes(role)));
  return mapMenuItems(filtered);
};

const mapMenuItems = (sideNavItems: SideNavItem[]): MenuProps['items'] =>
  sideNavItems.map(item => ({
    key: item.id,
    label: item.text,
    title: item.text,
    routeName: item.routeName,
    children: item.children ? mapMenuItems(item.children) : undefined,
  }));
