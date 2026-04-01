import { render } from '@testing-library/react';

import { UniDrawer } from './UniDrawer';

describe('UniDrawer', () => {
  it('renders drawer content', () => {
    render(<UniDrawer open>Drawer</UniDrawer>);
    expect(document.querySelector('.ant-drawer')).toBeInTheDocument();
  });
});
