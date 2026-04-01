import { fireEvent, render, screen } from '@testing-library/react';

import { UniAdvanceFilter } from './UniAdvanceFilter';

describe('UniAdvanceFilter', () => {
  it('renders the count and uses accessible label', () => {
    render(<UniAdvanceFilter count={5} />);

    expect(screen.getByRole('button', { name: /advanced filters/i })).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('toggles expanded state', () => {
    const onToggle = vi.fn();
    render(<UniAdvanceFilter count={2} onToggle={onToggle} />);

    const button = screen.getByRole('button', { name: /advanced filters/i });

    fireEvent.click(button);
    expect(onToggle).toHaveBeenCalledWith(true);

    fireEvent.click(button);
    expect(onToggle).toHaveBeenCalledWith(false);
  });
});
