import { render, screen } from '@testing-library/react';

import { UniButton } from './UniButton';

describe('UniButton', () => {
  it('renders children and icons', () => {
    render(
      <UniButton uniIcon={{ iconName: 'uni-add' }} materialIcon={{ iconName: 'check_small', isAfter: true }}>
        Save
      </UniButton>
    );

    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(document.querySelectorAll('.uicon')).toHaveLength(1);
    expect(document.querySelectorAll('.material-symbols-outlined')).toHaveLength(1);
  });

  it('applies icon-only class when requested', () => {
    render(
      <UniButton aria-label="more" iconOnly uniIcon={{ iconName: 'uni-more_vert' }}>
        More
      </UniButton>
    );

    expect(screen.getByRole('button', { name: /more/i })).toHaveClass('uni-ant-button-icon');
  });
});
