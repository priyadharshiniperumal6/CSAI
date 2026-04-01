import { render, screen } from '@testing-library/react';

import { UniSubEditor } from './UniSubEditor';

describe('UniSubEditor', () => {
  it('renders title, toolbar, and content', () => {
    render(
      <UniSubEditor info={{ title: 'Inline Editor' }} toolbar={<button>Action</button>}>
        <div>Content goes here</div>
      </UniSubEditor>
    );

    expect(screen.getByText('Inline Editor')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Content goes here')).toBeInTheDocument();
  });
});
