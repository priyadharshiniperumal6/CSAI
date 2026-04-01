import { useState, useRef } from 'react';
import { Dropdown } from 'antd';
import { UniButton } from '../../button/UniButton';
import { UniTabs } from '../../tabs/UniTabs';
import { AddRoles } from './AddRoles';
import { RemoveRoles } from './RemoveRoles';

import './ManageRoles.scss';

export interface ManageRolesProps {
    isOpen?: boolean;
    roles: { label: string; value: string }[];
    selected?: string[];
    selectedUsers?: any[];
    filteredUsers?: any[];
    handleClose?: () => void;
    handleSubmit: (result: any) => void;
    handleOpen: () => void;
}

export const ManageRoles = ({
    isOpen = false,
    roles = [],
    selected = [],
    selectedUsers = [],
    filteredUsers = [],
    handleClose,
    handleSubmit,
}: ManageRolesProps) => {
    const [addRolesValue, setAddRolesValue] = useState<string[]>(selected);
    const [removeRolesValue, setRemoveRolesValue] = useState<string[]>(selected);
    const [applyToSelected, setApplyToSelected] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState('add');

    const dropdownPlaceholderRef = useRef<HTMLDivElement>(null);

    const tabChanged = (tabId: string) => {
        setAddRolesValue([]);
        setRemoveRolesValue([]);
        setActiveTab(tabId);
    };

    const tabs = [
        {
            title: 'Add Roles',
            id: 'add',
            component: AddRoles,
            props: {
                roles,
                value: addRolesValue,
                onChange: setAddRolesValue,
                selectedUsers,
                filteredUsers,
                applyToSelected,
                onApplyToSelectedChange: setApplyToSelected,
            },
            tabButton: {
                title: 'Add Roles',
                type: 'text' as const,
            },
        },
        {
            title: 'Remove Roles',
            id: 'remove',
            component: RemoveRoles,
            props: {
                roles,
                value: removeRolesValue,
                onChange: setRemoveRolesValue,
                selectedUsers,
                filteredUsers,
                applyToSelected,
                onApplyToSelectedChange: setApplyToSelected,
            },
            tabButton: {
                title: 'Remove Roles',
                type: 'text' as const,
            },
        },
    ];

    const handleApply = () => {
        let resultRoles = activeTab === 'add' ? addRolesValue : removeRolesValue;
        
        if (selectedUsers.length > 0 || filteredUsers.length > 0) {
            resultRoles = applyToSelected ? selectedUsers : filteredUsers;
        }

        const result: any = {
            action: activeTab,
            roles: resultRoles,
        };

        handleSubmit?.(result);
    };

    const getPopupContainer = () => {
        return dropdownPlaceholderRef.current || document.body;
    };

    const dropdownContent = (
        <div className="uni-ant-modal-add-roles">
            <div className="uni-manage-roles-title">Manage Roles</div>
            <UniTabs tabs={tabs} tabPosition="left" onChange={tabChanged} />
            <div className="actions">
                <UniButton type="text" size="small" onClick={handleClose}>
                    Cancel
                </UniButton>
                <UniButton type="primary" size="small" onClick={handleApply}>
                    Apply Changes
                </UniButton>
            </div>
        </div>
    );

    return (
        <div className="uni-ant-modal-manage-roles">
            <Dropdown
                arrow
                trigger={['click']}
                placement="bottomRight"
                getPopupContainer={getPopupContainer}
                open={isOpen}
                dropdownRender={() => dropdownContent}
            >
                <div />
            </Dropdown>
            <div ref={dropdownPlaceholderRef} />
        </div>
    );
};
