export const tableParameters = [
  {
    name: "columnDefs",
    type: "Array<Object>",
    defaultValue: "[]",
    description: "An array of objects defining the table columns. Each object specifies column properties such as header name, field key, and other configurations."
  },
  {
    name: "rowData",
    type: "Array<Object>",
    defaultValue: "[]",
    description: "An array of objects representing the data for each row. Each object contains data mapped to the respective column fields."
  },
  {
    name: "headerProperties",
    type: "Object",
    defaultValue: "{}",
    description: "Object containing additional configurations for the table header, such as custom actions or styles."
  },
  {
    name: "rowSelection",
    type: "String",
    defaultValue: "'single'",
    description: "Defines the row selection mode. Can be 'single' for selecting one row at a time or 'multiple' for allowing multiple row selection."
  },
  {
    name: "tableTheme",
    type: "String",
    defaultValue: "''",
    description: "CSS class to apply the theme or styling to the table. Adjusts the overall look and feel of the table."
  },
  {
    name: "autoSizeStrategy",
    type: "String | Object",
    defaultValue: "undefined",
    description: "Defines the auto-sizing strategy for table columns, determining how columns are resized to fit the table."
  },
  {
    name: "activeRow",
    type: "Object",
    defaultValue: "null",
    description: "Holds the currently active row's data and API instance. Used to highlight and manage the active row in the table."
  },
  {
    name: "setActiveRow",
    type: "Function",
    defaultValue: "undefined",
    description: "Callback function to set a row as active and manage related events (e.g., highlighting the row or displaying additional details)."
  },
  {
    name: "rowClassRules",
    type: "Object",
    defaultValue: "{}",
    description: "Object defining dynamic class rules for table rows. It allows you to conditionally apply CSS classes to rows based on row data."
  },
  {
    name: "sidePanel",
    type: "Object",
    defaultValue: "undefined",
    description: "An optional object to display and control a side panel next to the table, used for additional row details or actions."
  },
  {
    name: "defaultToolPanel",
    type: "String",
    defaultValue: "''",
    description: "Specifies the default tool panel to display in the table (e.g., a sidebar with filters or actions)."
  },
  {
    name: "rowDensityDefault",
    type: "Boolean",
    defaultValue: "true",
    description: "Boolean flag to define the default row density (spacing). If true, the default spacing between rows is applied."
  },
];

export const additionalParameters = [
  {
    name: "pagination",
    type: "Boolean",
    defaultValue: "false",
    description: "Enables pagination, splitting data into multiple pages."
  },
  {
    name: "paginationPageSize",
    type: "Number",
    defaultValue: "100",
    description: "Number of rows displayed per page when pagination is enabled."
  },
  {
    name: "suppressRowClickSelection",
    type: "Boolean",
    defaultValue: "false",
    description: "Prevents rows from being selected when clicked."
  },
  {
    name: "domLayout",
    type: "String",
    defaultValue: "normal",
    description: "Defines the DOM layout. Options include 'normal', 'autoHeight', and 'print'."
  },
  {
    name: "defaultColDef",
    type: "Object",
    defaultValue: "{}",
    description: "Default column definitions for all columns."
  },
  {
    name: "animateRows",
    type: "Boolean",
    defaultValue: "false",
    description: "Enables animations for row updates."
  },
  {
    name: "cacheQuickFilter",
    type: "Boolean",
    defaultValue: "false",
    description: "Enables caching for quick filters, improving performance."
  },
  {
    name: "enableRangeSelection",
    type: "Boolean",
    defaultValue: "false",
    description: "Allows selection of multiple rows or cells."
  },
  {
    name: "pivotMode",
    type: "Boolean",
    defaultValue: "false",
    description: "Enables pivot mode, allowing grid data to pivot similar to a pivot table."
  },
  {
    name: "groupDefaultExpanded",
    type: "Number",
    defaultValue: "0",
    description: "Sets how many groups should be expanded by default."
  },
  {
    name: "headerHeight",
    type: "Number",
    defaultValue: "undefined",
    description: "Specifies header height in pixels."
  },
  {
    name: "rowHeight",
    type: "Number",
    defaultValue: "undefined",
    description: "Defines row height in pixels."
  },
  {
    name: "suppressCellFocus",
    type: "Boolean",
    defaultValue: "false",
    description: "Prevents cell highlighting when clicked."
  },
  {
    name: "multiSortKey",
    type: "String",
    defaultValue: "ctrl",
    description: "Specifies the key (Ctrl/Shift) to enable multi-column sorting."
  },
  {
    name: "enableCellTextSelection",
    type: "Boolean",
    defaultValue: "false",
    description: "Allows text selection within cells."
  },
  {
    name: "suppressMenuHide",
    type: "Boolean",
    defaultValue: "false",
    description: "Keeps the column menu visible even after selection."
  },
  {
    name: "suppressRowDeselection",
    type: "Boolean",
    defaultValue: "false",
    description: "Prevents row deselection when clicked again."
  },
  {
    name: "suppressScrollOnNewData",
    type: "Boolean",
    defaultValue: "false",
    description: "Prevents scrolling to the top when new data is loaded."
  },
  {
    name: "suppressMultiSort",
    type: "Boolean",
    defaultValue: "false",
    description: "Disables multi-column sorting when holding a key like Shift."
  },
  {
    name: "suppressDragLeaveHidesColumns",
    type: "Boolean",
    defaultValue: "false",
    description: "Prevents columns from being hidden when dragged outside the grid."
  },
  {
    name: "suppressFieldDotNotation",
    type: "Boolean",
    defaultValue: "false",
    description: "Prevents dot notation (nested field access) for column field definitions."
  },
  {
    name: "suppressMakeColumnVisibleAfterUnGroup",
    type: "Boolean",
    defaultValue: "false",
    description: "Keeps columns hidden after ungrouping if they were hidden before grouping."
  },
  {
    name: "suppressCopyRowsToClipboard",
    type: "Boolean",
    defaultValue: "false",
    description: "Prevents rows from being copied to the clipboard during copy operations."
  },
  {
    name: "deltaRowDataMode",
    type: "Boolean",
    defaultValue: "false",
    description: "Only updates rows that have changed instead of redrawing all rows."
  },
  {
    name: "defaultExportParams",
    type: "Object",
    defaultValue: "{}",
    description: "Defines default parameters for exporting data from the grid."
  },
  {
    name: "floatingFilter",
    type: "Boolean",
    defaultValue: "false",
    description: "Enables floating filters displayed below the column headers."
  },
  {
    name: "suppressKeyboardEvent",
    type: "Function",
    defaultValue: "undefined",
    description: "Allows custom suppression of specific keyboard events in the grid."
  },
  {
    name: "suppressNoRowsOverlay",
    type: "Boolean",
    defaultValue: "false",
    description: "Disables the 'no rows' overlay when no data is present in the grid."
  },
  {
    name: "getRowStyle",
    type: "Function",
    defaultValue: "undefined",
    description: "Applies custom CSS styles to specific rows."
  },
  {
    name: "getRowClass",
    type: "Function",
    defaultValue: "undefined",
    description: "Returns a CSS class for each row."
  },
  {
    name: "suppressLoadingOverlay",
    type: "Boolean",
    defaultValue: "false",
    description: "Disables the loading overlay when the grid is loading data."
  },
  {
    name: "rowBuffer",
    type: "Number",
    defaultValue: "10",
    description: "Specifies the number of extra rows to render outside the viewport."
  },
  {
    name: "suppressRowHoverHighlight",
    type: "Boolean",
    defaultValue: "false",
    description: "Disables the row hover highlight feature."
  },
  {
    name: "masterDetail",
    type: "Boolean",
    defaultValue: "false",
    description: "Enables the master-detail grid feature for expanding rows into sub-grids."
  },
  {
    name: "autoGroupColumnDef",
    type: "Object",
    defaultValue: "{}",
    description: "Defines default properties for the auto-generated group column."
  },
  {
    name: "suppressColumnVirtualisation",
    type: "Boolean",
    defaultValue: "false",
    description: "Disables column virtualization, rendering all columns even outside the viewport."
  },
];
