import { fireEvent, render, screen } from '@testing-library/react';

import { UniSelectAddOption } from './UniSelectAddOption';

describe('UniSelectAddOption', () => {
  it('calls onAddValue', () => {
    const spy = vi.fn();
    render(<UniSelectAddOption options={[]} onAddValue={spy} />);
    fireEvent.mouseDown(screen.getByRole('combobox'));
    fireEvent.change(screen.getByPlaceholderText('Please enter item'), { target: { value: 'New' } });
    fireEvent.click(screen.getByText('Add item'));
    expect(spy).toHaveBeenCalledWith('New');
  });
});
