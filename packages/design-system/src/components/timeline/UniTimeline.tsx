import { Timeline } from 'antd';
import type { TimelineProps, TimelineItemProps } from 'antd';

export const UniTimeline = (props: TimelineProps) => <Timeline {...props} />;
export const UniTimelineItem = (props: TimelineItemProps) => <Timeline.Item {...props} />;
