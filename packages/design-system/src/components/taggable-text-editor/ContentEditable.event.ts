import { replaceHtmlEscapeToChar } from './ContentEditable.util';

export const blockDeleteZeroWidthSpaceUnicode = (event: KeyboardEvent) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;
  const range = selection.getRangeAt(0);
  const node = range.startContainer;
  const charBeforeBackspace = node.nodeValue;
  if (
    event.key === 'Backspace' &&
    node.parentElement?.nodeName === 'P' &&
    charBeforeBackspace === '\u200D'
  ) {
    event.preventDefault();
  }

  const charAfterDelete = node.parentElement?.innerHTML.charAt(range.startOffset);
  if (event.key === 'Delete' && node.parentElement?.nodeName === 'P' && charAfterDelete === '\u200D') {
    event.preventDefault();
  }
};

export const blockAtRateInArgument = (event: KeyboardEvent) => {
  const target = event.target as HTMLElement | null;
  if (!target) return false;
  const arg = replaceHtmlEscapeToChar(target.innerText).replace(/,/g, '');
  if (target.nodeName === 'P' && event.key === '@' && arg.length > 0) {
    event.preventDefault();
    return true;
  }
  return false;
};

export const blockAtRateInCollectionElementAt = (event: KeyboardEvent) => {
  const target = event.target as HTMLElement | null;
  if (target && target.className.includes('elementAt') && event.key === '@') {
    event.preventDefault();
    return true;
  }
  return false;
};

export const functionArgumentClickHandler = (event: MouseEvent) => {
  const element = event.target as HTMLElement | null;
  if (!element) return;

  const zwj = '\u200D';
  const textContent = element.textContent;
  if (!textContent || textContent.length <= 1) return;
  const zwjIndex = textContent.indexOf(zwj);
  if (zwjIndex === -1) return;

  const range = document.createRange();
  const selection = window.getSelection();

  let node = element.firstChild;
  let offset = zwjIndex + 1;

  while (node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent && offset <= node.textContent.length) {
        break;
      }
      if (node.textContent) {
        offset -= node.textContent.length;
      }
    }
    node = node.nextSibling;
  }

  if (node && selection) {
    range.setStart(node, offset);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};
