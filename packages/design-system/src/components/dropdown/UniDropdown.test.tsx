import { fireEvent, render, screen } from '@testing-library/react';

import { UniDropdown } from './UniDropdown';

describe('UniDropdown', () => {
  it('renders trigger button', () => {
    render(<UniDropdown openButtonProps={{ label: 'Open' }} />);
    expect(screen.getByText('Open')).toBeInTheDocument();
  });
});
