import { UniButton } from '../button/UniButton';

export type SidePanelHeaderProps = {
  title?: string | { value: string };
  subtitle?: string;
  rowDensityDefault?: boolean;
  handleTheatreModalOpen?: () => void;
  close?: () => void;
};

export const SidePanelHeader = ({
  title,
  subtitle,
  rowDensityDefault,
  handleTheatreModalOpen,
  close,
}: SidePanelHeaderProps) => {
  const isDense = typeof rowDensityDefault === 'object' ? (rowDensityDefault as any).value : rowDensityDefault;
  const height = isDense ? 44 : 36;

  let titleText: string = '';
  if (title) {
    titleText = typeof title === 'string' ? title : (title.value ?? '');
  }

  let subtitleText: string = '';
  if (subtitle) {
    subtitleText = typeof subtitle === 'string' ? subtitle : ((subtitle as any).value ?? '');
  }

  const hasSubtitle = subtitleText.trim().length > 0;

  return (
    <div
      className="uni-side-panel-header flex items-center gap-2 border-b border-neutral-100 bg-gray-50 px-5"
      style={{ height }}
    >
      <div className="min-w-0 flex-1">
        <h1 className="m-0 truncate whitespace-nowrap text-[20px] font-normal leading-[26px] text-neutral-700">
          {titleText}
        </h1>
        {hasSubtitle ? (
          <div className="uni-side-panel-subheader truncate whitespace-nowrap text-sm text-neutral-500">
            {subtitleText}
          </div>
        ) : null}
      </div>
      {handleTheatreModalOpen ? (
        <UniButton
          iconOnly
          uniIcon={{ iconName: 'uni-theatre' }}
          className="uni-theatre-open text-neutral-500"
          onClick={handleTheatreModalOpen}
          aria-label="Open theatre mode"
        />
      ) : null}
      {close ? (
        <UniButton
          iconOnly
          materialIcon={{ iconName: 'close', size: 20 }}
          className="uni-header-close text-neutral-500"
          onClick={close}
          aria-label="Close side panel"
        />
      ) : null}
    </div>
  );
};

export default SidePanelHeader;
