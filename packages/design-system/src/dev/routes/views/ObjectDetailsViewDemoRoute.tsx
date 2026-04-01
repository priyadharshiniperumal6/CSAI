import { useParams } from 'react-router-dom';

import { UniCard } from '../../../components/card/UniCard';
import { UniEmpty } from '../../../components/empty/UniEmpty';
import { UniSkeleton } from '../../../components/skeleton/UniSkeleton';
import { UniTag } from '../../../components/tag/UniTag';
import { getObjectFixture } from '../../mocks/fixtures';
import type { DemoViewState } from '../../mocks/demoState';
import { useDemoState } from '../../mocks/demoState';
import { ViewPatternPlaceholderCard } from '../shared/ViewPatternPlaceholderCard';
import { ViewRouteShell } from '../shared/ViewRouteShell';

const renderObjectDetailsState = (state: DemoViewState, objectId: string) => {
  const objectFixture = getObjectFixture(objectId);

  if (state === 'loading') {
    return (
      <UniCard className="dev-route-shell__panel">
        <UniSkeleton paragraph={{ rows: 5 }} />
      </UniCard>
    );
  }

  if (state === 'empty') {
    return (
      <UniCard className="dev-route-shell__panel">
        <UniEmpty
          params={{
            props: {
              title: `No object details found for ${objectId}`,
              description: 'Use a different objectId or switch back to default state.',
            },
          }}
        />
      </UniCard>
    );
  }

  if (state === 'error') {
    return (
      <UniCard className="dev-route-shell__panel">
        <div className="dev-route-shell__title-row">
          <h2 className="dev-route-shell__subtitle">Object details error</h2>
          <UniTag>Error</UniTag>
        </div>
        <p className="dev-route-shell__description">
          Unable to load details for object `{objectId}`. Set `?state=default` to recover.
        </p>
      </UniCard>
    );
  }

  return (
    <>
      <ViewPatternPlaceholderCard viewPatternId="details" contextText={`objectId: ${objectId}`} />
      <UniCard className="dev-route-shell__panel" title={objectFixture.name}>
        <div className="dev-detail-grid">
          <div>
            <span className="dev-detail-label">Object ID</span>
            <code>{objectFixture.objectId}</code>
          </div>
          <div>
            <span className="dev-detail-label">Owner</span>
            <div>{objectFixture.owner}</div>
          </div>
          <div>
            <span className="dev-detail-label">Status</span>
            <UniTag>{objectFixture.status}</UniTag>
          </div>
          <div>
            <span className="dev-detail-label">Last Updated</span>
            <div>{objectFixture.lastUpdated}</div>
          </div>
        </div>
        <p className="dev-route-shell__description">{objectFixture.description}</p>
      </UniCard>
    </>
  );
};

export const ObjectDetailsViewDemoRoute = () => {
  const params = useParams<{ objectId: string }>();
  const { state } = useDemoState();
  const objectId = params.objectId ?? '123';

  return (
    <ViewRouteShell
      title="Object Details"
      description="Details route demonstrates parameterized deep-linking via /views/object/:objectId."
    >
      {renderObjectDetailsState(state, objectId)}
    </ViewRouteShell>
  );
};
