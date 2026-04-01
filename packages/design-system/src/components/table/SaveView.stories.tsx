import type { Meta, StoryObj } from '@storybook/react-vite';
import { ConfigProvider } from 'antd';
import { useState } from 'react';

import { UniSaveView, type ViewItem } from './UniSaveView';
import { listViewMock } from '../../consts/mocks';
import { ANT_THEME_TOKEN } from '../../theme/themeAntDesign';

const SaveViewStory = () => {
    const [views, setViews] = useState<ViewItem[]>(listViewMock as ViewItem[]);
    const [selected, setSelected] = useState<ViewItem | undefined>(listViewMock[0] as ViewItem);

    const handleSave = (payload: { type: 'Shared' | 'Private'; name: string }) => {
        const newView: ViewItem = {
            id: String(Date.now()),
            title: payload.name,
            scope: payload.type === 'Shared' ? 'ACCESS_SCOPE_PUBLIC' : 'ACCESS_SCOPE_PRIVATE',
            isOwner: true,
        };
        setViews([...views, newView]);
    };

    const handleDelete = (view: ViewItem) => {
        setViews(views.filter(v => v.id !== view.id));
    };

    return (
        <ConfigProvider theme={ANT_THEME_TOKEN}>
            <div style={{ padding: '40px', height: '300px' }}>
                <UniSaveView
                    views={views}
                    selectedListView={selected}
                    onSelectView={setSelected}
                    onSaveViewList={handleSave}
                    onDeleteSelectedView={handleDelete}
                />
            </div>
        </ConfigProvider>
    );
};

const meta = {
    title: 'UNI-COMPONENTS/SaveView',
    component: UniSaveView,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/lt6F9CAbXVdhHtHRD3cav7/UniAnt-2.0---Table-Component?node-id=3388-39011&t=GFtKEcO0sp71nsT1-0',
            allowFullscreen: true,
        },
        theme: ANT_THEME_TOKEN,
    },
} satisfies Meta<typeof UniSaveView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <SaveViewStory />,
};
