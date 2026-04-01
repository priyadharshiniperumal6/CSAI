import { render, screen } from '@testing-library/react';

import { UniCard } from './UniCard';

describe('UniCard', () => {
  it('renders title and content', () => {
    render(
      <UniCard title="Header">
        <span>Body</span>
      </UniCard>
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('renders tool-registry variant content', () => {
    render(
      <UniCard
        cardVariant="tool-registry"
        variantData={{
          title: 'Slack Integration',
          description: 'Connect to Slack APIs.',
          chips: ['sendMessage', 'listUsers'],
          usageValue: '12 Projects',
        }}
      />
    );

    expect(screen.getByText('Slack Integration')).toBeInTheDocument();
    expect(screen.getByText('sendMessage')).toBeInTheDocument();
    expect(screen.getByText('12 Projects')).toBeInTheDocument();
  });

  it('renders project-overview variant content', () => {
    render(
      <UniCard
        cardVariant="project-overview"
        variantData={{
          title: 'Customer Onboarding AI',
          description: 'Streamlined onboarding workflows.',
          statusLabel: 'Design',
          footerMeta: 'Last modified: 2 days ago',
        }}
      />
    );

    expect(screen.getByText('Customer Onboarding AI')).toBeInTheDocument();
    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.getByText('Last modified: 2 days ago')).toBeInTheDocument();
  });

  it('renders fallback template when variantData is omitted', () => {
    render(<UniCard cardVariant="project-overview" />);

    expect(screen.getByText('Project name')).toBeInTheDocument();
  });

  it('applies manual color pair config to card header', () => {
    const { container } = render(
      <UniCard
        cardVariant="project-overview"
        cardColorConfig={{
          mode: 'manual',
          applyTo: 'header',
          pairs: [{ type: 'teal', color300: '#5eead4', color700: '#0f766e' }],
          colorType: 'teal',
        }}
      />
    );

    const card = container.querySelector('.uni-card');
    expect(card).toHaveClass('uni-card--color-header');
    expect(card?.getAttribute('style')).toContain('--uni-card-color-300: #5eead4');
    expect(card?.getAttribute('style')).toContain('--uni-card-color-700: #0f766e');
  });

  it('supports fixed layout mode for uniform card heights', () => {
    const { container } = render(
      <UniCard
        cardVariant="project-overview"
        cardLayoutConfig={{
          mode: 'fixed',
          fixedHeight: 360,
        }}
      />
    );

    const card = container.querySelector('.uni-card');
    expect(card).toHaveClass('uni-card--layout-fixed');
    expect(card?.getAttribute('style')).toContain('--uni-card-fixed-height: 360px');
  });

  it('hides header icon when showIcon is false', () => {
    const { container } = render(
      <UniCard
        cardVariant="tool-registry"
        variantData={{
          title: 'Slack Integration',
          showIcon: false,
        }}
      />
    );

    expect(container.querySelector('.uni-card-variant__icon-wrap')).not.toBeInTheDocument();
  });
});
