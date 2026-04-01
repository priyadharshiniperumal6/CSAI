import { DatePicker } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';

export const UniDatePicker = (props: DatePickerProps) => <DatePicker {...props} />;
export const UniRangePicker = (props: RangePickerProps) => <DatePicker.RangePicker {...props} />;
