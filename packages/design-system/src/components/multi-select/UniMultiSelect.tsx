import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';

import { UniButton } from '../button/UniButton';
import { UniCheckbox } from '../checkbox/UniCheckbox';
import { UniInput } from '../input/UniInput';
import { UniMaterialIcon } from '../icon';

import './UniMultiSelect.scss';

export type UDropDownItem = {
  id: string | number;
  label: string;
  selected?: boolean;
};

export type UniMultiSelectProps = {
  dropDownItems: UDropDownItem[];
  label?: string;
  isActive?: boolean;
  disableSearch?: boolean;
  className?: string;
  onSelectionChanged?: (items: UDropDownItem[]) => void;
};

export const UniMultiSelect = ({
  dropDownItems,
  label,
  isActive = false,
  disableSearch = false,
  className,
  onSelectionChanged,
}: UniMultiSelectProps) => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [items, setItems] = useState<UDropDownItem[]>(dropDownItems);

  useEffect(() => {
    setItems(dropDownItems);
  }, [dropDownItems]);

  const filteredItems = useMemo(() => {
    if (!searchText) {
      return items;
    }
    const lowerSearch = searchText.toLowerCase();
    return items.filter(item => item.label.toLowerCase().includes(lowerSearch));
  }, [items, searchText]);

  const handleSelectionChange = (checked: boolean, changedItem: UDropDownItem) => {
    const updated = items.map(item => (item.id === changedItem.id ? { ...item, selected: checked } : item));
    setItems(updated);
    onSelectionChanged?.(updated);
  };

  const preventDefault: MenuProps['onClick'] = event => {
    event.domEvent.preventDefault();
    event.domEvent.stopPropagation();
  };

  const overlay = (
    <div className="uni-ant-multiselect-menu" onClick={event => event.stopPropagation()}>
      {!disableSearch && items.length ? (
        <div className="uni-ant-multiselect-search">
          <UniInput placeholder="Search" value={searchText} onChange={event => setSearchText(event.target.value)} />
        </div>
      ) : null}
      <div className="uni-ant-multiselect-list">
        {filteredItems.length ? (
          filteredItems.map(item => (
            <UniCheckbox
              key={item.id}
              checked={item.selected}
              className="uni-ant-multiselect-option"
              onChange={event => handleSelectionChange(event.target.checked, item)}
            >
              <span className="uni-ant-multiselect-option-label">{item.label}</span>
            </UniCheckbox>
          ))
        ) : (
          <div className="uni-ant-multiselect-empty">No data</div>
        )}
      </div>
    </div>
  );

  return (
    <Dropdown
      trigger={['click']}
      dropdownRender={() => overlay}
      open={open}
      overlayClassName="uni-ant-multiselect"
      onOpenChange={value => setOpen(value)}
      menu={{ items: [], onClick: preventDefault }}
    >
      <UniButton
        type="default"
        className={classNames('uni-ant-multiselect-open-button', className, { 'is-active': isActive })}
        onClick={event => event.preventDefault()}
      >
        <span className="uni-ant-multiselect-label">{label}</span>
        <UniMaterialIcon iconName="expand_more" size={20} className="uni-ant-multiselect-icon" />
      </UniButton>
    </Dropdown>
  );
};
