import { useMemo, useState } from 'react';
import classNames from 'classnames';
import { Badge } from 'antd';
import type { MenuProps } from 'antd';

import type { TopNavMenuItem } from '../../types/side-nav';
import { SparkleIcon } from '../chat-ui/UniAIAssistHome';
import { UniButton } from '../button/UniButton';
import { UniTooltip } from '../tooltip/UniTooltip';
import { UniInput } from '../input/UniInput';
import { UniTextarea } from '../textarea/UniTextarea';
import { UniMenu } from '../menu/UniMenu';
import { UniPopover } from '../popover/UniPopover';

export type HostShellAlertItem = {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
  routeName?: string;
  read?: boolean;
};

export type HeaderSectionProps = {
  className?: string;
  title?: string;
  menuItems: TopNavMenuItem[];
  selectedItems?: string[];
  alerts?: HostShellAlertItem[];
  alertsBadgeCount?: number;
  searchPlaceholder?: string;
  alertsTitle?: string;
  helpTitle?: string;
  helpQuestionPlaceholder?: string;
  helpSubmitLabel?: string;
  helpUrl?: string;
  onHelpClick?: () => void;
  onHelpSubmit?: (question: string) => void;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: (value: string) => void;
  onAlertClick?: (alert: HostShellAlertItem) => void;
  onTopMenuClick?: (routeName?: string) => void;
  showAIAssistButton?: boolean;
  isAIAssistOpen?: boolean;
  onAIAssistToggle?: () => void;
};

export const HeaderSection = ({
  className,
  title,
  menuItems,
  selectedItems,
  alerts = [],
  alertsBadgeCount,
  searchPlaceholder = 'Search',
  alertsTitle = 'Alerts',
  helpTitle = 'Ask for help',
  helpQuestionPlaceholder = 'How can we help?',
  helpSubmitLabel = 'Send question',
  helpUrl,
  onHelpClick,
  onHelpSubmit,
  onSearchChange,
  onSearchSubmit,
  onAlertClick,
  onTopMenuClick,
  showAIAssistButton = false,
  isAIAssistOpen = false,
  onAIAssistToggle,
}: HeaderSectionProps) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [helpQuestion, setHelpQuestion] = useState('');

  const keyRouteMap = useMemo(() => {
    const map = new Map<string, string | undefined>();
    const traverse = (items?: TopNavMenuItem[]) => {
      items?.forEach(item => {
        map.set(item.key, item.routeName);
        traverse(item.children);
      });
    };
    traverse(menuItems);
    return map;
  }, [menuItems]);

  const menuEntries = useMemo<MenuProps['items']>(() => {
    const transform = (items?: TopNavMenuItem[]): MenuProps['items'] =>
      items?.map(item => ({
        key: item.key,
        label: item.title ?? item.label,
        children: transform(item.children),
      }));
    return transform(menuItems);
  }, [menuItems]);

  const handleMenuClick: MenuProps['onClick'] = event => {
    onTopMenuClick?.(keyRouteMap.get(event.key));
  };

  const alertCount = alertsBadgeCount ?? alerts.length;

  const handleSearchToggle = () => {
    setIsSearchExpanded(current => !current);
  };

  const handleSearchInputChange = (value: string) => {
    setSearchValue(value);
    onSearchChange?.(value);
  };

  const handleSearchSubmit = () => {
    onSearchSubmit?.(searchValue.trim());
  };

  const handleAlertItemClick = (alert: HostShellAlertItem) => {
    onAlertClick?.(alert);
    if (alert.routeName) {
      onTopMenuClick?.(alert.routeName);
    }
    setIsAlertsOpen(false);
  };

  const handleHelpOpenChange = (open: boolean) => {
    setIsHelpOpen(open);
    if (open) {
      onHelpClick?.();
    }
  };

  const handleHelpSubmit = () => {
    const question = helpQuestion.trim();
    if (question) {
      onHelpSubmit?.(question);
      setHelpQuestion('');
      setIsHelpOpen(false);
      return;
    }
    if (helpUrl && typeof window !== 'undefined' && !onHelpSubmit) {
      window.open(helpUrl, '_blank', 'noopener,noreferrer');
      setIsHelpOpen(false);
    }
  };

  return (
    <div className={classNames('host-shell-header', className)} data-testid="host-shell-header">
      {title ? <div className="host-shell-header__title">{title}</div> : null}
      {showAIAssistButton && !isAIAssistOpen ? (
        <UniTooltip placement="bottom" title="Open AI Assist">
          <UniButton
            className={classNames('host-shell-header__assist-button', {
              'host-shell-header__assist-button--active': isAIAssistOpen,
            })}
            aria-label="Open AI Assist"
            iconOnly
            onClick={onAIAssistToggle}
          >
            <SparkleIcon />
          </UniButton>
        </UniTooltip>
      ) : null}
      <div className="host-shell-header__menu">
        <UniMenu
          mode="horizontal"
          selectedKeys={selectedItems}
          items={menuEntries}
          style={{ backgroundColor: 'transparent' }}
          onClick={handleMenuClick}
        />
      </div>
      <div className="host-shell-header__actions">
        <div
          className={classNames('host-shell-header__search', {
            'host-shell-header__search--expanded': isSearchExpanded,
          })}
        >
          <UniInput
            value={searchValue}
            placeholder={searchPlaceholder}
            allowClear
            size="small"
            onChange={event => handleSearchInputChange(event.target.value)}
            onPressEnter={handleSearchSubmit}
          />
        </div>
        <button
          type="button"
          className={classNames('host-shell-header__icon-button', {
            'host-shell-header__icon-button--active': isSearchExpanded,
          })}
          onClick={handleSearchToggle}
          aria-label="Toggle search"
          aria-expanded={isSearchExpanded}
        >
          <UniTooltip placement="bottom" title="Search">
            <span className="material-symbols-outlined host-shell-header__icon">search</span>
          </UniTooltip>
        </button>

        <UniPopover
          trigger="click"
          placement="bottomRight"
          overlayClassName="host-shell-header-popover-wrapper"
          open={isAlertsOpen}
          onOpenChange={setIsAlertsOpen}
          title={<div className="host-shell-header-popover__title">{alertsTitle}</div>}
          content={
            <div className="host-shell-header-popover host-shell-header-popover--alerts">
              {alerts.length ? (
                <ul className="host-shell-header-popover__list">
                  {alerts.map(alert => (
                    <li key={alert.id} className="host-shell-header-popover__list-item">
                      <button
                        type="button"
                        className="host-shell-header-popover__alert-button"
                        onClick={() => handleAlertItemClick(alert)}
                      >
                        <span
                          className={classNames('host-shell-header-popover__status-dot', {
                            'host-shell-header-popover__status-dot--unread': !alert.read,
                          })}
                        />
                        <span className="host-shell-header-popover__alert-content">
                          <span className="host-shell-header-popover__alert-title">{alert.title}</span>
                          {alert.description ? (
                            <span className="host-shell-header-popover__alert-description">{alert.description}</span>
                          ) : null}
                          {alert.timestamp ? (
                            <span className="host-shell-header-popover__alert-time">{alert.timestamp}</span>
                          ) : null}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="host-shell-header-popover__empty">No alerts right now.</div>
              )}
            </div>
          }
        >
          <button
            type="button"
            className={classNames('host-shell-header__icon-button', {
              'host-shell-header__icon-button--active': isAlertsOpen,
            })}
            aria-label="Open alerts"
            aria-expanded={isAlertsOpen}
          >
            <UniTooltip placement="bottom" title="Alerts">
              <Badge className="host-shell-header__alerts-badge" count={alertCount} overflowCount={99} size="small">
                <span className="material-symbols-outlined host-shell-header__icon">notifications</span>
              </Badge>
            </UniTooltip>
          </button>
        </UniPopover>

        <UniPopover
          trigger="click"
          placement="bottomRight"
          overlayClassName="host-shell-header-popover-wrapper"
          open={isHelpOpen}
          onOpenChange={handleHelpOpenChange}
          title={<div className="host-shell-header-popover__title">{helpTitle}</div>}
          content={
            <div className="host-shell-header-popover host-shell-header-popover--help">
              <UniTextarea
                value={helpQuestion}
                rows={4}
                placeholder={helpQuestionPlaceholder}
                onChange={event => setHelpQuestion(event.target.value)}
              />
              <div className="host-shell-header-popover__help-actions">
                {helpUrl ? (
                  <button
                    type="button"
                    className="host-shell-header-popover__secondary-button"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.open(helpUrl, '_blank', 'noopener,noreferrer');
                      }
                    }}
                  >
                    Open docs
                  </button>
                ) : null}
                <button
                  type="button"
                  className="host-shell-header-popover__primary-button"
                  onClick={handleHelpSubmit}
                  disabled={!helpQuestion.trim() && !helpUrl}
                >
                  {helpSubmitLabel}
                </button>
              </div>
            </div>
          }
        >
          <button
            type="button"
            className={classNames('host-shell-header__icon-button', {
              'host-shell-header__icon-button--active': isHelpOpen,
            })}
            aria-label="Open help assistant"
            aria-expanded={isHelpOpen}
          >
            <UniTooltip placement="bottom" title="Help">
              <span className="material-symbols-outlined host-shell-header__icon">help</span>
            </UniTooltip>
          </button>
        </UniPopover>
      </div>
    </div>
  );
};
