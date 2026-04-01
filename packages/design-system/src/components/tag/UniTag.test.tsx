import { render, screen } from '@testing-library/react';

import { UniTag } from './UniTag';

describe('UniTag', () => {
  it('renders text and icons', () => {
    render(
      <UniTag
        startIcon={{ iconName: 'info_i' }}
        endIcon={{ iconName: 'close_small' }}
        data-testid="tag"
      >
        Label
      </UniTag>
    );

    expect(screen.getByTestId('tag')).toHaveTextContent('Label');
    expect(document.querySelectorAll('.material-symbols-outlined')).toHaveLength(2);
  });

  it('applies pill class', () => {
    render(
      <UniTag type="pill" size="small">
        Pill
      </UniTag>
    );

    const tag = screen.getByText('Pill');
    expect(tag.className).toContain('uni-pill');
    expect(tag.className).toContain('uni-tag-small');
  });
});
