import { useEffect, useState, useCallback } from 'react';
import { useTopNav } from '../context/TopNavContext';
import type { TopNavMenuItem } from '@uniphore/ut-design-system';

/**
 * Hook that registers tabs in the HostShell top nav bar (secondary navigation).
 * Returns the active tab key and a setter.
 */
export function usePageTabs(tabLabels: string[], defaultTab?: string) {
  const { setTopNav, clearTopNav, setSelectedKey, setOnTabChange } = useTopNav();
  const [activeTab, setActiveTab] = useState(defaultTab || tabLabels[0] || '');

  // Convert labels to TopNavMenuItem format
  useEffect(() => {
    const items: TopNavMenuItem[] = tabLabels.map((label) => ({
      key: label,
      label: label,
      title: label,
      routeName: label, // This gets passed back via onTopMenuClick
    }));

    setTopNav(items, activeTab);

    // Set up the tab change handler
    setOnTabChange((key: string) => {
      setActiveTab(key);
      setSelectedKey(key);
    });

    return () => {
      clearTopNav();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabLabels.join(',')]);

  // Keep selectedKey in sync
  useEffect(() => {
    setSelectedKey(activeTab);
  }, [activeTab, setSelectedKey]);

  const changeTab = useCallback((tab: string) => {
    setActiveTab(tab);
    setSelectedKey(tab);
  }, [setSelectedKey]);

  return { activeTab, changeTab };
}
