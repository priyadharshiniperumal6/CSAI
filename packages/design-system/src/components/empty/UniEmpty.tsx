import { Empty } from 'antd';
import type { EmptyProps } from 'antd';
import classNames from 'classnames';
import type { CSSProperties, ReactNode } from 'react';
import emptyImage from '../../assets/images/empty-img-default.svg';
import './UniEmpty.scss';

export type UniEmptyParams = {
  props?: {
    image?: ReactNode;
    title?: string;
    description?: string;
  };
};

const DEFAULT_PARAMS: Required<UniEmptyParams> = {
  props: {
    image: emptyImage,
    title: 'No Data found',
    description: '',
  },
};

export type UniEmptyProps = EmptyProps & {
  params?: UniEmptyParams;
  class?: string;
  imageStyle?: CSSProperties;
};

export const UniEmpty = ({ className, class: legacyClass, params, imageStyle, children, ...rest }: UniEmptyProps) => {
  const mergedParams = {
    ...DEFAULT_PARAMS.props,
    ...(params?.props ?? {}),
  };

  return (
    <Empty
      {...rest}
      className={classNames('text-center', className, legacyClass)}
      image={mergedParams.image}
      imageStyle={{ height: 'unset', ...imageStyle }}
      description={null}
    >
      <div className="uni-empty-content">
        {mergedParams.title !== '' ? <div className="uni-empty-title">{mergedParams.title}</div> : null}
        {mergedParams.description !== '' ? <div className="uni-empty-description">{mergedParams.description}</div> : null}
      </div>
      {children}
    </Empty>
  );
};
