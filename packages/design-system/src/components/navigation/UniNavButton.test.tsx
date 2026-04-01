import { render, screen } from '@testing-library/react';

import { UniNavButton } from './UniNavButton';

describe('UniNavButton', () => {
  it('renders label', () => {
    render(<UniNavButton>Nav</UniNavButton>);
    expect(screen.getByRole('button', { name: /nav/i })).toBeInTheDocument();
  });
});
