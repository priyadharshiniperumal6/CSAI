import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import rangy from 'rangy';
import 'rangy/lib/rangy-classapplier';
import 'rangy/lib/rangy-highlighter';
import 'rangy/lib/rangy-selectionsaverestore';
import 'rangy/lib/rangy-textrange';

import { UniMaterialIcon } from '../icon';
import { useNotification } from '../notification/useNotification';
import {
  _cloneObject,
  _clearCursorSelection,
  _displayTrainingPhraseGenerator,
  _getFirstRange,
  _getMousePosition,
  _glueBackToHTMLPhraseGenerator,
  _parse,
  _removeForEmptySpanBRTags,
  _textOnPasteConverter,
  _validateSelectedText,
  _buildHtmlSpanElement,
} from './PhraseAnnotator.util';

import './UniPhraseAnnotator.scss';

const phrasePojoKey = {
  mappedSlotsArray: 'intentSlotMapPojos',
  phraseId: 'trainingPhraseId',
  phraseAsText: 'trainingPhraseText',
  phraseAsArray: 'tpAsArray',
  phraseStatus: 'isUpdated',
  phraseForDisplay: 'trainingPhraseDisplay',
  phraseForRegex: 'trainingPhraseRegexTxt',
  intentSlot: 'intentSlot',
  intentSlotId: 'intentSlotId',
  slotId: 'intentSlotId',
  slotKey: 'position',
  slotValue: 'value',
  screen: 'TrainingPhrase',
} as const;

type SelectedTextData = {
  text?: string;
  range?: any;
};

type TooltipData = {
  id?: string;
  slotKey?: string;
  slotValue?: string;
};

export type UniPhraseAnnotatorProps = {
  value: any;
  slots: any[];
  placeholder?: string;
  minHeight?: string;
  keyId?: number;
  isMonosyllabic?: boolean;
  showEnterIcon?: boolean;
  isDisabled?: boolean;
  className?: string;
  onPhraseAnnotatorSave?: (value: any) => void;
};

export const UniPhraseAnnotator = ({
  value,
  slots,
  placeholder = '',
  minHeight = '40px',
  keyId = 0,
  isMonosyllabic = false,
  showEnterIcon = false,
  isDisabled = false,
  className,
  onPhraseAnnotatorSave,
}: UniPhraseAnnotatorProps) => {
  const contentEditableRef = useRef<HTMLDivElement | null>(null);
  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const tpRef = useRef<any>(value);
  const selectedTextRef = useRef<SelectedTextData>({});
  const { openNotification } = useNotification();

  const [showContextMenu, setShowContextMenu] = useState(false);
  const [slotsArray, setSlotsArray] = useState<any[]>([]);
  const [contextMenuStyle, setContextMenuStyle] = useState({ top: 28, left: 5 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState('');
  const [tooltipStyle, setTooltipStyle] = useState({ top: 28, left: 5 });
  const [slotTooltipData, setSlotTooltipData] = useState<TooltipData | null>(null);

  const updatePhrase = useCallback(
    (parsedValue: any, isRangy: boolean, updateOnBlur: boolean) => {
      const editable = contentEditableRef.current;
      if (!editable) {
        return;
      }
      const tpObj = _glueBackToHTMLPhraseGenerator(parsedValue, slots, phrasePojoKey);
      tpRef.current = {
        ...tpRef.current,
        [phrasePojoKey.phraseStatus]: true,
        [phrasePojoKey.phraseForDisplay]: tpObj[phrasePojoKey.phraseForDisplay],
        [phrasePojoKey.phraseAsText]: tpObj[phrasePojoKey.phraseAsText],
        [phrasePojoKey.mappedSlotsArray]: tpObj[phrasePojoKey.mappedSlotsArray],
        [phrasePojoKey.phraseForRegex]: tpObj[phrasePojoKey.phraseForRegex],
      };

      if (isRangy && !updateOnBlur) {
        const selection: any = rangy.getSelection();
        const savedRanges = selection.saveCharacterRanges(editable);
        const previousLength = editable.innerText.length;
        editable.innerHTML = tpRef.current[phrasePojoKey.phraseForDisplay] || '';
        const newLength = editable.innerText.length;
        if (previousLength > newLength && savedRanges[0]) {
          savedRanges[0].characterRange.end = savedRanges[0].characterRange.end + (newLength - previousLength);
          savedRanges[0].characterRange.start = savedRanges[0].characterRange.end;
        }
        selection.restoreCharacterRanges(editable, savedRanges);
      } else {
        editable.innerHTML = tpRef.current[phrasePojoKey.phraseForDisplay] || '';
      }

      if (updateOnBlur) {
        onPhraseAnnotatorSave?.(_cloneObject(tpRef.current, phrasePojoKey.phraseAsText));
      }
    },
    [onPhraseAnnotatorSave, slots]
  );

  const displayTrainingPhrases = useCallback(
    (onDeleteSlots: boolean) => {
      tpRef.current = _displayTrainingPhraseGenerator(tpRef.current, slots, phrasePojoKey);
      if (contentEditableRef.current) {
        contentEditableRef.current.innerHTML = tpRef.current[phrasePojoKey.phraseForDisplay] || '';
      }
      if (onDeleteSlots) {
        updatePhrase(tpRef.current[phrasePojoKey.phraseAsArray], false, true);
      }
    },
    [slots, updatePhrase]
  );

  const updateTrainingPhraseView = useCallback(
    (isRangy: boolean, updateOnBlur: boolean) => {
      if (!contentEditableRef.current) return;
      const tpHtmlString = _textOnPasteConverter(contentEditableRef.current.innerHTML);
      const parsed = _parse(tpHtmlString);
      const oldData = JSON.stringify(tpRef.current[phrasePojoKey.phraseAsArray]);
      const newData = JSON.stringify(parsed);
      const isDataUpdated = oldData !== newData;
      if (isDataUpdated || updateOnBlur) {
        tpRef.current[phrasePojoKey.phraseAsArray] = parsed;
        updatePhrase(parsed, isRangy, updateOnBlur);
      }
    },
    [updatePhrase]
  );

  const slotsDropdownGenerator = useCallback(() => {
    const usedSlots: string[] =
      tpRef.current?.[phrasePojoKey.mappedSlotsArray]?.map(
        (slotMap: any) => slotMap?.[phrasePojoKey.intentSlot]?.[phrasePojoKey.intentSlotId]
      ) ?? [];
    const slotOptions = slots.map(slot => {
      const slotId = slot[phrasePojoKey.slotId];
      const isActive = !usedSlots.some(usedSlot => String(usedSlot) === String(slotId));
      return { ...slot, active: isActive };
    });
    setSlotsArray(slotOptions);
  }, [slots]);

  const handleSelectedText = useCallback(() => {
    if (!contentEditableRef.current) return;
    const rangySelection: any = rangy.getSelection();
    selectedTextRef.current = {
      range: rangySelection.saveCharacterRanges(contentEditableRef.current),
      text: rangySelection.toString(),
    };
    const trainingPhraseRegex = tpRef.current?.[phrasePojoKey.phraseForRegex] ?? '';
    if (
      _validateSelectedText(selectedTextRef.current.text ?? '', isMonosyllabic, trainingPhraseRegex, openNotification)
    ) {
      const mousePosition = _getMousePosition();
      if (mousePosition) {
        setContextMenuStyle({ left: mousePosition.x, top: mousePosition.y + 5 });
      }
      slotsDropdownGenerator();
      setShowContextMenu(true);
    } else {
      setSlotsArray([]);
    }
  }, [isMonosyllabic, openNotification, slotsDropdownGenerator]);

  const handleSlotTooltip = useCallback(
    (target: HTMLElement) => {
      setSlotTooltipData({
        id: target.dataset.intentslotid,
        slotKey: target.dataset.position,
        slotValue: target.dataset.value,
      });
      const mousePosition = _getMousePosition();
      if (mousePosition) {
        const slot = slots.find(slotItem => String(slotItem.intentSlotId) === String(target.dataset.intentslotid));
      if (slot) {
        setTooltipText(slot.intentSlotName ?? '');
        setTooltipStyle({ left: mousePosition.x - 80, top: mousePosition.y - 60 });
        setShowTooltip(true);
      }
      }
    },
    [slots]
  );

  const handleMouseUp = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      const selection = window.getSelection();
      const target = event.target as HTMLElement;
      const rangySelection: any = rangy.getSelection();
      const range = _getFirstRange(rangySelection);
      if (
        selection &&
        target &&
        !isDisabled &&
        !selection.isCollapsed &&
        !target.classList.contains('slot-tooltip') &&
        range
      ) {
        const placeholderSpan = document.createElement('span');
        if ((range as any).canSurroundContents?.(placeholderSpan)) {
          handleSelectedText();
        }
      } else if (
        selection &&
        target &&
        selection.type === 'Caret' &&
        target.classList.contains('slot-tooltip')
      ) {
        handleSlotTooltip(target);
        _clearCursorSelection();
      }
    },
    [handleSelectedText, handleSlotTooltip, isDisabled]
  );

  const handleSlotClick = useCallback(
    (slot: any) => {
      setShowContextMenu(false);
      if (!slot.active) return;
      if (!contentEditableRef.current) return;
      const rangySelection: any = rangy.getSelection();
      rangySelection.restoreCharacterRanges(contentEditableRef.current, selectedTextRef.current.range);
      const range = _getFirstRange(rangySelection);
      if (!range || !selectedTextRef.current.text) return;
      const selectedSlots = { intentSlot: { ...slot } };
      const id = selectedSlots[phrasePojoKey.intentSlot][phrasePojoKey.intentSlotId];
      const spanData = {
        slotValue: selectedTextRef.current.text,
        slotKey: `${id}~slotkey`,
        intentSlotId: id,
      };
      const element = _buildHtmlSpanElement(selectedSlots, slots, spanData, phrasePojoKey);
      if ((range as any).canSurroundContents?.(element)) {
        range.surroundContents(element);
        _clearCursorSelection();
        updateTrainingPhraseView(false, true);
      } else {
        openNotification({
          message: 'Warning',
          description: "Unable to annotate the words if they're already annotated.",
          type: 'warning',
          duration: 5,
        });
        _clearCursorSelection();
      }
    },
    [openNotification, slots, updateTrainingPhraseView]
  );

  const deleteSlot = useCallback(() => {
    if (!slotTooltipData) return;
    const mappedSlotsArray = tpRef.current?.[phrasePojoKey.mappedSlotsArray];
    if (!mappedSlotsArray) return;
    for (let index = 0; index < mappedSlotsArray.length; index++) {
      const slotArray = mappedSlotsArray[index];
      const key = slotArray[phrasePojoKey.intentSlot][phrasePojoKey.intentSlotId];
      if (String(key) === String(slotTooltipData.id)) {
        let phraseText = tpRef.current[phrasePojoKey.phraseAsText];
        phraseText = phraseText.replace(`\${${slotTooltipData.slotKey}}`, slotArray[phrasePojoKey.slotValue]);
        tpRef.current[phrasePojoKey.phraseAsText] = phraseText;
        mappedSlotsArray.splice(index, 1);
        break;
      }
    }
    displayTrainingPhrases(true);
    setShowTooltip(false);
    setSlotTooltipData(null);
  }, [displayTrainingPhrases, slotTooltipData]);

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
        if (keyId === 0 && tpRef.current?.[phrasePojoKey.phraseAsText]?.trim() !== '' && showEnterIcon) {
          onPhraseAnnotatorSave?.(_cloneObject(tpRef.current, phrasePojoKey.phraseAsText));
        }
      }
    },
    [keyId, onPhraseAnnotatorSave, showEnterIcon]
  );

  const handleInput = useCallback(() => {
    _removeForEmptySpanBRTags({ value: contentEditableRef.current });
  }, []);

  useEffect(() => {
    tpRef.current = value;
    displayTrainingPhrases(false);
  }, [displayTrainingPhrases, slots, value]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        showContextMenu &&
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        setShowContextMenu(false);
      }
      if (showTooltip && tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    };
    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [showContextMenu, showTooltip]);

  return (
    <div className={classNames('phrase-editor', className)}>
      <div
        ref={contentEditableRef}
        className={classNames('editable-content', { disabled: isDisabled })}
        data-placeholder={placeholder}
        contentEditable={!isDisabled}
        spellCheck={false}
        style={{ minHeight }}
        onMouseUp={handleMouseUp}
        onKeyUp={() => updateTrainingPhraseView(true, false)}
        onBlur={() => updateTrainingPhraseView(true, true)}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
      />
      {showEnterIcon ? (
        <span className="icon-enter">
          <UniMaterialIcon iconName="near_me" size={24} colorClass="text-gray-500" />
        </span>
      ) : null}
      {showContextMenu ? (
        <div className="context-menu" style={{ top: contextMenuStyle.top, left: contextMenuStyle.left }} ref={contextMenuRef}>
          <ul>
            {slotsArray.map((slot, index) => (
              <li
                key={`${slot.intentSlotId}-${index}`}
                className={classNames({ disable: !slot.active })}
                onClick={() => handleSlotClick(slot)}
              >
                {slot.intentSlotName}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {showTooltip ? (
        <div className="context-menu" style={{ top: tooltipStyle.top, left: tooltipStyle.left }} ref={tooltipRef}>
          <div className="tooltip-wrapper">
            <div className="tooltip-content" role="button" onClick={deleteSlot}>
              <div className="tooltip-text">{tooltipText}</div>
              <UniMaterialIcon iconName="delete" size={20} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
