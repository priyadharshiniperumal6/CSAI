import { Button } from 'antd';
import type { ReactNode } from 'react';

import { KnowledgeSearchSource } from '../types';

type Props = {
  sources?: KnowledgeSearchSource[];
  displayScore?: boolean;
  selectedSource?: KnowledgeSearchSource | null;
  onShowSourceDetail?: (source: KnowledgeSearchSource) => void;
};

export const KnowledgeSourceList = ({ sources, displayScore, selectedSource, onShowSourceDetail }: Props) => {
  if (!sources || !sources.length) {
    return null;
  }

  return (
    <div className="knowledge-sources flex flex-col gap-4">
      {sources.map((source, index) => (
        <div
          key={`${source.parentDocName}-${index}`}
          className="knowledge-source-card rounded-md border border-solid border-global-background bg-white p-4"
          data-active={selectedSource ? source.parentDocName === selectedSource.parentDocName : undefined}
        >
          <div className="flex flex-col gap-2">
            {displayScore ? (
              <div className="flex h-5 items-center gap-2 rounded-full border border-solid border-green8 bg-slate-50 px-3">
                <span className="text-xs text-green8">Importance:</span>
                <span className="text-sm font-normal text-green8">{source.importance.toPrecision(5)}</span>
              </div>
            ) : null}
            <div className="text-sm font-semibold">Content:</div>
            <div className="text-sm font-normal break-all">{source.content}</div>
            <div className="flex items-center gap-2 text-sm font-normal">
              <div>Source:</div>
              <Button type="link" className="m-0 p-0" onClick={() => onShowSourceDetail?.(source)}>
                {source.parentDocName}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
