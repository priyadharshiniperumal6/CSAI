import { render } from '@testing-library/react';

import { UniTooltip } from './UniTooltip';
import { UniButton } from '../button/UniButton';

describe('UniTooltip', () => {
  it('renders trigger button', () => {
    const { getByText } = render(
      <UniTooltip title="Info">
        <UniButton>Hover</UniButton>
      </UniTooltip>
    );
    expect(getByText('Hover')).toBeInTheDocument();
  });
});
