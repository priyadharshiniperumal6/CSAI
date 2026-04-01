import type { Meta, StoryObj } from '@storybook/react-vite';
import { ConfigProvider } from 'antd';
import { UniTheatreModal } from './UniTheatreModal';
import { ANT_THEME_TOKEN } from '../../theme/themeAntDesign';
import { ContentSlot } from '../../views/Accounts/components/tabs/ContentSlot';
import { ContentHeading } from '../../views/Accounts/components/tabs/ContentHeading';
import { TableUsers } from '../../views/Users/TableUsers';
import { DummyPreview } from './theatre-modal/DummyPreview';
import { DummyAudiplayer } from './theatre-modal/DummyAudiplayer';
import { useState } from 'react';

const TheatreModalStory = (props: any) => {
    const [isOpen, setIsOpen] = useState(true);

    const params = {
        title: "Patrick Smith",
        date: "08 Jul 2023",
        isModalOpen: isOpen,
        tabs: props.tabs,
        audioplayer: {
            component: <DummyAudiplayer />,
            props: {},
        },
        preview: {
            component: <DummyPreview />,
            props: {},
        },
        onCancel: () => setIsOpen(false),
        onNavigateNext: () => console.log('Next'),
        onNavigatePrev: () => console.log('Prev'),
    };

    return (
        <ConfigProvider theme={props.theme}>
            <div className="p-8">
                <button onClick={() => setIsOpen(true)}>Open Theatre Modal</button>
                <UniTheatreModal {...params} />
            </div>
        </ConfigProvider>
    );
};

const meta = {
    title: 'UNI-COMPONENTS/Theatre Modal',
    component: UniTheatreModal,
    tags: ['autodocs'],
    parameters: {
        theme: ANT_THEME_TOKEN,
        tabs: [
            {
                id: 'preview',
                component: ContentSlot,
                title: 'Preview',
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
        ],
        design: [
            {
                name: "User Stories",
                type: "figma",
                url: "https://www.figma.com/design/lt6F9CAbXVdhHtHRD3cav7/UniAnt-2.0---Table-Component?node-id=3411-62169&t=KL8f5HLdxbdyE51o-0",
            },
            {
                name: "States",
                type: "figma",
                url: "https://www.figma.com/design/lt6F9CAbXVdhHtHRD3cav7/UniAnt-2.0---Table-Component?node-id=3411-62104&t=KL8f5HLdxbdyE51o-0",
            },
            {
                name: "Variable Usage",
                type: "figma",
                url: "https://www.figma.com/design/lt6F9CAbXVdhHtHRD3cav7/UniAnt-2.0---Table-Component?node-id=3411-60696&t=KL8f5HLdxbdyE51o-0",
            },
            {
                name: "Dimensions",
                type: "figma",
                url: "https://www.figma.com/design/lt6F9CAbXVdhHtHRD3cav7/UniAnt-2.0---Table-Component?node-id=3411-60196&t=KL8f5HLdxbdyE51o-0",
            },
            {
                name: "Ant Design Specification",
                type: "figma",
                url: "https://www.figma.com/design/lt6F9CAbXVdhHtHRD3cav7/UniAnt-2.0---Table-Component?node-id=3411-59088&t=KL8f5HLdxbdyE51o-0",
            },
        ],
    },
} satisfies Meta<typeof UniTheatreModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        tabs: [],
        onCancel: () => { },
        onNavigateNext: () => { },
        onNavigatePrev: () => { },
    },
    render: (args, { parameters }) => (
        <TheatreModalStory tabs={parameters.tabs} theme={parameters.theme} />
    ),
};
