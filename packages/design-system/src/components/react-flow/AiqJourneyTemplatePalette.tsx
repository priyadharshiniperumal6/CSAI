import { useState, type DragEvent } from 'react';
import classNames from 'classnames';

import { UniCard } from '../card/UniCard';
import { UniTooltip } from '../tooltip/UniTooltip';
import {
  AiqJourneyTemplateIcon,
  type AiqJourneyPaletteActionItem,
  type AiqJourneyPaletteNodeTemplate,
} from './AiqJourneySkin';

type AiqJourneyTemplatePaletteProps = {
  items: AiqJourneyPaletteActionItem[];
  onDragStart: (template: AiqJourneyPaletteNodeTemplate) => (event: DragEvent<HTMLButtonElement>) => void;
  className?: string;
};

const setMinimalDragPreview = (event: DragEvent<HTMLButtonElement>) => {
  const dragIcon = event.currentTarget.querySelector('.uni-react-flow-journey-action-palette__item-icon');
  if (!dragIcon || !event.dataTransfer) {
    return;
  }

  const preview = document.createElement('div');
  preview.className = 'uni-react-flow-journey-template-palette__drag-preview';
  preview.appendChild(dragIcon.cloneNode(true));
  document.body.appendChild(preview);

  const { width, height } = preview.getBoundingClientRect();
  event.dataTransfer.setDragImage(preview, width / 2, height / 2);

  requestAnimationFrame(() => {
    preview.remove();
  });
};

export const AiqJourneyTemplatePalette = ({ items, onDragStart, className }: AiqJourneyTemplatePaletteProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <UniCard
      className={classNames('uni-react-flow-journey-template-palette', className, {
        'is-expanded': isExpanded,
      })}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="uni-react-flow-journey-template-palette__items">
        {items.map((item, index) => {
          const showDivider =
            index > 0 && items[index - 1]?.template.nodeType === 'content' && item.template.nodeType !== 'content';

          return (
            <div key={item.id}>
              {showDivider ? <div className="uni-react-flow-journey-template-palette__separator" /> : null}
              <UniTooltip placement="right" title={isExpanded ? item.description : null}>
                <button
                  type="button"
                  className="uni-react-flow-journey-action-palette__item uni-react-flow-journey-template-palette__item"
                  draggable
                  onDragStart={event => {
                    onDragStart(item.template)(event);
                    setMinimalDragPreview(event);
                  }}
                >
                  <AiqJourneyTemplateIcon template={item.template} />
                  <span className="uni-react-flow-journey-action-palette__item-label uni-react-flow-journey-template-palette__item-label">
                    {item.label}
                  </span>
                </button>
              </UniTooltip>
            </div>
          );
        })}
      </div>
    </UniCard>
  );
};
