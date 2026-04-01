import { render } from '@testing-library/react';

import { UniDivider } from './UniDivider';

describe('UniDivider', () => {
  it('renders content', () => {
    const { getByText } = render(<UniDivider>Text</UniDivider>);
    expect(getByText('Text')).toBeInTheDocument();
  });
});
