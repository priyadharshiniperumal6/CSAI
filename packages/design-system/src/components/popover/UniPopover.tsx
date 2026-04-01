import { forwardRef } from 'react';
import { Popover } from 'antd';
import type { PopoverProps } from 'antd';

export type UniPopoverProps = PopoverProps;

export const UniPopover = (props: UniPopoverProps) => {
  return <Popover {...props} />;
};

UniPopover.displayName = 'UniPopover';
