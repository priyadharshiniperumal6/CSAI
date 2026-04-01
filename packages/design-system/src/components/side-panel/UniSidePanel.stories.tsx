import type { Meta, StoryObj } from '@storybook/react-vite';
import { UniSidePanel } from './UniSidePanel';
import { SidePanelHeader } from './SidePanelHeader';
import { UniNavButton } from '../navigation/UniNavButton';
import type { ToolPanelParams } from './types';
import { ContentSlot } from '../../views/Accounts/components/tabs/ContentSlot';
import { ContentHeading } from '../../views/Accounts/components/tabs/ContentHeading';
import { TableUsers } from '../../views/Users/TableUsers';

import { UniTable } from '../table/UniTable';

const Header = ({ title }: { title: string | { value: string } }) => {
  const titleText = typeof title === 'string' ? title : title?.value || '';
  return (
    <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--ut-color-border-default)' }}>
      <strong>{titleText}</strong>
    </div>
  );
};

const params: ToolPanelParams = {
  header: {
    component: Header,
    params: { title: 'Panel Title' },
  },
  toolPanels: [{ width: 450 }],
  tabs: [
    {
      id: 'list',
      title: 'Content Heading',
      component: ContentSlot,
      nav: {
        component: UniNavButton,
        props: {
          type: 'text',
          iconOnly: true,
          materialIcon: {
            iconName: 'list',
            size: 24,
            badge: {
              value: 2,
            },
          },
        },
      },
    },
    {
      id: 'activity',
      title: 'Activity',
      component: ContentHeading,
      nav: {
        component: UniNavButton,
        props: {
          type: 'text',
          iconOnly: true,
          materialIcon: {
            iconName: 'apps',
            size: 24,
            badge: {
              value: 2,
            },
          },
        },
      },
    },
    {
      id: 'integrations',
      title: 'Content Heading',
      component: TableUsers,
      nav: {
        component: UniNavButton,
        props: {
          type: 'text',
          iconOnly: true,
          materialIcon: {
            iconName: 'settings_b_roll',
            size: 24,
          },
        },
      },
    },
  ],
};

const meta = {
  title: 'UNI-COMPONENTS/SidePanel',
  component: UniSidePanel,
  tags: ['autodocs'],
} satisfies Meta<typeof UniSidePanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const sideBarConfig = {
      toolPanels: [
        {
          id: 'account',
          labelDefault: 'Account',
          toolPanel: UniSidePanel,
          minWidth: 476,
          maxWidth: 476,
          width: 476,
          toolPanelParams: {
            params: {
              rowDensityDefault: true,
              header: {
                component: SidePanelHeader,
                params: {
                  title: {
                    value: 'Side panel title',
                  },
                  subtitle: 'Subtitle',
                  rowDensityDefault: true,
                },
              },
              tabs: [
                {
                  id: 'list',
                  component: ContentSlot,
                  title: 'Content Heading',
                  nav: {
                    component: UniNavButton,
                    props: {
                      type: 'text',
                      iconOnly: true,
                      materialIcon: {
                        iconName: 'list',
                        size: 24,
                        badge: {
                          value: 2,
                        },
                      },
                    },
                  },
                },
                {
                  id: 'apps',
                  title: 'Content Heading',
                  component: ContentHeading,
                  nav: {
                    component: UniNavButton,
                    props: {
                      type: 'text',
                      iconOnly: true,
                      materialIcon: {
                        iconName: 'apps',
                        size: 24,
                        badge: {
                          value: 2,
                        },
                      },
                    },
                  },
                },
                {
                  id: 'integrations',
                  title: 'Content Heading',
                  component: TableUsers,
                  nav: {
                    component: UniNavButton,
                    props: {
                      type: 'text',
                      iconOnly: true,
                      materialIcon: {
                        iconName: 'settings_b_roll',
                        size: 24,
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      ],
      defaultToolPanel: 'account',
    };

    return (
      <div style={{ height: '85vh' }}>
        <UniTable sidePanel={sideBarConfig as any} defaultToolPanel="account" columnDefs={[]} rowData={[]} />
      </div>
    );
  },
};

export const OutOfTheTable: Story = {
  render: () => (
    <UniSidePanel
      params={{
        ...params,
        header: {
          component: SidePanelHeader,
          params: {
            // title: 'Side panel title',
            // subtitle: 'Subtitle',
            close: () => console.log('Close clicked'),
          },
        },
      }}
    />
  ),
};
