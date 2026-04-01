import { Tooltip } from 'antd';
import { UniIcon } from '../../icon/UniIcon';
import { formatOffsetTime } from '../utils/time';

export type AnnotationItem = {
  id: string | number;
  header?: string;
  text?: string;
  offsetInSeconds?: number;
};

type AnnotationIconProps = {
  item: AnnotationItem;
  durationFormat: 'mm:ss' | 'HH:mm:ss';
  onSeek: (time: number) => void;
};

export const AnnotationIcon = ({ item, durationFormat, onSeek }: AnnotationIconProps) => (
  <Tooltip
    title={
      <div className="max-w-xs text-xs">
        <div className="font-semibold">{item.header ?? 'Annotation'}</div>
        <div>{item.text}</div>
        {typeof item.offsetInSeconds === 'number' ? (
          <div className="mt-2 text-white">
            Offset at{' '}
            <b>{formatOffsetTime(item.offsetInSeconds ?? 0, durationFormat)}</b>
          </div>
        ) : null}
      </div>
    }
  >
    <div
      className="flex h-5 w-5 transform items-center justify-center cursor-pointer -translate-x-1/2"
      onClick={() => item.offsetInSeconds !== undefined && onSeek(item.offsetInSeconds)}
    >
      <UniIcon
        iconName="uni-mode_comment"
        size={16}
        colorClass="text-color-icon hover:text-primary transition-colors"
      />
    </div>
  </Tooltip>
);

type ExpandedPlayerHeaderProps = {
  items: AnnotationItem[];
  durationFormat: 'mm:ss' | 'HH:mm:ss';
  onSeek: (time: number) => void;
};

export const ExpandedPlayerHeader = ({ items, durationFormat, onSeek }: ExpandedPlayerHeaderProps) => (
  <div className="flex flex-wrap gap-2 border border-neutral-100 bg-neutral-50 px-4 py-2">
    {items.map(item => (
      <AnnotationIcon key={item.id} item={item} durationFormat={durationFormat} onSeek={onSeek} />
    ))}
  </div>
);

export default ExpandedPlayerHeader;
