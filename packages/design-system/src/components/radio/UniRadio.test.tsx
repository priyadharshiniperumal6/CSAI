import { fireEvent, render, screen } from '@testing-library/react';

import { UniRadio, UniRadioGroup } from './UniRadio';

describe('UniRadio', () => {
  it('toggles checked state', () => {
    render(<UniRadio>Choice</UniRadio>);
    const radio = screen.getByRole('radio', { name: /choice/i });
    expect(radio).not.toBeChecked();
    fireEvent.click(radio);
    expect(radio).toBeChecked();
  });

  it('renders group options', () => {
    render(<UniRadioGroup options={['A', 'B']} defaultValue="B" />);
    expect(screen.getByRole('radio', { name: 'A' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'B' })).toBeChecked();
  });
});
