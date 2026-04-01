import type { Meta, StoryObj } from '@storybook/react-vite';
import { UniDropdown } from './UniDropdown';
import { UniMaterialIcon } from '../icon';

const meta = {
  title: 'Ant/Dropdown',
  component: UniDropdown,
  tags: ['autodocs'],
  parameters: {
    menuOptions: [
      {
        name: 'Deactivate Account',
        action: () => { },
        icon: { iconName: 'visibility_off' },
        disabled: true,
      },
      {
        name: 'Delete Account',
        action: () => { },
        icon: { iconName: 'delete' },
        disabled: false,
      },
    ],
    openButtonProps: {
      type: 'text',
      materialIcon: {
        iconName: 'more_vert',
        size: 16,
      },
    },
  },
} satisfies Meta<typeof UniDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render(args, { parameters }) {
    return (
      <div style={{ display: 'flex', gap: '32px', padding: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '16px' }}>Dropdown</h2>
          <UniDropdown options={parameters.menuOptions} openButtonProps={parameters.openButtonProps} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '16px' }}>Dropdown with Icon</h2>
          <UniDropdown
            options={parameters.menuOptions}
            content={
              <UniMaterialIcon
                className="add-icon cursor-pointer"
                iconName="add_circle"
                size={20}
              />
            }
          />
        </div>
      </div>
    );
  },
};
