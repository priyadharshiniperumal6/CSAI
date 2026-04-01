import { Divider } from 'antd';
import type { DividerProps } from 'antd';

export type UniDividerProps = DividerProps;

export const UniDivider = (props: UniDividerProps) => {
  return <Divider {...props} />;
};
