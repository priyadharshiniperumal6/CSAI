import { render, screen } from '@testing-library/react';

import { UniBreadcrumb, UniBreadcrumbItem } from './UniBreadcrumb';

describe('UniBreadcrumb', () => {
  it('renders items', () => {
    render(
      <UniBreadcrumb>
        <UniBreadcrumbItem>Home</UniBreadcrumbItem>
        <UniBreadcrumbItem>Library</UniBreadcrumbItem>
      </UniBreadcrumb>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
