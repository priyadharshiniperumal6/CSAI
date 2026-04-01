import React from 'react';
import { Segmented } from 'antd';
import { UniMaterialIcon } from '../icon/UniMaterialIcon';
import './UniViewSwitcher.scss';

export interface UniViewSwitcherProps {
    defaultView?: string;
    onSwitchView?: (value: string | number) => void;
}

export const UniViewSwitcher: React.FC<UniViewSwitcherProps> = ({
    defaultView = 'table',
    onSwitchView
}) => {
    const options = [
        {
            value: 'card',
            label: (
                <UniMaterialIcon
                    iconName="grid_view"
                    size={14}
                />
            ),
        },
        {
            value: 'table',
            label: (
                <UniMaterialIcon
                    iconName="list"
                    size={14}
                />
            ),
        },
    ];

    return (
        <div className="view-switcher">
            <Segmented
                defaultValue={defaultView}
                options={options}
                onChange={onSwitchView}
            />
        </div>
    );
};

export default UniViewSwitcher;
