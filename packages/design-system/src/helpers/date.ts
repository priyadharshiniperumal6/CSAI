import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import arraySupport from 'dayjs/plugin/arraySupport';
import type { Dayjs } from 'dayjs';

dayjs.extend(arraySupport);
dayjs.extend(duration);

export const disabledDate = (current: Dayjs) => current && current > dayjs().endOf('day');

export const DATE_FILTER_PRESETS = [
  { label: 'Today', value: dayjs().startOf('day') },
  { label: 'Yesterday', value: dayjs().add(-1, 'day').startOf('day') },
  { label: 'This week', value: dayjs().startOf('week') },
  { label: 'Last week', value: dayjs().add(-1, 'week').startOf('week') },
  { label: 'This month', value: dayjs().startOf('month') },
  { label: 'Last month', value: dayjs().add(-1, 'month').startOf('month') },
  { label: 'This year', value: dayjs().startOf('year') },
  { label: 'Last year', value: dayjs().add(-1, 'year').startOf('year') },
  { label: 'Year to date', value: dayjs().startOf('year') },
];
