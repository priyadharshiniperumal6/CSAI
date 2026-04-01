export const VARIABLE_TYPE_COLLECTION = 'COLLECTION';
export const VARIABLE_TYPE_DYNAMIC = 'DYNAMIC';
export const VARIABLE_TYPE_FUNCTION = 'FUNCTION';

export const paragraphNodeWithEditing = (variable: any) => {
  if (variable.variable_type === VARIABLE_TYPE_COLLECTION && variable.elementType) {
    return '<p contenteditable="true" spellcheck=false class="complex-variables collection-elementAt">&zwj;</p>';
  }
  if (variable.variable_type === VARIABLE_TYPE_DYNAMIC) {
    return '<p contenteditable="true" spellcheck=false class="complex-variables dynamic">&zwj;</p>';
  }
  return '';
};

export const spanTagAsHTML = (variable: any) => {
  const span = document.createElement('span');
  span.contentEditable = 'false';
  span.setAttribute('data-uuid', variable.id);
  span.setAttribute('data-type', variable.type);
  span.setAttribute('data-value', variable.value);
  span.setAttribute('data-label', variable.label);
  span.setAttribute('data-variable_type', variable.variable_type);
  span.classList.add('tag');
  return span;
};

export const regenerateParagraphTag = (variable: any) => {
  if (variable.variable_type === VARIABLE_TYPE_COLLECTION && variable.elementType) {
    return `<p contenteditable="true" spellcheck=false class="complex-variables collection-elementAt">&zwj;${
      variable.id.split(':')[1]
    }</p>`;
  }
  if (variable.variable_type === VARIABLE_TYPE_DYNAMIC) {
    return `<p contenteditable="true" spellcheck=false class="complex-variables dynamic">&zwj;${variable.id.split(':')[1]}</p>`;
  }
  return '';
};

export const regenerateSpanTag = (variable: any) => {
  return `<span contenteditable="false" data-uuid="${variable.id}" data-type="${variable.type}" data-value="${variable.value}" data-label=${variable.label} data-variable_type=${variable.variable_type} class="tag">@${variable.label}${regenerateParagraphTag(variable)}</span>`;
};

export const stringToArrayOfStringAndObject = (inputString: string, variables: any[]) => {
  const regex = /\{(.*?)~(.*?)\}/g;
  const result: any[] = [];
  const parts = inputString.split(/\s+/);

  parts.forEach(part => {
    const match = [...part.matchAll(regex)];
    if (match.length > 0) {
      let id = match[0][1];
      let type = '';
      let variableType = '';
      type = match[0][2].split('~')[0];
      if (match[0][2].includes('~')) {
        switch (match[0][2].split('~')[1]) {
          case VARIABLE_TYPE_COLLECTION:
            variableType = VARIABLE_TYPE_COLLECTION;
            break;
          case VARIABLE_TYPE_DYNAMIC:
            variableType = VARIABLE_TYPE_DYNAMIC;
            break;
        }
      }

      if (id.includes(':') && variableType === VARIABLE_TYPE_COLLECTION) {
        id = `${id.split(':')[0]}:value`;
      } else if (id.includes(':') && variableType === VARIABLE_TYPE_DYNAMIC) {
        id = id.split(':')[0];
      }

      const variable = variables.find(item => item.id === id && item.type === type);

      if (variable) {
        result.push({ ...variable, id: match[0][1] });
      }
    } else {
      result.push(part);
    }
  });

  return result;
};

export const arrayOfStringsAndObjectsToHtmlString = (items: any[]) => {
  return items
    .map(item => {
      if (typeof item === 'object') {
        return regenerateSpanTag(item);
      }
      return item;
    })
    .join('&nbsp;');
};
