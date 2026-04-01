import { HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import './UniSubEditor.scss';

export type UniSubEditorInfo = {
  title?: string;
  description?: string;
  subtitle?: string;
};

export type UniSubEditorProps = {
  info?: UniSubEditorInfo;
  toolbar?: ReactNode;
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export const UniSubEditor = ({ info, toolbar, children, className, ...rest }: UniSubEditorProps) => (
  <div {...rest} className={classNames('sub-editor-panel rounded-md relative', className)}>
    <div className="sub-editor-panel-header flex justify-between p-3">
      <p className="sub-editor-panel-right-label m-0 font-bold">{info?.title}</p>
      {toolbar}
    </div>
    <div className="p-2">{children}</div>
  </div>
);
