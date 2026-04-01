import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { TaggableTextEditor } from './TaggableTextEditor';
import { variableAndSlots } from './variableAndSlots';

const meta: Meta<typeof TaggableTextEditor> = {
  title: 'UNI-COMPONENTS/TaggableTextEditor',
  component: TaggableTextEditor,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TaggableTextEditor>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<any[]>([]);
    return (
      <div style={{ maxWidth: 640 }}>
        <TaggableTextEditor
          value={value}
          resources={variableAndSlots()}
          placeholder="Type @ to insert variables"
          minHeight="80px"
          onCurrentValue={updated => {
            setValue(updated.asArrayOfStringAndObject);
          }}
        />
      </div>
    );
  },
};
