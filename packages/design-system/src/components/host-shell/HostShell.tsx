import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import classNames from 'classnames';

import type { HostShellNavItem, NavItem, SideNavItem, TopNavMenuItem } from '../../types/side-nav';
import { SideNav } from '../side-nav/SideNav';
import type { SideNavAppSwitcherItem } from '../side-nav/SideNav';
import { HeaderSection } from './HeaderSection';
import type { HostShellAlertItem } from './HeaderSection';
import { UniAIAssistPanel } from '../chat-ui/UniAIAssistPanel';
import universalThemeLogo from '../../assets/images/universal-theme-logo.svg';
import { HostShellUserPreferencesDrawer } from './UserPreferencesDrawer';
import type { HostShellPreferenceOption, HostShellUserPreferences } from './UserPreferencesDrawer';
import type { LanguageOption } from '../language-switcher/UniLanguageSwitcherType';

import './HostShell.scss';

export type HostShellProps = {
  sideNavData: HostShellNavItem[];
  topMenuItems: TopNavMenuItem[];
  selectedMenuItems?: string[];
  userDetails: Record<string, any>;
  userRoles: string[];
  appTitle?: string;
  appSwitcherItems?: SideNavAppSwitcherItem[];
  selectedAppKey?: string;
  logoSrc?: string;
  helpUrl?: string;
  alerts?: HostShellAlertItem[];
  alertsBadgeCount?: number;
  searchPlaceholder?: string;
  alertsTitle?: string;
  helpTitle?: string;
  helpQuestionPlaceholder?: string;
  helpSubmitLabel?: string;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  sideNavClassName?: string;
  contentClassName?: string;
  contentContainerClassName?: string;
  showSideNav?: boolean;
  showAIAssistButton?: boolean;
  defaultAIAssistOpen?: boolean;
  aiAssistOpen?: boolean;
  aiAssistPanel?: ReactNode;
  userPreferences?: HostShellUserPreferences;
  defaultUserPreferencesOpen?: boolean;
  userPreferencesOpen?: boolean;
  children?: ReactNode;
  onHelpClick?: () => void;
  onHelpSubmit?: (question: string) => void;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: (value: string) => void;
  onAlertClick?: (alert: HostShellAlertItem) => void;
  onLogoutClick?: () => void;
  onUserPreferencesOpenChange?: (open: boolean) => void;
  onPersonaChange?: (personaKey: string, persona: HostShellPreferenceOption) => void;
  onDatasetChange?: (datasetKey: string, dataset: HostShellPreferenceOption) => void;
  onLanguageChange?: (languageCode: string, language: LanguageOption) => void;
  onSideMenuClick?: (routeName?: string) => void;
  onTopMenuClick?: (routeName?: string) => void;
  onAppSwitch?: (app: SideNavAppSwitcherItem) => void;
  onAIAssistToggle?: (open: boolean) => void;
};

export type { HostShellPreferenceOption, HostShellUserPreferences } from './UserPreferencesDrawer';
export {
  HOST_SHELL_DEFAULT_DATASETS,
  HOST_SHELL_DEFAULT_LANGUAGES,
  HOST_SHELL_DEFAULT_PERSONAS,
} from './UserPreferencesDrawer';

const DEFAULT_NAV_GROUP_ID = 'main';
const DEFAULT_NAV_GROUP_NAME = 'Main';

const isNavItem = (item: HostShellNavItem): item is NavItem => 'key' in item && 'label' in item && 'path' in item;

const normalizeHostShellNavItem = (item: HostShellNavItem): SideNavItem => {
  if (!isNavItem(item)) {
    return item;
  }

  return {
    id: item.key,
    text: item.label,
    icon: item.icon,
    groupId: DEFAULT_NAV_GROUP_ID,
    groupName: DEFAULT_NAV_GROUP_NAME,
    active: typeof window !== 'undefined' ? window.location.pathname === item.path : false,
    tooltip: item.label,
    roles: [],
    routeName: item.path,
    children: item.children?.map(normalizeHostShellNavItem),
  };
};

export const HostShell = ({
  sideNavData,
  topMenuItems,
  selectedMenuItems,
  userDetails,
  userRoles,
  appTitle,
  appSwitcherItems,
  selectedAppKey,
  logoSrc = universalThemeLogo,
  helpUrl = 'https://help.uniphore.com',
  alerts,
  alertsBadgeCount,
  searchPlaceholder,
  alertsTitle,
  helpTitle,
  helpQuestionPlaceholder,
  helpSubmitLabel,
  className,
  headerClassName,
  bodyClassName,
  sideNavClassName,
  contentClassName,
  contentContainerClassName,
  showSideNav = true,
  showAIAssistButton = true,
  defaultAIAssistOpen = false,
  aiAssistOpen,
  aiAssistPanel,
  userPreferences,
  defaultUserPreferencesOpen = false,
  userPreferencesOpen,
  children,
  onHelpClick,
  onHelpSubmit,
  onSearchChange,
  onSearchSubmit,
  onAlertClick,
  onLogoutClick,
  onUserPreferencesOpenChange,
  onPersonaChange,
  onDatasetChange,
  onLanguageChange,
  onSideMenuClick,
  onTopMenuClick,
  onAppSwitch,
  onAIAssistToggle,
}: HostShellProps) => {
  const [internalAIAssistOpen, setInternalAIAssistOpen] = useState(defaultAIAssistOpen);
  const [internalUserPreferencesOpen, setInternalUserPreferencesOpen] = useState(defaultUserPreferencesOpen);
  const resolvedSideNavData = useMemo(() => sideNavData.map(normalizeHostShellNavItem), [sideNavData]);

  const resolvedAIAssistOpen = showAIAssistButton && (aiAssistOpen ?? internalAIAssistOpen);
  const isSideNavCollapsed = showSideNav && resolvedAIAssistOpen;
  const hasUserPreferences =
    userPreferences !== undefined &&
    (userPreferences.personas !== false || userPreferences.datasets !== false || userPreferences.languages !== false);
  const resolvedUserPreferencesOpen = hasUserPreferences && (userPreferencesOpen ?? internalUserPreferencesOpen);

  const handleAIAssistToggle = () => {
    const nextOpen = !resolvedAIAssistOpen;
    if (aiAssistOpen === undefined) {
      setInternalAIAssistOpen(nextOpen);
    }
    onAIAssistToggle?.(nextOpen);
  };

  const renderedAIAssistPanel = aiAssistPanel ?? (
    <UniAIAssistPanel userName={userDetails?.given_name} onClose={handleAIAssistToggle} />
  );

  const handleUserPreferencesOpenChange = (open: boolean) => {
    if (userPreferencesOpen === undefined) {
      setInternalUserPreferencesOpen(open);
    }
    onUserPreferencesOpenChange?.(open);
  };

  return (
    <div className={classNames('host-shell', className)} data-testid="host-shell">
      <div className="host-shell__layout">
        <div className={classNames('host-shell__body', bodyClassName)}>
          {showSideNav ? (
            <aside
              className={classNames('host-shell__side-nav side-nav-wrap', sideNavClassName)}
              aria-label="Application navigation"
            >
              <SideNav
                sideNavData={resolvedSideNavData}
                logoSrc={logoSrc}
                appTitle={appTitle}
                appSwitcherItems={appSwitcherItems}
                selectedAppKey={selectedAppKey}
                isCollapsed={isSideNavCollapsed}
                userDetails={userDetails}
                userRoles={userRoles}
                onSideMenuClick={onSideMenuClick}
                onAppSwitch={onAppSwitch}
                onLogoutClick={onLogoutClick}
                onOpenUserPreferences={hasUserPreferences ? () => handleUserPreferencesOpenChange(true) : undefined}
              />
            </aside>
          ) : null}
          {showAIAssistButton ? (
            <aside
              className={classNames('host-shell__ai-assist', {
                'host-shell__ai-assist--open': resolvedAIAssistOpen,
              })}
              aria-label="AI Assist"
              aria-hidden={!resolvedAIAssistOpen}
            >
              {resolvedAIAssistOpen ? renderedAIAssistPanel : null}
            </aside>
          ) : null}
          <div className="host-shell__workspace">
            <div
              className={classNames('host-shell__surface', {
                'host-shell__surface--ai-open': resolvedAIAssistOpen,
              })}
            >
              <HeaderSection
                className={headerClassName}
                title={showSideNav ? undefined : appTitle}
                showAIAssistButton={showAIAssistButton}
                isAIAssistOpen={resolvedAIAssistOpen}
                onAIAssistToggle={handleAIAssistToggle}
                menuItems={topMenuItems}
                selectedItems={selectedMenuItems}
                helpUrl={helpUrl}
                alerts={alerts}
                alertsBadgeCount={alertsBadgeCount}
                searchPlaceholder={searchPlaceholder}
                alertsTitle={alertsTitle}
                helpTitle={helpTitle}
                helpQuestionPlaceholder={helpQuestionPlaceholder}
                helpSubmitLabel={helpSubmitLabel}
                onHelpClick={onHelpClick}
                onHelpSubmit={onHelpSubmit}
                onSearchChange={onSearchChange}
                onSearchSubmit={onSearchSubmit}
                onAlertClick={onAlertClick}
                onTopMenuClick={onTopMenuClick}
              />
              <main className={classNames('host-shell__main', contentClassName)} role="main">
                <div className={classNames('host-shell__content', contentContainerClassName)}>{children}</div>
              </main>
            </div>
          </div>
        </div>
      </div>
      {hasUserPreferences ? (
        <HostShellUserPreferencesDrawer
          open={Boolean(resolvedUserPreferencesOpen)}
          preferences={userPreferences}
          onClose={() => handleUserPreferencesOpenChange(false)}
          onPersonaChange={onPersonaChange}
          onDatasetChange={onDatasetChange}
          onLanguageChange={onLanguageChange}
        />
      ) : null}
    </div>
  );
};
