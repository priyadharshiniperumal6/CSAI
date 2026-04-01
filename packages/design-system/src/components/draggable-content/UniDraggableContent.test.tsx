import { fireEvent, render, screen } from '@testing-library/react';

import { UniDraggableContent } from './UniDraggableContent';

describe('UniDraggableContent', () => {
  it('renders content and actions', () => {
    render(<UniDraggableContent content={<div>Item A</div>} actions={<button>Action</button>} />);

    expect(screen.getByText('Item A')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('emits drag events with the provided index', () => {
    const handleDragStart = vi.fn();
    const handleDrop = vi.fn();

    render(
      <UniDraggableContent
        data-testid="draggable"
        index={2}
        content="Item"
        onDragStart={handleDragStart}
        onDrop={handleDrop}
      />
    );

    const element = screen.getByTestId('draggable');

    fireEvent.dragStart(element);
    expect(handleDragStart).toHaveBeenCalledWith(2);

    fireEvent.drop(element);
    expect(handleDrop).toHaveBeenCalledWith(2);
  });
});
