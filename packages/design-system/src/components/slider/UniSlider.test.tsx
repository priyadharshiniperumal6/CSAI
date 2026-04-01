import { fireEvent, render } from '@testing-library/react';

import { UniSlider } from './UniSlider';
import { UniSliderProgress } from './UniSliderProgress';

describe('UniSlider', () => {
  it('renders single slider', () => {
    const { container } = render(<UniSlider defaultValue={20} />);
    expect(container.querySelector('.uni-ant-slider')).toBeInTheDocument();
  });

  it('renders range slider', () => {
    const { container } = render(<UniSlider range defaultValue={[10, 30]} />);
    expect(container.querySelector('.uni-ant-slider')).toBeInTheDocument();
  });
});

describe('UniSliderProgress', () => {
  it('renders progress slider', () => {
    const { container } = render(<UniSliderProgress defaultValue={50} />);
    expect(container.querySelector('.uni-slider-progress')).toBeInTheDocument();
  });

  it('emits keyboard events', () => {
    const onSlideLeft = vi.fn();
    const onSlideRight = vi.fn();
    const onSlideConfirm = vi.fn();
    const onSlideNumber = vi.fn();
    const { container } = render(
      <UniSliderProgress
        defaultValue={25}
        onSlideLeft={onSlideLeft}
        onSlideRight={onSlideRight}
        onSlideConfirm={onSlideConfirm}
        onSlideNumber={onSlideNumber}
      />
    );

    const slider = container.querySelector('.uni-slider-progress') as HTMLElement;
    fireEvent.keyDown(slider, { key: 'ArrowLeft' });
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    fireEvent.keyDown(slider, { key: ' ' });
    fireEvent.keyDown(slider, { key: '3' });

    expect(onSlideLeft).toHaveBeenCalled();
    expect(onSlideRight).toHaveBeenCalled();
    expect(onSlideConfirm).toHaveBeenCalled();
    expect(onSlideNumber).toHaveBeenCalledWith(3);
  });
});
