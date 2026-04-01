
import React from 'react';
import { UniButton } from '../../../../components/button/UniButton';
import './AccountTabs.scss';

interface ContentHeadingProps {
    title?: string;
    materialIcon?: any;
}

export const ContentHeading: React.FC<ContentHeadingProps> = ({ 
    title, 
    materialIcon = { size: 18, iconName: 'search' } 
}) => {
    return (
        <div className="uni-ant-tab">
            <div className="uni-ant-tab">
                {title && (
                    <div className="uni-ant-tab-header px-6 pt-2">{title}</div>
                )}
                <div className="slot-box mx-7">Slot Component</div>
            </div>
            <div className="uni-ant-tab">
                {title && (
                    <div className="uni-ant-tab-header px-6 pt-2">
                        {title}
                        <div className="uni-ant-tab-actions">
                            <UniButton size="small">Button</UniButton>
                        </div>
                    </div>
                )}
                <div className="slot-box mx-7">Slot Component</div>
            </div>
            <div className="uni-ant-tab">
                {title && (
                    <div className="uni-ant-tab-header px-6 pt-2">
                        {title}
                        <div className="uni-ant-tab-actions">
                            <UniButton size="small">Button</UniButton>
                            <UniButton size="small">Button</UniButton>
                        </div>
                    </div>
                )}
                <div className="slot-box mx-7">Slot Component</div>
            </div>
            <div className="uni-ant-tab">
                {title && (
                    <div className="uni-ant-tab-header px-6 pt-2">
                        {title}
                        <div className="uni-ant-tab-actions">
                            <UniButton
                                iconOnly={true}
                                type="default"
                                materialIcon={materialIcon}
                            />
                        </div>
                    </div>
                )}
                <div className="slot-box mx-7">Slot Component</div>
            </div>
        </div>
    );
};

export default ContentHeading;
