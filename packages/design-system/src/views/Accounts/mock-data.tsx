import { allColors } from '../../theme/themeAntDesign';
import { UniButton } from '../../components/button/UniButton';
import { UniNavButton } from '../../components/navigation/UniNavButton';
import { TableUsers } from '../Users/TableUsers';
import { AccountNameRenderer, ChipRenderer, DeployedEnvironment } from './components/Renderers';
import { MoreOptions } from './components/MoreOptions';
import { UniSidePanel } from '../../components/side-panel/UniSidePanel';
import { SidePanelHeader } from '../../components/side-panel/SidePanelHeader';

import { ContentSlot } from './components/tabs/ContentSlot';
import { ContentHeading } from './components/tabs/ContentHeading';

const ContentSlotAny = ContentSlot as any;
const ContentHeadingAny = ContentHeading as any;

export const coloredTagsOptions = {
  blueTag: {
    tags: [
      {
        value: 'Demo',
        textColor: allColors['--ucolor-content-text-info'],
        borderColor: allColors['--bcolor-blue-500'],
        backgroundColor: allColors['--ucolor-fill-info-light'],
      },
    ],
  },

  goldTag: {
    tags: [
      {
        value: 'Test',
        textColor: allColors['--bcolor-gold-800'],
        borderColor: allColors['--ucolor-border-warning'],
        backgroundColor: allColors['--bcolor-gold-100'],
      },
    ],
  },

  greenTag: {
    tags: [
      {
        value: 'Production',
        textColor: allColors['--ucolor-content-text-success'],
        borderColor: allColors['--bcolor-green-700'],
        backgroundColor: allColors['--bcolor-green-100'],
      },
    ],
  },
};

export const theatreModeTabs = [
  {
    id: 'preview',
    component: ContentSlotAny,
    title: 'Preview',
    tabButton: {
      component: UniButton,
      title: 'Preview',
      type: 'link',
    },
  },
  {
    id: 'details',
    title: 'Details',
    component: ContentHeadingAny,
    tabButton: {
      component: UniButton,
      title: 'Details',
      type: 'link',
    },
  },
  {
    id: 'integrations',
    title: 'Annotations',
    component: TableUsers,
    tabButton: {
      component: UniButton,
      title: 'Annotations',
      type: 'link',
    },
  },
  {
    id: 'transcript',
    title: 'Transcript',
    component: TableUsers,
    tabButton: {
      component: UniButton,
      title: 'Transcript',
      type: 'link',
    },
  },
  {
    id: 'locks',
    title: 'Locks',
    component: TableUsers,
    tabButton: {
      component: UniButton,
      title: 'Locks',
      type: 'link',
    },
  },
];

export const getTabs = (props: any): any[] => {
  const { activeRow } = props;

  return [
    {
      id: 'list',
      component: ContentSlotAny,
      title: 'Content Heading',

      nav: {
        component: UniNavButton,
        props: {
          iconOnly: true,
          style: { marginBottom: '8px' },
          materialIcon: {
            iconName: 'list',
            badge: {
              value: 10,
            },
          },
        },
      },
      activeRow,
    },
    {
      id: 'apps',
      title: 'Content Heading',
      component: ContentHeadingAny,

      nav: {
        component: UniNavButton,
        props: {
          iconOnly: true,
          style: { marginBottom: '8px' },
          materialIcon: {
            iconName: 'apps',
            size: '20',
            badge: {
              value: 2,
            },
          },
        },
      },

      activeRow,
    },
    {
      id: 'integrations',
      title: 'Users',
      component: TableUsers,

      nav: {
        component: UniNavButton,
        props: {
          iconOnly: true,
          style: { marginBottom: '8px' },
          materialIcon: {
            iconName: 'settings_b_roll',
            size: '20',
          },
        },
      },
      activeRow,
    },
    {
      id: 'users',
      title: 'Customers',
      component: TableUsers,
      nav: {
        component: UniNavButton,
        props: {
          iconOnly: true,
          materialIcon: {
            iconName: 'person',
            size: '20',
          },
        },
      },
      activeRow,
    },
  ];
};

export const getTableProperties = (props: any): any => {
  const {
    activeRow,
    handleTheatreModalOpen,
    rowActions,
    headerTitle,
    headerSubtitle,
    defaultToolPanel,
    rowDensityDefault,
    close,
    rowSelection,
  } = props;

  const { blueTag, greenTag, goldTag } = coloredTagsOptions;

  const tabs = getTabs({ activeRow });
  const baseRows = [
    {
      accountName: 'UassistQA',
      slug: 'uassistqa',
      cluster: 'United States',
      assignedPartner: 'Uniphore',
      deployedApplication: ['U-Uniphore', 'U-Analyze', 'U-Capture'],
      deployedEnvironment: blueTag,
    },
    {
      accountName: 'ABC Company',
      slug: 'abccompany',
      cluster: 'India',
      assignedPartner: 'Tech Mahindra',
      deployedApplication: ['U-Analyze', 'U-Capture'],
      deployedEnvironment: goldTag,
    },
    {
      accountName: 'Eran Staging',
      slug: 'eranstaging',
      cluster: 'Kaiser Workshop',
      assignedPartner: 'DGDG',
      deployedApplication: ['U-Analyze'],
      deployedEnvironment: greenTag,
    },
    {
      accountName: 'CloudNine Services',
      slug: 'cloudnine-services',
      cluster: 'Europe West',
      assignedPartner: 'Concentrix',
      deployedApplication: ['U-Assist', 'U-Discover'],
      deployedEnvironment: blueTag,
    },
    {
      accountName: 'Zenith Retail',
      slug: 'zenith-retail',
      cluster: 'Australia',
      assignedPartner: 'Tech Mahindra',
      deployedApplication: ['U-Capture', 'U-Analyze'],
      deployedEnvironment: goldTag,
    },
  ];

  const rowData = Array.from({ length: 100 }, (_unused, index) => {
    const seed = baseRows[index % baseRows.length];
    return {
      id: index + 1,
      accountName: `${seed.accountName} ${index + 1}`,
      slug: `${seed.slug}-${index + 1}`,
      cluster: seed.cluster,
      assignedPartner: seed.assignedPartner,
      deployedApplication: seed.deployedApplication,
      deployedEnvironment: seed.deployedEnvironment,
      actions: rowActions,
    };
  });

  const showSelectColumn = rowSelection === 'multiple';

  return {
    headerActionButtonIcon: {
      colorClass: 'text-neutral1 ant-button-icon',
      iconName: 'add',
      size: '16',
    },
    singleHeader: {
      slots: [
        {
          name: 'searchInput',
          order: 1,
          className: '',
        },
        {
          name: 'tableSummary',
          order: 2,
          className: 'uni-ml16 grow',
        },
        {
          name: 'actionButtons',
          order: 3,
          className: 'uni-ml16',
        },
      ],
    },
    columnDefs: [
      ...(showSelectColumn
        ? [
            {
              headerName: '',
              field: '__select__',
              checkboxSelection: true,
              headerCheckboxSelection: true,
              sortable: false,
              filter: false,
              pinned: 'left',
              lockPinned: true,
              resizable: false,
              suppressSizeToFit: true,
              minWidth: 52,
              maxWidth: 52,
            },
          ]
        : []),
      {
        headerName: 'Account Name',
        field: 'accountName',
        cellRenderer: AccountNameRenderer,
        cellRendererParams: { secondaryField: 'slug' },
        filter: true,
        minWidth: 116,
        cellStyle: { display: 'flex', justifyContent: 'flex-start', alignItems: 'center' },
      },
      {
        headerName: 'Slug',
        field: 'slug',
        filter: true,
        minWidth: 116,
        cellStyle: { display: 'flex', justifyContent: 'flex-start', alignItems: 'center' },
      },
      {
        headerName: 'Cluster',
        field: 'cluster',
        filter: true,
        minWidth: 116,
        cellStyle: { display: 'flex', justifyContent: 'flex-start', alignItems: 'center' },
      },
      {
        headerName: 'Assigned Partner',
        field: 'assignedPartner',
        cellRenderer: ChipRenderer,
        filter: true,
        cellRendererParams: {
          type: 'single',
        },
        minWidth: 116,
        cellStyle: { display: 'flex', justifyContent: 'flex-start', alignItems: 'center' },
      },
      {
        headerName: 'Deployed Application',
        field: 'deployedApplication',
        cellRenderer: ChipRenderer,
        filter: true,
        cellRendererParams: {
          type: 'multiple',
          maxItems: 1,
        },
        minWidth: 116,
        cellStyle: { display: 'flex', justifyContent: 'flex-start', alignItems: 'center' },
      },
      {
        headerName: 'Deployed Environment',
        field: 'deployedEnvironment',
        cellRenderer: DeployedEnvironment,
        filter: true,
        minWidth: 116,
        cellStyle: { display: 'flex', justifyContent: 'flex-start', alignItems: 'center' },
      },
      {
        headerName: '',
        field: 'actions',
        cellStyle: { display: 'flex', 'align-items': 'center' },
        cellRenderer: MoreOptions,
        sortable: false,
        filter: false,
        pinned: 'right',
        cellClass: 'uni-actions-cell',
        resizable: false,
        minWidth: 84,
        maxWidth: 84,
        cellRendererParams: {
          activeRow,
          handleTheatreModalOpen,
        },
      },
    ],
    rowData,
    sidePanel: {
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
              rowDensityDefault,
              header: {
                component: SidePanelHeader,
                params: {
                  title: headerTitle,
                  subtitle: headerSubtitle,
                  rowDensityDefault,
                  close,
                  handleTheatreModalOpen,
                },
              },
              activeRow,
              tabs,
            },
          },
        },
      ],
      defaultToolPanel,
      hiddenByDefault: true,
      minWidth: 600,
    },
  };
};
