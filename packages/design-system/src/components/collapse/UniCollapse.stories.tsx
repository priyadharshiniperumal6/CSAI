import type { Meta, StoryObj } from '@storybook/react-vite';
import { UniCollapse, UniCollapsePanel } from './UniCollapse';
import { UniMaterialIcon } from '../icon';

const meta = {
  title: 'ANT/Collapse',
  component: UniCollapse,
  tags: ['autodocs'],
} satisfies Meta<typeof UniCollapse>;

const dummytext =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.';

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render() {
    return (
      <div style={{ padding: '20px', width: '600px' }}>
        <UniCollapse defaultActiveKey={['1']}>
          <UniCollapsePanel key="1" header="Header 1">
            <p>{dummytext}</p>
          </UniCollapsePanel>
          <UniCollapsePanel key="2" header="Header 2">
            <p>{dummytext}</p>
          </UniCollapsePanel>
          <UniCollapsePanel key="3" header="Header 3" collapsible="disabled">
            <p>{dummytext}</p>
          </UniCollapsePanel>
        </UniCollapse>
      </div>
    );
  },
};

export const WithSpacing: Story = {
  render: function Render() {
    return (
      <div style={{ padding: '20px', width: '600px' }}>
        <UniCollapse isCollapsePanelSpacingAllowed defaultActiveKey={['1']}>
          <UniCollapsePanel isCollapsePanelSpacingAllowed key="1" header="Header 1">
            <p>{dummytext}</p>
          </UniCollapsePanel>
          <UniCollapsePanel isCollapsePanelSpacingAllowed key="2" header="Header 2">
            <p>{dummytext}</p>
          </UniCollapsePanel>
        </UniCollapse>
      </div>
    );
  },
};

export const CollapseWithIcon: Story = {
  render: function Render(args) {
    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      console.log('Collapse With Icon clicked');
    };
    return (
      <div style={{ padding: '20px', width: '600px' }}>
        <UniCollapse defaultActiveKey={['1']}>
          <UniCollapsePanel
            key="1"
            header="Header 1"
            extra={
              <UniMaterialIcon
                className="cursor-pointer hover:text-primary6"
                iconName="edit"
                size={20}
                onClick={handleClick}
              />
            }
          >
            <p>{dummytext}</p>
          </UniCollapsePanel>
          <UniCollapsePanel
            key="2"
            header="Header 2"
            extra={
              <UniMaterialIcon
                className="cursor-pointer hover:text-primary"
                iconName="edit"
                size={20}
                onClick={handleClick}
              />
            }
          >
            <p>{dummytext}</p>
          </UniCollapsePanel>
        </UniCollapse>
      </div>
    );
  },
};
