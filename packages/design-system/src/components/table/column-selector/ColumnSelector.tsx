import { useState, useRef, useEffect } from 'react';
import { Dropdown, Tooltip, Typography, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { UniIcon } from '../../icon/UniIcon';
import { UniMaterialIcon } from '../../icon/UniMaterialIcon';
import { UniButton } from '../../button/UniButton';
import { UniCheckbox } from '../../checkbox/UniCheckbox';
import { UniInput } from '../../input/UniInput';
import type { RowDensity } from '../UniTable';
import './ColumnSelector.scss';

const { Text } = Typography;

export interface ColumnItem {
  field: string;
  headerName: string;
  hide: boolean;
  disabled?: boolean;
  lockPinned?: boolean;
  lockPosition?: string | null;
  pinned?: string | null;
}

export interface ColumnSelectorProps {
  tooltipTitle?: string;
  tooltipPlacement?:
    | 'bottomRight'
    | 'bottomLeft'
    | 'top'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'topCenter'
    | 'bottomCenter';
  dropdownPlacement?:
    | 'bottomRight'
    | 'bottomLeft'
    | 'top'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'topCenter'
    | 'bottomCenter';
  headerTitle?: string;
  rowDensityText?: string;
  columnList: ColumnItem[];
  selectedColumnsText?: string;
  isDropDownOpen?: boolean;
  largeButtonText?: string;
  compactButtonText?: string;
  doubleButtonText?: string;
  resetToDefaultText?: string;
  cancelText?: string;
  saveText?: string;
  searchPlaceholderText?: string;
  setRowDensity?: (value: boolean | RowDensity) => void;
  onSaveColumnList?: (data: { columns: ColumnItem[]; lockedColumns: ColumnItem[] }) => void;
  onResetColumnList?: () => void;
  onCancelColumnList?: () => void;
}

export const ColumnSelector = ({
  tooltipTitle = 'Column Reorder',
  tooltipPlacement = 'bottomRight',
  dropdownPlacement = 'bottomRight',
  headerTitle = 'Table Settings',
  rowDensityText = 'Row Density',
  columnList = [],
  selectedColumnsText = 'Selected columns',
  isDropDownOpen = false,
  largeButtonText = 'Large',
  compactButtonText = 'Compact',
  doubleButtonText = 'Double',
  resetToDefaultText = 'Reset to Default',
  cancelText = 'Cancel',
  saveText = 'Save',
  searchPlaceholderText = 'Search',
  setRowDensity,
  onSaveColumnList,
  onResetColumnList,
  onCancelColumnList,
}: ColumnSelectorProps) => {
  const [dropDownOpen, setDropDownOpen] = useState(isDropDownOpen);
  const [columnFilterList, setColumnFilterList] = useState<ColumnItem[]>(columnList);
  const [densityValue, setDensityValue] = useState('Large');
  const [searchText, setSearchText] = useState('');
  const [draggedItemField, setDraggedItemField] = useState<string | null>(null);

  const dropdownPlaceholderRef = useRef<HTMLDivElement>(null);
  const isLockedFeatureAllowed = false;

  const densityOptions = [compactButtonText, largeButtonText, doubleButtonText];

  // Compute derived lists - these track changes to allColumns
  const columnFilterSelectedList = columnFilterList.filter(col => !col.hide);
  const selectedColumnsCount = columnFilterSelectedList.length;
  const lockedColumns = columnFilterSelectedList.filter(col => col.lockPinned);

  useEffect(() => {
    setColumnFilterList(columnList);
  }, [columnList]);

  useEffect(() => {
    if (setRowDensity) {
      if (densityValue === largeButtonText) setRowDensity(true);
      else if (densityValue === compactButtonText) setRowDensity(false);
      else if (densityValue === doubleButtonText) setRowDensity('double');
    }
  }, [densityValue, setRowDensity, largeButtonText, compactButtonText, doubleButtonText]);

  const itemSelectionChanged = (checked: boolean, changedItem: ColumnItem) => {
    setColumnFilterList(prev => prev.map(col => (col.field === changedItem.field ? { ...col, hide: !checked } : col)));
  };

  const removeSelectedItem = (changedItem: ColumnItem) => {
    setColumnFilterList(prev => prev.map(col => (col.field === changedItem.field ? { ...col, hide: true } : col)));
  };

  const handleDragStart = (e: React.DragEvent, column: ColumnItem) => {
    setDraggedItemField(column.field);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text', column.field);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropColumn: ColumnItem) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text');
    if (!data || data === dropColumn.field) {
      setDraggedItemField(null);
      return;
    }

    const sourceIndex = columnFilterSelectedList.findIndex(col => col.field === data);
    const targetIndex = columnFilterSelectedList.findIndex(col => col.field === dropColumn.field);

    if (sourceIndex === -1 || targetIndex === -1) {
      setDraggedItemField(null);
      return;
    }

    const sourceColumn = columnFilterSelectedList[sourceIndex];
    const isLockedColumn = sourceColumn.lockPinned;

    if (!isLockedFeatureAllowed || (!dropColumn.lockPinned && !isLockedColumn)) {
      // Reorder visible fields
      const visibleFields = columnFilterSelectedList.map(c => c.field);
      const reorderedVisibleFields = [...visibleFields];
      const [movedField] = reorderedVisibleFields.splice(sourceIndex, 1);
      reorderedVisibleFields.splice(targetIndex, 0, movedField);

      // Reconstruct full list
      const hiddenItems = columnFilterList.filter(col => col.hide);
      const visibleItemsMap = new Map(columnFilterSelectedList.map(col => [col.field, col]));

      const reorderedFullList = [...reorderedVisibleFields.map(field => visibleItemsMap.get(field)!), ...hiddenItems];

      setColumnFilterList(reorderedFullList);
    }

    setDraggedItemField(null);
  };

  const saveColumnList = () => {
    setDropDownOpen(false);
    // Vue version emits { columns: columnFilterList, lockedColumns }
    onSaveColumnList?.({ columns: columnFilterList, lockedColumns });
  };

  const resetColumnList = () => {
    setColumnFilterList(columnList);
    onResetColumnList?.();
  };

  const cancelColumnList = () => {
    setDropDownOpen(false);
    setColumnFilterList(columnList);
    setSearchText('');
    onCancelColumnList?.();
  };

  const lockandUnlockColumn = (column: ColumnItem) => {
    const currentLockedCount = lockedColumns.length;
    const canLock = currentLockedCount < 3 || column.lockPinned;
    if (!canLock && !column.lockPinned) return;

    setColumnFilterList(prev =>
      prev.map(item => {
        if (item.field === column.field) {
          const shouldLock = !item.lockPinned;
          return {
            ...item,
            lockPosition: shouldLock ? 'left' : null,
            pinned: shouldLock ? 'left' : null,
            lockPinned: shouldLock,
          };
        }
        return item;
      })
    );
  };

  const displayedColumns =
    searchText.length > 1
      ? columnFilterList.filter(col => col.headerName.toLowerCase().includes(searchText.toLowerCase()))
      : columnFilterList;

  const dropdownContent = (
    <div className="h-full bg-white rounded drop-shadow-md flex column-selector-container">
      <div className="column-selector-header flex">
        <div className="flex flex-row">
          <h3>{headerTitle}</h3>
        </div>
        <div className="flex flex-row column-selector-header-density">
          <Text type="secondary" className="column-selector-density-title">
            {rowDensityText}
          </Text>
          <Radio.Group
            size="small"
            value={densityValue}
            optionType="button"
            options={densityOptions}
            onChange={(e: RadioChangeEvent) => setDensityValue(e.target.value)}
            className="uni-radio-group-wrapper"
          />
        </div>
      </div>

      <div className="column-selector-content h-80 grid grid-cols-2 border-0 border-t border-b border-solid overflow-hidden grow">
        <div className="column-selector-content-column border-0 border-r border-solid">
          <Text type="secondary" className="selected-column-header">
            <span className="selected-column-title">{selectedColumnsText}</span>:{' '}
            <span className="selected-columns-count">{selectedColumnsCount}</span>
          </Text>

          <div className="overflow-auto">
            {columnFilterSelectedList.map(column => (
              <div
                key={column.field}
                className={`flex items-center cursor-grab active:cursor-grabbing selected-column ${draggedItemField === column.field ? 'opacity-50' : ''}`}
                draggable
                onDragStart={e => handleDragStart(e, column)}
                onDragOver={handleDragOver}
                onDrop={e => handleDrop(e, column)}
              >
                <UniIcon
                  iconName="uni-drag_indicator"
                  size="16"
                  colorClass="flex-none column-selector-icon cursor-pointer drag-indicator"
                />
                <span className="selected-column-name grow">{column.headerName}</span>
                <div className="float-right selected-column-actions flex item-center">
                  {!column.lockPinned && isLockedFeatureAllowed && (
                    <UniMaterialIcon
                      iconName="lock_open"
                      size="16"
                      colorClass={`flex-none column-selector-icon-disabled unlocked-column ${
                        lockedColumns.length < 3 ? 'cursor-pointer' : 'cursor-not-allowed'
                      }`}
                      onClick={() => lockandUnlockColumn(column)}
                      title={lockedColumns.length >= 3 ? 'Only 3 locked columns allowed.' : ''}
                    />
                  )}
                  {column.lockPinned && isLockedFeatureAllowed && (
                    <UniMaterialIcon
                      iconName="lock"
                      size="16"
                      colorClass="flex-none column-selector-icon-active cursor-pointer locked-column"
                      onClick={() => lockandUnlockColumn(column)}
                    />
                  )}
                  <UniMaterialIcon
                    onClick={() => removeSelectedItem(column)}
                    iconName="close"
                    size="16"
                    colorClass="flex-none column-selector-icon cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="column-selector-content-column all-columns-list-container">
          <UniInput
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            placeholder={searchPlaceholderText}
            prefix={<UniMaterialIcon iconName="search" size="20" colorClass="search-icon" />}
          />
          <div className="overflow-auto all-columns-list">
            {displayedColumns.map(column => (
              <div key={column.field} className="flex items-center hover:bg-primary2 hover:rounded check">
                <UniCheckbox
                  checked={!column.hide}
                  onChange={e => itemSelectionChanged(e.target.checked, column)}
                  disabled={column.disabled}
                >
                  {column.headerName}
                </UniCheckbox>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="column-selector-footer flex justify-end">
        <UniButton type="link" className="mr-auto" onClick={resetColumnList}>
          <UniIcon iconName="uni-replay" size="18" colorClass="text-primary align-text-bottom mr-1" />
          {resetToDefaultText}
        </UniButton>
        <UniButton size="small" onClick={cancelColumnList} className="mr-2">
          {cancelText}
        </UniButton>
        <UniButton type="primary" size="small" onClick={saveColumnList}>
          {saveText}
        </UniButton>
      </div>
    </div>
  );

  return (
    <div>
      <Dropdown
        arrow
        trigger={['click']}
        open={dropDownOpen}
        onOpenChange={setDropDownOpen}
        placement={dropdownPlacement}
        getPopupContainer={() => dropdownPlaceholderRef.current || document.body}
        overlayStyle={{ height: '30rem', width: '38rem' }}
        dropdownRender={() => dropdownContent}
      >
        <Tooltip title={tooltipTitle} placement={tooltipPlacement === 'topCenter' ? 'top' : (tooltipPlacement as any)}>
          <UniIcon iconName="uni-project" size="20" className="icon-color" colorClass="action-icon" />
        </Tooltip>
      </Dropdown>
      <div ref={dropdownPlaceholderRef} />
    </div>
  );
};
