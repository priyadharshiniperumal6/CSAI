import { UniSelect } from '../../select/UniSelect';
import { UniRadioGroup } from '../../radio/UniRadio';

export interface AddRolesProps {
    roles: { label: string; value: string }[];
    value: string[];
    onChange: (value: string[]) => void;
    selectedUsers?: any[];
    filteredUsers?: any[];
    applyToSelected: boolean;
    onApplyToSelectedChange: (value: boolean) => void;
}

export const AddRoles = ({
    roles,
    value,
    onChange,
    selectedUsers = [],
    filteredUsers = [],
    applyToSelected,
    onApplyToSelectedChange,
}: AddRolesProps) => {
    const segmentedOptions = [
        `Selected Users (${selectedUsers.length})`,
        `All Filtered Users (${filteredUsers.length})`,
    ];

    const segmentedValue = applyToSelected ? segmentedOptions[0] : segmentedOptions[1];

    const handleChangeUserSelection = (val: string) => {
        onApplyToSelectedChange(val === segmentedOptions[0]);
    };

    return (
        <div>
            {(selectedUsers.length > 0 || filteredUsers.length > 0) && (
                <div>
                    <div className="sub-title">Apply Bulk Action to</div>
                    <UniRadioGroup
                        size="middle"
                        value={segmentedValue}
                        optionType="button"
                        options={segmentedOptions}
                        onChange={(e) => handleChangeUserSelection(e.target.value)}
                    />
                </div>
            )}
            <div className="sub-title">Select Roles to Add</div>
            <UniSelect
                className="grow"
                mode="multiple"
                value={value}
                onChange={(val) => {
                    onChange(val as string[]);
                }}
                options={roles}
            />
        </div>
    );
};
