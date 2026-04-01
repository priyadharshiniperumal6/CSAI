import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { TopNavMenuItem } from '@uniphore/ut-design-system';

interface TopNavContextType {
  topMenuItems: TopNavMenuItem[];
  selectedKeys: string[];
  setTopNav: (items: TopNavMenuItem[], selectedKey?: string) => void;
  clearTopNav: () => void;
  setSelectedKey: (key: string) => void;
  onTabChange?: (key: string) => void;
  setOnTabChange: (handler: ((key: string) => void) | undefined) => void;
}

const TopNavContext = createContext<TopNavContextType>({
  topMenuItems: [],
  selectedKeys: [],
  setTopNav: () => {},
  clearTopNav: () => {},
  setSelectedKey: () => {},
  onTabChange: undefined,
  setOnTabChange: () => {},
});

export function TopNavProvider({ children }: { children: ReactNode }) {
  const [topMenuItems, setTopMenuItems] = useState<TopNavMenuItem[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [onTabChange, setOnTabChangeState] = useState<((key: string) => void) | undefined>(undefined);

  const setTopNav = useCallback((items: TopNavMenuItem[], selectedKey?: string) => {
    setTopMenuItems(items);
    if (selectedKey) setSelectedKeys([selectedKey]);
  }, []);

  const clearTopNav = useCallback(() => {
    setTopMenuItems([]);
    setSelectedKeys([]);
    setOnTabChangeState(undefined);
  }, []);

  const setSelectedKey = useCallback((key: string) => {
    setSelectedKeys([key]);
  }, []);

  const setOnTabChange = useCallback((handler: ((key: string) => void) | undefined) => {
    setOnTabChangeState(() => handler);
  }, []);

  return (
    <TopNavContext.Provider value={{ topMenuItems, selectedKeys, setTopNav, clearTopNav, setSelectedKey, onTabChange, setOnTabChange }}>
      {children}
    </TopNavContext.Provider>
  );
}

export function useTopNav() {
  return useContext(TopNavContext);
}
