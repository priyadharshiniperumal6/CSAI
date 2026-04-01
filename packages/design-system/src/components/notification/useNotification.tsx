import type { ReactNode } from 'react';
import classNames from 'classnames';
import { notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';

import { UniMaterialIcon } from '../icon';
import './UniNotification.scss';

export type UniNotificationType = 'success' | 'error' | 'info' | 'warning';

export type NotificationProps = {
  message?: ReactNode;
  description?: ReactNode;
  type?: UniNotificationType;
  placement?: NotificationPlacement;
  duration?: number | null;
  className?: string;
  class?: string;
};

export const useNotification = () => {
  const openNotification = ({
    message,
    description,
    type,
    placement = 'bottomRight',
    duration,
    className,
    class: legacyClass,
  }: NotificationProps) => {
    let icon: ReactNode = null;
    const classes = classNames('uni-ant-notification', legacyClass, className, {
      'uni-cancel-notification': type === 'error',
      'uni-info-notification': type === 'info',
      'uni-warning-notification': type === 'warning',
    });

    switch (type) {
      case 'success':
        icon = <UniMaterialIcon iconName="check_small" size={20} />;
        break;
      case 'error':
        icon = <UniMaterialIcon iconName="close_small" size={20} />;
        break;
      case 'info':
        icon = <UniMaterialIcon iconName="info_i" size={14} />;
        break;
      case 'warning':
        icon = <UniMaterialIcon iconName="info_i" size={14} />;
        break;
    }

    const closeIcon = <UniMaterialIcon iconName="close_small" size={24} />;

    notification.open({
      message,
      description,
      icon,
      closeIcon,
      placement,
      duration: duration ?? undefined,
      className: classes,
    });
  };

  return {
    openNotification,
  };
};
