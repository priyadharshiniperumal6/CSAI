import type { ReactNode, ComponentType, MutableRefObject } from 'react';

export type ToolPanelSize = {
  width?: number;
  maxWidth?: number;
  minWidth?: number;
};

export type ToolPanelHeaderFooter = {
  component: ComponentType<any>;
  params?: Record<string, unknown>;
};

export type ToolPanelTabNav = {
  component: ComponentType<any>;
  props?: Record<string, unknown>;
};

export type ToolPanelTab = {
  id: string;
  title?: string;
  component?: ComponentType<any>;
  props?: Record<string, unknown>;
  componentProps?: Record<string, unknown>;
  componentWrapperClass?: string;
  nav?: ToolPanelTabNav;
  activeRow?: MutableRefObject<any>;
};

export type ToolPanelParams = {
  header?: ToolPanelHeaderFooter;
  footer?: ToolPanelHeaderFooter;
  toolPanels?: ToolPanelSize[];
  rowDensityDefault?: boolean;
  tabs?: ToolPanelTab[];
  activeKey?: string;
};

export type SidePanelProps = {
  params?: ToolPanelParams;
  className?: string;
  children?: ReactNode;
  onTabChange?: (activeKey: string) => void;
};
