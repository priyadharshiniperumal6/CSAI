export const RESOURCE_TYPE_VARIABLE = 'VARIABLE';
export const RESOURCE_TYPE_FUNCTION = 'FUNCTION';
export const RESOURCE_TYPE_FLOW = 'FLOW';
export const RESOURCE_TYPE_SLOT = 'SLOT';
export const RESOURCE_TYPE_INTEGRATION_POINT = 'INTEGRATION_POINT';

export const OUTPUT_TYPE_TEXT = 'TEXT';
export const OUTPUT_TYPE_DYNAMIC = 'DYNAMIC';

export const zeroWidthChars = ['\u200B', '\u200C', '\u200D', '\uFEFF'];

export const removeZeroWidthSpaceUnicode = (value: string) => {
  return value.replace(/[\u200B-\u200D\uFEFF]/g, '');
};

export const replaceHtmlEscapeToChar = (value: string) => {
  const htmlEscapeToChar: Record<string, string> = {
    '&nbsp;': ' ',
    '&quot;': '"',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&zwj;': '',
    '\u00a0': ' ',
  };
  return value.replace(/(&nbsp;|&quot;|&amp;|&lt;|&gt;|&zwj;)/g, match => htmlEscapeToChar[match]).replace(
    /[\u200B-\u200D\uFEFF]/g,
    ''
  );
};

export const replaceCharToHtmlEscape = (value: string) => {
  const charToHtmlEscape: Record<string, string> = {
    '\u00a0': '&nbsp;',
    ' ': '&nbsp;',
    '"': '&quot;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
  };
  return value.replace(/( |"|&|<|>)/g, match => charToHtmlEscape[match]);
};

export const filterResourceByTypeMatch = (resources: any[], filterType?: string, ignoreFunctionType?: boolean) => {
  let filtered =
    !filterType || filterType.length === 0
      ? resources
      : resources.filter(resource => !!resource?.outputs[0]?.type.match(`^${filterType}`));
  if (ignoreFunctionType) {
    filtered = filtered.filter(
      resource =>
        resource.type !== RESOURCE_TYPE_FUNCTION &&
        resource.type !== RESOURCE_TYPE_FLOW &&
        resource.type !== RESOURCE_TYPE_INTEGRATION_POINT
    );
  }
  return filtered;
};

export const filterResourceById = (resources: any[], id: string) => {
  return resources.find(resource => id === resource.id);
};

export const getCurrentCaretElement = (): HTMLElement | null => {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const node = range.startContainer;
    return node.nodeType === Node.ELEMENT_NODE ? (node as HTMLElement) : node.parentElement;
  }
  return null;
};

export const currentCharCount = (editableContent: { value: HTMLElement | null }) => {
  return editableContent.value?.textContent?.length || 0;
};

export const currentInnerHtml = (editableContent: { value: HTMLElement | null }) => {
  return editableContent.value?.innerHTML || '';
};

export const checkForEmptySpan = (editableContent: { value: HTMLElement | null }) => {
  if (editableContent.value) {
    const spans = editableContent.value.querySelectorAll('span.tag');
    spans.forEach(span => {
      if (!span.textContent?.trim()) {
        span.remove();
      }
    });
  }
};

export const restoreSelection = (selectionRange: Range | null, increment: number) => {
  const selection = window.getSelection();
  if (selection && selectionRange) {
    selection.removeAllRanges();
    const newRange = document.createRange();
    const startCaretIndex = increment === 0 ? -1 : 0;
    newRange.setStart(selectionRange.startContainer, selectionRange.startOffset + startCaretIndex);
    try {
      newRange.setEnd(selectionRange.endContainer, selectionRange.endOffset + increment);
    } catch {
      newRange.setEnd(selectionRange.endContainer, selectionRange.endOffset);
    }
    selection.addRange(newRange);
  }
};

export const saveCurrentSelection = (atIndex: number) => {
  const selection = window.getSelection();
  const range = document.createRange();
  if (selection && selection.rangeCount > 0) {
    const currentRange = selection.getRangeAt(0);
    const startNode = currentRange.startContainer;
    const endNode = currentRange.endContainer;
    range.setStart(startNode, atIndex);
    range.setEnd(endNode, currentRange.endOffset);
    return range;
  }
  return null;
};

export const setCaretPosition = (editableElement: HTMLElement, position: number) => {
  const range = document.createRange();
  const selection = window.getSelection();

  range.setStart(editableElement.childNodes[0], position);
  range.collapse(true);

  if (selection) {
    selection.removeAllRanges();
    selection.addRange(range);
  }
  editableElement.focus();
};

export const getCaretCoordinates = (editableContent: { value: HTMLElement | null }) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) {
    return { x: 0, y: 0 };
  }

  const range = selection.getRangeAt(0).cloneRange();
  const rect = range.getBoundingClientRect();
  const modalRect = editableContent.value?.getBoundingClientRect();

  if (!modalRect) {
    return { x: 0, y: 0 };
  }

  return {
    x: rect.left || modalRect.left + 15,
    y: rect.bottom || modalRect.top + 20,
  };
};

const resourceData = (element: HTMLElement) => {
  const args: any[] = [];
  const pTags = element.getElementsByClassName('function-resource');
  if (pTags.length > 0) {
    for (let index = 0; index < pTags.length; index += 1) {
      const child = pTags[index].children[0];

      if (child && child.nodeName === 'B' && pTags[index].classList.contains(RESOURCE_TYPE_FUNCTION)) {
        args.push({
          uuid: child.getAttribute('data-uuid') ?? undefined,
          id: child.getAttribute('data-uuid') ?? undefined,
          text: replaceHtmlEscapeToChar(child.textContent || ''),
          type: child.getAttribute('data-type') ?? undefined,
          label: child.getAttribute('data-label') ?? undefined,
          output_type: child.getAttribute('data-outputtype') ?? undefined,
        });
      } else if (pTags[index].classList.contains(OUTPUT_TYPE_DYNAMIC) && index >= 1) {
        args[args.length - 1] = {
          ...args[args.length - 1],
          input_array: replaceHtmlEscapeToChar(pTags[index].textContent || '').replace(/,/g, ''),
        };
      } else {
        args.push(replaceHtmlEscapeToChar(pTags[index].textContent || '').replace(/,/g, ''));
      }
    }
  }
  return args;
};

const parseToTaggedSegments = (value: string) => {
  const spanRegex = /<span[^>]*>(?:(?!<span)(?!<\/span).)*<\/span>/gi;
  const splitRegex = /(<span[^>]*>(?:(?!<span)(?!<\/span).)*<\/span>)/gi;
  const text = value.replace(/<div>/gi, '\n').replace(/<\/div>/gi, '').replace(/<br\/?>/gi, '');

  const chunks = text.split(splitRegex);
  const results = chunks.map(chunk => {
    if (!spanRegex.test(chunk)) {
      return { text: replaceHtmlEscapeToChar(chunk) };
    }
    const wrapper = document.createElement('div');
    wrapper.innerHTML = chunk;
    const node = wrapper.firstElementChild;

    if (!node) return { text: '' };
    const data: any = {};
    data.uuid = node.getAttribute('data-uuid') ?? undefined;
    data.text = replaceHtmlEscapeToChar(node.textContent || '');
    data.type = node.getAttribute('data-type') ?? undefined;
    data.label = node.getAttribute('data-label') ?? undefined;
    data.output_type = node.getAttribute('data-outputtype') ?? undefined;
    data.input_array = resourceData(wrapper);
    const inputs = node.getAttribute('data-inputs');
    data.inputs = inputs ? JSON.parse(inputs) : undefined;
    return data;
  });

  return results.filter(item => (item.text ? item.text.length > 0 : false));
};

export const arrayofStringAndObject = (array: any[]) => {
  return array
    .map(item => {
      if (item.uuid) {
        return {
          id: item.uuid,
          ...item,
        };
      }
      return item.text.split(/(\s+)/).filter(Boolean);
    })
    .flat()
    .filter(Boolean);
};

export const stringFormatArgsGen = (item: any) => {
  if (item.id.includes('_elementAt') && item.type === RESOURCE_TYPE_FUNCTION) {
    const label = typeof item.input_array[0] === 'string' ? item.input_array[0] : item.input_array[0].text;
    return `.#${label}`;
  }
  if (item.output_type === OUTPUT_TYPE_DYNAMIC && item.inputs.length === 0) {
    return item.input_array[0].startsWith('.') ? `.${item.input_array[0].slice(1)}` : `.${item.input_array[0]}`;
  }
  return '';
};

export const atFormatArgsGen = (item: any) => {
  if (item.id.includes('_elementAt') && item.type === RESOURCE_TYPE_FUNCTION) {
    return `(${typeof item.input_array[0] === 'object' ? item.input_array[0].text : item.input_array[0]})`;
  }
  if (item.output_type === OUTPUT_TYPE_DYNAMIC && item.inputs.length === 0) {
    return item.input_array[0].startsWith('.') ? `.${item.input_array[0].slice(1)}` : `.${item.input_array[0]}`;
  }
  if (item.type === RESOURCE_TYPE_FUNCTION || (item.output_type === OUTPUT_TYPE_DYNAMIC && item.inputs.length > 0)) {
    const labels = item.input_array.map((input: any) => (typeof input === 'object' ? input.text : input)).join(',');
    return `(${labels})`;
  }
  return '';
};

export const stringFormatArgsGentype = (item: any) => {
  return item.id.includes('_elementAt') ? RESOURCE_TYPE_VARIABLE : item.type;
};

export const arrayofStringAndObjectToStringFormats = (array: any[]) => {
  const toStringFormat: any[] = [];
  const toStringAsAtFormat: any[] = [];

  array.forEach(item => {
    if (typeof item === 'string') {
      toStringFormat.push(item);
      toStringAsAtFormat.push(item);
    } else if (typeof item === 'object' && item.id && item.type) {
      let id = item.id.includes('_elementAt') ? item.id.split('_')[0] : item.id;
      id = id.includes(':') ? id.split(':')[0] : id;
      const fieldPath = item.id.includes(':') ? `.${item.id.split(':')[1]}` : stringFormatArgsGen(item);
      toStringFormat.push(`{${id}~${stringFormatArgsGentype(item)}${fieldPath}}`);
      const label = atFormatArgsGen(item);
      toStringAsAtFormat.push(`@${item.label}${label}`);
    }
  });

  return {
    toStringFormat: toStringFormat.join(''),
    toStringAsAtFormat: toStringAsAtFormat.join(''),
  };
};

export const getCurrentValue = (text: string) => {
  const parsed = parseToTaggedSegments(text);
  const asArrayOfStringAndObject = arrayofStringAndObject(parsed);
  const asStringWithObjectAsString = arrayofStringAndObjectToStringFormats(asArrayOfStringAndObject);

  return {
    currentArrayValue: parsed,
    asArrayOfStringAndObject,
    asStringWithObjectAsString: asStringWithObjectAsString.toStringFormat,
    asStringwithObjectAsAtSign: asStringWithObjectAsString.toStringAsAtFormat,
  };
};
