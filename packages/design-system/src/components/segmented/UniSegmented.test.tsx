import { render, screen } from '@testing-library/react';

import { UniSegmented } from './UniSegmented';

describe('UniSegmented', () => {
  it('renders options', () => {
    render(<UniSegmented options={['One', 'Two']} defaultValue="One" />);
    expect(screen.getByText('One')).toBeInTheDocument();
  });
});
