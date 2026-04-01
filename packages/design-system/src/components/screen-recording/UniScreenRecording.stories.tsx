import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { UniScreenRecording } from './UniScreenRecording';
import { ScreenRecordingMode } from './constants';

const meta: Meta<typeof UniScreenRecording> = {
  title: 'Components/ScreenRecording/UniScreenRecording',
  component: UniScreenRecording,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof UniScreenRecording>;

const Demo = () => {
  const [mode, setMode] = useState<ScreenRecordingMode>(ScreenRecordingMode.Preview);

  return (
    <div style={{ height: 360, background: '#000', borderRadius: 12 }}>
      <UniScreenRecording
        mode={mode}
        callDuration={3600}
        currentTime={120}
        playing={false}
        volume={0.6}
        agentName="Agent Smith"
        onChangeMode={(m) => setMode(m || ScreenRecordingMode.Preview)}
        onAction={action => console.log(action)}
      />
    </div>
  );
};

export const Preview: Story = {
  render: () => <Demo />,
};
