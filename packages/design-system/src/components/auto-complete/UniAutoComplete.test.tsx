import { fireEvent, render, screen } from '@testing-library/react';

import { UniAutoComplete } from './UniAutoComplete';

describe('UniAutoComplete', () => {
  it('shows options', () => {
    render(<UniAutoComplete options={[{ value: 'Alpha' }]} />);
    fireEvent.mouseDown(screen.getByRole('combobox'));
    expect(screen.getAllByText('Alpha').length).toBeGreaterThan(0);
  });
});
