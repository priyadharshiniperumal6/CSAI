import { render, screen } from '@testing-library/react';

import { SidePanelHeader } from './SidePanelHeader';

describe('SidePanelHeader', () => {
  it('renders only the primary title when subtitle is omitted', () => {
    render(<SidePanelHeader title="Very long node title that should still stay on one line" />);

    const heading = screen.getByRole('heading', { name: 'Very long node title that should still stay on one line' });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('truncate');
    expect(document.querySelector('.uni-side-panel-subheader')).not.toBeInTheDocument();
  });
});
