import type { Meta, StoryObj } from '@storybook/react-vite';
import { UniTimeline, UniTimelineItem } from './UniTimeline';

const meta = {
  title: 'REACT-ONLY/Ant/Timeline',
  component: UniTimeline,
  tags: ['autodocs'],
} satisfies Meta<typeof UniTimeline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: function Render() {
    return (
      <div style={{ padding: '20px' }}>
        <UniTimeline>
          <UniTimelineItem>Create a services site 2015-09-01</UniTimelineItem>
          <UniTimelineItem>Solve initial network problems 2015-09-01</UniTimelineItem>
          <UniTimelineItem>Technical testing 2015-09-01</UniTimelineItem>
          <UniTimelineItem>Network problems being solved 2015-09-01</UniTimelineItem>
        </UniTimeline>
      </div>
    );
  },
};
