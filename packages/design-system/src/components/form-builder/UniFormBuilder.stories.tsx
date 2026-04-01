import type { Meta, StoryObj } from '@storybook/react-vite';

import { UniFormBuilder } from './UniFormBuilder';
import type { UniFormElementMeta } from './types';

const meta = {
  title: 'REACT-ONLY/Ant/FormBuilder',
  component: UniFormBuilder,
  tags: ['autodocs'],
  args: {
    uniFormData: { name: '', role: undefined },
    uniFormMeta: [
      {
        key: 'name',
        label: 'Name',
        type: 'input',
        rules: [{ required: true, message: 'Name is required' }],
      },
      {
        key: 'role',
        label: 'Role',
        type: 'select',
        options: [
          { label: 'Agent', value: 'agent' },
          { label: 'Supervisor', value: 'supervisor' },
        ],
      },
    ] as UniFormElementMeta[],
  },
} satisfies Meta<typeof UniFormBuilder>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
