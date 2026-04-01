export const actions = {
    openButtonProps: {
        type: 'text',
        className: "ant-btn-with-icon uni-btn-review-action",
        iconOnly: true,
        materialIcon: {
            iconName: "more_vert",
            size: 16,
            colorClass: "uni-btn-review-action-icon",
        },
    },
    options: [
        {
            name: "Deactivate Account",
            className: "uni-dropdown-item",
            materialIcon: {
                iconName: "visibility_off",
            }
        },
        {
            name: "Delete Account",
            className: "uni-dropdown-item",
            materialIcon: {
                iconName: "delete",
            }
        },
    ],
};
