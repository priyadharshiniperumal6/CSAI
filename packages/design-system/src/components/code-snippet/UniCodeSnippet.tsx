import { Tooltip } from 'antd';
import classNames from 'classnames';
import { useCallback } from 'react';

import { UniMaterialIcon } from '../icon';

import './UniCodeSnippet.scss';

export type UniCodeSnippetProps = {
  languageCode?: string;
  codeSnippet: string;
  className?: string;
  class?: string;
};

const fallbackCopy = (text: string) => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
};

export const UniCodeSnippet = ({ languageCode = 'language-html', codeSnippet, className, class: legacyClass }: UniCodeSnippetProps) => {
  const handleCopy = useCallback(async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(codeSnippet);
      } else {
        fallbackCopy(codeSnippet);
      }
    } catch (error) {
      fallbackCopy(codeSnippet);
    }
  }, [codeSnippet]);

  return (
    <div className={classNames('uni-code-snippet', className, legacyClass)}>
      <div className="uni-code-snippet__copy">
        <Tooltip title="Copy Code">
          <button type="button" className="uni-code-snippet__copy-btn" onClick={handleCopy} aria-label="Copy code">
            <UniMaterialIcon iconName='content_copy' size={24} colorClass="text-slate-50" />
          </button>
        </Tooltip>
      </div>
      <div className="uni-code-snippet__body">
        <pre className={languageCode}>
          <code>{codeSnippet}</code>
        </pre>
      </div>
    </div>
  );
};
