import { useEffect, useState } from 'react';
import { Upload } from 'antd';
import type { UploadProps, UploadFile } from 'antd';

export type UniDragUploadProps = {
  uploadProps?: UploadProps;
  defaultFileList?: UploadFile[];
  onChange?: (info: { file: UploadFile<any>; fileList: UploadFile<any>[] }) => void;
  onRemove?: (file: UploadFile<any>) => void;
  children?: React.ReactNode;
};

export const UniDragUpload = ({ uploadProps, defaultFileList, onChange, onRemove, children }: UniDragUploadProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList ?? []);

  useEffect(() => {
    setFileList(defaultFileList ?? []);
  }, [defaultFileList]);

  return (
    <Upload.Dragger
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
    </Upload.Dragger>
  );
};
