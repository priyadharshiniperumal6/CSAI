import { render } from '@testing-library/react';

import { UniSkeleton } from './UniSkeleton';

describe('UniSkeleton', () => {
  it('renders skeleton', () => {
    const { container } = render(<UniSkeleton />);
    expect(container.querySelector('.ant-skeleton')).toBeInTheDocument();
  });
});
