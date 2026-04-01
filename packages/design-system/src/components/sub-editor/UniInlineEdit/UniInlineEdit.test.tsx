import { fireEvent, render, screen } from '@testing-library/react';

import { UniInlineEdit } from './UniInlineEdit';

describe('UniInlineEdit', () => {
  const baseProps = {
    data: { title: 'Sample title', subtitle: 'Details', inlineEditable: true, deletable: true },
    id: 'item-1',
  };

  it('renders title and subtitle', () => {
    render(<UniInlineEdit {...baseProps} />);

    expect(screen.getByDisplayValue('Sample title')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
  });

  it('emits save event when inline edit is confirmed', () => {
    const onInlineEditSave = vi.fn();
    render(<UniInlineEdit {...baseProps} onInlineEditSave={onInlineEditSave} />);

    fireEvent.click(screen.getByLabelText(/edit inline/i));
    const input = screen.getByDisplayValue('Sample title');
    fireEvent.change(input, { target: { value: 'Updated title' } });

    fireEvent.click(screen.getByLabelText(/save inline edit/i));

    expect(onInlineEditSave).toHaveBeenCalledWith({ data: 'Updated title', id: 'item-1' });
  });

  it('validates input against the provided pattern', () => {
    const onInlineEditSave = vi.fn();
    render(<UniInlineEdit {...baseProps} inputPattern="^\\d+$" onInlineEditSave={onInlineEditSave} />);

    fireEvent.click(screen.getByLabelText(/edit inline/i));
    const input = screen.getByDisplayValue('Sample title');
    fireEvent.change(input, { target: { value: 'alpha' } });
    fireEvent.click(screen.getByLabelText(/save inline edit/i));

    expect(onInlineEditSave).not.toHaveBeenCalled();
  });

  it('emits cancel event', () => {
    const onInineEditCancel = vi.fn();
    render(<UniInlineEdit {...baseProps} onInineEditCancel={onInineEditCancel} />);

    fireEvent.click(screen.getByLabelText(/edit inline/i));
    fireEvent.click(screen.getByLabelText(/cancel inline edit/i));

    expect(onInineEditCancel).toHaveBeenCalledWith('item-1');
  });
});
