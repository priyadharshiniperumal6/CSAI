import {
  Children,
  Fragment,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  isValidElement,
  useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

import { UniPane } from './UniPane';
import type { UniPaneProps } from './UniPane';

import './UniSplitpanes.scss';

type PaneElement = ReactElement<UniPaneProps>;

type PaneInfo = {
  minSize: number;
  maxSize: number;
  size?: number;
  className?: string;
  style?: UniPaneProps['style'];
  props: Omit<UniPaneProps, 'children' | 'minSize' | 'maxSize' | 'size' | 'className' | 'style'>;
  content: ReactNode;
};

const toPaneArray = (children: ReactNode): PaneElement[] =>
  Children.toArray(children).filter(
    (child): child is PaneElement => isValidElement(child) && (child.type as any).displayName === UniPane.displayName
  );

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const normalizeSizes = (panes: PaneInfo[], override?: number[]) => {
  const baseSizes =
    override && override.length === panes.length
      ? override
      : panes.map(pane => (typeof pane.size === 'number' ? pane.size : undefined));

  const unspecifiedCount = baseSizes.filter(size => size === undefined).length;
  const specifiedTotal = baseSizes.reduce((acc: number, size: number | undefined) => acc + (size ?? 0), 0);
  const remaining = Math.max(100 - specifiedTotal, 0);
  const fallback = unspecifiedCount > 0 ? remaining / unspecifiedCount : 0;

  const normalized = baseSizes.map(size => size ?? fallback);
  const total = normalized.reduce((sum: number, value: number) => sum + value, 0);

  if (total === 0) {
    return panes.map(() => 100 / (panes.length || 1));
  }

  return normalized.map(value => (value / total) * 100);
};

export type UniSplitpanesProps = {
  horizontal?: boolean;
  pushOtherPanes?: boolean;
  sizes?: number[];
  defaultSizes?: number[];
  onResize?: (sizes: number[]) => void;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export const UniSplitpanes = ({
  horizontal = false,
  pushOtherPanes,
  sizes,
  defaultSizes,
  onResize,
  children,
  className,
  ...rest
}: UniSplitpanesProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panes = useMemo(() => toPaneArray(children), [children]);
  const paneMeta = useMemo<PaneInfo[]>(
    () =>
      panes.map(pane => {
        const { minSize, maxSize, size, children: paneChildren, className: paneClass, style, ...rest } = pane.props;
        return {
          minSize: typeof minSize === 'number' ? minSize : 0,
          maxSize: typeof maxSize === 'number' ? maxSize : 100,
          size: typeof size === 'number' ? size : undefined,
          className: paneClass,
          style,
          props: rest,
          content: paneChildren,
        };
      }),
    [panes]
  );
  const [internalSizes, setInternalSizes] = useState(() => normalizeSizes(paneMeta, defaultSizes));
  const derivedSizes = useMemo(() => normalizeSizes(paneMeta, sizes ?? internalSizes), [paneMeta, sizes, internalSizes]);

  const setSizes = (nextSizes: number[]) => {
    if (!sizes) {
      setInternalSizes(nextSizes);
    }
    onResize?.(nextSizes);
  };

  const handleDragStart = (index: number) => (event: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) {
      return;
    }
    event.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();
    const containerSize = horizontal ? rect.height : rect.width;
    if (!containerSize) {
      return;
    }

    const startPosition = horizontal ? event.clientY : event.clientX;
    const startSizes = [...derivedSizes];
    const leftIndex = index;
    const rightIndex = index + 1;
    const pairTotal = startSizes[leftIndex] + startSizes[rightIndex];

    const onPointerMove = (moveEvent: PointerEvent) => {
      const delta =
        ((horizontal ? moveEvent.clientY : moveEvent.clientX) - startPosition) / Math.max(containerSize, 1) * 100;

      const leftPane = paneMeta[leftIndex];
      const rightPane = paneMeta[rightIndex];

      const leftMin = leftPane.minSize;
      const leftMax = Math.min(leftPane.maxSize, pairTotal - rightPane.minSize);
      const rightMax = Math.min(rightPane.maxSize, pairTotal - leftMin);
      const leftBoundMin = Math.max(leftMin, pairTotal - rightMax);
      const leftBoundMax = Math.max(leftBoundMin, leftMax);

      const nextLeft = clamp(startSizes[leftIndex] + delta, leftBoundMin, leftBoundMax);
      const nextRight = pairTotal - nextLeft;

      const nextSizes = startSizes.map((current, paneIndex) => {
        if (paneIndex === leftIndex) {
          return nextLeft;
        }
        if (paneIndex === rightIndex) {
          return nextRight;
        }
        return current;
      });

      setSizes(nextSizes);
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  if (!panes.length) {
    return null;
  }

  return (
    <div
      {...rest}
      ref={containerRef}
      className={classNames(
        'uni-splitpanes',
        horizontal ? 'uni-splitpanes--horizontal' : 'uni-splitpanes--vertical',
        { 'uni-splitpanes--push': pushOtherPanes },
        className
      )}
      role="presentation"
    >
      {paneMeta.map((pane, index) => (
        <Fragment key={pane.props?.id ?? index}>
          <div
            className={classNames('uni-splitpanes__pane', pane.className)}
            style={{ flexBasis: `${derivedSizes[index]}%`, ...pane.style }}
            {...pane.props}
          >
            {pane.content}
          </div>
          {index < paneMeta.length - 1 ? (
            <div
              className="uni-splitpanes__splitter"
              role="separator"
              aria-orientation={horizontal ? 'horizontal' : 'vertical'}
              tabIndex={0}
              onPointerDown={handleDragStart(index)}
            />
          ) : null}
        </Fragment>
      ))}
    </div>
  );
};
