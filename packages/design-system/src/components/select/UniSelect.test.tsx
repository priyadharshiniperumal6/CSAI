import { fireEvent, render, screen } from '@testing-library/react';

import { UniSelect } from './UniSelect';

describe('UniSelect', () => {
  it('renders options', () => {
    render(<UniSelect options={[{ label: 'One', value: '1' }]} placeholder="Pick" />);
    fireEvent.mouseDown(screen.getByRole('combobox'));
    expect(screen.getByText('One')).toBeInTheDocument();
  });
});
