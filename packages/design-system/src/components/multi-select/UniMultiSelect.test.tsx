import { fireEvent, render, screen } from '@testing-library/react';

import { UniMultiSelect } from './UniMultiSelect';

describe('UniMultiSelect', () => {
  it('emits selections', () => {
    const onSelectionChanged = vi.fn();
    render(
      <UniMultiSelect
        label="Filters"
        dropDownItems={[
          { id: 1, label: 'Alpha' },
          { id: 2, label: 'Beta' },
        ]}
        onSelectionChanged={onSelectionChanged}
      />
    );

    fireEvent.click(screen.getByText('Filters'));
    fireEvent.click(screen.getByText('Alpha'));

    expect(onSelectionChanged).toHaveBeenCalled();
    expect(onSelectionChanged.mock.calls[0][0][0]).toMatchObject({ id: 1, selected: true });
  });
});
