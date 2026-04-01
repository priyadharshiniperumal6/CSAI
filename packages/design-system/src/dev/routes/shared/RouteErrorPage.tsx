import { useMemo } from 'react';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';

import { UniButton } from '../../../components/button/UniButton';
import { UniCard } from '../../../components/card/UniCard';
import { UniTag } from '../../../components/tag/UniTag';

type ErrorDetails = {
  statusCode: number;
  title: string;
  message: string;
};

export type RouteErrorPageProps = {
  statusCode?: number;
  title?: string;
  message?: string;
};

const FALLBACK_ERROR: ErrorDetails = {
  statusCode: 500,
  title: 'Route runtime error',
  message: 'An unexpected routing error occurred in the dev runtime.',
};

const toErrorMessage = (routeError: unknown): string => {
  if (typeof routeError === 'string') {
    return routeError;
  }
  if (routeError instanceof Error) {
    return routeError.message;
  }
  return FALLBACK_ERROR.message;
};

export const RouteErrorPage = ({ statusCode, title, message }: RouteErrorPageProps) => {
  const navigate = useNavigate();
  const routeError = useRouteError();

  const details = useMemo<ErrorDetails>(() => {
    if (statusCode || title || message) {
      return {
        statusCode: statusCode ?? FALLBACK_ERROR.statusCode,
        title: title ?? FALLBACK_ERROR.title,
        message: message ?? FALLBACK_ERROR.message,
      };
    }

    if (isRouteErrorResponse(routeError)) {
      const routeDataMessage =
        typeof routeError.data === 'string'
          ? routeError.data
          : typeof routeError.data?.message === 'string'
            ? routeError.data.message
            : undefined;

      return {
        statusCode: routeError.status,
        title: routeError.statusText || FALLBACK_ERROR.title,
        message: routeDataMessage ?? FALLBACK_ERROR.message,
      };
    }

    if (routeError) {
      return {
        statusCode: FALLBACK_ERROR.statusCode,
        title: FALLBACK_ERROR.title,
        message: toErrorMessage(routeError),
      };
    }

    return FALLBACK_ERROR;
  }, [message, routeError, statusCode, title]);

  return (
    <div className="dev-route-shell">
      <UniCard className="dev-route-shell__error-card">
        <div className="dev-route-shell__title-row">
          <h1 className="dev-route-shell__title">{details.title}</h1>
          <UniTag>{`HTTP ${details.statusCode}`}</UniTag>
        </div>
        <p className="dev-route-shell__description">{details.message}</p>
        <div className="dev-route-shell__states">
          <UniButton type="primary" onClick={() => navigate('/views/dashboard')}>
            Go to Dashboard
          </UniButton>
          <UniButton onClick={() => navigate('/assets/tokens')}>Open Token Explorer</UniButton>
        </div>
      </UniCard>
    </div>
  );
};
