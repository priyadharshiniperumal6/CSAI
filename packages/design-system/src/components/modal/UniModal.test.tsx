import { render } from '@testing-library/react';

import { UniModal } from './UniModal';

describe('UniModal', () => {
  it('renders when open', () => {
    render(<UniModal open>Content</UniModal>);
    expect(document.querySelector('.ant-modal')).toBeInTheDocument();
  });
});
