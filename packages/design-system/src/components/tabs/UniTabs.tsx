import { ReactNode, createElement } from 'react';
import classNames from 'classnames';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import { UniButton } from '../button/UniButton';
import type { UniButtonProps } from '../button/UniButton.types';
import { UniTooltip } from '../tooltip/UniTooltip';
import { UniTab } from './UniTab';

import './UniTabs.scss';

export type UniTabDefinition = {
  id: string | number;
  title?: string;
  tabButton?: (UniButtonProps & { title?: string }) | null;
  nav?: { component: React.ComponentType<any>; props?: Record<string, unknown> } | null;
  component?: React.ComponentType<any>;
  props?: Record<string, unknown>;
  content?: ReactNode;
  componentWrapperClass?: string;
  activeRow?: any;
};

export type UniTabsProps = TabsProps & {
  tabs?: UniTabDefinition[];
  styleType?: 'horizontal';
  showTooltip?: boolean;
  class?: string;
};

export const UniTabs = ({ className, class: legacyClass, tabs, styleType, showTooltip, items, children, ...rest }: UniTabsProps) => {
  const mergedClass = classNames('uni-ant-tabs', className, legacyClass, {
    'uni-tabs-horizontal': styleType === 'horizontal',
  });

  const generatedItems =
    tabs?.map(tab => {
      const tabLabel = (
        <UniTooltip title={showTooltip ? tab.title ?? '' : undefined} placement="right">
          <>
            {tab.nav?.component ? createElement(tab.nav.component, tab.nav.props ?? {}) : null}
            {tab.tabButton ? (
              <UniButton type="text" {...tab.tabButton}>
                {tab.tabButton.title}
              </UniButton>
            ) : !tab.nav?.component ? (
              tab.title
            ) : null}
          </>
        </UniTooltip>
      );

      const content = (
        <UniTab uniTabPane={tab as any}>
          {tab.component
            ? createElement(tab.component, {
                ...(tab.props ?? {}),
                className: classNames('tab', (tab.props as any)?.className),
                activeRow: (tab as any).activeRow,
              })
            : tab.content}
        </UniTab>
      );

      return {
        key: String(tab.id),
        label: tabLabel,
        children: content,
      };
    }) ?? items;

  return (
    <Tabs className={mergedClass} items={generatedItems} {...rest}>
      {children}
    </Tabs>
  );
};
