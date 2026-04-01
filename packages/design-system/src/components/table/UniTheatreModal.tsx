import React from 'react';
import { Modal } from 'antd';
import { UniButton } from '../button/UniButton';
import { UniTabs, type UniTabsProps } from '../tabs/UniTabs';
import './UniTheatreModal.scss';

export interface UniTheatreModalProps {
    title?: string;
    date?: string;
    tabs: any[]; // Matches UniTabs component tabs structure
    audioplayer?: {
        component?: React.ReactNode;
        props?: any;
    };
    preview?: {
        component?: React.ReactNode;
        props?: any;
    };
    isModalOpen?: boolean;
    onCancel: () => void;
    onNavigateNext: () => void;
    onNavigatePrev: () => void;
    styleType?: 'horizontal' | 'vertical'; // Should pass to UniTabs if supported
}

export const UniTheatreModal: React.FC<UniTheatreModalProps> = ({
    title,
    date,
    tabs,
    audioplayer,
    preview,
    isModalOpen = false,
    onCancel,
    onNavigateNext,
    onNavigatePrev,
    styleType = 'horizontal',
}) => {
    const previousIcon = {
        iconName: 'arrow_back_ios',
        size: 40,
    };

    const nextIcon = {
        iconName: 'arrow_forward_ios',
        size: 40,
    };

    return (
        <Modal
            open={isModalOpen}
            centered
            onCancel={onCancel}
            footer={null}
            className="uni-ant-threatre-modal"
            width="80vw"
            styles={{ body: { padding: 0 } }}
        >
            <div className="navigation-actions">
                <UniButton
                    materialIcon={previousIcon}
                    type="link"
                    className="previous-item"
                    onClick={onNavigatePrev}
                />
                <UniButton
                    materialIcon={nextIcon}
                    type="link"
                    className="next-item"
                    onClick={onNavigateNext}
                />
            </div>

            <div className="uni-theatre-title">
                {title}
                {date && <div className="uni-theatre-title-date">{date}</div>}
            </div>

            <div className="uni-modal-container flex">
                <div className="uni-theatre-body">
                    <div className="uni-theatre-preview">
                        {preview?.component}
                    </div>
                </div>

                <UniTabs
                    tabPosition="top"
                    tabs={tabs}
                    className="uni-threatre-modal-tabs"
                    // @ts-ignore - styleType might not be in Props yet but used in Vue
                    styleType={styleType}
                />
            </div>
        </Modal>
    );
};

export default UniTheatreModal;
