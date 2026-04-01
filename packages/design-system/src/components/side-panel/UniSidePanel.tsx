import { CSSProperties, forwardRef, ReactNode, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import classNames from 'classnames';

import { UniTabs } from '../tabs/UniTabs';

import type { ToolPanelHeaderFooter, ToolPanelTab } from './types';

import './UniSidePanel.scss';

const getPanelStyle = (panel?: { width?: number; maxWidth?: number; minWidth?: number }): CSSProperties => {
  const width = panel?.width ?? 476;
  return {
    width: `${width}px`,
    maxWidth: `${panel?.maxWidth ?? width}px`,
    minWidth: `${panel?.minWidth ?? width}px`,
  };
};

const renderSection = (section?: ToolPanelHeaderFooter): ReactNode => {
  if (!section?.component) {
    return null;
  }
  const Component = section.component;
  return <Component {...section.params} />;
};

const renderTabContent = (tab: ToolPanelTab) => {
  if (!tab.component) {
    return null;
  }

  const Component = tab.component;
  return (
    <div className={classNames(tab.componentWrapperClass)}>
      <Component {...tab.componentProps} activeRow={tab.activeRow} />
    </div>
  );
};

export const UniSidePanel = forwardRef((props: any, ref) => {
  const [config, setConfig] = useState<any>(props.params || props);
  const [panelStyle, setPanelStyle] = useState<CSSProperties>(() => getPanelStyle(config?.toolPanels?.[0]));
  const [activeKey, setActiveKey] = useState<string>(() => String(config?.activeKey ?? config?.tabs?.[0]?.id ?? ''));

  useImperativeHandle(ref, () => ({
    refresh(newParams: any) {
      const newConfig = newParams?.params || newParams;
      setConfig(newConfig);
      return true;
    },
  }));

  useEffect(() => {
    const currentConfig = props.params || props;
    setConfig(currentConfig);
  }, [props.params, props]);

  useEffect(() => {
    setPanelStyle(getPanelStyle(config?.toolPanels?.[0]));
    setActiveKey(String(config?.activeKey ?? config?.tabs?.[0]?.id ?? ''));
  }, [config]);

  const tabs = useMemo(
    () =>
      config?.tabs?.map((tab: ToolPanelTab) => ({
        id: tab.id,
        title: tab.title,
        nav: tab.nav,
        content: renderTabContent(tab),
      })) ?? [],
    [config?.tabs]
  );

  const bodyHeightOffset = useMemo(() => {
    let value = 0;
    if (config?.header?.component) {
      value += config.header.params?.['rowDensityDefault'] ? 44 : 36;
    }
    if (config?.footer?.component) {
      value += config.footer.params?.['rowDensityDefault'] ? 44 : 36;
    }
    return value;
  }, [config?.header, config?.footer]);

  const handleTabChange = (key: string) => {
    setActiveKey(key);
    props.onTabChange?.(key);
  };

  return (
    <div className={classNames('uni-ag-side-panel', props.className)} style={panelStyle}>
      {renderSection(config?.header)}
      <div className="uni-ag-side-panel-body flex grow" style={{ height: `calc(100% - ${bodyHeightOffset}px)` }}>
        <UniTabs
          className="h-100 grow h-full"
          tabPosition="left"
          tabs={tabs}
          activeKey={activeKey}
          onChange={handleTabChange}
          showTooltip
        />
      </div>
      {renderSection(config?.footer)}
    </div>
  );
});

UniSidePanel.displayName = 'UniSidePanel';

export default UniSidePanel;
