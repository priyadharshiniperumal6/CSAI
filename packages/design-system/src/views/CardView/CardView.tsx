import type { ReactNode } from 'react';

import { UniInput } from '../../components/input/UniInput';
import { DataCard } from '../../components/table/DataCard';
import { UniTable } from '../../components/table/UniTable';
import type { CardViewRenderer } from '../../components/table/UniTableCardView';
import { ChipRenderer as UniChipRenderer } from '../Accounts/components/Renderers';
import { UniPageHeader } from '../../components/page-header/UniPageHeader';

// Dummy data adapted from Vue version
const rowDummyData = [
  {
    name: 'Kade Hancock',
    organisations: [
      'Loans',
      'Sales',
      'Deals',
      'Deals',
      'Deals',
      'Sales',
      'Lead',
      'Deals',
      'Deals',
      'Deals',
      'Deals',
      'Deals',
    ],
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
    organisations: [
      'Loans',
      'Sales',
      'Deals',
      'Deals',
      'Deals',
      'Sales',
      'Lead',
      'Deals',
      'Deals',
      'Deals',
      'Deals',
      'Deals',
    ],
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
  for (let index = 0; index < 10; index += 1) {
    rowDummyData.forEach(row => {
      data.push({ ...row, name: `${elementIndex}-${row.name}`, id: elementIndex });
      elementIndex += 1;
    });
  }
  return data;
};

const defaultCardsData = generateData();

const columnDefinitions = [
  {
    headerName: 'Name',
    field: 'name',
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
  ],
};

export type CardViewProps<TCard = any> = {
  cardsData?: TCard[];
  renderCard?: CardViewRenderer<TCard>;
  summarySlot?: ReactNode;
  className?: string;
  title?: ReactNode;
  breadcrumbsSlot?: ReactNode;
  primaryActionsSlot?: ReactNode;
  secondaryActionsSlot?: ReactNode;
  globalFiltersSlot?: ReactNode;

  // Backward-compatible aliases from the page-header refactor.
  breadcrumbs?: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  globalFilters?: ReactNode;
};

export const CardView = <TCard,>({
  cardsData,
  renderCard,
  summarySlot,
  className,
  title = 'Cards',
  breadcrumbsSlot,
  primaryActionsSlot,
  secondaryActionsSlot,
  globalFiltersSlot,
  breadcrumbs,
  primaryAction,
  secondaryAction,
  globalFilters,
}: CardViewProps<TCard>) => {
  const cards = cardsData ?? (defaultCardsData as TCard[]);
  const resolvedBreadcrumbsSlot = breadcrumbsSlot ?? breadcrumbs;
  const resolvedPrimaryActionsSlot = primaryActionsSlot ?? primaryAction;
  const resolvedSecondaryActionsSlot = secondaryActionsSlot ?? secondaryAction;
  const resolvedGlobalFiltersSlot = globalFiltersSlot ?? globalFilters;

  const gridViewProperties = {
    cards,
    renderCard: (card: TCard, index: number) => {
      if (renderCard) {
        return renderCard(card, index);
      }
      return <DataCard card={card as any} />;
    },
    gridClassName: 'p-4',
    suppressHighlight: true,
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <UniPageHeader
        title={title ?? ''}
        breadcrumbsSlot={resolvedBreadcrumbsSlot}
        primaryActionsSlot={resolvedPrimaryActionsSlot}
        secondaryActionsSlot={resolvedSecondaryActionsSlot}
        globalFiltersSlot={resolvedGlobalFiltersSlot}
        showToolbar={false}
      />
      <div className={`uni-cards-view-container grow${className ? ` ${className}` : ''}`}>
        <UniTable
          view="card"
          columnDefs={columnDefinitions as any}
          rowData={cards as any[]}
          headerProperties={singleHeaderData}
          headerSlots={{
            searchInput: <UniInput style={{ width: '200px' }} type="text" placeholder="Search" />,
            tableSummary: summarySlot ?? <div>{cards.length} Records</div>,
          }}
          gridViewProperties={gridViewProperties}
          activeRow={undefined}
        />
      </div>
    </div>
  );
};

export default CardView;
