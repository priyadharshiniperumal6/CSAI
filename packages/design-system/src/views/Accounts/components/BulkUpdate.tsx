import { useState } from 'react';
import { UniDropdown } from '../../../components/dropdown/UniDropdown';
import { ManageRoles } from '../../../components/table/bulk-update/ManageRoles';
import { useNotification } from '../../../components/notification/useNotification';
import { useConfirmationModal } from '../../../components/modal/useConfirmationModal';

import { UniButtonProps } from '../../../components/button/UniButton';

interface BulkUpdateProps {
  selectedUsers: any[];
  filteredUsers: any[];
}

export const BulkUpdate = ({ selectedUsers, filteredUsers }: BulkUpdateProps) => {
  const [isManageRolesOpen, setIsManageRolesOpen] = useState(false);
  const { openNotification } = useNotification();
  const { openConfirm } = useConfirmationModal();

  const handleManageRolesClose = () => {
    setIsManageRolesOpen(false);
  };

  const handleManageRolesOpen = () => {
    setIsManageRolesOpen(true);
  };

  const handleSubmitManageRoles = (result: any) => {
    console.log(result);
    // const actionName = result.action === 'add' ? 'Add' : 'Remov';
    const actionName = result.action === 'add' ? 'Add' : 'Remove';

    openNotification({
      message: `${result.action[0].toUpperCase()}${actionName.substring(1)}ed Role(s)`,
      description:
        'Successfully added Quality Analyst role and Support Agent role to Remi Richards, Ava Whitehead, and Ria Stephens.',
      type: 'success',
    });
  };

  const selected = ['1', '2', '3'];
  const roles = [
    { label: 'Admin 1', value: '1' },
    { label: 'SelfServe Editor', value: '2' },
    { label: 'Assist Viewer', value: '3' },
    { label: 'Assist Viewer 1', value: '4' },
    { label: 'Assist Viewer 2', value: '5' },
  ];

  const handleOpenBulkDropdown = () => {
    if (isManageRolesOpen) {
      handleManageRolesClose();
    }
  };

  const handleDeactivateUsers = () =>
    openConfirm({
      title: 'Deactivate Users',
      content: (
        <div>
          <div>This action will remove access from all Uniphore applications.</div>
          <br />
          <div>Are you sure you want to deactivate Remi Richards, Ava Whitehead, Ria Stephens?</div>
        </div>
      ),
      okText: 'Yes, Deactivate Users',
      okButtonProps: {
        type: 'primary',
        danger: true,
      },
      cancelText: 'No, Keep Users Activate',
      width: 610,
      centered: true,
      closable: true,
      maskClosable: false,
    });

  const bulkOptions = [
    {
      name: 'Manage Roles',
      className: 'uni-dropdown-item',
      action: handleManageRolesOpen,
      materialIcon: {
        iconName: 'person',
        size: 18,
      },
    },
    {
      name: 'Deactivate Users',
      className: 'uni-dropdown-item',
      action: handleDeactivateUsers,
      materialIcon: {
        iconName: 'visibility_off',
        size: 18,
      },
    },
    {
      name: 'Remove Users',
      className: 'uni-dropdown-item',
      materialIcon: {
        iconName: 'delete',
        size: 18,
      },
    },
  ];

  const openButtonProps: UniButtonProps & { label: string } = {
    type: 'text',
    className: 'ant-btn-with-icon',
    label: 'Bulk Actions',
    size: 'small',
    materialIcon: {
      iconName: 'keyboard_arrow_down',
      size: 20,
      isAfter: true,
    },
  };

  return (
    <div>
      <UniDropdown
        options={bulkOptions}
        type="default"
        openButtonProps={openButtonProps}
        size="small"
        onOpen={handleOpenBulkDropdown}
      />
      <ManageRoles
        isOpen={isManageRolesOpen}
        handleClose={handleManageRolesClose}
        handleOpen={handleManageRolesOpen}
        roles={roles}
        selected={selected}
        handleSubmit={handleSubmitManageRoles}
        selectedUsers={selectedUsers}
        filteredUsers={filteredUsers}
      />
    </div>
  );
};
