import type { Meta, StoryObj } from '@storybook/react-vite';
import { UniTabs, type UniTabDefinition } from './UniTabs';
// import { UniButton } from '../button/UniButton';
import { UniNavButton } from '../navigation/UniNavButton';
import { ContentSlot } from '../../views/Accounts/components/tabs/ContentSlot';
import { ContentHeading } from '../../views/Accounts/components/tabs/ContentHeading';
import { TableUsers } from '../../views/Users/TableUsers';

const meta = {
  title: 'UNI-COMPONENTS/Uni Tabs',
  component: UniTabs,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div style={{ height: '90vh' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UniTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const MultipleContentSlots = () => (
  <div className="flex flex-col gap-4">
    <div className="uni-ant-tab">
      <div className="slot-box mx-7 border border-dashed border-neutral-500 p-4 text-center">Slot Component</div>
    </div>
    <div className="uni-ant-tab">
      <div className="slot-box mx-7 border border-dashed border-neutral-500 p-4 text-center">Slot Component</div>
    </div>
    <div className="uni-ant-tab">
      <div className="slot-box mx-7 border border-dashed border-neutral-500 p-4 text-center">Slot Component</div>
    </div>
    <div className="uni-ant-tab">
      <div className="slot-box mx-7 border border-dashed border-neutral-500 p-4 text-center">Slot Component</div>
    </div>
  </div>
);

const simpleTabs: UniTabDefinition[] = [
  {
    id: 'list',
    component: ContentSlot,
    nav: {
      component: UniNavButton,
      props: {
        type: 'text',
        iconOnly: true,
        materialIcon: { iconName: 'list', size: 24 },
      },
    },
  },
  {
    id: 'apps',
    component: MultipleContentSlots,
    nav: {
      component: UniNavButton,
      props: {
        type: 'text',
        iconOnly: true,
        materialIcon: { iconName: 'apps', size: 24 },
      },
    },
  },
  {
    id: 'integrations',
    component: TableUsers,
    nav: {
      component: UniNavButton,
      props: {
        type: 'text',
        iconOnly: true,
        materialIcon: { iconName: 'settings_b_roll', size: 24 },
      },
    },
  },
];

const badgeTabs: UniTabDefinition[] = [
  {
    id: 'list',
    title: 'Content Heading',
    component: ContentSlot,
    nav: {
      component: UniNavButton as any,
      props: {
        type: 'text',
        iconOnly: true,
        materialIcon: { iconName: 'list', size: 24, badge: { value: 2 } },
      },
    },
  },
  {
    id: 'apps',
    title: 'Content Heading',
    component: MultipleContentSlots,
    nav: {
      component: UniNavButton as any,
      props: {
        type: 'text',
        iconOnly: true,
        materialIcon: { iconName: 'apps', size: 24, badge: { value: 2 } },
      },
    },
  },
  {
    id: 'integrations',
    title: 'Content Heading',
    component: TableUsers,
    nav: {
      component: UniNavButton as any,
      props: {
        type: 'text',
        iconOnly: true,
        materialIcon: { iconName: 'settings_b_roll', size: 24, badge: { value: 2 } },
      },
    },
  },
];

const horizontalTabs: UniTabDefinition[] = [
  {
    id: 'list',
    title: 'Content Heading',
    component: ContentSlot,
    tabButton: {
      title: 'Preview',
      type: 'link',
    },
  },
  {
    id: 'details',
    title: 'Details',
    component: ContentHeading,
    tabButton: {
      title: 'Details',
      type: 'link',
    },
  },
  {
    id: 'integrations',
    title: 'Annotations',
    component: TableUsers,
    tabButton: {
      title: 'Annotations',
      type: 'link',
    },
  },
  {
    id: 'transcript',
    title: 'Transcript',
    component: TableUsers,
    tabButton: {
      title: 'Transcript',
      type: 'link',
    },
  },
  {
    id: 'locks',
    title: 'Locks',
    component: TableUsers,
    tabButton: {
      title: 'Locks',
      type: 'link',
    },
  },
];

export const LeftNavigation: Story = {
  args: {
    tabPosition: 'left',
    tabs: simpleTabs,
  },
};

export const LeftNavigationWithBadge: Story = {
  args: {
    tabPosition: 'left',
    tabs: badgeTabs,
  },
};

export const TopNavigation: Story = {
  args: {
    tabs: horizontalTabs,
    styleType: 'horizontal',
    className: 'uni-ag-side-panel',
  },
};
