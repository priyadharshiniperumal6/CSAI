import { render, screen } from '@testing-library/react';

import { UniTabs } from './UniTabs';

describe('UniTabs', () => {
  it('renders tabs from definition', () => {
    render(
      <UniTabs
        tabs={[
          { id: '1', title: 'First', content: <div>First content</div> },
          { id: '2', title: 'Second', content: <div>Second content</div> },
        ]}
      />
    );
    expect(screen.getByText('First')).toBeInTheDocument();
  });
});
