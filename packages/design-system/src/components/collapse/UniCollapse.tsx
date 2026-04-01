import { Collapse } from 'antd';
import type { CollapsePanelProps, CollapseProps } from 'antd';
import classNames from 'classnames';

import './UniCollapse.scss';

export type UniCollapseProps = CollapseProps & {
  isCollapsePanelSpacingAllowed?: boolean;
  class?: string;
};

export type UniCollapsePanelProps = CollapsePanelProps & {
  isCollapsePanelSpacingAllowed?: boolean;
  class?: string;
};

const renderExpandIcon: NonNullable<CollapseProps['expandIcon']> = ({ isActive }) => (
  <span className="material-symbols-outlined text-xl">{isActive ? 'expand_more' : 'chevron_right'}</span>
);

export const UniCollapse = ({ className, class: legacyClass, isCollapsePanelSpacingAllowed, ...rest }: UniCollapseProps) => {
  return (
    <Collapse
      {...rest}
      className={classNames('uni-ant-collapse', className, legacyClass, {
        'uni-ant-collapse-border': isCollapsePanelSpacingAllowed,
      })}
      expandIcon={renderExpandIcon}
    />
  );
};

export const UniCollapsePanel = ({ className, class: legacyClass, isCollapsePanelSpacingAllowed, ...rest }: UniCollapsePanelProps) => {
  return (
    <Collapse.Panel
      className={classNames(className, legacyClass, {
        'uni-ant-collapse-panel': isCollapsePanelSpacingAllowed,
      })}
      {...rest}
    />
  );
};
