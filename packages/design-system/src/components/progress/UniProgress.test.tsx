import { render } from '@testing-library/react';

import { UniProgress } from './UniProgress';

describe('UniProgress', () => {
  it('renders percent', () => {
    const { container } = render(<UniProgress percent={50} />);
    expect(container.querySelector('.ant-progress')).toBeInTheDocument();
  });
});
