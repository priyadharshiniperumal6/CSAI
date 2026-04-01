import { ReactNode } from 'react';
import classNames from 'classnames';

import { UniButton } from '../../button/UniButton';
import { UniTooltip } from '../../tooltip/UniTooltip';

import { KnowledgeSearchResult } from '../types';

type Props = {
  result: KnowledgeSearchResult;
  enableActiveState?: boolean;
  actionFooter?: ReactNode;
  onThumbClick?: (type: 'thumbsUp' | 'thumbsDown', result: KnowledgeSearchResult) => void;
  onToggleSources?: (result: KnowledgeSearchResult) => void;
  showSources?: boolean;
  displayScore?: boolean;
  expandSource?: boolean;
  showSourceId?: string | number;
  sourceContent?: ReactNode;
  actionButtons?: ReactNode;
};

export const KnowledgeSearchCard = ({
  result,
  enableActiveState,
  actionFooter,
  onThumbClick,
  showSources,
  onToggleSources,
  displayScore,
  expandSource,
  showSourceId,
  sourceContent,
  actionButtons,
}: Props) => {
  const active = enableActiveState && result.key === (result.key as string);
  return (
    <div
      className={classNames('knowledge-card w-full rounded-md bg-white p-4', {
        'knowledge-card-active border border-solid border-primary': active,
      })}
    >
      <div className="flex items-center gap-2">
        <div
          className="flex h-10 items-center justify-center rounded-full border border-solid p-2"
          style={{
            backgroundColor: result.iconConfig.iconBgColor,
            borderColor: result.iconConfig.iconBorderColor,
          }}
        >
          <UniTooltip title={result.iconConfig.tooltip}>
            <span className="material-symbols-outlined text-primary" style={{ color: result.iconConfig.iconColor }}>
              {result.iconConfig.icon}
            </span>
          </UniTooltip>
        </div>
        <div className="text-neutral-700 text-base font-semibold">{result.query}</div>
      </div>
      <div className="mt-2 text-sm text-neutral-700">
        {result.isLoading ? (
          <div className="fetching-data text-gray-400">Fetching</div>
        ) : result.isError ? (
          <div>Error loading response</div>
        ) : (
          <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: result.response ?? '' }} />
        )}
      </div>
      <div className="mt-3 flex items-center gap-2 border-t border-solid border-cool-grey pt-3">
        {actionButtons}
        <UniButton
          type="text"
          shape="circle"
          size="small"
          disabled={result.disableThumbsUpDown}
          onClick={() => onThumbClick?.('thumbsUp', result)}
          className="flex h-8 items-center justify-center"
        >
          <span
            className={classNames('material-symbols-outlined text-sm text-neutral8', {
              fill: result.actionClickedType === 'thumbsUp',
            })}
          >
            thumb_up
          </span>
        </UniButton>
        <UniButton
          type="text"
          shape="circle"
          size="small"
          disabled={result.disableThumbsUpDown}
          onClick={() => onThumbClick?.('thumbsDown', result)}
          className="flex h-8 items-center justify-center"
        >
          <span
            className={classNames('material-symbols-outlined text-sm text-neutral8', {
              fill: result.actionClickedType === 'thumbsDown',
            })}
          >
            thumb_down
          </span>
        </UniButton>
        {showSources && result.sources?.length ? (
          <UniTooltip title="Sources">
            <UniButton type="text" size="small" className="flex items-center" onClick={() => onToggleSources?.(result)}>
              <span className="material-symbols-outlined text-base text-neutral8">topic</span>
              <span
                className={classNames('material-symbols-outlined text-base text-neutral8 transition-all', {
                  'rotate-180': expandSource && showSourceId === result.id,
                })}
              >
                keyboard_arrow_down
              </span>
            </UniButton>
          </UniTooltip>
        ) : null}
        {actionFooter}
      </div>
      {expandSource && showSourceId === result.id ? (
        <div className="mt-2 rounded-md border border-solid border-global-background p-4">{sourceContent}</div>
      ) : null}
    </div>
  );
};
