import { UniTag } from '../../../components/tag/UniTag';
import { allColors } from '../../../theme/themeAntDesign';

export const ChipRenderer = (params: any) => {
  const { value, maxItems = 1 } = params;
  if (!value) return null;

  const items = Array.isArray(value) ? value : [value];
  const visibleItems = items.slice(0, maxItems);
  const hiddenCount = items.length - maxItems;

  return (
    <div
      style={{
        display: 'flex',
        gap: '4px',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'start',
        width: '100%',
        height: '100%',
      }}
    >
      {visibleItems.map((item: any, index: number) => (
        <UniTag
          key={index}
          size="small"
          borderColor={allColors['--bcolor-neutral-500'] as string}
          backgroundColor={allColors['--bcolor-neutral-0'] as string}
        >
          {typeof item === 'string' ? item : item.value || item}
        </UniTag>
      ))}
      {hiddenCount > 0 && (
        <span style={{ fontSize: '12px', color: 'var(--ut-color-text-muted)', whiteSpace: 'nowrap' }}>
          +{hiddenCount}
        </span>
      )}
    </div>
  );
};

export const AccountNameRenderer = (params: any) => {
  const { value, data, colDef } = params;
  const secondaryField = colDef.cellRendererParams?.secondaryField;
  const secondaryValue = secondaryField ? data?.[secondaryField] : null;

  if (!secondaryValue) {
    return <span>{value}</span>;
  }

  return (
    <div className="uni-cell-double-content">
      <span className="uni-cell-primary-text">{value}</span>
      <span className="uni-cell-secondary-text">{secondaryValue}</span>
    </div>
  );
};

export const DeployedEnvironment = (params: any) => {
  const value = params.value;
  if (!value) return null;

  return (
    <div
      style={{
        display: 'flex',
        gap: '4px',
        justifyContent: 'start',
        width: '100%',
        height: '100%',
        alignItems: 'center',
      }}
    >
      {value.tags?.map((tag: any, index: number) => (
        <UniTag key={index} {...tag} size="small">
          {tag.value}
        </UniTag>
      ))}
    </div>
  );
};
