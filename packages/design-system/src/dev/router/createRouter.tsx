import type { ComponentType } from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import { routeRegistry } from './routeRegistry';
import { toChildPath } from './runtimeRouteUtils';
import type { RouteSpec } from './types';
import { AssetIconsPage } from '../routes/assets/AssetIconsPage';
import { AssetTokenDocumentationPage } from '../routes/assets/AssetTokenDocumentationPage';
import { AssetTokensPage } from '../routes/assets/AssetTokensPage';
import { AssetTypographyPage } from '../routes/assets/AssetTypographyPage';
import { DevHostShellLayout } from '../routes/shared/DevHostShellLayout';
import { RouteErrorPage } from '../routes/shared/RouteErrorPage';
import { AIAssistHomeDemoRoute } from '../routes/views/AIAssistHomeDemoRoute';
import { CardViewDemoRoute } from '../routes/views/CardViewDemoRoute';
import { ChatViewDemoRoute } from '../routes/views/ChatViewDemoRoute';
import { DashboardViewDemoRoute } from '../routes/views/DashboardViewDemoRoute';
import { FlowViewDemoRoute } from '../routes/views/FlowViewDemoRoute';
import { ObjectDetailsViewDemoRoute } from '../routes/views/ObjectDetailsViewDemoRoute';
import { TableViewDemoRoute } from '../routes/views/TableViewDemoRoute';
import { UsersViewDemoRoute } from '../routes/views/UsersViewDemoRoute';

const componentKeyMap: Record<string, ComponentType> = {
  AssetTokenDocumentationPage,
  AssetTokensPage,
  AssetIconsPage,
  AssetTypographyPage,
  AIAssistHomeDemoRoute,
  DashboardViewDemoRoute,
  TableViewDemoRoute,
  CardViewDemoRoute,
  ChatViewDemoRoute,
  ObjectDetailsViewDemoRoute,
  FlowViewDemoRoute,
  UsersViewDemoRoute,
};

const createRouteElement = (route: RouteSpec) => {
  const RouteComponent = componentKeyMap[route.componentKey];
  if (!RouteComponent) {
    return (
      <RouteErrorPage
        statusCode={500}
        title="Missing dev route component"
        message={`componentKey "${route.componentKey}" from routeRegistry has no runtime mapping.`}
      />
    );
  }
  return <RouteComponent />;
};

const buildRegistryRoutes = (): RouteObject[] => {
  return routeRegistry.map(route => ({
    id: route.routeId,
    path: toChildPath(route.path),
    element: createRouteElement(route),
    errorElement: <RouteErrorPage />,
  }));
};

export const createDevRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <DevHostShellLayout />,
      errorElement: <RouteErrorPage />,
      children: [
        {
          index: true,
          loader: () => redirect('/views/dashboard'),
        },
        ...buildRegistryRoutes(),
        {
          path: '*',
          element: (
            <RouteErrorPage
              statusCode={404}
              title="Route not found"
              message="The requested route does not exist in the dev runtime registry."
            />
          ),
        },
      ],
    },
  ]);

export const devRouter = createDevRouter();
