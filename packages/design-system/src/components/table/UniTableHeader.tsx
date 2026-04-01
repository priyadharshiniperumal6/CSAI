import type { ReactNode } from 'react';
import classNames from 'classnames';

export type HeaderSlot = {
  name: string;
  order: number;
  class?: string;
  row?: number;
};

export type HeaderProperties = {
  hasSecondRow?: boolean;
  headerClass?: string;
  slots: HeaderSlot[];
};

export type HeaderSlotRenderers = Record<string, ReactNode | (() => ReactNode)>;

export type UniTableHeaderProps = {
  headerProperties?: HeaderProperties;
  renderSlot?: (slotName: string) => ReactNode;
  headerSlots?: HeaderSlotRenderers;
};

const mapSlots = (slots: HeaderSlot[] = []) =>
  slots
    .filter(slot => typeof slot.order === 'number')
    .map(slot => ({
      ...slot,
      classes: classNames(`order-${slot.order}`, slot.class),
    }));

export const UniTableHeader = ({ headerProperties, renderSlot, headerSlots }: UniTableHeaderProps) => {
  if (!headerProperties) {
    return null;
  }

  const resolveSlotContent = (slotName: string) => {
    const slotFromCallback = renderSlot?.(slotName);
    if (slotFromCallback !== undefined && slotFromCallback !== null) {
      return slotFromCallback;
    }
    if (headerSlots && slotName in headerSlots) {
      const slotValue = headerSlots[slotName];
      if (typeof slotValue === 'function') {
        return slotValue();
      }
      return slotValue;
    }
    return null;
  };

  const firstRowSlots = mapSlots(headerProperties.slots?.filter(slot => !slot.row));
  const secondRowSlots = headerProperties.hasSecondRow
    ? mapSlots(headerProperties.slots?.filter(slot => slot.row && slot.row > 0))
    : [];

  return (
    <div className={classNames('uni-table-header flex', headerProperties.headerClass)}>
      <div className="uni-table-header-row flex flex-wrap justify-between">
        {firstRowSlots.map(slot => (
          <div key={slot.name} className={slot.classes}>
            {resolveSlotContent(slot.name)}
          </div>
        ))}
      </div>
      {secondRowSlots.length ? (
        <div className="uni-table-header-row flex flex-wrap">
          {secondRowSlots.map(slot => (
            <div key={slot.name} className={slot.classes}>
              {resolveSlotContent(slot.name)}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
