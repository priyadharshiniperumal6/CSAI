import { render, screen } from '@testing-library/react';

import { UniStepper } from './UniStepper';

describe('UniStepper', () => {
  it('renders steps', () => {
    render(<UniStepper items={[{ title: 'One' }]} />);
    expect(screen.getByText('One')).toBeInTheDocument();
  });
});
