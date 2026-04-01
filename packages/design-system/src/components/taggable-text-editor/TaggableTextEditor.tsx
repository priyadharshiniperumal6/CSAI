import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { debounce } from 'lodash-es';

import {
  arrayofStringAndObjectToStringFormats,
  getCurrentCaretElement,
  getCurrentValue,
  saveCurrentSelection,
  restoreSelection,
} from './ContentEditable.util';
import { blockAtRateInArgument, blockAtRateInCollectionElementAt } from './ContentEditable.event';
import { arrayOfStringsAndObjectsToHtmlString } from './TaggableTextEditor.util';

import './TaggableTextEditor.scss';

export type TaggableTextEditorProps = {
  value: any[];
  resources: any[];
  placeholder?: string;
  minHeight?: string;
  isSingleValueOnly?: boolean;
  maxCharLimit?: number;
  filterResources?: any[];
  disabled?: boolean;
  className?: string;
  onCurrentValue?: (value: ReturnType<typeof getCurrentValue>) => void;
};

export const TaggableTextEditor = ({
  value,
  resources,
  placeholder = '',
  minHeight = '40px',
  isSingleValueOnly = false,
  maxCharLimit = 0,
  filterResources = resources,
  disabled = false,
  className,
  onCurrentValue,
}: TaggableTextEditorProps) => {
  const editableContentRef = useRef<HTMLDivElement | null>(null);
  const contextMenuRef = useRef<HTMLUListElement | null>(null);
  const [currentStringValue, setCurrentStringValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [dropdownOption, setDropdownOption] = useState<any[]>(filterResources);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [contextMenuPosition, setContextMenuPosition] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 0,
    width: 0,
  });
  const selectionRangeRef = useRef<Range | null>(null);
  const incrementRef = useRef(0);

  const lastSyncedValueRef = useRef<string>('');

  const emitData = useCallback(() => {
    const content = editableContentRef.current?.innerHTML ?? '';
    const currentValue = getCurrentValue(content);
    setCurrentStringValue(currentValue.asStringwithObjectAsAtSign);
    onCurrentValue?.(currentValue);
  }, [onCurrentValue]);

  const writeHTMLFromValue = useCallback(
    (arrayValue: any[]) => {
      if (!editableContentRef.current) return;
      const htmlString = arrayOfStringsAndObjectsToHtmlString(arrayValue);
      editableContentRef.current.innerHTML = htmlString;
    },
    []
  );

  const displayValueGenerator = useCallback(
    (newValue: any[]) => {
      if (Array.isArray(newValue)) {
        if (newValue.length > 0 && newValue[0]?.id) {
          // no-op: preserving original flow without unused state
        }
        writeHTMLFromValue(newValue);
        const stringFormats = arrayofStringAndObjectToStringFormats(newValue);
        setCurrentStringValue(stringFormats.toStringAsAtFormat);
      }
    },
    [writeHTMLFromValue]
  );

  const validateContentLength = useCallback(() => {
    if (maxCharLimit !== 0 && currentStringValue.length > maxCharLimit) {
      setErrorMessage(`Maximum limit of ${maxCharLimit} characters is exceeded.`);
      editableContentRef.current?.classList.add('error');
    } else {
      setErrorMessage('');
      editableContentRef.current?.classList.remove('error');
    }
  }, [currentStringValue.length, maxCharLimit]);

  const hideContextMenu = useCallback(() => {
    setShowContextMenu(false);
    setSearchTerm('');
    setActiveIndex(0);
  }, []);

  const filteredResources = useMemo(() => {
    if (!searchTerm) {
      return dropdownOption;
    }
    return dropdownOption.filter(resource => resource.label.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [dropdownOption, searchTerm]);

  useEffect(() => {
    const serialized = JSON.stringify(value ?? []);
    if (serialized === lastSyncedValueRef.current) {
      return;
    }
    lastSyncedValueRef.current = serialized;
    displayValueGenerator(value || []);
  }, [displayValueGenerator, value]);

  useEffect(() => {
    validateContentLength();
  }, [validateContentLength, currentStringValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
        hideContextMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [hideContextMenu]);

  const openContextMenu = useCallback(() => {
    if (!editableContentRef.current) return;
    const rect = editableContentRef.current.getBoundingClientRect();
    setContextMenuPosition({
      top: rect.bottom,
      left: rect.left,
      width: rect.width,
    });
    setShowContextMenu(true);
    setDropdownOption(filterResources);
    setActiveIndex(0);
  }, [filterResources]);

  const removeTag = useCallback(
    (tag: HTMLElement) => {
      tag.remove();
      emitData();
      // no-op: preserving original flow without unused state
    },
    [emitData]
  );

  const createTagNode = useCallback(
    (resource: any, caretElement: HTMLElement | null) => {
      const element = caretElement?.nodeName === 'P' ? document.createElement('b') : document.createElement('span');
      element.contentEditable = 'false';
      element.classList.add('tag');
      element.setAttribute('data-uuid', resource.id);
      element.setAttribute('data-type', resource.type);
      element.setAttribute('data-label', resource.label);
      element.setAttribute('data-value', resource.value || '');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'tag-close-button';
      button.textContent = 'x';
      button.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        removeTag(element);
      });
      const text = document.createElement('span');
      text.innerText = `@${resource.label}`;
      element.appendChild(button);
      element.appendChild(text);
      return element;
    },
    [removeTag]
  );

  const selectOption = useCallback(
    (resource: any) => {
      const editableContent = editableContentRef.current;
      if (!editableContent) return;
      hideContextMenu();
      restoreSelection(selectionRangeRef.current, incrementRef.current);
      const caretElement = getCurrentCaretElement();
      const span = createTagNode(resource, caretElement);
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(span);
        range.setStartAfter(span);
        range.setEndAfter(span);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        editableContent.appendChild(span);
      }
      incrementRef.current = 0;
      // no-op: preserving original flow without unused state
      emitData();
    },
    [createTagNode, emitData, hideContextMenu]
  );

  const handleContextMenuNavigation = useCallback(
    (event: KeyboardEvent) => {
      if (!showContextMenu) return;
      event.preventDefault();
      if (event.key === 'ArrowDown') {
        setActiveIndex(idx => (idx + 1) % filteredResources.length);
      } else if (event.key === 'ArrowUp') {
        setActiveIndex(idx => (idx - 1 + filteredResources.length) % filteredResources.length);
      }
    },
    [filteredResources.length, showContextMenu]
  );

  const filterOptions = useMemo(
    () =>
      debounce((term: string) => {
        if (!term) {
          setDropdownOption(filterResources);
          return;
        }
        const options = filterResources.filter(resource =>
          resource.label.toLowerCase().includes(term.toLowerCase())
        );
        setDropdownOption(options);
      }, 200),
    [filterResources]
  );

  const handleInput = useCallback(
    (event: React.FormEvent<HTMLDivElement>) => {
      const target = event.currentTarget;
      if (target.innerHTML === '<br>') {
        target.innerHTML = '';
      }
      emitData();
      if (target.textContent?.length === 0) {
        hideContextMenu();
      }
    },
    [emitData, hideContextMenu]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Backspace' || event.key === 'Delete') {
        return;
      }

      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        if (showContextMenu && ['ArrowUp', 'ArrowDown'].includes(event.key)) {
          handleContextMenuNavigation(event.nativeEvent as KeyboardEvent);
        }
        return;
      }

      if (showContextMenu && event.key === 'Enter') {
        event.preventDefault();
        const current = filteredResources[activeIndex];
        if (current) {
          selectOption(current);
        }
        return;
      }

      if (isSingleValueOnly && event.key === 'Enter') {
        event.preventDefault();
        return;
      }

      if (event.key === '@') {
        setSearchTerm('');
        openContextMenu();
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const atIndex = range.startOffset;
          incrementRef.current = 0;
          selectionRangeRef.current = saveCurrentSelection(atIndex);
        }
        return;
      }

      if (blockAtRateInArgument(event.nativeEvent as KeyboardEvent)) {
        event.preventDefault();
        return;
      }

      if (!isSingleValueOnly && blockAtRateInCollectionElementAt(event.nativeEvent as KeyboardEvent)) {
        event.preventDefault();
      }
    },
    [
      activeIndex,
      filteredResources,
      handleContextMenuNavigation,
      isSingleValueOnly,
      openContextMenu,
      selectOption,
      showContextMenu,
    ]
  );

  const handlePaste = useCallback((event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const text = event.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  }, []);

  const handleContextMenuClick = useCallback(
    (option: any) => {
      selectOption(option);
    },
    [selectOption]
  );

  useEffect(() => {
    filterOptions(searchTerm);
  }, [filterOptions, searchTerm]);

  return (
    <div className={classNames('content-editable-wrapper', className)}>
      <div
        className={classNames('content-editable', {
          disabled,
          error: !!errorMessage,
          'single-line': isSingleValueOnly,
          'mulite-line': !isSingleValueOnly,
        })}
        style={{ minHeight }}
        contentEditable={!disabled}
        data-placeholder={placeholder}
        role="textbox"
        tabIndex={0}
        aria-multiline={!isSingleValueOnly}
        ref={editableContentRef}
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onClick={() => hideContextMenu()}
      />
      {showContextMenu && filteredResources.length > 0 ? (
        <ul
          className="context-menu"
          ref={contextMenuRef}
          style={{
            top: contextMenuPosition.top,
            left: contextMenuPosition.left,
            width: contextMenuPosition.width,
          }}
        >
          {filteredResources.map((option, index) => (
            <li
              key={option.id ?? option.label}
              className={classNames('autocomplete-item', { highlighted: index === activeIndex })}
              role="button"
              tabIndex={0}
              onMouseDown={event => {
                event.preventDefault();
                handleContextMenuClick(option);
              }}
              onKeyDown={event => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  handleContextMenuClick(option);
                }
              }}
            >
              <div
                className="avatar"
                style={{
                  backgroundColor:
                    option.type === 'SLOT' ? '#E9F7ED' : option.type === 'FUNCTION' ? '#FFE6EF' : '#F0F8FF',
                }}
              >
                <span
                  className="avatar-letter"
                  style={{
                    color: option.type === 'SLOT' ? '#096B40' : option.type === 'FUNCTION' ? '#E9027C' : '#2263D5',
                  }}
                >
                  {option.type?.charAt(0)}
                </span>
              </div>
              <div className="description">
                <h4 className="sub-heading">{option.label}</h4>
                <p>{option.description}</p>
              </div>
              <div className="variable-type">
                <span>{option.outputs?.[0]?.type}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
      {errorMessage ? <div className="error-message">{errorMessage}</div> : null}
    </div>
  );
};
