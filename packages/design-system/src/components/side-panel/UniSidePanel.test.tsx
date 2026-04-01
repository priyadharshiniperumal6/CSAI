import { render, screen } from '@testing-library/react';

import { UniSidePanel } from './UniSidePanel';

describe('UniSidePanel', () => {
  it('renders tabs and header', () => {
    render(
      <UniSidePanel
        params={{
          header: { component: ({ title }: { title: string }) => <div>{title}</div>, params: { title: 'Header' } },
          tabs: [{ id: 'tab-1', title: 'Tab One', component: () => <div>Content</div> }],
        }}
      />
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Tab One')).toBeInTheDocument();
  });
});
