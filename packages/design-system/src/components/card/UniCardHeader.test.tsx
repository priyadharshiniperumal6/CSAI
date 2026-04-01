import { render, screen } from '@testing-library/react';

import { UniCardHeader } from './UniCardHeader';

describe('UniCardHeader', () => {
  it('renders title and tag', () => {
    render(<UniCardHeader title="Record" tagText="Active" showStatus statusColor="#ff0000" />);

    expect(screen.getByText('Record')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(document.querySelector('.uni-card-header-status')).toBeInTheDocument();
  });
});
