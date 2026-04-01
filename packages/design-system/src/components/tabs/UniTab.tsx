import { ReactNode } from 'react';
import classNames from 'classnames';

export interface UniTabProps {
  uniTabPane: {
    componentWrapperClass?: string;
  };
  children?: ReactNode;
}

export const UniTab = ({ uniTabPane, children }: UniTabProps) => {
  return (
    <div className={classNames(uniTabPane.componentWrapperClass)}>
      {children}
    </div>
  );
};
