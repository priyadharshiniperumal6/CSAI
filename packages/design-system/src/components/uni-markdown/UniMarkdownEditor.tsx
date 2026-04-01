import { useEffect, useState } from 'react';
import { UniTextarea } from '../textarea/UniTextarea';

export type UniMarkdownEditorProps = {
  modelValue?: string;
  placeholder?: string;
  rows?: number;
  onChange?: (value: string) => void;
  onUpdateModelValue?: (value: string) => void;
};

export const UniMarkdownEditor = ({
  modelValue = '',
  placeholder = 'Enter markdown content...',
  rows = 10,
  onChange,
  onUpdateModelValue,
}: UniMarkdownEditorProps) => {
  const [content, setContent] = useState(modelValue);

  useEffect(() => {
    if (modelValue !== undefined && modelValue !== content) {
      setContent(modelValue);
    }
  }, [modelValue, content]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const nextValue = event.target.value;
    setContent(nextValue);
    onUpdateModelValue?.(nextValue);
    onChange?.(nextValue);
  };

  return (
    <div className="uni-markdown-editor">
      <UniTextarea
        value={content}
        placeholder={placeholder}
        rows={rows}
        onChange={handleChange}
      />
    </div>
  );
};
