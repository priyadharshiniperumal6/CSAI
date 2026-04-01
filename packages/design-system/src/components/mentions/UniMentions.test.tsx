import { render } from '@testing-library/react';

import { UniMentions } from './UniMentions';

describe('UniMentions', () => {
  it('renders textarea', () => {
    const { container } = render(<UniMentions />);
    expect(container.querySelector('.ant-mentions')).toBeInTheDocument();
  });
});
