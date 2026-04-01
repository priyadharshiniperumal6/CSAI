import { Link } from 'react-router-dom';

import { UniBreadcrumb } from '../../../components/breadcrumb/UniBreadcrumb';
import { UniCard } from '../../../components/card/UniCard';
import { UniIcon, UniMaterialIcon } from '../../../components/icon';
import { UniTag } from '../../../components/tag/UniTag';
import { TOKEN_DOC_ROUTE_PATH } from './tokenFilters';
import { materialIconNames, uniIconNames } from '../../assets/assetCatalog';
import { ViewRouteShell } from '../shared/ViewRouteShell';

export const AssetIconsPage = () => {
  return (
    <ViewRouteShell
      title="Icons"
      description="Complete icon inventory for the design system library."
      breadcrumbs={
        <UniBreadcrumb items={[{ title: <Link to={TOKEN_DOC_ROUTE_PATH}>Design Tokens</Link> }, { title: 'Icons' }]} />
      }
    >
      <div className="dev-asset-route-scroll">
        <UniCard
          className="dev-route-shell__panel"
          title="Material Symbols"
          extra={<UniTag>{`${materialIconNames.length} icons`}</UniTag>}
        >
          <div className="dev-icon-grid">
            {materialIconNames.map(iconName => (
              <UniCard key={iconName} className="dev-icon-item" size="small">
                <UniMaterialIcon iconName={iconName} size={24} />
                <span className="dev-icon-label">{iconName}</span>
              </UniCard>
            ))}
          </div>
        </UniCard>
        <UniCard
          className="dev-route-shell__panel"
          title="Uniphore Icon Font"
          extra={<UniTag>{`${uniIconNames.length} icons`}</UniTag>}
        >
          <div className="dev-icon-grid">
            {uniIconNames.map(iconName => (
              <UniCard key={iconName} className="dev-icon-item" size="small">
                <UniIcon iconName={iconName} size={24} />
                <span className="dev-icon-label">{iconName}</span>
              </UniCard>
            ))}
          </div>
        </UniCard>
      </div>
    </ViewRouteShell>
  );
};
