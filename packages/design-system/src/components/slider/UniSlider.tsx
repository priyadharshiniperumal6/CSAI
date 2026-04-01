import { forwardRef } from 'react';
import classNames from 'classnames';
import { Slider } from 'antd';
import type { SliderSingleProps } from 'antd';

import './UniSlider.scss';

export type UniSliderProps = SliderSingleProps & {
  class?: string;
};

export const UniSlider = forwardRef<HTMLDivElement, UniSliderProps>(({ className, class: legacyClass, ...rest }, ref) => {
  return <Slider ref={ref} className={classNames('uni-ant-slider', className, legacyClass)} {...rest} />;
});

UniSlider.displayName = 'UniSlider';
