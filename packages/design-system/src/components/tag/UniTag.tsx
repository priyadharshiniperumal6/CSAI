import { forwardRef } from 'react';
import classNames from 'classnames';
import { Tag } from 'antd';
import type { TagProps } from 'antd';

import type { UniIconType } from '../../types/icon';
import { UniMaterialIcon } from '../icon';

import './UniTag.scss';

export type UniTagProps = TagProps & {
  textColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  type?: 'tag' | 'pill';
  size?: 'small' | 'default';
  class?: string;
  startIcon?: UniIconType;
  endIcon?: UniIconType;
};

const DEFAULT_TEXT_COLOR = 'var(--ut-color-text-secondary)';
const DEFAULT_BORDER_COLOR = 'var(--ut-color-border-strong)';
const DEFAULT_BACKGROUND = 'var(--ut-color-bg-canvas)';

export const UniTag = forwardRef<HTMLSpanElement, UniTagProps>(
  (
    {
      className,
      class: legacyClass,
      textColor = DEFAULT_TEXT_COLOR,
      borderColor = DEFAULT_BORDER_COLOR,
      backgroundColor = DEFAULT_BACKGROUND,
      type = 'tag',
      size,
      startIcon,
      endIcon,
      style,
      children,
      ...rest
    },
    ref
  ) => {
    const classes = classNames(legacyClass, className, {
      'uni-tag': type === 'tag',
      'uni-pill': type === 'pill',
      'uni-tag-small': size === 'small',
    });

    const styles = {
      color: textColor,
      borderColor,
      backgroundColor,
      ...style,
    };

    return (
      <Tag ref={ref} className={classes} style={styles} {...rest}>
        {startIcon ? <UniMaterialIcon {...startIcon} /> : null}
        {children}
        {endIcon ? <UniMaterialIcon {...endIcon} /> : null}
      </Tag>
    );
  }
);

UniTag.displayName = 'UniTag';

export const UniPill = UniTag;
UniPill.displayName = 'UniPill';
