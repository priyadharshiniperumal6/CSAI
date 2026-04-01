import { render, screen } from '@testing-library/react';

import { UniTextarea } from './UniTextarea';

describe('UniTextarea', () => {
  it('renders textarea', () => {
    render(<UniTextarea placeholder="Type" />);
    expect(screen.getByPlaceholderText('Type')).toBeInTheDocument();
  });
});
