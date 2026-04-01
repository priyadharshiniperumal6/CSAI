import classNames from 'classnames';
import { Steps } from 'antd';
import type { StepsProps } from 'antd';

import './UniStepper.scss';

export type UniStepperProps = StepsProps & {
  class?: string;
};

export const UniStepper = ({ className, class: legacyClass, ...rest }: UniStepperProps) => {
  return <Steps className={classNames('uni-ant-stepper', className, legacyClass)} {...rest} />;
};
