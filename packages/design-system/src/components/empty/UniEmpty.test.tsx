import { render, screen } from '@testing-library/react';

import { UniEmpty } from './UniEmpty';

describe('UniEmpty', () => {
  it('renders defaults', () => {
    render(<UniEmpty />);

    expect(screen.getByText('No Data found')).toBeInTheDocument();
  });

  it('renders custom params', () => {
    render(
      <UniEmpty
        params={{
          props: {
            title: 'Custom title',
            description: 'Details',
          },
        }}
      />
    );

    expect(screen.getByText('Custom title')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
  });
});
