import { render } from '@testing-library/react';

import { UniPopover } from './UniPopover';
import { UniButton } from '../button/UniButton';

describe('UniPopover', () => {
  it('renders trigger', () => {
    const { getByText } = render(
      <UniPopover content="Hi">
        <UniButton>Open</UniButton>
      </UniPopover>
    );
    expect(getByText('Open')).toBeInTheDocument();
  });
});
