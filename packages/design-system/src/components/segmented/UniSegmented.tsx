import classNames from 'classnames';
import { ConfigProvider, Segmented } from 'antd';
import type { SegmentedProps } from 'antd';
import { allColors, allRadius } from '../../helpers/token-runtime';

import './UniSegmented.scss';

// Module-level theme — defined once, never recreated on render.
// All values trace to packages/tokens/src/uni-token.js via allColors / allRadius.
const UNI_SEGMENTED_THEME = {
  token: {
    // Match the border-radius and font size used by toolbar buttons and dropdowns.
    borderRadius: allRadius['--bradius-300'] as number,
    fontSize: 14,
  },
  components: {
    Segmented: {
      trackBg: allColors['--bcolor-neutral-0'] as string, // #ffffff — white track
      itemColor: allColors['--bcolor-neutral-600'] as string, // #6d6f79 — muted gray for unselected (matches search/dropdown text)
      itemHoverBg: allColors['--bcolor-primary-100'] as string, // #E7F7FB — subtle teal hover
      itemSelectedBg: allColors['--bcolor-primary-100'] as string, // #E7F7FB — light teal bg (unchanged)
      itemSelectedColor: allColors['--bcolor-primary-600'] as string, // #15808C — dark teal text (matches active tab)
    },
  },
};

export type UniSegmentedProps = SegmentedProps & {
  class?: string;
};

export const UniSegmented = ({ className, class: legacyClass, ...rest }: UniSegmentedProps) => {
  return (
    <ConfigProvider theme={UNI_SEGMENTED_THEME}>
      <Segmented className={classNames('uni-segmented', className, legacyClass)} {...rest} />
    </ConfigProvider>
  );
};
