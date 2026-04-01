import { render, screen } from '@testing-library/react';

import { UniCollapse, UniCollapsePanel } from './UniCollapse';

describe('UniCollapse', () => {
  it('renders panels', () => {
    render(
      <UniCollapse>
        <UniCollapsePanel header="Panel 1" key="1">
          Body
        </UniCollapsePanel>
      </UniCollapse>
    );

    expect(screen.getByText('Panel 1')).toBeInTheDocument();
  });

  it('applies spacing class', () => {
    render(
      <UniCollapse isCollapsePanelSpacingAllowed>
        <UniCollapsePanel header="Panel 1" isCollapsePanelSpacingAllowed key="1">
          Body
        </UniCollapsePanel>
      </UniCollapse>
    );

    expect(document.querySelector('.uni-ant-collapse')).toBeInTheDocument();
    expect(document.querySelector('.uni-ant-collapse-panel')).toBeInTheDocument();
  });
});
