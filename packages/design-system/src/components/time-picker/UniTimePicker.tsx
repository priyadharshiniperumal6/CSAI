import { TimePicker } from 'antd';
import type { TimePickerProps, TimeRangePickerProps } from 'antd/es/time-picker';

export const UniTimePicker = (props: TimePickerProps) => <TimePicker {...props} />;
export const UniTimeRangePicker = (props: TimeRangePickerProps) => <TimePicker.RangePicker {...props} />;
