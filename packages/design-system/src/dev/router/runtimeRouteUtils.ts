import { matchPath } from 'react-router-dom';

import type { RouteNavGroup, RouteParamSpec, RouteSpec } from './types';

const NAV_GROUP_ORDER: RouteNavGroup[] = ['Views', 'Assets', 'Examples'];

const PARAM_FALLBACKS: Record<string, string> = {
  objectid: '123',
  flowid: 'sample-flow',
};

const getGroupOrder = (group: RouteNavGroup): number => {
  const index = NAV_GROUP_ORDER.indexOf(group);
  return index === -1 ? NAV_GROUP_ORDER.length : index;
};

const getRouteParamValue = (param: RouteParamSpec): string => {
  const normalizedName = param.name.toLowerCase();
  if (PARAM_FALLBACKS[normalizedName]) {
    return PARAM_FALLBACKS[normalizedName];
  }
  if (param.type === 'number') {
    return '1';
  }
  if (normalizedName.endsWith('id')) {
    const base = normalizedName.replace(/id$/, '') || 'item';
    return `sample-${base}`;
  }
  return `sample-${normalizedName}`;
};

export const resolveRuntimePath = (route: RouteSpec): string => {
  if (!route.params?.length) {
    return route.path;
  }

  return route.params.reduce((resolvedPath, param) => {
    return resolvedPath.replace(`:${param.name}`, getRouteParamValue(param));
  }, route.path);
};

export const toChildPath = (routePath: string): string => routePath.replace(/^\/+/, '');

export const sortRoutesForNav = (routes: RouteSpec[]): RouteSpec[] => {
  return [...routes].sort((leftRoute, rightRoute) => {
    const groupDelta = getGroupOrder(leftRoute.nav.group) - getGroupOrder(rightRoute.nav.group);
    if (groupDelta !== 0) {
      return groupDelta;
    }

    const leftOrder = leftRoute.nav.order ?? Number.MAX_SAFE_INTEGER;
    const rightOrder = rightRoute.nav.order ?? Number.MAX_SAFE_INTEGER;
    if (leftOrder !== rightOrder) {
      return leftOrder - rightOrder;
    }

    return leftRoute.nav.label.localeCompare(rightRoute.nav.label);
  });
};

export const findActiveRoute = (pathname: string, routes: RouteSpec[]): RouteSpec | undefined => {
  return [...routes]
    .sort((leftRoute, rightRoute) => rightRoute.path.length - leftRoute.path.length)
    .find(route => Boolean(matchPath({ path: route.path, end: false }, pathname)));
};
