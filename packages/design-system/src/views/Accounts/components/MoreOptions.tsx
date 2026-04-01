import { useState } from 'react';
import { UniDropdown } from '../../../components/dropdown/UniDropdown';
import { UniButton } from '../../../components/button/UniButton';
import { UniMaterialIcon } from '../../../components/icon/UniMaterialIcon';

export const MoreOptions = (props: any) => {
    const { value, api, rowIndex, data, setActiveRow } = props; // This contains rowActions and other params
    const [dropdownOpen, setDropdownOpen] = useState(false);

    if (!value) return null;

    const handleActionClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (setActiveRow) {
            setActiveRow({
                api,
                rowIndex,
                data
            });
        }
    };

    // Wrap options to handle action callbacks and keep dropdown state
    const wrappedOptions = value.options?.map((option: any) => ({
        ...option,
        action: () => {
            // Call the original action if it exists
            if (option.action) {
                option.action();
            }
            // Close dropdown after action
            setDropdownOpen(false);
        }
    })) || [];

    const isActive = props.activeRow?.rowIndex === rowIndex;

    return (
        <div className="actions-cell" data-testid="more-options-cell">
            {!isActive && (
                <UniDropdown
                    options={wrappedOptions}
                    openButtonProps={value.openButtonProps}
                    open={dropdownOpen}
                    onOpenChange={setDropdownOpen}
                    size="small"
                    className="uni-show-more"
                />
            )}
            <UniButton
                onClick={handleActionClick}
                type="text"
                iconOnly={true}
                className="uni-btn-review-action"
            >
                <UniMaterialIcon
                    iconName={isActive ? "chevron_left" : "chevron_right"}
                    size={16}
                    colorClass="text-neutral1 ant-button-icon"
                />
            </UniButton>
        </div>
    );
};
