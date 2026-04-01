import { render } from '@testing-library/react';

import { UniEChart } from './UniEChart';

const echartsMocks = vi.hoisted(() => {
  const chart = {
    setOption: vi.fn(),
    showLoading: vi.fn(),
    hideLoading: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
    resize: vi.fn(),
    dispose: vi.fn(),
  };

  return {
    chart,
    init: vi.fn(() => chart),
  };
});

vi.mock('echarts', () => ({
  init: echartsMocks.init,
}));

describe('UniEChart', () => {
  const option = {
    xAxis: { type: 'category', data: ['Mon', 'Tue'] },
    yAxis: { type: 'value' },
    series: [{ type: 'line', data: [1, 2] }],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes and disposes the chart instance', () => {
    const { unmount } = render(<UniEChart option={option} />);

    expect(echartsMocks.init).toHaveBeenCalledTimes(1);
    expect(echartsMocks.chart.setOption).toHaveBeenCalledWith(option, undefined);

    unmount();

    expect(echartsMocks.chart.dispose).toHaveBeenCalledTimes(1);
  });

  it('attaches event listeners and handles loading state', () => {
    const onClick = vi.fn();
    const { rerender } = render(<UniEChart option={option} loading onEvents={{ click: onClick }} />);

    expect(echartsMocks.chart.on).toHaveBeenCalledWith('click', onClick);
    expect(echartsMocks.chart.showLoading).toHaveBeenCalledTimes(1);

    rerender(<UniEChart option={option} loading={false} onEvents={{ click: onClick }} />);

    expect(echartsMocks.chart.hideLoading).toHaveBeenCalledTimes(1);
  });
});
