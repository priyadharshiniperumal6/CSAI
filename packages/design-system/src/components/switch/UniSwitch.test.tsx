import { fireEvent, render, screen } from '@testing-library/react';

import { UniSwitch } from './UniSwitch';

describe('UniSwitch', () => {
  it('toggles state', () => {
    render(<UniSwitch defaultChecked={false} />);
    const toggle = screen.getByRole('switch');
    expect(toggle).not.toBeChecked();
    fireEvent.click(toggle);
    expect(toggle).toBeChecked();
  });
});
