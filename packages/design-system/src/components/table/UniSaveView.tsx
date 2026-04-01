import React, { useState, useMemo, useCallback } from 'react';
import { Dropdown, Tooltip, Divider, Popconfirm } from 'antd';
import classNames from 'classnames';
import { UniIcon } from '../icon/UniIcon';
import { UniMaterialIcon } from '../icon/UniMaterialIcon';
import { UniButton } from '../button/UniButton';
import { UniRadioGroup } from '../radio/UniRadio';
import { UniInput } from '../input/UniInput';
import { UniEmpty } from '../empty/UniEmpty';
import emptyImage from '../../assets/images/empty-img-default.svg';

import './UniSaveView.scss';

export interface ViewItem {
  id: string | number;
  title: string;
  scope: 'ACCESS_SCOPE_PUBLIC' | 'ACCESS_SCOPE_PRIVATE';
  isOwner?: boolean;
}

export interface UniSaveViewProps {
  views?: ViewItem[];
  selectedListView?: ViewItem;
  savingInProgress?: boolean;
  onSaveViewList?: (payload: { type: 'Shared' | 'Private'; name: string }) => void;
  onDeleteSelectedView?: (view: ViewItem) => void;
  onSelectView?: (view: ViewItem) => void;
  tooltipTitle?: string;
  listViewTooltipTitle?: string;
}

export const UniSaveView: React.FC<UniSaveViewProps> = ({
  views = [],
  selectedListView,
  savingInProgress = false,
  onSaveViewList,
  onDeleteSelectedView,
  onSelectView,
  tooltipTitle = 'Save View',
  listViewTooltipTitle = 'List View',
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isListViewDropdownVisible, setIsListViewDropdownVisible] = useState(false);
  const [name, setName] = useState('');
  const [selectedView, setSelectedView] = useState('Private View');
  const [popupconfirmId, setPopupconfirmId] = useState<string | number | null>(null);
  const [isDuplicateView, setIsDuplicateView] = useState(false);

  const sharedViews = useMemo(() => views.filter(v => v.scope === 'ACCESS_SCOPE_PUBLIC'), [views]);
  const privateViews = useMemo(() => views.filter(v => v.scope === 'ACCESS_SCOPE_PRIVATE'), [views]);

  const validateViewName = useCallback(
    (value: string) => {
      if (views.find(v => v.title === value.trim())) {
        setIsDuplicateView(true);
      } else {
        setIsDuplicateView(false);
      }
    },
    [views]
  );

  const resetFields = useCallback(() => {
    setName('');
    setSelectedView('Private View');
    setIsDuplicateView(false);
  }, []);

  const handleSave = () => {
    if (name !== '' && !isDuplicateView) {
      onSaveViewList?.({
        type: selectedView === 'Shared View' ? 'Shared' : 'Private',
        name,
      });
      setIsDropdownVisible(false);
      resetFields();
    }
  };

  const handleCancelSave = () => {
    setIsDropdownVisible(false);
    resetFields();
  };

  const handleDelete = (id: string | number) => {
    const viewToDelete = views.find(v => v.id === id);
    if (viewToDelete) {
      onDeleteSelectedView?.(viewToDelete);
    }
    setIsListViewDropdownVisible(false);
    setPopupconfirmId(null);
  };

  const saveOverlay = (
    <div className="shadow bg-white p-6 rounded-lg " style={{ width: '22rem' }}>
      <p className="text-base font-medium cursor-default m-0 mb-4">Save View</p>
      <div>
        <div className="mb-4">
          <UniInput
            className={classNames('h-8', { 'input-error-wrapper': isDuplicateView })}
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => {
              setName(e.target.value);
              validateViewName(e.target.value);
            }}
          />
          {isDuplicateView && <p className="warning-message text-xs mt-1 m-0">Name already exists</p>}
        </div>
        <UniRadioGroup
          value={selectedView}
          onChange={e => setSelectedView(e.target.value)}
          options={['Private View', 'Shared View']}
          className="uni-radio-group text-sm my-7 grid font-normal"
          size="small"
        />
        <div className="flex justify-end mt-4">
          <UniButton className="mr-3" type="text" onClick={handleCancelSave}>
            Cancel
          </UniButton>
          <UniButton type="primary" onClick={handleSave} loading={savingInProgress}>
            Save
          </UniButton>
        </div>
      </div>
    </div>
  );

  const renderViewList = (viewList: ViewItem[], title: string) => {
    if (viewList.length === 0) return null;
    return (
      <>
        <div className="text-sm px-2 font-semibold cursor-default text-neutral-500 py-1">
          {title} ({viewList.length})
        </div>
        <ul className="m-0 p-0 text-sm list-none">
          {viewList.map(view => (
            <li
              key={view.id}
              className={classNames('flex h-8 cursor-pointer items-center justify-between gap-2 px-2 list-view', {
                'uni-selected-view': view.title === selectedListView?.title || view.id === popupconfirmId,
              })}
              onClick={() => {
                onSelectView?.(view);
                setIsListViewDropdownVisible(false);
              }}
            >
              <div className="grow truncate">{view.title}</div>
              {view.isOwner && (
                <Popconfirm
                  placement="left"
                  title="Are you sure to delete this saved view?"
                  okText="Yes"
                  cancelText="No"
                  open={popupconfirmId === view.id}
                  onCancel={e => {
                    e?.stopPropagation();
                    setPopupconfirmId(null);
                  }}
                  onConfirm={e => {
                    e?.stopPropagation();
                    handleDelete(view.id);
                  }}
                  onOpenChange={visible => {
                    if (!visible) setPopupconfirmId(null);
                  }}
                  overlayStyle={{ zIndex: 1200 }}
                  overlayClassName="w-64 text-sm"
                >
                  <UniMaterialIcon
                    size={20}
                    iconName="delete"
                    className="uni-icon cursor-pointer uni-icon-delete"
                    onClick={e => {
                      e.stopPropagation();
                      setPopupconfirmId(view.id === popupconfirmId ? null : view.id);
                    }}
                  />
                </Popconfirm>
              )}
            </li>
          ))}
        </ul>
      </>
    );
  };

  const listViewOverlay = (
    <div className="shadow bg-white px-3 py-3.5" style={{ width: '16rem' }}>
      <div className="flex flex-col gap-1">
        {sharedViews.length > 0 || privateViews.length > 0 ? (
          <>
            {renderViewList(sharedViews, 'Shared')}
            <Divider className="my-2" />
            {renderViewList(privateViews, 'Private')}
          </>
        ) : (
          <div className="flex justify-center">
            <UniEmpty params={{ props: { image: emptyImage, title: 'No Saved Views', description: '' } }} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex uni-action-save items-center gap-1">
      <Dropdown
        arrow
        trigger={['click']}
        placement="bottomRight"
        open={isDropdownVisible}
        onOpenChange={setIsDropdownVisible}
        dropdownRender={() => saveOverlay}
        overlayClassName="uni-dropdown-overlay"
      >
        <div className="uni-action-save-trigger">
          <Tooltip title={tooltipTitle} placement="bottomRight">
            <div className="cursor-pointer flex items-center justify-center p-1 hover:bg-neutral-100 rounded-full">
              <UniIcon size={20} iconName="uni-star" className="uni-icon" />
            </div>
          </Tooltip>
        </div>
      </Dropdown>

      <div
        className="h-4 w-px uni-divider-icon"
        style={{ backgroundColor: 'var(--ut-color-bg-brand)', height: '12px', margin: '0 4px' }}
      ></div>

      <div className="flex items-center">
        {/* {selectedListView && (
                    <span className="text-sm px-2 font-semibold cursor-default text-neutral-800">
                        {selectedListView.title}
                    </span>
                )} */}
        <Dropdown
          arrow
          trigger={['click']}
          placement="bottomRight"
          open={isListViewDropdownVisible}
          onOpenChange={setIsListViewDropdownVisible}
          dropdownRender={() => listViewOverlay}
          overlayClassName="uni-dropdown-overlay"
        >
          <div className="uni-action-expand-trigger">
            <Tooltip title={listViewTooltipTitle} placement="bottomRight">
              <div className="cursor-pointer flex items-center justify-center">
                <UniMaterialIcon size={14} iconName="expand_more" className="uni-icon uni-action-expand-more" />
              </div>
            </Tooltip>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default UniSaveView;
