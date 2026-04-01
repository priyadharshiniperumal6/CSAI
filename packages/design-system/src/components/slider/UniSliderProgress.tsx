import { forwardRef, useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Slider } from 'antd';
import type { SliderSingleProps } from 'antd';

import './UniSliderProgress.scss';

export type UniSliderProgressProps = SliderSingleProps & {
  class?: string;
  onSlideLeft?: () => void;
  onSlideRight?: () => void;
  onSlideConfirm?: () => void;
  onSlideNumber?: (value: number) => void;
};

export const UniSliderProgress = forwardRef<HTMLDivElement, UniSliderProgressProps>(
  ({ className, class: legacyClass, onSlideLeft, onSlideRight, onSlideConfirm, onSlideNumber, ...rest }, ref) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const handleKeyboardIntent = useCallback(
      (event: { key: string; preventDefault: () => void }) => {
        if (event.key === 'ArrowLeft') {
          onSlideLeft?.();
        } else if (event.key === 'ArrowRight') {
          onSlideRight?.();
        } else if (event.key === ' ') {
          event.preventDefault();
          onSlideConfirm?.();
        } else if (/^[0-9]$/.test(event.key)) {
          onSlideNumber?.(Number(event.key));
        }
      },
      [onSlideConfirm, onSlideLeft, onSlideNumber, onSlideRight]
    );

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        handleKeyboardIntent(event);
      },
      [handleKeyboardIntent]
    );

    useEffect(() => {
      const wrapper = wrapperRef.current;
      if (!wrapper) {
        return;
      }
      const listener = (event: KeyboardEvent) => handleKeyboardIntent(event);
      wrapper.addEventListener('keydown', listener);
      return () => {
        wrapper.removeEventListener('keydown', listener);
      };
    }, [handleKeyboardIntent]);

    const setWrapperRef = useCallback(
      (node: HTMLDivElement | null) => {
        wrapperRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    return (
      <div ref={setWrapperRef}>
        <Slider
          className={classNames('uni-slider-progress', className, legacyClass)}
          {...rest}
        />
      </div>
    );
  }
);

UniSliderProgress.displayName = 'UniSliderProgress';
