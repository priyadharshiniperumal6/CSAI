import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const formatOffsetTime = (seconds: number, format: 'mm:ss' | 'HH:mm:ss') => {
  const safeSeconds = Math.max(0, seconds);
  return dayjs.duration(Math.round(safeSeconds), 'seconds').format(format);
};
