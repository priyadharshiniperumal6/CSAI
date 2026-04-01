import classNames from 'classnames';
import { Tooltip } from 'antd';

import { UniTag } from '../tag/UniTag';
import type { UniTagProps } from '../tag/UniTag';

import './UniCardPiles.scss';

export type UniCardPilesProps = {
  piles?: string[];
  tagOptions?: UniTagProps;
  maxPiles?: number;
  className?: string;
};

const DEFAULT_PILL_OPTIONS: UniTagProps = {
  type: 'pill',
  size: 'small',
  textColor: 'var(--ut-color-text-secondary)',
  borderColor: 'var(--ut-color-border-strong)',
  backgroundColor: 'var(--ut-color-bg-surface)',
};

export const UniCardPiles = ({ piles = [], tagOptions, maxPiles = 4, className }: UniCardPilesProps) => {
  const mergedTagOptions = { ...DEFAULT_PILL_OPTIONS, ...tagOptions };
  const displayed = maxPiles > 0 ? piles.slice(0, maxPiles) : piles;
  const leftover = maxPiles > 0 ? piles.slice(maxPiles) : [];

  return (
    <div className={classNames('uni-card-piles', className)}>
      {displayed.map(pill => (
        <UniTag key={pill} {...mergedTagOptions}>
          {pill}
        </UniTag>
      ))}

      {leftover.length ? (
        <Tooltip
          className="uni-card-piles-tooltip"
          placement="right"
          title={
            <div>
              {leftover.map(item => (
                <div key={item}>{item}</div>
              ))}
            </div>
          }
        >
          <UniTag {...mergedTagOptions}>+{leftover.length}</UniTag>
        </Tooltip>
      ) : null}
    </div>
  );
};
