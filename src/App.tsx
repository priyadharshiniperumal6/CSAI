import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { HostShell, UniConfigProvider } from '@uniphore/ut-design-system';
import { NAV_ITEMS } from './config/navigation';
import { TopNavProvider, useTopNav } from './context/TopNavContext';
import { TenantsPage } from './pages/tenants/TenantsPage';
import { TenantDetailPage } from './pages/tenants/TenantDetailPage';
import { UserManagementPage } from './pages/users/UserManagementPage';
import { IntegrationsPage } from './pages/integrations/IntegrationsPage';
import { ApiConsolePage } from './pages/api-console/ApiConsolePage';
import { BillingPage } from './pages/billing/BillingPage';
import './styles/global.css';

const CopilotLabel = (
  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, lineHeight: 1 }}>
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, display: 'block' }}>
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4DCFEA" />
          <stop offset="100%" stopColor="#7C5CE8" />
        </linearGradient>
      </defs>
      <path
        d="M8 0 L9.8 6.2 L16 8 L9.8 9.8 L8 16 L6.2 9.8 L0 8 L6.2 6.2 Z"
        fill="url(#cg)"
      />
    </svg>
    <span style={{ color: '#1a1d23', fontWeight: 600, fontSize: 13, lineHeight: 1, display: 'inline-block' }}>Copilot</span>
  </span>
);

const COPILOT_ITEM = {
  key: '/copilot',
  label: CopilotLabel,
  title: 'Copilot',
  routeName: '/copilot',
};

function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const { topMenuItems, selectedKeys, onTabChange } = useTopNav();

  // Always prepend Co-Pilot before page-specific tabs
  const allTopItems = [COPILOT_ITEM, ...topMenuItems];

  // Mark the nav item that matches the current route as active
  const activeNavItems = useMemo(() =>
    NAV_ITEMS.map(item => ({
      ...item,
      active: location.pathname === item.routeName ||
        (item.routeName !== '/' && location.pathname.startsWith(item.routeName + '/')),
    })),
    [location.pathname]
  );

  return (
    <HostShell
      sideNavData={activeNavItems}
      topMenuItems={allTopItems}
      selectedMenuItems={selectedKeys}
      appTitle="CSAI Admin"
      userDetails={{
        given_name: 'Rachel Williams',
        email: 'rachel.w@uniphore.com',
        tenantName: 'Uniphore',
      }}
      userRoles={['Super Admin']}
      showAIAssistButton={false}
      onSideMenuClick={(routeName) => {
        if (routeName) navigate(routeName);
      }}
      onTopMenuClick={(routeName) => {
        if (!routeName) return;
        if (routeName === '/copilot') {
          navigate('/copilot');
        } else if (onTabChange) {
          onTabChange(routeName);
        }
      }}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/tenants" replace />} />
        <Route path="/tenants" element={<TenantsPage />} />
        <Route path="/tenants/:tenantId" element={<TenantDetailPage />} />
        <Route path="/users" element={<UserManagementPage />} />
        <Route path="/integrations" element={<IntegrationsPage />} />
        <Route path="/api-console" element={<ApiConsolePage />} />
        <Route path="/billing" element={<BillingPage />} />
        {/* Placeholder routes for other nav items */}
        <Route path="/analytics" element={<PlaceholderPage title="Analytics" />} />
        <Route path="/reports" element={<PlaceholderPage title="Reports" />} />
        <Route path="/benchmarks" element={<PlaceholderPage title="Benchmarks" />} />
        <Route path="/process-discovery" element={<PlaceholderPage title="Process Discovery" />} />
        <Route path="/agent-studio" element={<PlaceholderPage title="Agent Studio" />} />
        <Route path="/copilot" element={<PlaceholderPage title="Co-Pilot" />} />
        <Route path="/self-serve" element={<PlaceholderPage title="Self Serve" />} />
        <Route path="/answers" element={<PlaceholderPage title="Answers" />} />
        <Route path="/knowledge" element={<PlaceholderPage title="Knowledge" />} />
        <Route path="/models" element={<PlaceholderPage title="Models" />} />
        <Route path="/agents" element={<PlaceholderPage title="Agents" />} />
        <Route path="/data" element={<PlaceholderPage title="Data" />} />
        <Route path="/system-settings" element={<PlaceholderPage title="System Settings" />} />
        <Route path="/configurations" element={<PlaceholderPage title="Configurations" />} />
      </Routes>
    </HostShell>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div style={{ padding: 32 }}>
      <h2 style={{ margin: 0, color: 'var(--ut-color-text-default)' }}>{title}</h2>
      <p style={{ color: 'var(--ut-color-text-subtle)', marginTop: 8 }}>This section is under development.</p>
    </div>
  );
}

export default function App() {
  return (
    <UniConfigProvider
      theme={{
        token: {
          colorPrimary: '#15808C',
          colorLink: '#15808C',
          colorLinkHover: '#0e6570',
          borderRadius: 8,
        },
      }}
    >
      <HashRouter>
        <TopNavProvider>
          <AppShell />
        </TopNavProvider>
      </HashRouter>
    </UniConfigProvider>
  );
}
