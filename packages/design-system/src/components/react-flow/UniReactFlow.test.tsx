import { render, screen } from '@testing-library/react';

import { UniReactFlow } from './UniReactFlow';

const reactFlowMocks = vi.hoisted(() => ({
  ReactFlow: vi.fn(({ children, fitView }: { children: any; fitView?: boolean }) => (
    <div data-testid="react-flow" data-fit-view={String(fitView)}>
      {children}
    </div>
  )),
  ReactFlowProvider: vi.fn(({ children }: { children: any }) => (
    <div data-testid="react-flow-provider">{children}</div>
  )),
  MiniMap: vi.fn(() => <div data-testid="react-flow-minimap" />),
  Controls: vi.fn(() => <div data-testid="react-flow-controls" />),
  Background: vi.fn(({ variant }: { variant?: string }) => (
    <div data-testid="react-flow-background" data-variant={variant} />
  )),
  BackgroundVariant: {
    Dots: 'dots',
  },
}));

vi.mock('@xyflow/react', () => reactFlowMocks);
vi.mock('@xyflow/react/dist/style.css', () => ({}));

describe('UniReactFlow', () => {
  const nodes = [{ id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } }];
  const edges: any[] = [];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with default controls', () => {
    render(<UniReactFlow nodes={nodes} edges={edges} />);

    expect(screen.getByTestId('react-flow')).toBeInTheDocument();
    expect(screen.getByTestId('react-flow')).toHaveAttribute('data-fit-view', 'true');
    expect(screen.getByTestId('react-flow-controls')).toBeInTheDocument();
    expect(screen.getByTestId('react-flow-minimap')).toBeInTheDocument();
    expect(screen.getByTestId('react-flow-background')).toBeInTheDocument();
  });

  it('allows disabling optional overlays', () => {
    render(
      <UniReactFlow nodes={nodes} edges={edges} showControls={false} showMiniMap={false} showBackground={false} />
    );

    expect(screen.queryByTestId('react-flow-controls')).not.toBeInTheDocument();
    expect(screen.queryByTestId('react-flow-minimap')).not.toBeInTheDocument();
    expect(screen.queryByTestId('react-flow-background')).not.toBeInTheDocument();
  });

  it('supports aiq-journey skin class', () => {
    const { container } = render(<UniReactFlow nodes={nodes} edges={edges} skin="aiq-journey" />);

    expect(container.firstChild).toHaveClass('uni-react-flow--aiq-journey');
  });
});
