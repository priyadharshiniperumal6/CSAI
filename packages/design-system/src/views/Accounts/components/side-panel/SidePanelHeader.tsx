import React from 'react';
import { UniButton } from '../../../../components/button/UniButton';
import './SidePanelHeader.scss';

interface SidePanelHeaderProps {
  title?: { value: string } | string;
  subtitle?: string;
  close: () => void;
  rowDensityDefault?: boolean | string | { value: boolean | string };
  handleTheatreModalOpen?: () => void;
}

export const SidePanelHeader: React.FC<SidePanelHeaderProps> = ({
  title,
  subtitle,
  close,
  rowDensityDefault,
  handleTheatreModalOpen,
}) => {
  const isDense = typeof rowDensityDefault === 'object' ? rowDensityDefault.value : rowDensityDefault;
  const headerHeight = isDense ? 44 : 36;
  const titleText = typeof title === 'object' ? title.value : title;

  const closeButtonProps = {
    type: 'default' as const,
    materialIcon: {
      iconName: 'close',
      size: 20,
    },
  };

  const theatreOpenIcon = {
    iconName: 'uni-theatre',
  };

  return (
    <div className="uni-side-panel-header" style={{ height: `${headerHeight}px` }}>
      <h1>{titleText}</h1>
      <div className="uni-side-panel-subheader grow">{subtitle}</div>

      {handleTheatreModalOpen && (
        <UniButton
          type="default"
          onClick={handleTheatreModalOpen}
          uniIcon={theatreOpenIcon}
          iconOnly={true}
          className="uni-theatre-open"
        />
      )}
      {close && <UniButton {...closeButtonProps} onClick={close} className="uni-header-close" iconOnly={true} />}
    </div>
  );
};

export default SidePanelHeader;
