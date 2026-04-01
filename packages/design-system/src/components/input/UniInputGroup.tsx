import { Input } from 'antd';
import type { GroupProps } from 'antd/es/input';
import classNames from 'classnames';

export type UniInputGroupProps = GroupProps & {
  class?: string;
};

export const UniInputGroup = ({ className, class: legacyClass, ...rest }: UniInputGroupProps) => {
  return <Input.Group className={classNames(className, legacyClass)} {...rest} />;
};
