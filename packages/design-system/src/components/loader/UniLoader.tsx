import { HTMLAttributes } from 'react';
import classNames from 'classnames';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import loaderSrc from './loader.lottie?url';

import './UniLoader.scss';

export type UniLoaderSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

export type UniLoaderProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  size?: UniLoaderSize;
  class?: string;
};

export const UniLoader = ({ size = 'md', className, class: legacyClass, ...rest }: UniLoaderProps) => {
  return (
    <div className={classNames('uni-loader', `uni-loader-${size}`, className, legacyClass)} {...rest}>
      <DotLottieReact src={loaderSrc} loop autoplay style={{ width: '100%', height: '100%' }} />
    </div>
  );
};
