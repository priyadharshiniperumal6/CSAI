import type { Meta, StoryObj } from '@storybook/react-vite';

import { UniNavButton } from './UniNavButton';
import { UniMaterialIcon } from '../icon/UniMaterialIcon';

const buttonsPrimary = [
  {
    title: 'Full size',
    buttons: [
      {
        title: 'Default',
        materialIcon: {
          iconName: 'admin_panel_settings',
        },
      },
      {
        title: 'Badge icon',
        materialIcon: {
          iconName: 'admin_panel_settings',
          badge: {
            value: 10,
          },
        },
      },
      {
        title: 'Selected',
        className: 'selected',
        materialIcon: {
          iconName: 'admin_panel_settings',
        },
      },
      {
        title: 'Disabled',
        disabled: true,
        materialIcon: {
          iconName: 'admin_panel_settings',
        },
      },
    ],
  },
  {
    title: 'Icon Only',
    buttons: [
      {
        iconOnly: true,
        className: 'ant-nav-btn-with-icon',
        materialIcon: {
          iconName: 'admin_panel_settings',
        },
      },
      {
        iconOnly: true,
        materialIcon: {
          iconName: 'admin_panel_settings',
          badge: {
            value: 10,
          },
        },
      },
      {
        iconOnly: true,
        className: 'selected',
        materialIcon: {
          iconName: 'admin_panel_settings',
        },
      },
      {
        iconOnly: true,
        disabled: true,
        materialIcon: {
          iconName: 'admin_panel_settings',
        },
      },
    ],
  },
];

const meta = {
  title: 'Navigation/Nav Button',
  component: UniNavButton,
  tags: ['autodocs'],
  args: {
    children: 'Button',
  },
} satisfies Meta<typeof UniNavButton>;

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
        h3 {
          margin: 0;
          font-weight: 600;
          font-size: 16px;
        }
        h4 {
          margin: 0;
          font-weight: 500;
          font-size: 14px;
        }
      `}
    </style>
    <div className="container">
      {columns.map((item: any, i: number) => (
        <div className="column" key={i}>
          <h3>{item.title}</h3>
          {item.buttons.map((btn: any, j: number) => (
            <div key={j} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h4>{btn.title || '\u00A0'}</h4>
              <div>
                <UniNavButton {...btn}>{!btn.iconOnly && (btn.children || label)}</UniNavButton>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  </>
);

export const Primary: Story = {
  render: args => <ParityTemplate columns={buttonsPrimary} label={args.children as string} />,
};
