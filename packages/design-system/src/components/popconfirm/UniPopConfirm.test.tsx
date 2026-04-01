import { render } from '@testing-library/react';

import { UniPopConfirm } from './UniPopConfirm';
import { UniButton } from '../button/UniButton';

describe('UniPopConfirm', () => {
  it('renders trigger', () => {
    const { getByText } = render(
      <UniPopConfirm title="Confirm?">
        <UniButton>Trigger</UniButton>
      </UniPopConfirm>
    );
    expect(getByText('Trigger')).toBeInTheDocument();
  });
});
