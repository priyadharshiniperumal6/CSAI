import { render } from '@testing-library/react';

import { UniTimePicker, UniTimeRangePicker } from './UniTimePicker';

describe('UniTimePicker', () => {
  it('renders single time picker', () => {
    const { container } = render(<UniTimePicker />);
    expect(container.querySelector('.ant-picker')).toBeInTheDocument();
  });

  it('renders range time picker', () => {
    const { container } = render(<UniTimeRangePicker />);
    expect(container.querySelector('.ant-picker-range')).toBeInTheDocument();
  });
});
