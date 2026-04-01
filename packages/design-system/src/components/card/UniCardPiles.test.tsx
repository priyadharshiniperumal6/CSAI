import { render, screen } from '@testing-library/react';

import { UniCardPiles } from './UniCardPiles';

describe('UniCardPiles', () => {
  it('renders limited piles and overflow indicator', () => {
    render(<UniCardPiles piles={['A', 'B', 'C', 'D']} maxPiles={2} />);

    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('+2')).toBeInTheDocument();
  });
});
