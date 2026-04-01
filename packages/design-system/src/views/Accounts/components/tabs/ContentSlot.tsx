
import React from 'react';
import './AccountTabs.scss';

interface ContentSlotProps {
    title?: string;
}

export const ContentSlot: React.FC<ContentSlotProps> = ({ title }) => {
    return (
        <div className="uni-ant-tab">
            {title && <div className="uni-ant-tab-header px-6 pt-2">{title}</div>}
            <div className="slot-box grow overflow-auto mx-7">
                Slot Component
            </div>
        </div>
    );
};

export default ContentSlot;
