import { render, screen } from '@testing-library/react';

import { UniTable } from './UniTable';

vi.mock('@ag-grid-community/react', () => {
  const React = require('react');
  return {
    AgGridReact: ({ className }: { className?: string }) => (
      <div data-testid="ag-grid-react" className={className} />
    ),
  };
});

describe('UniTable', () => {
  it('renders ag-grid wrapper for table view', () => {
    render(<UniTable columnDefs={[]} rowData={[]} />);
    expect(screen.getByTestId('ag-grid-react')).toBeInTheDocument();
  });

  it('renders cards for card view', () => {
    render(
      <UniTable
        view="card"
        columnDefs={[]}
        rowData={[]}
        gridViewProperties={{
          cards: [{ id: 1, title: 'Card Item' }],
          renderCard: card => <div>{card.title}</div>,
        }}
      />
    );
    expect(screen.getByText('Card Item')).toBeInTheDocument();
  });

  it('renders header slot content when provided', () => {
    render(
      <UniTable
        columnDefs={[]}
        rowData={[]}
        headerProperties={{
          slots: [{ name: 'search', order: 1 }],
        }}
        headerSlots={{
          search: <div>Search Slot</div>,
        }}
      />
    );

    expect(screen.getByText('Search Slot')).toBeInTheDocument();
  });
});
