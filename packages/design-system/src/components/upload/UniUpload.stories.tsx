import type { Meta, StoryObj } from '@storybook/react-vite';
import { UniUpload } from './UniUpload';
import { UniButton } from '../button/UniButton';
import { UniMaterialIcon } from '../icon';

const meta = {
  title: 'REACT-ONLY/Ant/Upload',
  component: UniUpload,
  tags: ['autodocs'],
} satisfies Meta<typeof UniUpload>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: function Render() {
    return (
      <div style={{ padding: '20px' }}>
        <UniUpload>
          <UniButton type="primary">
            <UniMaterialIcon iconName="upload" size={16} /> Click to Upload
          </UniButton>
        </UniUpload>
      </div>
    );
  },
};
