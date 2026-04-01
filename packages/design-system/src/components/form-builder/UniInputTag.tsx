import { useRef, useState } from 'react';
import { Input, Tag, Tooltip } from 'antd';
import type { InputRef } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames';

export type UniInputTagProps = {
  value?: string[];
  onChange?: (value: string[]) => void;
  newTagLabel?: string;
  className?: string;
  class?: string;
};

export const UniInputTag = ({ value = [], onChange, newTagLabel = 'New Tag', className, class: legacyClass }: UniInputTagProps) => {
  const inputRef = useRef<InputRef>(null);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleClose = (removedTag: string) => {
    const updated = value.filter(tag => tag !== removedTag);
    onChange?.(updated);
  };

  const showInput = () => {
    setInputVisible(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleInputConfirm = () => {
    if (inputValue && !value.includes(inputValue)) {
      onChange?.([...value, inputValue]);
    }
    setInputValue('');
    setInputVisible(false);
  };

  return (
    <div className={classNames(className, legacyClass)}>
      {value.map(tag => {
        const isLongTag = tag.length > 20;
        const tagNode = (
          <Tag closable key={tag} onClose={() => handleClose(tag)}>
            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
          </Tag>
        );

        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagNode}
          </Tooltip>
        ) : (
          tagNode
        );
      })}
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          className="w-25"
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
          onBlur={handleInputConfirm}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              event.preventDefault();
              handleInputConfirm();
            }
          }}
        />
      ) : (
        <Tag style={{ background: '#fff', borderStyle: 'dashed' }} onClick={showInput}>
          <PlusOutlined /> {newTagLabel}
        </Tag>
      )}
    </div>
  );
};
