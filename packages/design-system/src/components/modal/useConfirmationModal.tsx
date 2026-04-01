import { UniModalConfirm } from './UniModal';
import type { ModalFuncProps } from 'antd';

export const useConfirmationModal = () => {
    const openConfirm = (props: ModalFuncProps) => {
        UniModalConfirm({
            ...props,
            icon: null, // Custom icon handling if needed, usually passed in props
            centered: true,
            autoFocusButton: null,
        });
    };

    return {
        openConfirm,
    };
};
