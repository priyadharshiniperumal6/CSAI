import { UniCard } from '../../../components/card/UniCard';
import { UniTag } from '../../../components/tag/UniTag';

export type ViewPatternPlaceholderCardProps = {
  viewPatternId: string;
  contextText?: string;
};

export const ViewPatternPlaceholderCard = ({ viewPatternId, contextText }: ViewPatternPlaceholderCardProps) => {
  return (
    <UniCard className="dev-route-shell__panel dev-route-shell__placeholder">
      <div className="dev-route-shell__title-row">
        <h2 className="dev-route-shell__subtitle">{viewPatternId} pattern</h2>
        <UniTag>Pending</UniTag>
      </div>
      <p className="dev-route-shell__description">TODO: view pattern not available yet</p>
      {contextText ? <p className="dev-route-shell__meta">{contextText}</p> : null}
    </UniCard>
  );
};
