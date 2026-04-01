import { ReactNode } from 'react';
import classNames from 'classnames';

import { UniTooltip } from '../tooltip/UniTooltip';
import { UniTag } from '../tag/UniTag';
import type { UniTagProps } from '../tag/UniTag';

import './UniCardHeader.scss';

export type UniCardHeaderProps = {
  title?: string;
  tagText?: string;
  tagOptions?: UniTagProps;
  showStatus?: boolean;
  statusColor?: string;
  className?: string;
  children?: ReactNode;
};

const DEFAULT_TAG_OPTIONS: UniTagProps = {
  size: 'small',
  textColor: 'var(--ut-color-text-subtle)',
  borderColor: 'var(--ut-color-border-muted)',
  backgroundColor: 'var(--ut-color-bg-surface-muted)',
};

export const UniCardHeader = ({
  title,
  tagText,
  tagOptions,
  showStatus,
  statusColor = '#000000',
  children,
  className,
}: UniCardHeaderProps) => {
  const mergedTagOptions = { ...DEFAULT_TAG_OPTIONS, ...tagOptions };

  return (
    <div className={classNames('uni-card-header', className)}>
      <div className="uni-card-header-row">
        <div className="uni-card-header-title">
          {showStatus ? <div className="uni-card-header-status" style={{ backgroundColor: statusColor }} /> : null}
          <div className="uni-card-header-title-text" title={title}>
            <UniTooltip title={title} placement="right">
              {title}
            </UniTooltip>
          </div>
        </div>
        <div className="uni-card-header-tag">
          {tagText ? (
            <UniTag className="uni-card-header-title-tag" {...mergedTagOptions}>
              {tagText}
            </UniTag>
          ) : null}
        </div>
      </div>
      {children}
    </div>
  );
};
