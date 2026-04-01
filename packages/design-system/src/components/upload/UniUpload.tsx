import { useEffect, useState } from 'react';
import { Upload } from 'antd';
import type { UploadProps, UploadFile } from 'antd';

export type UniUploadProps = {
  uploadProps?: UploadProps;
  defaultFileList?: UploadFile[];
  onChange?: UploadProps['onChange'];
  onRemove?: (file: UploadFile<any>) => void;
  children?: React.ReactNode;
};

export const UniUpload = ({ uploadProps, defaultFileList, onChange, onRemove, children }: UniUploadProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList ?? []);

  useEffect(() => {
    setFileList(defaultFileList ?? []);
  }, [defaultFileList]);

  return (
    <Upload
      {...uploadProps}
      fileList={fileList}
      onChange={info => {
        setFileList(info.fileList);
        onChange?.(info);
      }}
      onRemove={file => {
        onRemove?.(file);
        return uploadProps?.onRemove?.(file) ?? true;
      }}
    >
      {children}
    </Upload>
  );
};
