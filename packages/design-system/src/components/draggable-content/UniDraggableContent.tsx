import { HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import { UniIcon } from '../icon';

import './UniDraggableContent.scss';

export type UniDraggableContentProps = {
  itemClassName?: string;
  handleClassName?: string;
  contentClassName?: string;
  index?: number;
  isDraggable?: boolean;
  content?: ReactNode;
  actions?: ReactNode;
  onDragStart?: (index?: number) => void;
  onDrop?: (index?: number) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, 'onDragStart' | 'onDrop'>;

export const UniDraggableContent = ({
  itemClassName,
  handleClassName,
  contentClassName,
  index,
  isDraggable = true,
  content,
  actions,
  onDragStart,
  onDrop,
  className,
  ...rest
}: UniDraggableContentProps) => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    if (!isDraggable) {
      event.preventDefault();
      return;
    }
    onDragStart?.(index);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
    }
  };

  const handleDrop = () => {
    onDrop?.(index);
  };

  return (
    <div
      {...rest}
      className={classNames('uni-draggable-content flex', itemClassName, className)}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragOver={event => event.preventDefault()}
      onDrop={handleDrop}
    >
      <div className={classNames('drag-handle flex items-center', handleClassName)}>
        {isDraggable ? (
          <UniIcon
            iconName="uni-drag_indicator"
            size={20}
            colorClass="flex-none column-selector-icon cursor-grab active:cursor-grabbing drag-indicator"
            aria-hidden
          />
        ) : null}
      </div>
      <div className={classNames('flex item-content grow gap-3', contentClassName)}>
        <div className="item-body grow">{content}</div>
        {actions ? <div className="item-actions flex items-center gap-2">{actions}</div> : null}
      </div>
    </div>
  );
};
