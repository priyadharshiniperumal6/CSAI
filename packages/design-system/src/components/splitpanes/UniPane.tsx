import { HTMLAttributes } from 'react';

export type UniPaneProps = {
  minSize?: number;
  maxSize?: number;
  size?: number;
} & HTMLAttributes<HTMLDivElement>;

export const UniPane = ({ children }: UniPaneProps) => <>{children}</>;

UniPane.displayName = 'UniPane';
