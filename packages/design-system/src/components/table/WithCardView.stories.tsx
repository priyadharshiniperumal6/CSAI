import type { Meta, StoryObj } from '@storybook/react-vite';
import { UniTable } from './UniTable';
import { DataCard } from './DataCard';
import { UniInput } from '../input/UniInput';
import { UniViewSwitcher } from './UniViewSwitcher';
import { ChipRenderer as UniChipRenderer } from '../../views/Accounts/components/Renderers';
import { Role } from '../../views/Users/components/Role';
import { useState } from 'react';
import { ANT_THEME_TOKEN } from '../../theme/themeAntDesign';

// Dummy data adapted from Vue version
const rowDummyData = [
  {
    name: 'Kade Hancock',
    organisations: ['Loans', 'Sales', 'Deals', 'Deals', 'Deals', 'Sales', 'Lead', 'Deals', 'Deals', 'Deals', 'Deals', 'Deals'],
    role: { tags: [{ value: 'Account Admin' }] },
    language: 'English',
    channels: [
      { materialIcon: { iconName: 'phone', size: 20 } },
      { materialIcon: { iconName: 'message', size: 20 } },
      { materialIcon: { iconName: 'mail', size: 20 } },
    ],
  },
  {
    name: 'Remi Richards',
    organisations: ['Loans', 'Sales', 'Deals', 'Deals', 'Deals', 'Sales', 'Lead', 'Deals', 'Deals', 'Deals', 'Deals', 'Deals'],
    role: { tags: [{ value: 'Sales Supervisor' }] },
    language: 'English',
    channels: [
        { materialIcon: { iconName: 'phone', size: 20 } },
        { materialIcon: { iconName: 'message', size: 20 } },
        { materialIcon: { iconName: 'mail', size: 20 } },
    ],
  },
  {
    name: 'Trinity Walton',
    organisations: ['Loans', 'Sales', 'Deals', 'Deals', 'Deals'],
    role: { tags: [{ value: 'Business Analyst' }] },
    language: 'English',
    channels: [
        { materialIcon: { iconName: 'phone', size: 20 } },
        { materialIcon: { iconName: 'message', size: 20 } },
        { materialIcon: { iconName: 'mail', size: 20 } },
    ],
  },
];

const generateData = () => {
    const data: any[] = [];
    let elementIndex = 0;
    for (let index = 0; index < 10; index++) {
        rowDummyData.forEach(row => {
            data.push({ ...row, name: `${elementIndex}-${row.name}`, id: elementIndex });
            elementIndex++;
        });
    }
    return data;
};

const cardsData = generateData();

const columnDefinitions = [
    {
        headerName: 'Name',
        field: 'name',
        filter: true,
    },
    {
        headerName: 'Role',
        field: 'role',
        cellRenderer: (params: any) => <Role value={params.value} />,
        filter: true,
    },
    {
        headerName: 'Language',
        field: 'language',
        filter: true,
    },
    {
        headerName: 'Organisations',
        field: 'organisations',
        cellRenderer: UniChipRenderer,
        filter: true,
        cellRendererParams: {
            type: 'multiple',
            maxItems: 3,
        },
    },
];

const singleHeaderData = {
  slots: [
    { name: 'searchInput', order: 1, class: 'uni-ml16 grow' },
    { name: 'tableSummary', order: 2, class: 'uni-mr16' },
    { name: 'viewSwitcher', order: 3, class: 'uni-mr16' },
  ],
};

const CardViewStory = () => {
  const [view, setView] = useState<'table' | 'card'>('card');


  const gridViewProperties = {
    cards: cardsData,
    renderCard: (card: any) => <DataCard card={card} />,
    gridClassName: "p-4",
    suppressHighlight: true
  };

  return (
    <div style={{ height: '90vh' }}>
      <UniTable
        view={view}
        columnDefs={columnDefinitions}
        rowData={cardsData}
        headerProperties={singleHeaderData}
        headerSlots={{
          searchInput: <UniInput style={{ width: '200px' }} type="text" placeholder="Search" />,
          tableSummary: <div>{cardsData.length} Records</div>,
          viewSwitcher: <UniViewSwitcher defaultView={view} onSwitchView={(v: any) => setView(v)} />
        }}
        gridViewProperties={gridViewProperties}
        activeRow={undefined}
      />
    </div>
  );
};

const meta = {
  title: 'Uni-Table/TableWithCardView',
  component: UniTable,
  tags: ['autodocs'],
  parameters: {
    theme: ANT_THEME_TOKEN,
    layout: 'fullscreen',
  },
} satisfies Meta<typeof UniTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CardViewStory />,
};
