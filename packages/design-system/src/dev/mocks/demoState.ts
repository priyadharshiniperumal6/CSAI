import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const DEMO_STATE_QUERY_PARAM = 'state';

export const DEMO_VIEW_STATES = ['default', 'loading', 'empty', 'error'] as const;

export type DemoViewState = (typeof DEMO_VIEW_STATES)[number];

const DEMO_VIEW_STATE_SET = new Set<string>(DEMO_VIEW_STATES);

export const parseDemoViewState = (search: string): DemoViewState => {
  const queryState = new URLSearchParams(search).get(DEMO_STATE_QUERY_PARAM);
  if (queryState && DEMO_VIEW_STATE_SET.has(queryState)) {
    return queryState as DemoViewState;
  }
  return 'default';
};

export const useDemoState = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = useMemo(() => parseDemoViewState(location.search), [location.search]);

  const setState = useCallback(
    (nextState: DemoViewState) => {
      const searchParams = new URLSearchParams(location.search);
      if (nextState === 'default') {
        searchParams.delete(DEMO_STATE_QUERY_PARAM);
      } else {
        searchParams.set(DEMO_STATE_QUERY_PARAM, nextState);
      }

      const nextSearch = searchParams.toString();
      navigate(
        {
          pathname: location.pathname,
          search: nextSearch ? `?${nextSearch}` : '',
        },
        { replace: true }
      );
    },
    [location.pathname, location.search, navigate]
  );

  return { state, setState };
};
