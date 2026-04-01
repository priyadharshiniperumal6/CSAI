import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColumnSelector } from './ColumnSelector';
import { UniTable } from '../UniTable';
import type { ColDef } from '@ag-grid-community/core';

import { columnList } from '../../../consts/mocks';

const meta = {
    title: 'Uni-Table/ColumnSelector',
    component: ColumnSelector,
    tags: ['autodocs'],
    args: {
        columnList,
    },
    argTypes: {
        tooltipTitle: {
            description: 'The title displayed when hovering over the icon that triggers the dropdown.',
            table: { defaultValue: { summary: 'Column Reorder' } },
            control: 'text',
        },
        tooltipPlacement: {
            description: 'Specifies the position of the tooltip.',
            options: ['bottomRight', 'bottomLeft', 'top', 'bottom', 'topLeft', 'topRight', 'topCenter', 'bottomCenter'],
            control: { type: 'select' },
            table: { defaultValue: { summary: 'bottomRight' } },
        },
        dropdownPlacement: {
            description: 'Specifies the position of the dropdown menu.',
            options: ['bottomRight', 'bottomLeft', 'top', 'bottom', 'topLeft', 'topRight', 'topCenter', 'bottomCenter'],
            control: { type: 'select' },
            table: { defaultValue: { summary: 'bottomRight' } },
        },
        headerTitle: {
            description: 'The text displayed in the header section of the column selector dropdown.',
            table: { defaultValue: { summary: 'Table Settings' } },
            control: 'text',
        },
        rowDensityText: {
            description: 'The text label for the row density control.',
            table: { defaultValue: { summary: 'Row Density' } },
            control: 'text',
        },
        columnList: {
            description: 'The list of table columns available for selection and customization. This is the main data source for the dropdown.',
            table: { type: { summary: 'ColumnItem[]' } },
        },
        selectedColumnsText: {
            description: 'The text displayed to show how many columns are selected.',
            table: { defaultValue: { summary: 'Selected columns' } },
            control: 'text',
        },
        isDropDownOpen: {
            description: 'Controls the visibility of the dropdown. Set to "true" to display the dropdown, and "false" to hide it.',
            table: { defaultValue: { summary: 'false' } },
            control: 'boolean',
        },
        largeButtonText: {
            description: 'Text for the large row density option.',
            table: { defaultValue: { summary: 'Large' } },
            control: 'text',
        },
        compactButtonText: {
            description: 'Text for the compact row density option.',
            table: { defaultValue: { summary: 'Compact' } },
            control: 'text',
        },
        resetToDefaultText: {
            description: 'Text for the reset to default button.',
            table: { defaultValue: { summary: 'Reset to Default' } },
            control: 'text',
        },
        cancelText: {
            description: 'Text for the cancel button.',
            table: { defaultValue: { summary: 'Cancel' } },
            control: 'text',
        },
        saveText: {
            description: 'Text for the save button.',
            table: { defaultValue: { summary: 'Save' } },
            control: 'text',
        },
        searchPlaceholderText: {
            description: 'Placeholder text for the search input.',
            table: { defaultValue: { summary: 'Search' } },
            control: 'text',
        },
        setRowDensity: {
            description: 'A callback function that is triggered when the row density changes. It receives the updated density value as an argument.',
            table: { type: { summary: '(value: boolean) => void' } },
        },
        onSaveColumnList: {
            description: 'Triggered when the user clicks the "Save" button. Passes the updated column list and locked columns as parameters.',
            table: { type: { summary: '(data: { columns: ColumnItem[]; lockedColumns: ColumnItem[] }) => void' } },
        },
        onResetColumnList: {
            description: 'Triggered when the user clicks the "Reset to Default" button. Resets the column list to its initial state.',
            table: { type: { summary: '() => void' } },
        },
        onCancelColumnList: {
            description: 'Triggered when the user clicks the "Cancel" button. Cancels the current changes and closes the dropdown.',
            table: { type: { summary: '() => void' } },
        },
    },
} satisfies Meta<typeof ColumnSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: (args) => (
        <div style={{ height: '60vh' }}>
            <ColumnSelector
                {...args}
                isDropDownOpen={true}
                onSaveColumnList={(data) => console.log('Save:', data)}
                onResetColumnList={() => console.log('Reset')}
                onCancelColumnList={() => console.log('Cancel')}
            />
        </div>
    ),
};

const parameterRowData = [
    {
        propertyName: 'tooltipTitle',
        type: 'String',
        defaultValue: 'Column Reorder',
        description: 'The title displayed when hovering over the icon that triggers the dropdown.'
    },
    {
        propertyName: 'tooltipPlacement',
        type: 'String',
        defaultValue: 'bottomRight',
        description: 'Specifies the position of the tooltip (can be "top", "bottom", "topRight", "bottomRight", etc.).'
    },
    {
        propertyName: 'dropdownPlacement',
        type: 'String',
        defaultValue: 'bottomRight',
        description: 'Specifies the position of the dropdown menu (can be "top", "bottom", "topRight", "bottomRight", etc.).'
    },
    {
        propertyName: 'headerTitle',
        type: 'String',
        defaultValue: 'Table Settings',
        description: 'The text displayed in the header section of the column selector dropdown.'
    },
    {
        propertyName: 'rowDensityText',
        type: 'String',
        defaultValue: 'Row Density',
        description: 'The text label for the row density control.'
    },
    {
        propertyName: 'columnList',
        type: 'Object',
        defaultValue: 'Required',
        description: 'The list of table columns available for selection and customization. This is the main data source for the dropdown.'
    },
    {
        propertyName: 'selectedColumnsText',
        type: 'String',
        defaultValue: 'Selected columns',
        description: 'The text displayed to show how many columns are selected.'
    },
    {
        propertyName: 'isDropDownOpen',
        type: 'Boolean',
        defaultValue: 'false',
        description: 'Controls the visibility of the dropdown. Set to "true" to display the dropdown, and "false" to hide it.'
    },
    {
        propertyName: 'setRowDensity',
        type: 'Function',
        defaultValue: 'Optional',
        description: 'A callback function that is triggered when the row density changes. It receives the updated density value as an argument.'
    }
];

const parameterColumnDefs: ColDef[] = [
    {
        headerName: 'Property Name',
        field: 'propertyName',
        sortable: true,
        filter: true,
        resizable: true,
    },
    {
        headerName: 'Type',
        field: 'type',
        sortable: true,
        filter: true,
        resizable: true,
    },
    {
        headerName: 'Default Value',
        field: 'defaultValue',
        sortable: true,
        filter: true,
        resizable: true,
    },
    {
        headerName: 'Description',
        field: 'description',
        sortable: false,
        filter: true,
        resizable: true,
        flex: 1,
        autoHeight: true,
        wrapText: true,
    }
];

export const Parameters: Story = {
    render: () => (
        <UniTable
            columnDefs={parameterColumnDefs}
            rowData={parameterRowData}
            animateRows={true}
            domLayout='autoHeight'
            autoSizeStrategy={{ type: 'fitGridWidth' }}
        />
    ),
};
