export type RouteKind = 'asset' | 'view' | 'example';

export type RouteNavGroup = 'Views' | 'Assets' | 'Examples';

export type ViewPatternId = 'dashboard' | 'table' | 'details' | 'flow' | 'split' | 'form';

export type RouteParamType = 'string' | 'number';

export type RouteEndpointMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RouteParamSpec {
  name: string;
  type: RouteParamType;
  required: boolean;
}

export interface RouteEndpointSpec {
  id: string;
  method: RouteEndpointMethod;
  path: string;
  description?: string;
}

export interface RouteMockSpec {
  seed?: number;
  latencyMs?: number;
  errorRate?: number;
}

export interface RouteNavSpec {
  visible: boolean;
  group: RouteNavGroup;
  label: string;
  iconKey?: string;
  order?: number;
}

export interface RouteSpec {
  routeId: string;
  kind: RouteKind;
  path: string;
  title: string;
  componentKey: string;
  nav: RouteNavSpec;
  viewPatternId?: ViewPatternId;
  params?: RouteParamSpec[];
  endpoints?: RouteEndpointSpec[];
  mock?: RouteMockSpec;
}
