import { fireEvent, render, screen } from '@testing-library/react';

import { SideNav } from './SideNav';
import type { SideNavItem } from '../../types/side-nav';

const items: SideNavItem[] = [
  {
    id: 'overview',
    text: 'Overview',
    icon: 'space_dashboard',
    groupId: 'main',
    groupName: 'Main',
    active: true,
    tooltip: 'Overview',
    roles: [],
    routeName: 'overview',
  },
  {
    id: 'settings',
    text: 'Settings',
    icon: 'settings',
    groupId: 'configuration',
    groupName: 'CONFIGURATION',
    active: false,
    tooltip: 'Settings',
    roles: [],
    routeName: 'settings',
  },
];

describe('SideNav', () => {
  it('renders groups and menu items', () => {
    render(<SideNav sideNavData={items} />);
    expect(screen.getByText('Main')).toBeInTheDocument();
    expect(screen.getByText('CONFIGURATION')).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  it('emits click events', () => {
    const onClick = vi.fn();
    render(<SideNav sideNavData={items} onSideMenuClick={onClick} />);
    fireEvent.click(screen.getByText('Overview'));
    expect(onClick).toHaveBeenCalledWith('overview');
  });

  it('renders the app title under the logo without app switch options', () => {
    render(<SideNav sideNavData={items} appTitle="Universal Theme Dev Runtime" />);

    expect(screen.getByText('Universal Theme Dev Runtime')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Switch application' })).not.toBeInTheDocument();
  });

  it('shows app switch options only when an app map is provided', async () => {
    const onAppSwitch = vi.fn();
    render(
      <SideNav
        sideNavData={items}
        appTitle="Universal Theme Dev Runtime"
        selectedAppKey="runtime"
        appSwitcherItems={[
          { key: 'runtime', label: 'Universal Theme Dev Runtime', routeName: '/views/dashboard' },
          { key: 'tokens', label: 'Design Token Explorer', routeName: '/assets/tokens' },
        ]}
        onAppSwitch={onAppSwitch}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Switch application' }));
    fireEvent.click(await screen.findByText('Design Token Explorer'));
    expect(onAppSwitch).toHaveBeenCalledWith({
      key: 'tokens',
      label: 'Design Token Explorer',
      routeName: '/assets/tokens',
    });
  });

  it('supports collapsed mode for icon-first primary navigation', () => {
    render(<SideNav sideNavData={items} isCollapsed />);

    expect(screen.getByTestId('side-nav').className).toContain('side-nav--collapsed');
    const logoElement = screen.getByRole('img', { name: 'Uniphore' });
    expect(logoElement).toHaveAttribute('src', expect.stringContaining('universal-theme-logo-sm.svg'));
  });
});
