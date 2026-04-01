import { render } from '@testing-library/react';

import { UniDatePicker, UniRangePicker } from './UniDatePicker';

describe('UniDatePicker', () => {
  it('renders single picker', () => {
    const { container } = render(<UniDatePicker />);
    expect(container.querySelector('.ant-picker')).toBeInTheDocument();
  });

  it('renders range picker', () => {
    const { container } = render(<UniRangePicker />);
    expect(container.querySelector('.ant-picker-range')).toBeInTheDocument();
  });
});
