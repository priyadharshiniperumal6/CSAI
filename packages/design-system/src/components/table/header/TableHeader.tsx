import { ReactNode, memo, useMemo } from 'react';
import classNames from 'classnames';
import './TableHeader.scss';

/**
 * Represents a single slot in the table header.
 */
export interface HeaderSlot {
    /** The unique name of the slot */
    name: string;
    /** The display order of the slot in the row (starts from 1) */
    order: number;
    /** The row index (0 or 1, defaults to 0) */
    row?: number;
    /** Custom CSS class for the slot container */
    class?: string;
    /** @deprecated Use 'class' instead */
    classes?: string;
}

/**
 * Properties to configure the TableHeader layout.
 */
export interface HeaderProperties {
    /** List of slot configurations */
    slots?: HeaderSlot[];
    /** Whether to show the second row in the header */
    hasSecondRow?: boolean;
    /** Whether the header includes save/view actions (used for specific implementations) */
    hasSaveActions?: boolean;
    /** Optional title for the table to be displayed in the header */
    tableTitle?: string;
    /** Custom CSS class for the entire header container */
    headerClass?: string;
}

/**
 * Props for the TableHeader component.
 */
export interface TableHeaderProps {
    /** Configuration for the header layout and slots */
    headerProperties: HeaderProperties;
    /** Global children (rarely used, prefer slots) */
    children?: ReactNode;
    /** Mapping of slot names to React components */
    slots?: Record<string, ReactNode>;
}

export const TableHeader = memo(({ headerProperties, slots = {} }: TableHeaderProps) => {
    const { hasSecondRow, headerClass, slots: rawSlots, tableTitle } = headerProperties ?? {};

    // Filter valid slots (must have order number)
    const validSlots = useMemo(() => 
        Array.isArray(rawSlots) ? rawSlots.filter(slot => typeof slot.order === 'number') : [],
    [rawSlots]);

    // First Row Logic (Matching Vue: !slot.row)
    const firstRowMapped = useMemo(() => {
        return validSlots
            .filter(slot => !slot.row)
            .map(slot => ({
                ...slot,
                className: classNames(`order-${slot.order}`, slot.class || slot.classes)
            }))
            .sort((a, b) => a.order - b.order);
    }, [validSlots]);

    // Second Row Logic (Matching Vue: hasSecondRow && slot.row > 0)
    const secondRowMapped = useMemo(() => {
        if (!hasSecondRow) return [];
        return validSlots
            .filter(slot => slot.row != null && slot.row > 0)
            .map(slot => ({
                ...slot,
                className: classNames(`order-${slot.order}`, slot.class || slot.classes)
            }))
            .sort((a, b) => a.order - b.order);
    }, [validSlots, hasSecondRow]);

    if (!headerProperties) return null;

    return (
        <div className={classNames("uni-table-header flex flex-col", headerClass)}>
            {/* Title support (if needed in future, currently matched with Vue TableHeader.vue which is layout only) */}
            {tableTitle && (
                <div className="table-title px-4 py-2 text-lg font-semibold border-b border-gray-100">
                    {tableTitle}
                </div>
            )}

            {/* Row 1 */}
            <div className="uni-table-header-row flex flex-wrap items-center">
                {firstRowMapped.map(slot => (
                    <div key={`${slot.name}-row0`} className={slot.className}>
                        {slots[slot.name]}
                    </div>
                ))}
            </div>

            {/* Row 2 */}
            {hasSecondRow && (
                <div className="uni-table-header-row flex flex-wrap items-center">
                    {secondRowMapped.map(slot => (
                        <div key={`${slot.name}-row1`} className={slot.className}>
                            {slots[slot.name]}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
});

TableHeader.displayName = 'TableHeader';
