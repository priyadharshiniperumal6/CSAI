import { ColumnItem } from '../../../components/table/column-selector/ColumnSelector';

export const columnList: ColumnItem[] = [
    { field: 'accountName', headerName: 'Account Name', hide: false },
    { field: 'slug', headerName: 'Slug', hide: false },
    { field: 'cluster', headerName: 'Cluster', hide: false },
    { field: 'assignedPartner', headerName: 'Assigned Partner', hide: false },
    { field: 'deployedApplication', headerName: 'Deployed Application', hide: false },
    { field: 'deployedEnvironment', headerName: 'Deployed Environment', hide: false },
    { field: 'actions', headerName: '', hide: false, lockPinned: true, pinned: 'right', disabled: true },
];
