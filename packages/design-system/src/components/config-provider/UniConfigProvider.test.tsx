import { render, screen } from '@testing-library/react';

import { UniConfigProvider } from './UniConfigProvider';

describe('UniConfigProvider', () => {
  it('renders children', () => {
    render(
      <UniConfigProvider>
        <div>Child</div>
      </UniConfigProvider>
    );
    expect(screen.getByText('Child')).toBeInTheDocument();
  });
});
