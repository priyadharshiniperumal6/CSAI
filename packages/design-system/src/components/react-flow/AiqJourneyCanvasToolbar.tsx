import classNames from 'classnames';

import type { AiqJourneyContentDisplayMode, AiqJourneyLayoutDirection } from './AiqJourneySkin';

type AiqJourneyCanvasToolbarProps = {
  contentDisplayMode: AiqJourneyContentDisplayMode;
  onContentDisplayModeChange: (mode: AiqJourneyContentDisplayMode) => void;
  layoutDirection?: AiqJourneyLayoutDirection;
  onLayoutDirectionChange?: (direction: AiqJourneyLayoutDirection) => void;
  showLayoutDirectionToggle?: boolean;
  onFitToScreen?: () => void;
  showFitToScreen?: boolean;
  className?: string;
};

export const AiqJourneyCanvasToolbar = ({
  contentDisplayMode,
  onContentDisplayModeChange,
  layoutDirection,
  onLayoutDirectionChange,
  showLayoutDirectionToggle = false,
  onFitToScreen,
  showFitToScreen = true,
  className,
}: AiqJourneyCanvasToolbarProps) => {
  return (
    <div className={classNames('uni-react-flow-journey-canvas-toolbar', className)}>
      {showLayoutDirectionToggle && layoutDirection && onLayoutDirectionChange ? (
        <div className="uni-react-flow-journey-canvas-toolbar__group">
          <button
            type="button"
            className={classNames('uni-react-flow-journey-canvas-toolbar__button', {
              'is-active': layoutDirection === 'top-to-bottom',
            })}
            title="Top to bottom layout"
            aria-pressed={layoutDirection === 'top-to-bottom'}
            onClick={() => onLayoutDirectionChange('top-to-bottom')}
          >
            <svg viewBox="0 0 16 16" aria-hidden>
              <rect
                x="4.5"
                y="1.25"
                width="7"
                height="4"
                rx="0.8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path d="M8 5.25V7.25" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M3.5 7.25H12.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <rect
                x="1"
                y="8.75"
                width="5.5"
                height="4"
                rx="0.8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <rect
                x="9.5"
                y="8.75"
                width="5.5"
                height="4"
                rx="0.8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
          </button>
          <button
            type="button"
            className={classNames('uni-react-flow-journey-canvas-toolbar__button', {
              'is-active': layoutDirection === 'left-to-right',
            })}
            title="Left to right layout"
            aria-pressed={layoutDirection === 'left-to-right'}
            onClick={() => onLayoutDirectionChange('left-to-right')}
          >
            <svg viewBox="0 0 16 16" aria-hidden>
              <rect
                x="1.25"
                y="4.5"
                width="4"
                height="7"
                rx="0.8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path d="M5.25 8H7.25" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M7.25 3.5V12.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <rect
                x="8.75"
                y="1"
                width="4"
                height="5.5"
                rx="0.8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <rect
                x="8.75"
                y="9.5"
                width="4"
                height="5.5"
                rx="0.8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
          </button>
        </div>
      ) : null}
      <div className="uni-react-flow-journey-canvas-toolbar__group">
        <button
          type="button"
          className={classNames('uni-react-flow-journey-canvas-toolbar__button', {
            'is-active': contentDisplayMode === 'collapsed',
          })}
          title="Collapsed node view"
          aria-pressed={contentDisplayMode === 'collapsed'}
          onClick={() => onContentDisplayModeChange('collapsed')}
        >
          <svg viewBox="0 0 16 16" aria-hidden>
            <rect x="2" y="3" width="12" height="4" rx="0.8" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <rect x="2" y="9" width="12" height="4" rx="0.8" fill="none" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
        <button
          type="button"
          className={classNames('uni-react-flow-journey-canvas-toolbar__button', {
            'is-active': contentDisplayMode === 'expanded',
          })}
          title="Expanded node view"
          aria-pressed={contentDisplayMode === 'expanded'}
          onClick={() => onContentDisplayModeChange('expanded')}
        >
          <svg viewBox="0 0 16 16" aria-hidden>
            <rect x="2" y="1.5" width="12" height="5.5" rx="0.8" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <rect x="2" y="9" width="12" height="5.5" rx="0.8" fill="none" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
      </div>
      {showFitToScreen ? (
        <div className="uni-react-flow-journey-canvas-toolbar__group">
          <button
            type="button"
            className="uni-react-flow-journey-canvas-toolbar__button"
            title="Fit to screen"
            onClick={onFitToScreen}
          >
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M8 3H5a2 2 0 0 0-2 2v3" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M21 8V5a2 2 0 0 0-2-2h-3" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M3 16v3a2 2 0 0 0 2 2h3" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" fill="none" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  );
};
