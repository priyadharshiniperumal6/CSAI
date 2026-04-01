import type { Meta, StoryObj } from '@storybook/react-vite';
import { UniBreadcrumb, UniBreadcrumbItem } from './UniBreadcrumb';
import { UniMaterialIcon } from '../icon';

const meta = {
  title: 'ANT/Breadcrumb',
  component: UniBreadcrumb,
  tags: ['autodocs'],
} satisfies Meta<typeof UniBreadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <UniBreadcrumb>
      <UniBreadcrumbItem>
        <a href="https://example.com">Home</a>
      </UniBreadcrumbItem>
      <UniBreadcrumbItem>
        <a href="https://example.com">Application Center</a>
      </UniBreadcrumbItem>
      <UniBreadcrumbItem>
        <a href="https://example.com">Application List</a>
      </UniBreadcrumbItem>
      <UniBreadcrumbItem>An Application</UniBreadcrumbItem>
    </UniBreadcrumb>
  ),
};

export const BreadcrumbWithRoute: Story = {
  args: {
    items: [
      { key: 'index', title: 'home', href: '/' },
      {
        key: 'first',
        title: 'first',
        menu: {
          items: [
            { key: 'general', title: 'General' },
            { key: 'layout', title: 'Layout' },
            { key: 'navigation', title: 'Navigation' },
          ],
        },
      },
      { key: 'second', title: 'second' },
    ],
  },
  render: function Render(args) {
    // In Ant Design v5, 'items' is the preferred way over children or routes
    return <UniBreadcrumb {...args} />;
  },
};

export const BreadcrumbWithLoop: Story = {
  render: function Render() {
    const breadcrumbs = [
      { routeTo: 'index', name: 'AI Agents', icon: 'home' },
      { routeTo: 'Acme', name: 'Acme health Collection' },
      { routeTo: 'Intents', name: 'Intents' },
      { routeTo: 'MakePayment', name: 'Make Payment' },
    ];
    return (
      <UniBreadcrumb>
        {breadcrumbs.map((breadcrumb, index) => (
          <UniBreadcrumbItem key={index}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {breadcrumb.icon && <UniMaterialIcon iconName={breadcrumb.icon} size={16} />}
              <span>{breadcrumb.name}</span>
            </div>
          </UniBreadcrumbItem>
        ))}
      </UniBreadcrumb>
    );
  },
};
