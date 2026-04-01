import { act, fireEvent, render, screen } from '@testing-library/react';

import { UniSplitpanes } from './UniSplitpanes';
import { UniPane } from './UniPane';

describe('UniSplitpanes', () => {
  beforeAll(() => {
    if (!window.PointerEvent) {
      class PointerEvent extends MouseEvent {
        constructor(type: string, props?: PointerEventInit) {
          super(type, props);
        }
      }
      // @ts-expect-error - assign polyfill for jsdom
      window.PointerEvent = PointerEvent;
    }
  });

  it('renders panes', () => {
    render(
      <UniSplitpanes>
        <UniPane>One</UniPane>
        <UniPane>Two</UniPane>
      </UniSplitpanes>
    );

    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
  });

  it('updates pane sizes when dragging the splitter', async () => {
    render(
      <UniSplitpanes data-testid="splitter" horizontal={false}>
        <UniPane size={50}>One</UniPane>
        <UniPane size={50}>Two</UniPane>
      </UniSplitpanes>
    );

    const container = screen.getByTestId('splitter');
    Object.defineProperty(container, 'getBoundingClientRect', {
      value: () => ({ width: 1000, height: 200, top: 0, left: 0, bottom: 0, right: 0 }),
    });

    const splitter = container.querySelector('.uni-splitpanes__splitter') as HTMLDivElement;
    const pane = container.querySelector('.uni-splitpanes__pane') as HTMLDivElement;

    await act(async () => {
      fireEvent.pointerDown(splitter, { clientX: 500 });
      window.dispatchEvent(new PointerEvent('pointermove', { clientX: 600 }));
      window.dispatchEvent(new PointerEvent('pointerup', { clientX: 600 }));
    });

    expect(parseFloat(pane.style.flexBasis)).toBeGreaterThan(50);
  });
});
