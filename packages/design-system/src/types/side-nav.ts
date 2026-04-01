import type { ReactNode } from 'react';

export type NavIconToken =
  | 'insights'
  | 'studio'
  | 'cloud'
  | 'admin'
  | 'agents'
  | 'skills'
  | 'tests'
  | 'deploy'
  | 'channels'
  | 'users'
  | 'compliance'
  | 'health'
  | 'integrations'
  | 'knowledge'
  | 'models'
  | 'data'
  | 'reports'
  | 'benchmarks';

export type NavItem = {
  key: string;
  label: string;
  path: string;
  icon?: ReactNode | NavIconToken;
  children?: NavItem[];
};

export interface SideNavItem {
  id: string;
  text: string;
  icon?: ReactNode | NavIconToken;
  iconClass?: string;
  groupId: string;
  groupName: string;
  active: boolean;
  tooltip: string;
  roles: string[];
  children?: SideNavItem[];
  routeName?: string;
}

export type HostShellNavItem = SideNavItem | NavItem;

export interface TopNavMenuItem {
  key: string;
  label: string;
  title: string;
  children?: TopNavMenuItem[];
  routeName?: string;
}

export type TopMenuItem = TopNavMenuItem;

export interface MenuItemClickEvent<T> {
  item: T;
  key: string;
  keyPath: string[];
}
