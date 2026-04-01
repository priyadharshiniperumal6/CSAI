import classNames from 'classnames';
import { Input } from 'antd';
import type { TextAreaProps } from 'antd/es/input';

import './UniTextarea.scss';

export type UniTextareaProps = TextAreaProps & {
  class?: string;
};

export const UniTextarea = ({ className, class: legacyClass, ...rest }: UniTextareaProps) => {
  return <Input.TextArea className={classNames('uni-ant-textarea', className, legacyClass)} {...rest} />;
};
