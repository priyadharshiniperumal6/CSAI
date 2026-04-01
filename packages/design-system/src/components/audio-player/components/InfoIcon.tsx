import classNames from 'classnames';
import { UniTooltip } from '../../tooltip/UniTooltip';
import { UniMaterialIcon } from '../../icon';

type InfoIconProps = {
  iconName: string;
  tooltip: string;
  className?: string;
};

export const InfoIcon = ({ iconName, tooltip, className, onClick }: InfoIconProps & { onClick?: () => void }) => (
  <UniTooltip title={tooltip} placement="left">
    <div
      className={classNames(
        'flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-solid border-bprimary-light bg-fill-secondary p-1.5 text-sm text-color-icon hover:border-primary hover:text-primary',
        className
      )}
      onClick={onClick}
    >
      <UniMaterialIcon iconName={iconName} size={14} />
    </div>
  </UniTooltip>
);

export default InfoIcon;
