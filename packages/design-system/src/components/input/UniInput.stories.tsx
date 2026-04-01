import type { Meta, StoryObj } from '@storybook/react-vite';

import { UniInput } from './UniInput';
import { UniMaterialIcon } from '../icon/UniMaterialIcon';

const meta = {
  title: 'ANT/Input',
  component: UniInput,
  tags: ['autodocs'],
  args: {
    placeholder: 'Search',
  },
} satisfies Meta<typeof UniInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    placeholder: 'Search',
    className: 'w-1/4',
  },
};

export const PrefixIcon: Story = {
  args: {
    placeholder: 'Input with prefix icon',
    className: 'w-1/4',
    prefix: <UniMaterialIcon iconName="person_4" size={20} className="flex-none" />,
  },
};

export const SuffixIcon: Story = {
  args: {
    placeholder: 'Input with suffix icon',
    className: 'w-1/4',
    suffix: <UniMaterialIcon iconName="info" size={20} className="flex-none" />,
  },
};

export const InputStatus: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <UniInput status="error" placeholder="Error" className="w-1/4" />
      <UniInput status="warning" placeholder="Warning" className="w-1/4" />
      <UniInput 
        status="error" 
        placeholder="Error with prefix icon" 
        className="w-1/4" 
        prefix={<UniMaterialIcon iconName="info" size={20} className="flex-none" />} 
      />
    </div>
  ),
};

export const InputWithClearIcon: Story = {
  args: {
    placeholder: 'Input with clear icon',
    className: 'w-1/4',
    allowClear: true,
  },
};

export const InputWithCharacterCount: Story = {
  args: {
    placeholder: 'Character count',
    className: 'w-1/4',
    showCount: true,
    maxLength: 20,
  },
};
