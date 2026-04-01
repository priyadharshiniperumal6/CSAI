interface SlotMapper {
  text?: string;
  position?: string;
  intentslotid?: string;
  value?: string;
}

export const _getMousePosition = () => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect(); // Get bounding box of selection
  const x: number = rect.left + window.scrollX; // Adjust for scroll
  const y: number = rect.bottom + window.scrollY; // Position below the selection
  return { x, y };
};

export const _getFirstRange = (s: Selection) => {
  return s.rangeCount ? s.getRangeAt(0) : null;
};

export const _checkEmpty = (t: unknown) => {
  return t !== undefined && t !== '';
};

export const _checkForFirstSpace = (t: string) => t.search(/^\S.*$/) === -1;
export const _checkForLastSpace = (t: string) => t.charAt(t.length - 1) === ' ' || t.charAt(t.length - 1) === '';

export const _textOnPasteConverter = (txt: string) => {
  let f = txt;
  const c = ['\u2013', '\u2019', '\n', '\t'],
    d = ['-', "'", ' ', ' '];
  for (let l, m = 0; m < c.length; m++) {
    l = new RegExp(c[m], 'g');
    f = f.replace(l, d[m]);
  }
  return f;
};

export const _clearCursorSelection = () => {
  const selection = window.getSelection();
  if (selection && selection.empty) return selection.empty();
  if (selection && selection.removeAllRanges) return selection.removeAllRanges();
};

export const _replaceCharforSelection = (a: string) => {
  return a.replace(/&nbsp;/g, ' ').replace(/\u00a0/g, ' ');
};

export const _validateSelectedText = (
  text: string,
  isMonosyllabic: boolean,
  traningPharse: string,
  openNotification: (payload: any) => void
) => {
  if (text !== undefined && text !== '') {
    let isCurrectWords;
    if (!isMonosyllabic) {
      const phrase = _replaceCharforSelection(traningPharse),
        selectedText = _replaceCharforSelection(text);
      const regex = new RegExp('(^|[ \n\r\t.,\'"+!?-]+)(' + selectedText + ')([ \n\r\t.,\'"+!?-]+|$)', 'i');
      isCurrectWords = phrase.search(regex);
    } else {
      isCurrectWords = 0;
    }
    if (isCurrectWords > -1) {
      return true;
    } else {
      if (_checkForFirstSpace(text) || _checkForLastSpace(text)) {
        openNotification({
          message: `Warning`,
          description: 'Please select entire word or sequence of words.',
          type: 'warning',
          duration: 5,
        });
      } else {
        openNotification({
          message: `Warning`,
          description: 'Please select entire word or sequence of words.',
          type: 'warning',
          duration: 5,
        });
      }
      _clearCursorSelection();
      return false;
    }
  } else {
    openNotification({
      message: `Warning`,
      description: 'Please select entire word or sequence of words.',
      type: 'warning',
      duration: 5,
    });
    _clearCursorSelection();
    return false;
  }
};

export const _displayTrainingPhraseGenerator = (tp: any, intentSlots: any[], key: any) => {
  const clonePhrase = tp;
  if (clonePhrase[key.mappedSlotsArray] !== null && clonePhrase[key.mappedSlotsArray].length > 0) {
    const posPhraseValues = _slotMapperToPhrase(clonePhrase, intentSlots, key);
    clonePhrase[key.phraseAsArray] = _parse(posPhraseValues);
    clonePhrase[key.phraseStatus] = false;
    clonePhrase[key.phraseForDisplay] = posPhraseValues;
    clonePhrase[key.phraseForRegex] = _glueBackToHTMLPhraseGenerator(clonePhrase[key.phraseAsArray], intentSlots, key)[
      key.phraseForRegex
    ];
  } else {
    clonePhrase[key.phraseAsArray] = clonePhrase[key.phraseAsText] ? _parse(clonePhrase[key.phraseAsText]) : '';
    clonePhrase[key.phraseStatus] = false;
    clonePhrase[key.phraseForDisplay] = clonePhrase[key.phraseAsText]
      ? _replaceCharToHtmlEscape(clonePhrase[key.phraseAsText])
      : '';
    clonePhrase[key.phraseForRegex] = clonePhrase[key.phraseAsText] ? clonePhrase[key.phraseAsText] : '';
    clonePhrase[key.mappedSlotsArray] = [];
  }
  return clonePhrase;
};

export const _slotMapperToPhrase = (clonePhrase: any, intentSlots: any[], key: any) => {
  const rgxDollarCurly = /\${([^}]+)}/g;
  let posPhraseValues = '';
  let posPhrase;
  let curMatch;
  const positionArray: string[] = [];
  posPhrase = _replaceCharToHtmlEscape(clonePhrase[key.phraseAsText]);
  const TXTposPhrase = posPhrase;
  for (let k = 0; k < clonePhrase[key.mappedSlotsArray].length; k++) {
    positionArray.push(clonePhrase[key.mappedSlotsArray][k][key.slotKey]);
    while ((curMatch = rgxDollarCurly.exec(TXTposPhrase)) != null) {
      if (clonePhrase[key.mappedSlotsArray][k].position === curMatch[1]) {
        const slotId = clonePhrase[key.mappedSlotsArray][k][key.intentSlot][key.intentSlotId];
        const spanData = {
          slotValue: clonePhrase[key.mappedSlotsArray][k][key.slotValue],
          slotKey: clonePhrase[key.mappedSlotsArray][k][key.slotKey],
          intentSlotId: slotId,
        };
        const spanBuild = _buildHtmlSpan(clonePhrase[key.mappedSlotsArray][k], intentSlots, spanData, key);
        posPhrase = posPhrase.replace(curMatch[1], spanBuild);
        // posPhraseValues = posPhrase.replace(/%/g, '');
        posPhraseValues = posPhrase.replace(/[{}]/g, '');
        posPhraseValues = posPhraseValues.replace(/\$/g, '');
      }
    }
  }
  return posPhraseValues;
};

export const _replaceHtmlEscapeToChar = (x: string) => {
  const HTML_ESCAPE_TO_CHAR_RE = /(&nbsp;|&quot;|&amp;|&lt;|&gt;)/g;
  const htmlEscapeToChar: Record<string, string> = {
    '&nbsp;': ' ',
    '&quot;': '"',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '\u00a0': ' ',
  };
  return x.replace(HTML_ESCAPE_TO_CHAR_RE, c => htmlEscapeToChar[c] ?? c);
};

export const _replaceCharToHtmlEscape = (a: string) => {
  const CHAR_TO_HTML_ESCAPE_RE = /( |"|&|<|>)/g;
  const charToHtmlEscape: Record<string, string> = {
    '\u00a0': '&nbsp;',
    ' ': '&nbsp;',
    '"': '&quot;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
  };
  return a.replace(CHAR_TO_HTML_ESCAPE_RE, c => charToHtmlEscape[c] ?? c);
};

export const _parse = (xy: string) => {
  const f = /<span[^>]*>(?:(?!<span)(?!<\/span).)*<\/span>/gi;
  const l = /(<span[^>]*>(?:(?!<span)(?!<\/span).)*<\/span>)/gi;
  const m = /<span[^>]*parser-defined[^>]*>((?:(?!<span)(?!<\/span).)*)<\/span>/gi;
  let t = false;
  let a = xy;
  a = a.replace(/<\/?div>/gi, '');
  a = a.replace(/<br\/?>/gi, '');
  for (a = a.replace(/<br\/?>/gi, ''); m.test(a); ) a = a.replace(m, '$1');
  const dt = a.split(l);
  const darray = dt.map((x: string) => {
    if (!f.test(x)) {
      if (t) {
        x = ' ' + x;
        t = false;
      }
      return {
        text: _replaceHtmlEscapeToChar(x),
      };
    }
    const n: SlotMapper = {};
    const e = document.createElement('div');
    e.innerHTML = x;
    const node = e.firstElementChild;
    if (node) {
      n.text = _replaceHtmlEscapeToChar(node.textContent || '');
      n.position = node.getAttribute('data-position') ?? undefined;
      n.intentslotid = node.getAttribute('data-intentslotid') ?? undefined;
      n.value = n.text;
    }
    if (t) {
      n.text = ' ' + n.text;
      t = false;
    }
    if (n.text && n.value && n.text.charAt(n.text.length - 1) === ' ') {
      n.text = n.text.slice(0, -1);
      n.value = n.value.slice(0, -1);
      t = true;
    }
    return n;
  });

  const darrayfilter = darray.filter((x: { text?: string }) => (x.text ? x.text.length > 0 : false));
  if (t) {
    darrayfilter.push({ text: ' ' });
    t = false;
  }
  return {
    data: darrayfilter,
  };
};

export const _glueBackToHTMLPhraseGenerator = (a: { data: any[] }, slots: any[], key: any) => {
  const tpObj: { [key: string]: any } = {
    [key.phraseForDisplay]: '',
    [key.phraseAsText]: '',
    [key.mappedSlotsArray]: [] as any[],
    [key.phraseForRegex]: '',
  };
  for (let x = 0; x < a.data.length; x++) {
    const p = a.data;
    if (!p[x].intentslotid) {
      tpObj[key.phraseForDisplay] = tpObj[key.phraseForDisplay] + _replaceCharToHtmlEscape(p[x].text);
      tpObj[key.phraseAsText] = tpObj[key.phraseAsText] + p[x].text;
      tpObj[key.phraseForRegex] = tpObj[key.phraseForRegex] + p[x].text;
    } else {
      // p[x]['intentSlot'] = { intentSlotId: p[x].intentslotid };
      const spanData = {
        slotValue: p[x].value,
        slotKey: p[x].position,
        intentSlotId: p[x].intentslotid,
      };
      tpObj[key.phraseForDisplay] = tpObj[key.phraseForDisplay] + _buildHtmlSpan(p[x], slots, spanData, key);
      tpObj[key.phraseForRegex] = tpObj[key.phraseForRegex] + p[x].value;
      tpObj[key.phraseAsText] = tpObj[key.phraseAsText] + _buildTextPosition(p[x]);
      tpObj[key.mappedSlotsArray].push(_buildIntentSlotMap(p[x], slots, key));
    }
  }
  return tpObj;
};

export const _buildIntentSlotMap = (slotData: any, slots: any[], key: any) => {
  return {
    [key.slotValue]: slotData.value,
    [key.slotKey]: slotData.position,
    [key.intentSlot]: getSlotsById(slots, slotData.intentslotid, key),
    [key.intentSlotId]: Number(slotData.intentslotid),
  };
};

export const getSlotsById = (slots: any[], slotId: string, key: any) => {
  for (let x = 0; x < slots.length; x++) {
    const d = slots[x][key.slotId];
    if (String(d) === String(slotId)) {
      return slots[x];
    }
  }
};

export const _buildHtmlSpan = (tpIntent: any, slotsList: any[], spanData: any, key: any) => {
  return (
    `<span class="slot-tooltip ` +
    _slotsColorMapper(tpIntent, slotsList, spanData, key) +
    `"  data-position=` +
    spanData['slotKey'] +
    ` data-intentslotid=` +
    spanData['intentSlotId'] +
    ` data-value=` +
    spanData['slotValue'] +
    `>` +
    spanData['slotValue'] +
    `</span>`
  );
};

export const _slotsColorMapper = (tpIntent: any, intentSlots: any[], spanData: any, key: any) => {
  for (let slotCount = 0; slotCount < intentSlots.length; slotCount++) {
    if (String(spanData['intentSlotId']) === String(intentSlots[slotCount][key.slotId])) {
      return 'slot-ci-' + slotCount;
    }
  }
};

export const _buildTextPosition = (intent: any) => {
  return '${' + intent.position + '}';
};

export const _cloneObject = (o: any, key: any) => {
  const obj = JSON.parse(JSON.stringify(o));
  obj[key] = obj[key].trim();
  return obj;
};

export const _buildHtmlSpanElement = (tpIntent: any, slotsList: any[], spanData: any, key: any) => {
  const el = document.createElement('span');
  el.className = _slotsColorMapper(tpIntent, slotsList, spanData, key) || '';
  el.setAttribute('data-position', spanData['slotKey']);
  el.setAttribute('data-intentslotid', spanData['intentSlotId']);
  el.setAttribute('data-value', spanData['slotValue']);
  el.innerHTML = spanData['slotValue'];
  return el;
};

export const _removeForEmptySpanBRTags = (editableContent: { value?: HTMLElement | null }): void => {
  const root = editableContent.value ?? null;
  if (root && root.innerHTML === '<br>') {
    root.innerHTML = '';
  }
  if (root) {
    const spans = root.querySelectorAll('span');
    spans.forEach((span: HTMLSpanElement) => {
      if (!span.textContent?.trim()) {
        span.remove();
      }
    });
  }
};
