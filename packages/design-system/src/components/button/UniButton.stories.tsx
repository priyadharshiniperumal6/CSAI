import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fragment } from 'react';
import { UniButton } from './UniButton';
import { UniMaterialIcon } from '../icon/UniMaterialIcon';

// Test data extracted from Vue story src/components/Button/UniButton.stories.ts
const buttonsPrimary = [
  {
    title: 'Static',
    buttons: [
      { title: 'Large', size: 'large', type: 'primary' },
      { title: 'Default', size: 'default', type: 'primary' },
      { title: 'Small', size: 'small', type: 'primary' },
      { title: 'Danger', size: 'large', className: 'ant-button-danger', type: 'primary' },
    ],
  },
  {
    title: 'Hovered',
    buttons: [
      { size: 'large', type: 'primary' },
      { size: 'default', type: 'primary' },
      { size: 'small', type: 'primary' },
      { size: 'large', className: 'ant-button-danger', type: 'primary' },
    ],
  },
  {
    title: 'Focused',
    buttons: [
      {
        size: 'large',
        type: 'primary',
        className: 'ant-btn-with-icon',
        materialIcon: { iconName: 'visibility_off', size: 18 },
      },
      {
        size: 'default',
        type: 'primary',
        className: 'ant-btn-with-icon',
        materialIcon: { iconName: 'visibility_off', size: 16 },
      },
      {
        size: 'small',
        type: 'primary',
        className: 'ant-btn-with-icon',
        materialIcon: { iconName: 'visibility_off', size: 12 },
      },
      {
        size: 'large',
        className: 'ant-button-danger ant-btn-with-icon',
        type: 'primary',
        materialIcon: { iconName: 'visibility_off', size: 18 },
      },
    ],
  },
  {
    title: 'Disabled',
    buttons: [
      { size: 'large', disabled: true, type: 'primary' },
      { size: 'default', disabled: true, type: 'primary' },
      { size: 'small', disabled: true, type: 'primary' },
      { size: 'large', disabled: true, className: 'ant-button-danger', type: 'primary' },
    ],
  },
];

const buttonsDefault = [
  {
    title: 'Static',
    buttons: [
      { title: 'Large', size: 'large' },
      { title: 'Default', size: 'default' },
      { title: 'Small', size: 'small' },
      { title: 'Danger', size: 'large', className: 'ant-button-danger' },
    ],
  },
  {
    title: 'Hovered',
    buttons: [{ size: 'large' }, { size: 'default' }, { size: 'small' }, { size: 'large', className: 'ant-button-danger' }],
  },
  {
    title: 'Focused',
    buttons: [
      { size: 'large', className: 'ant-btn-with-icon', uniIcon: { iconName: 'uni-project', size: 16 } },
      { size: 'default', className: 'ant-btn-with-icon', uniIcon: { iconName: 'uni-project', size: 14 } },
      { size: 'small', className: 'ant-btn-with-icon', uniIcon: { iconName: 'uni-project', size: 12 } },
      {
        size: 'large',
        className: 'ant-button-danger ant-btn-with-icon',
        uniIcon: { iconName: 'uni-project', size: 14 },
      },
    ],
  },
  {
    title: 'Disabled',
    buttons: [
      { size: 'large', disabled: true },
      { size: 'default', disabled: true },
      { size: 'small', disabled: true },
      { size: 'large', disabled: true, className: 'ant-button-danger' },
    ],
  },
];

const buttonsText = [
  {
    title: 'Static',
    buttons: [
      { title: 'Large', size: 'large', type: 'text' },
      { title: 'Default', size: 'default', type: 'text' },
      { title: 'Small', size: 'small', type: 'text' },
      { title: 'Danger', size: 'large', className: 'ant-button-danger', type: 'text' },
    ],
  },
  {
    title: 'Hovered',
    buttons: [
      { size: 'large', type: 'text' },
      { size: 'default', type: 'text' },
      { size: 'small', type: 'text' },
      { size: 'large', className: 'ant-button-danger', type: 'text' },
    ],
  },
  {
    title: 'Focused',
    buttons: [
      { size: 'large', type: 'text' },
      { size: 'default', type: 'text' },
      { size: 'small', type: 'text' },
      { size: 'large', className: 'ant-button-danger', type: 'text' },
    ],
  },
  {
    title: 'Disabled',
    buttons: [
      { size: 'large', disabled: true, type: 'text' },
      { size: 'default', disabled: true, type: 'text' },
      { size: 'small', disabled: true, type: 'text' },
      { size: 'large', disabled: true, className: 'ant-button-danger', type: 'text' },
    ],
  },
];

const buttonsLink = [
  {
    title: 'Static',
    buttons: [
      { title: 'Large', size: 'large', type: 'link' },
      { title: 'Default', size: 'default', type: 'link' },
      { title: 'Small', size: 'small', type: 'link' },
      { title: 'Danger', size: 'large', className: 'ant-button-danger', type: 'link' },
    ],
  },
  {
    title: 'Hovered',
    buttons: [
      { size: 'large', type: 'link' },
      { size: 'default', type: 'link' },
      { size: 'small', type: 'link' },
      { size: 'large', className: 'ant-button-danger', type: 'link' },
    ],
  },
  {
    title: 'Focused',
    buttons: [
      { size: 'large', type: 'link' },
      { size: 'default', type: 'link' },
      { size: 'small', type: 'link' },
      { size: 'large', className: 'ant-button-danger', type: 'link' },
    ],
  },
  {
    title: 'Disabled',
    buttons: [
      { size: 'large', disabled: true, type: 'link' },
      { size: 'default', disabled: true, type: 'link' },
      { size: 'small', disabled: true, type: 'link' },
      { size: 'large', disabled: true, className: 'ant-button-danger', type: 'link' },
    ],
  },
];

const meta = {
  title: 'Ant/Button',
  component: UniButton,
  tags: ['autodocs'],
  args: {
    children: 'Button',
  },
} satisfies Meta<typeof UniButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const ParityTemplate = ({ columns, label }: { columns: any[]; label: string }) => (
  <>
    <style>
      {`
        .container {
          display: flex;
          gap: 16px;
        }
        .column {
          display: flex;
          gap: 8px;
          flex-direction: column;
        }
      `}
    </style>
    <>
      <div className="container">
        {columns.map((item: any, i: number) => (
          <div className="column" key={i}>
            {item.buttons.map((btn: any, j: number) => (
              <Fragment key={j}>
                <h4>{btn.title || '\u00A0'}</h4>
                <UniButton {...btn}>
                  {btn.children || label}
                  {btn.materialIcon && (
                    <UniMaterialIcon size={btn.materialIcon.size} iconName="lock" style={{ marginLeft: '4px' }} />
                  )}
                </UniButton>
                <br />
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </>
  </>
);

export const Primary: Story = {
  render: (args) => <ParityTemplate columns={buttonsPrimary} label={args.children as string} />,
  parameters: {
    docs: {
      source: {
        code: `<UniButton type="primary">Button</UniButton>`,
      },
    },
  },
};

export const Secondary: Story = {
  render: (args) => <ParityTemplate columns={buttonsDefault} label={args.children as string} />,
  parameters: {
    docs: {
      source: {
        code: `<UniButton>Button</UniButton>`,
      },
    },
  },
};

export const Tertiary: Story = {
  render: (args) => <ParityTemplate columns={buttonsText} label={args.children as string} />,
  parameters: {
    docs: {
      source: {
        code: `<UniButton type="text">Button</UniButton>`,
      },
    },
  },
};

export const Link: Story = {
  render: (args) => <ParityTemplate columns={buttonsLink} label={args.children as string} />,
  parameters: {
    docs: {
      source: {
        code: `<UniButton type="link">Button</UniButton>`,
      },
    },
  },
};
