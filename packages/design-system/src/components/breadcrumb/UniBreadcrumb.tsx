import classNames from 'classnames';
import { Breadcrumb } from 'antd';
import type { BreadcrumbProps, BreadcrumbItemProps } from 'antd';

import './UniBreadcrumb.scss';

export const UniBreadcrumb = ({ className, class: legacyClass, ...rest }: BreadcrumbProps & { class?: string }) => {
  return <Breadcrumb className={classNames(className, legacyClass)} {...rest} />;
};

export const UniBreadcrumbItem = (props: BreadcrumbItemProps) => <Breadcrumb.Item {...props} />;
export const UniBreadcrumbSeparator = (props: { children?: React.ReactNode }) => (
  <Breadcrumb.Separator {...props} />
);
