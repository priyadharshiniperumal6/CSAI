import { render, screen } from '@testing-library/react';

import { UniMenu } from './UniMenu';

describe('UniMenu', () => {
  it('renders menu items', () => {
    render(<UniMenu items={[{ key: '1', label: 'First' }]} />);
    expect(screen.getByText('First')).toBeInTheDocument();
  });
});
