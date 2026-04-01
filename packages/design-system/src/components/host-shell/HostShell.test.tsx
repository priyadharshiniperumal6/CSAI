import { fireEvent, render, screen, within } from '@testing-library/react';

import { HostShell } from './HostShell';
import type { NavItem, SideNavItem, TopNavMenuItem } from '../../types/side-nav';

const sideNav: SideNavItem[] = [
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
];

const menuItems: TopNavMenuItem[] = [
  { key: 'home', label: 'Home', title: 'Home', routeName: 'home' },
  { key: 'settings', label: 'Settings', title: 'Settings', routeName: 'settings' },
];

const tokenNav: NavItem[] = [
  {
    key: 'home',
    label: 'Home',
    path: '/home',
    icon: 'insights',
  },
];

class IntersectionObserverMock {
  disconnect() {}
  observe() {}
  unobserve() {}
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

describe('HostShell', () => {
  it('renders header and children', () => {
    render(
      <HostShell
        sideNavData={sideNav}
        topMenuItems={menuItems}
        userDetails={{ name: 'Jane Doe', email: 'jane@example.com' }}
        userRoles={['Admin']}
        appTitle="Universal Apps"
      >
        <div>Content</div>
      </HostShell>
    );

    expect(screen.getByText('Universal Apps')).toBeInTheDocument();
    expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('fires callbacks for navigation click', () => {
    const sideNavSpy = vi.fn();
    const topNavSpy = vi.fn();
    render(
      <HostShell
        sideNavData={sideNav}
        topMenuItems={menuItems}
        userDetails={{ name: 'Jane Doe', email: 'jane@example.com' }}
        userRoles={['Admin']}
        onSideMenuClick={sideNavSpy}
        onTopMenuClick={topNavSpy}
      />
    );

    fireEvent.click(screen.getByText('Overview'));
    expect(sideNavSpy).toHaveBeenCalledWith('overview');

    fireEvent.click(screen.getByText('Settings'));
    expect(topNavSpy).toHaveBeenCalledWith('settings');
  });

  it('can hide side navigation for focused route layouts', () => {
    render(
      <HostShell
        sideNavData={sideNav}
        topMenuItems={menuItems}
        userDetails={{ name: 'Jane Doe', email: 'jane@example.com' }}
        userRoles={['Admin']}
        showSideNav={false}
      />
    );

    expect(screen.queryByTestId('side-nav')).not.toBeInTheDocument();
  });

  it('expands inline search and submits search input', () => {
    const searchSpy = vi.fn();
    render(
      <HostShell
        sideNavData={sideNav}
        topMenuItems={menuItems}
        userDetails={{ name: 'Jane Doe', email: 'jane@example.com' }}
        userRoles={['Admin']}
        onSearchSubmit={searchSpy}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Toggle search' }));
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'customer health' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(searchSpy).toHaveBeenCalledWith('customer health');
  });

  it('shows alerts and submits help question from header popforms', async () => {
    const alertSpy = vi.fn();
    const helpSpy = vi.fn();

    render(
      <HostShell
        sideNavData={sideNav}
        topMenuItems={menuItems}
        userDetails={{ name: 'Jane Doe', email: 'jane@example.com' }}
        userRoles={['Admin']}
        helpUrl={undefined}
        alerts={[
          {
            id: 'alert-1',
            title: 'Alert title',
            description: 'Alert description',
            timestamp: 'Now',
          },
        ]}
        onAlertClick={alertSpy}
        onHelpSubmit={helpSpy}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open alerts' }));
    const alertTitle = await screen.findByText('Alert title');
    fireEvent.click(alertTitle.closest('button') as HTMLButtonElement);
    expect(alertSpy).toHaveBeenCalledWith(expect.objectContaining({ id: 'alert-1' }));

    fireEvent.click(screen.getByRole('button', { name: 'Open help assistant' }));
    const helpTextArea = await screen.findByPlaceholderText('How can we help?');
    fireEvent.change(helpTextArea, { target: { value: 'How do I create a dashboard?' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send question' }));
    expect(helpSpy).toHaveBeenCalledWith('How do I create a dashboard?');
  });

  it('opens AI Assist panel and collapses primary navigation', () => {
    render(
      <HostShell
        sideNavData={sideNav}
        topMenuItems={menuItems}
        userDetails={{ name: 'Jane Doe', email: 'jane@example.com' }}
        userRoles={['Admin']}
      />
    );

    const sideNavElement = screen.getByTestId('side-nav');
    expect(sideNavElement.className).not.toContain('side-nav--collapsed');

    fireEvent.click(screen.getByRole('button', { name: 'Open AI Assist' }));

    expect(sideNavElement.className).toContain('side-nav--collapsed');
    expect(screen.getByPlaceholderText('Ask anything or @mention')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Open AI Assist' })).not.toBeInTheDocument();
  });

  it('opens the user preferences drawer from the profile menu and updates selections', async () => {
    const personaSpy = vi.fn();
    const datasetSpy = vi.fn();
    const languageSpy = vi.fn();

    render(
      <HostShell
        sideNavData={sideNav}
        topMenuItems={menuItems}
        userDetails={{ name: 'Jane Doe', email: 'jane@example.com' }}
        userRoles={['Admin']}
        userPreferences={{}}
        onPersonaChange={personaSpy}
        onDatasetChange={datasetSpy}
        onLanguageChange={languageSpy}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'User profile menu' }));
    fireEvent.click(await screen.findByRole('button', { name: 'Open user preferences' }));

    const drawer = await screen.findByTestId('host-shell-user-preferences');
    expect(
      within(drawer).getByText('Adjust the active persona, mock data set, and UX language for this workspace.')
    ).toBeInTheDocument();

    const personaControl = within(drawer).getByTestId('host-shell-persona-control');
    fireEvent.mouseDown(within(personaControl).getByRole('combobox'));
    fireEvent.click(await screen.findByText('Builder'));
    expect(personaSpy).toHaveBeenCalledWith('builder', expect.objectContaining({ label: 'Builder' }));

    const datasetControl = within(drawer).getByTestId('host-shell-dataset-control');
    fireEvent.mouseDown(within(datasetControl).getByRole('combobox'));
    fireEvent.click(await screen.findByText('Power User'));
    expect(datasetSpy).toHaveBeenCalledWith('power-user', expect.objectContaining({ label: 'Power User' }));

    const languageControl = within(drawer).getByTestId('host-shell-language-control');
    fireEvent.mouseDown(within(languageControl).getByRole('combobox'));
    fireEvent.click(await screen.findByText('Spanish'));
    expect(languageSpy).toHaveBeenCalledWith('es-ES', expect.objectContaining({ label: 'Spanish' }));
  });

  it('accepts NavItem side navigation data and resolves token icons', () => {
    render(
      <HostShell
        sideNavData={tokenNav}
        topMenuItems={menuItems}
        userDetails={{ name: 'Jane Doe', email: 'jane@example.com' }}
        userRoles={['Admin']}
        appTitle="Universal Apps"
      />
    );

    expect(screen.getAllByText('Home')).not.toHaveLength(0);
    expect(document.querySelector('[data-nav-icon="insights"]')).toBeInTheDocument();
    expect(screen.queryByText('insights')).not.toBeInTheDocument();
  });

  it('warns and falls back for unsupported string icons instead of rendering raw text', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <HostShell
        sideNavData={[
          {
            id: 'reports',
            text: 'Reports',
            icon: 'BarChartOutlined',
            groupId: 'main',
            groupName: 'Main',
            active: false,
            tooltip: 'Reports',
            roles: [],
            routeName: 'reports',
          },
        ]}
        topMenuItems={menuItems}
        userDetails={{ name: 'Jane Doe', email: 'jane@example.com' }}
        userRoles={['Admin']}
      />
    );

    expect(warnSpy).toHaveBeenCalledWith('[HostShell] Unknown NavIconToken: "BarChartOutlined". Using fallback icon.');
    expect(document.querySelector('[data-nav-icon="fallback"]')).toBeInTheDocument();
    expect(screen.queryByText('BarChartOutlined')).not.toBeInTheDocument();

    warnSpy.mockRestore();
  });
});
