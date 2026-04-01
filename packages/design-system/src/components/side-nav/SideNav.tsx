import { useMemo, useState } from 'react';
import classNames from 'classnames';
import { groupBy } from 'lodash-es';
import { Avatar, Button, Dropdown, Popover, Tag, Tooltip } from 'antd';
import type { MenuProps } from 'antd';

import type { SideNavItem } from '../../types/side-nav';
import { SideNavGroup } from './SideNavGroup';
import universalThemeLogo from '../../assets/images/universal-theme-logo.svg';
import universalThemeLogoSmall from '../../assets/images/universal-theme-logo-sm.svg';

import './SideNav.scss';

export type SideNavProps = {
  sideNavData: SideNavItem[];
  logoSrc?: string;
  appTitle?: string;
  appSwitcherItems?: SideNavAppSwitcherItem[];
  selectedAppKey?: string;
  isCollapsed?: boolean;
  collapsedLogoSrc?: string;
  userDetails?: Record<string, any>;
  userRoles?: string[];
  className?: string;
  onSideMenuClick?: (routeName?: string) => void;
  onAppSwitch?: (app: SideNavAppSwitcherItem) => void;
  onLogoutClick?: () => void;
  onOpenUserPreferences?: () => void;
};

export type SideNavAppSwitcherItem = {
  key: string;
  label: string;
  routeName?: string;
};

const CONFIGURATION_KEY = 'configuration';
const SIDE_NAV_GROUP_ORDER = ['insights', 'applications', 'services', CONFIGURATION_KEY];

export const SideNav = ({
  sideNavData,
  logoSrc = universalThemeLogo,
  appTitle,
  appSwitcherItems,
  selectedAppKey,
  isCollapsed = false,
  collapsedLogoSrc = universalThemeLogoSmall,
  userDetails,
  userRoles = [],
  className,
  onSideMenuClick,
  onAppSwitch,
  onLogoutClick,
  onOpenUserPreferences,
}: SideNavProps) => {
  const [profileVisible, setProfileVisible] = useState(false);

  const grouped = useMemo(() => groupBy(sideNavData, 'groupId'), [sideNavData]);

  const sortedGroupKeys = useMemo(
    () =>
      Object.keys(grouped).sort((keyA, keyB) => {
        const keyAIndex = SIDE_NAV_GROUP_ORDER.indexOf(keyA.toLowerCase());
        const keyBIndex = SIDE_NAV_GROUP_ORDER.indexOf(keyB.toLowerCase());
        const resolvedKeyAIndex = keyAIndex === -1 ? SIDE_NAV_GROUP_ORDER.length : keyAIndex;
        const resolvedKeyBIndex = keyBIndex === -1 ? SIDE_NAV_GROUP_ORDER.length : keyBIndex;
        return resolvedKeyAIndex - resolvedKeyBIndex;
      }),
    [grouped]
  );

  const groups = useMemo(
    () =>
      sortedGroupKeys
        .filter(key => key.toLowerCase() !== CONFIGURATION_KEY)
        .map(key => ({
          id: key,
          title: grouped[key]?.[0]?.groupName ?? '',
          children: grouped[key],
        })),
    [grouped, sortedGroupKeys]
  );

  const configurationGroup = useMemo(
    () => sortedGroupKeys.find(key => key.toLowerCase() === CONFIGURATION_KEY),
    [sortedGroupKeys]
  );
  const configurationMenuItems = configurationGroup ? grouped[configurationGroup] : undefined;

  const handleMenuClick = (routeName?: string) => {
    onSideMenuClick?.(routeName);
  };

  const hasAppSwitcher = Boolean(appSwitcherItems?.length);
  const selectedApp = useMemo(
    () => appSwitcherItems?.find(item => item.key === selectedAppKey) ?? appSwitcherItems?.[0],
    [appSwitcherItems, selectedAppKey]
  );
  const resolvedAppTitle = appTitle ?? selectedApp?.label;

  const appSwitcherMenuItems = useMemo<MenuProps['items']>(
    () => appSwitcherItems?.map(item => ({ key: item.key, label: item.label })) ?? [],
    [appSwitcherItems]
  );

  const appSwitcherMenu = useMemo<MenuProps>(
    () => ({
      items: appSwitcherMenuItems,
      selectable: true,
      selectedKeys: selectedAppKey ? [selectedAppKey] : [],
      onClick: menuClickEvent => {
        const app = appSwitcherItems?.find(item => item.key === menuClickEvent.key);
        if (!app) {
          return;
        }
        onAppSwitch?.(app);
      },
    }),
    [appSwitcherItems, appSwitcherMenuItems, onAppSwitch, selectedAppKey]
  );

  const avatarLabel = useMemo(() => userDetails?.given_name?.[0] ?? userDetails?.name?.[0] ?? '', [userDetails]);
  const userName = useMemo(
    () => userDetails?.given_name ?? userDetails?.name?.split('@')[0]?.replace(/\./g, ' ') ?? 'User',
    [userDetails]
  );
  const tenantName = useMemo(
    () => userDetails?.tenantName ?? userDetails?.tenant_name ?? userDetails?.tenant ?? '',
    [userDetails]
  );

  const handleLogoutClick = () => {
    onLogoutClick?.();
    setProfileVisible(false);
  };

  const handlePreferencesClick = () => {
    onOpenUserPreferences?.();
    setProfileVisible(false);
  };

  const resolvedLogoSrc = isCollapsed ? collapsedLogoSrc : logoSrc;

  return (
    <nav
      className={classNames('side-nav', className, {
        'side-nav--collapsed': isCollapsed,
      })}
      data-testid="side-nav"
      aria-label="Main navigation"
    >
      {hasAppSwitcher ? (
        <Dropdown
          trigger={['click']}
          menu={appSwitcherMenu}
          placement="bottomLeft"
          classNames={{ root: 'side-nav__brand-menu' }}
        >
          <button type="button" className="side-nav__brand side-nav__brand-button" aria-label="Switch application">
            <img className="side-nav__logo" src={resolvedLogoSrc} alt="Uniphore" />
            {resolvedAppTitle ? <div className="side-nav__brand-title">{resolvedAppTitle}</div> : null}
            <span className="material-symbols-outlined side-nav__brand-indicator" aria-hidden="true">
              expand_more
            </span>
          </button>
        </Dropdown>
      ) : (
        <div className="side-nav__brand">
          <img className="side-nav__logo" src={resolvedLogoSrc} alt="Uniphore" />
          {resolvedAppTitle ? <div className="side-nav__brand-title">{resolvedAppTitle}</div> : null}
        </div>
      )}
      <div className="side-nav__content">
        <ul className="side-nav__groups">
          {groups.map((group, index) => (
            <li key={group.id}>
              <SideNavGroup
                groupTitle={group.title}
                menuItems={group.children}
                isCollapsed={isCollapsed}
                groupIndex={index}
                onSideMenuClick={handleMenuClick}
              />
            </li>
          ))}
          {configurationMenuItems?.length ? (
            <li>
              <SideNavGroup
                groupTitle={configurationMenuItems[0]?.groupName ?? 'Administration'}
                menuItems={configurationMenuItems}
                isCollapsed={isCollapsed}
                groupIndex={groups.length}
                onSideMenuClick={handleMenuClick}
              />
            </li>
          ) : null}
        </ul>
      </div>
      <div className="side-nav__profile" role="region" aria-label="User profile">
        <Popover
          trigger="click"
          placement="rightBottom"
          overlayClassName="side-nav-profile-popover"
          open={profileVisible}
          onOpenChange={value => setProfileVisible(value)}
          content={
            <div className="side-nav-profile-popover__content">
              <div className="side-nav-profile-popover__header">
                <Avatar size="large" src={userDetails?.picture} className="side-nav-profile-popover__avatar">
                  {avatarLabel}
                </Avatar>
                <div className="side-nav-profile-popover__name">{userName}</div>
                {tenantName ? (
                  <div className="side-nav-profile-popover__tenant">
                    <Tooltip placement="bottomLeft" title={tenantName}>
                      <span>{tenantName}</span>
                    </Tooltip>
                  </div>
                ) : null}
                {userDetails?.email ? (
                  <div className="side-nav-profile-popover__email">
                    <Tooltip placement="bottomLeft" title={userDetails.email}>
                      <span>{userDetails.email}</span>
                    </Tooltip>
                  </div>
                ) : null}
                <div className="side-nav-profile-popover__roles">
                  {userRoles?.[0] ? (
                    <Tag className="side-nav-profile-popover__role-tag">
                      <span className="material-symbols-outlined">person</span>
                      <span>{userRoles[0]}</span>
                    </Tag>
                  ) : null}
                  {userRoles.length > 1 ? (
                    <Tag className="side-nav-profile-popover__role-tag">
                      <Tooltip placement="bottomLeft" title={userRoles.slice(1).join(', ')}>
                        +{userRoles.length - 1}
                      </Tooltip>
                    </Tag>
                  ) : null}
                </div>
              </div>
              {onOpenUserPreferences || onLogoutClick ? (
                <div className="side-nav-profile-popover__footer">
                  {onOpenUserPreferences ? (
                    <Button
                      type="text"
                      className="side-nav-profile-popover__action"
                      aria-label="Open user preferences"
                      onClick={handlePreferencesClick}
                    >
                      <span className="material-symbols-outlined">tune</span>
                      <span>User preferences</span>
                    </Button>
                  ) : null}
                  {onLogoutClick ? (
                    <Button type="text" className="side-nav-profile-popover__action" onClick={handleLogoutClick}>
                      <span className="material-symbols-outlined">logout</span>
                      <span>Logout</span>
                    </Button>
                  ) : null}
                </div>
              ) : null}
            </div>
          }
        >
          <button
            type="button"
            className="side-nav__profile-trigger"
            aria-label="User profile menu"
            aria-haspopup="true"
            aria-expanded={profileVisible}
          >
            <Avatar size="small" src={userDetails?.picture} className="side-nav__profile-avatar">
              {avatarLabel}
            </Avatar>
            <div className="side-nav__profile-summary">
              <div className="side-nav__profile-name">{userName}</div>
              {userDetails?.email ? <div className="side-nav__profile-email">{userDetails.email}</div> : null}
            </div>
            <span className="material-symbols-outlined side-nav__profile-icon">unfold_more</span>
          </button>
        </Popover>
      </div>
    </nav>
  );
};
