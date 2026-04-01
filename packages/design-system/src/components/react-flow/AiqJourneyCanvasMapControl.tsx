import classNames from 'classnames';

type AiqJourneyCanvasMapControlProps = {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onFitToScreen?: () => void;
  className?: string;
};

export const AiqJourneyCanvasMapControl = ({
  onZoomIn,
  onZoomOut,
  onFitToScreen,
  className,
}: AiqJourneyCanvasMapControlProps) => {
  return (
    <div className={classNames('uni-react-flow-journey-canvas-map-control', className)}>
      <div className="uni-react-flow-journey-canvas-map-control__pair">
        <button
          type="button"
          className="uni-react-flow-journey-canvas-map-control__button uni-react-flow-journey-canvas-map-control__button--top"
          title="Zoom in"
          aria-label="Zoom in"
          onClick={onZoomIn}
        >
          <svg viewBox="0 0 20 20" aria-hidden>
            <path d="M10 4V16" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
            <path d="M4 10H16" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
          </svg>
        </button>
        <button
          type="button"
          className="uni-react-flow-journey-canvas-map-control__button"
          title="Zoom out"
          aria-label="Zoom out"
          onClick={onZoomOut}
        >
          <svg viewBox="0 0 20 20" aria-hidden>
            <path d="M4 10H16" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
          </svg>
        </button>
      </div>
      <div className="uni-react-flow-journey-canvas-map-control__divider" />
      <button
        type="button"
        className="uni-react-flow-journey-canvas-map-control__button uni-react-flow-journey-canvas-map-control__button--fit"
        title="Fit to screen"
        aria-label="Fit to screen"
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
  );
};
