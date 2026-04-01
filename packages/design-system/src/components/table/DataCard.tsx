import { UniButton } from '../button/UniButton';
import { UniCard } from '../card/UniCard';
import { UniTag } from '../tag/UniTag';
import { UniCardHeader } from '../card/UniCardHeader';
import { UniDropdown } from '../dropdown/UniDropdown';
import { UniCardPiles } from '../card/UniCardPiles';

const allColors = {
  '--ut-color-text-subtle': 'var(--ut-color-text-subtle)',
  '--ut-color-text-brand-emphasis': 'var(--ut-color-text-brand-emphasis)',
  '--ut-color-border-brand-subtle': 'var(--ut-color-border-brand-subtle)',
  '--ut-color-bg-brand-subtle': 'var(--ut-color-bg-brand-subtle)',
};

export type DataCardProps = {
  card?: {
    name?: string;
    organisations?: string[];
    language?: string;
    channels?: Array<{
      materialIcon: {
        iconName: string;
        size: string;
      };
    }>;
  };
};

export const DataCard = ({ card }: DataCardProps) => {
  if (!card?.name) {
    return null;
  }

  const headerTagOptions = {
    textColor: allColors['--ut-color-text-subtle'],
  };

  const extraTagOptions = {
    size: 'small' as const,
    textColor: allColors['--ut-color-text-brand-emphasis'],
    borderColor: allColors['--ut-color-border-brand-subtle'],
    backgroundColor: allColors['--ut-color-bg-brand-subtle'],
  };

  const editCard = (e: React.MouseEvent, card: any) => {
    e.stopPropagation();
    console.log(card);
  };

  const options = [
    {
      name: 'Show details',
      key: 'show-details',
      action: (e?: React.MouseEvent) => {
        e?.stopPropagation();
        console.log('Show details clicked');
      },
    },
  ];

  const openButtonProps = {
    size: 'small' as const,
    type: 'link' as const,
    iconOnly: true,
    materialIcon: {
      iconName: 'more_horiz',
      size: 22,
    },
  };

  const channelIconsProps = {
    size: 'small' as const,
    iconOnly: true,
    type: 'link' as const,
  };

  return (
    <UniCard
      hoverable
      size="small"
      title={<UniCardHeader title={card.name} tagText="V2" tagOptions={headerTagOptions} />}
      extra={<UniTag {...extraTagOptions}>Production</UniTag>}
      actions={[
        <div className="card-actions" key="actions">
          <UniDropdown options={options} openButtonProps={openButtonProps} placement="bottomRight" />
          <UniButton type="link" onClick={e => editCard(e, card)}>
            Edit
          </UniButton>
        </div>,
      ]}
    >
      <div className="uni-table-cards-body">
        <div className="uni-column">
          <label>Organization(s): </label>
          <UniCardPiles piles={card.organisations} maxPiles={5} />
        </div>
        <div className="row">
          <div className="uni-column">
            <label>Language: </label>
            <span>{card.language || 'not defined'}</span>
          </div>

          <div className="uni-column">
            <label>Channel:</label>
            <div className="uni-card-channel row">
              {card.channels?.map((channel, idx) => (
                <UniButton
                  key={idx}
                  className="uni-cards-channel-buttons"
                  {...channelIconsProps}
                  materialIcon={channel.materialIcon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </UniCard>
  );
};
