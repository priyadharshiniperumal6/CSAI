import { Tooltip } from 'antd';
import type { TooltipProps } from 'antd';

export type UniTooltipProps = TooltipProps;

export const UniTooltip = (props: UniTooltipProps) => {
  return <Tooltip {...props} />;
};

UniTooltip.displayName = 'UniTooltip';
