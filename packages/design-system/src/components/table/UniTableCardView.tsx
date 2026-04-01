import { ReactNode, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

import { UniSidePanel } from '../side-panel/UniSidePanel';
import type { ToolPanelParams } from '../side-panel/types';

export type CardViewRenderer<TData> = (item: TData, index: number) => ReactNode;

export type UniTableCardViewProps<TData> = {
  cards?: TData[];
  renderCard?: CardViewRenderer<TData>;
  activeItem?: TData | null;
  activeSelected?: (item: TData | null) => void;
  onActiveSelected?: (item: TData | null) => void;
  gridClassName?: string;
  scrollContainerClassName?: string;
  sidePanel?: ToolPanelParams;
  emptyState?: ReactNode;
  suppressHighlight?: boolean;
};

const isActiveItem = <TData,>(current: TData | null, candidate: TData) => {
  if (current === null || current === undefined) {
    return false;
  }
  if (typeof current === 'object' && typeof candidate === 'object') {
    try {
      return JSON.stringify(current) === JSON.stringify(candidate);
    } catch {
      return current === candidate;
    }
  }
  return current === candidate;
};

export const UniTableCardView = <TData,>({
  cards = [],
  renderCard,
  activeItem,
  onActiveSelected,
  activeSelected,
  gridClassName,
  scrollContainerClassName,
  sidePanel,
  emptyState,
  suppressHighlight,
}: UniTableCardViewProps<TData>) => {
  const [selected, setSelected] = useState<TData | null>(!suppressHighlight ? (activeItem ?? null) : null);

  useEffect(() => {
    if (!suppressHighlight) {
      setSelected(activeItem ?? null);
    }
  }, [activeItem, suppressHighlight]);

  const handleSelect = (card: TData | null) => {
    if (!suppressHighlight) {
      setSelected(card);
    }
    onActiveSelected?.(card);
    activeSelected?.(card);
  };

  const renderer =
    renderCard ??
    ((card: TData, index: number) => (
      <div className="text-left text-xs leading-5 text-neutral8">
        <strong>Card {index + 1}</strong>
        <pre className="mt-2 overflow-auto rounded bg-neutral2 p-2 text-[11px]">{JSON.stringify(card, null, 2)}</pre>
      </div>
    ));

  const cardsContent = useMemo(() => {
    if (!cards.length) {
      return emptyState ?? <div className="text-center text-sm text-neutral8">No cards available.</div>;
    }
    return cards.map((card, index) => (
      <div
        key={index}
        className={classNames('uni-ant-cards-view-single-card item mb-2 mr-2', {
          'uni-card-active': isActiveItem(selected, card),
        })}
        onClick={() => handleSelect(card)}
        role="button"
      >
        {renderer(card, index)}
      </div>
    ));
  }, [cards, emptyState, renderer, selected]);

  return (
    <div className={classNames('uni-table-card-view-container', scrollContainerClassName)}>
      <div className={classNames('scroll-container', gridClassName)}>
        <div className="flex flex-row flex-wrap items-start gap-2">{cardsContent}</div>
      </div>
      {selected && sidePanel ? <UniSidePanel params={sidePanel} className="uni-table-card-side-panel" /> : null}
    </div>
  );
};

export default UniTableCardView;
