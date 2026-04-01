import { fireEvent, render, screen } from '@testing-library/react';

import { UniCodeSnippet } from './UniCodeSnippet';

describe('UniCodeSnippet', () => {
  it('copies snippet to clipboard', () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText,
      },
    });

    render(<UniCodeSnippet codeSnippet="<div />" />);

    fireEvent.click(screen.getByLabelText('Copy code'));
    expect(writeText).toHaveBeenCalledWith('<div />');
  });
});
