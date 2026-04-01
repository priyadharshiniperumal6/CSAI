import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { UniStepper } from './UniStepper';
import { UniButton } from '../button/UniButton';
import { UniMaterialIcon } from '../icon/UniMaterialIcon';

const meta = {
  title: 'REACT-ONLY/Ant/Stepper',
  component: UniStepper,
  tags: ['autodocs'],
} satisfies Meta<typeof UniStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  { title: 'Finished', description: 'description.', content: 'Am in first content' },
  { title: 'In Progress', description: 'description.', content: 'Am in second content' },
  { title: 'Waiting', description: 'description.', content: 'Am in third/last content' },
];

export const Basic: Story = {
  args: {
    current: 1,
    items: defaultItems,
  },
};

export const Size: Story = {
  args: {
    size: 'small',
    current: 1,
    items: defaultItems,
  },
};

export const DotStyle: Story = {
  args: {
    progressDot: true,
    current: 1,
    items: defaultItems,
  },
};

export const Direction: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <UniStepper size="small" current={1} items={defaultItems} direction="vertical" />
      <UniStepper size="small" current={1} items={defaultItems} progressDot />
    </div>
  ),
};

export const Status: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ marginBottom: '16px' }}>
        <UniStepper
          size="small"
          current={1}
          items={[{ title: 'Finished', description: 'Finish' }, { title: 'In Process' }, { title: 'Waiting' }]}
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <UniStepper
          size="small"
          current={1}
          items={[
            { title: 'Finished' },
            { title: 'In Process', description: 'Progress', status: 'process' },
            { title: 'Waiting' },
          ]}
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <UniStepper
          size="small"
          current={1}
          items={[
            { title: 'Finished' },
            { title: 'In Process', description: 'Error', status: 'error' },
            { title: 'Waiting' },
          ]}
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <UniStepper
          size="small"
          current={1}
          items={[
            { title: 'Finished' },
            { title: 'In Process' },
            { title: 'Waiting', description: 'Wait', status: 'wait' },
          ]}
        />
      </div>
    </div>
  ),
};

export const StepWithProgressPercentage: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <UniStepper percent={40} current={1} items={defaultItems} style={{ marginBottom: '16px' }} />
      <UniStepper
        percent={80}
        current={1}
        items={[
          { title: 'Finished' },
          { title: 'In Process', description: 'Progress', status: 'process' },
          { title: 'Waiting' },
        ]}
      />
    </div>
  ),
};

export const LabelPlacement: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <UniStepper size="small" current={1} items={defaultItems} style={{ marginBottom: '32px' }} />
      <UniStepper size="small" current={1} items={defaultItems} labelPlacement="vertical" />
    </div>
  ),
};

export const SwitchStep: Story = {
  render: () => {
    const [current, setCurrent] = useState(0);
    const steps = defaultItems;
    const next = () => setCurrent(current + 1);
    const prev = () => setCurrent(current - 1);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <UniStepper size="small" current={current} items={steps} />
        <div
          className="flex items-center justify-center"
          style={{ height: '96px', background: '#edf5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {steps[current].content}
        </div>
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          {current < steps.length - 1 && (
            <UniButton type="primary" onClick={next}>
              Next
            </UniButton>
          )}
          {current > 0 && (
            <UniButton style={{ marginLeft: '8px' }} onClick={prev}>
              Previous
            </UniButton>
          )}
        </div>
      </div>
    );
  },
};

export const StepWithIcon: Story = {
  render: () => (
    <UniStepper
      size="small"
      current={0}
      items={[
        {
          title: 'Login',
          status: 'finish',
          icon: <UniMaterialIcon iconName="person" size={24} />,
        },
        {
          title: 'Settings',
          status: 'process',
          icon: <UniMaterialIcon iconName="settings" size={24} />,
        },
        {
          title: 'Upload',
          status: 'process',
          icon: <UniMaterialIcon iconName="cloud_upload" size={24} />,
        },
      ]}
    />
  ),
};
