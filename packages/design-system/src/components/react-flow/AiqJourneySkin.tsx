import classNames from 'classnames';
import type { CSSProperties, DragEventHandler, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  Handle,
  Position,
  getSmoothStepPath,
  type Edge,
  type EdgeProps,
  type MiniMapNodeProps,
  type Node,
  type NodeProps,
  type XYPosition,
} from '@xyflow/react';

export const AIQ_JOURNEY_NODE_TYPE = 'aiqJourneyNode';
export const AIQ_JOURNEY_STEP_NODE_TYPE = 'aiqJourneyStep';
export const AIQ_JOURNEY_END_NODE_TYPE = 'aiqJourneyEndStep';
export const AIQ_JOURNEY_EDGE_TYPE = 'aiqJourneyEdge';
export const AIQ_JOURNEY_NODE_PALETTE_MIME = 'application/x-aiq-journey-node-template';

export type AiqJourneyNodeType = 'start' | 'end' | 'transfer' | 'goto' | 'content' | 'add';
export type AiqJourneyEndSubtype = 'neutral' | 'positive' | 'negative';
export type AiqJourneyContentDisplayMode = 'collapsed' | 'expanded';
export type AiqJourneyLayoutDirection = 'top-to-bottom' | 'left-to-right';
export type AiqJourneyContentSubtype =
  | 'subflow'
  | 'question'
  | 'statement'
  | 'message'
  | 'tool'
  | 'agent'
  | 'skillset'
  | 'authenticate';

type AiqJourneyLegacyTone = 'start' | 'agent' | 'subflow' | 'action' | 'neutral';

type BranchTone = 'success' | 'alert' | 'info' | 'neutral';

type ContentVisualTone = AiqJourneyContentSubtype;
type ConnectorTone = ContentVisualTone | 'transfer';
type MiniMapSwatch = {
  fill: string;
  stroke: string;
};

type IconGlyph =
  | 'start'
  | 'end'
  | 'transfer'
  | 'goto'
  | 'subflow'
  | 'question'
  | 'statement'
  | 'message'
  | 'tool'
  | 'agent'
  | 'skillset'
  | 'authenticate';

export type AiqJourneyPaletteNodeTemplate = {
  nodeType: Exclude<AiqJourneyNodeType, 'start' | 'add'>;
  contentSubtype?: AiqJourneyContentSubtype;
  endSubtype?: AiqJourneyEndSubtype;
  title?: string;
  description?: string;
};

export type AiqJourneyPaletteActionItem = {
  id: string;
  label: ReactNode;
  description?: string;
  template: AiqJourneyPaletteNodeTemplate;
};

export type AiqJourneyNodeData = {
  nodeType?: AiqJourneyNodeType | string;
  contentSubtype?: AiqJourneyContentSubtype | string;
  endSubtype?: AiqJourneyEndSubtype | string;
  contentDisplayMode?: AiqJourneyContentDisplayMode | string;
  layoutDirection?: AiqJourneyLayoutDirection | string;
  title?: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  subtitle?: ReactNode;
  icon?: ReactNode;
  kind?: string;
  nodeKind?: string;
  isEnd?: boolean;
  compact?: boolean;
  tone?: AiqJourneyLegacyTone | string;
  onPaletteDrop?: (
    targetNodeId: string,
    template: AiqJourneyPaletteNodeTemplate,
    dropMode?: 'add-point' | 'branch'
  ) => void;
  appendTargetId?: string;
  appendPaletteItems?: AiqJourneyPaletteActionItem[];
  branchPaletteItems?: AiqJourneyPaletteActionItem[];
  onEditNode?: (nodeId: string) => void;
  onDeleteNode?: (nodeId: string) => void;
};

// Legacy aliases used by previous story/demo code.
export type AiqJourneyStepNodeData = AiqJourneyNodeData;
export type AiqJourneyEndNodeData = AiqJourneyNodeData;

export type AiqJourneyEdgeData = {
  bendPoints?: XYPosition[];
  highlight?: boolean;
  canInsert?: boolean;
  canDelete?: boolean;
  branchLabel?: ReactNode;
  branchDescription?: ReactNode;
  branchTone?: BranchTone;
  hiddenUntilSourceHover?: boolean;
  isSourceHovered?: boolean;
  onInsertEdge?: (edgeId: string) => void;
  onDeleteEdge?: (edgeId: string) => void;
};

const hiddenHandleStyle: CSSProperties = {
  opacity: 0,
  pointerEvents: 'none',
  width: 1,
  height: 1,
  border: 0,
  background: 'transparent',
};

const COLLAPSED_NODE_ICON_SIZE = 44;
const COLLAPSED_NODE_ICON_CENTER = COLLAPSED_NODE_ICON_SIZE / 2;
const EXPANDED_NODE_ICON_CENTER_X = 34;
const EXPANDED_NODE_PORT_BOTTOM_OFFSET = 14;

const EDGE_BORDER_RADIUS = 40;

const branchToneClassMap: Record<BranchTone, string> = {
  success: 'uni-react-flow-journey-edge__chip--success',
  alert: 'uni-react-flow-journey-edge__chip--alert',
  info: 'uni-react-flow-journey-edge__chip--info',
  neutral: 'uni-react-flow-journey-edge__chip--neutral',
};

const contentSubtypeVisualMap: Record<AiqJourneyContentSubtype, ContentVisualTone> = {
  subflow: 'subflow',
  question: 'question',
  statement: 'statement',
  message: 'message',
  tool: 'tool',
  agent: 'agent',
  skillset: 'skillset',
  authenticate: 'authenticate',
};

const connectorToneMap: Record<AiqJourneyContentSubtype, ConnectorTone> = {
  subflow: 'subflow',
  question: 'question',
  statement: 'statement',
  message: 'message',
  tool: 'tool',
  agent: 'agent',
  skillset: 'skillset',
  authenticate: 'authenticate',
};

const legacyToneMap: Record<Exclude<AiqJourneyLegacyTone, 'start'>, AiqJourneyContentSubtype | 'transfer'> = {
  agent: 'agent',
  subflow: 'subflow',
  action: 'transfer',
  neutral: 'statement',
};

const miniMapSwatches = {
  start: { fill: '#1f2937', stroke: '#1f2937' },
  add: { fill: '#ffffff', stroke: '#e5e7eb' },
  end: { fill: '#9ca3af', stroke: '#d1d5db' },
  goto: { fill: '#9ca3af', stroke: '#d1d5db' },
  transfer: { fill: '#ea580c', stroke: '#fdba74' },
  agent: { fill: '#7c3aed', stroke: '#a78bfa' },
  subflow: { fill: '#be185d', stroke: '#f9a8d4' },
  question: { fill: '#1b9ead', stroke: '#7dd3db' },
  statement: { fill: '#d09108', stroke: '#f9e4ae' },
  message: { fill: '#2f8fdd', stroke: '#93c5fd' },
  tool: { fill: '#ea580c', stroke: '#fdba74' },
  skillset: { fill: '#5a6ad8', stroke: '#c7d2fe' },
  authenticate: { fill: '#0f766e', stroke: '#99f6e4' },
} satisfies Record<'start' | 'add' | 'end' | 'goto' | 'transfer' | AiqJourneyContentSubtype, MiniMapSwatch>;

const fallbackTitleByType: Record<AiqJourneyNodeType, string> = {
  start: 'Start',
  end: 'End',
  transfer: 'Transfer',
  goto: 'Goto',
  content: 'Node',
  add: 'Add Node',
};

const normalizeToken = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, '');

const coerceNodeType = (value: unknown): AiqJourneyNodeType | undefined => {
  if (typeof value !== 'string') {
    return undefined;
  }

  const normalized = normalizeToken(value);

  if (normalized === 'start') {
    return 'start';
  }
  if (normalized === 'end') {
    return 'end';
  }
  if (normalized === 'goto' || normalized === 'jumpto' || normalized === 'backlink') {
    return 'goto';
  }
  if (normalized === 'add' || normalized === 'addnode' || normalized === 'placeholder') {
    return 'add';
  }
  if (normalized === 'transfer' || normalized === 'handoff' || normalized === 'handoffnode') {
    return 'transfer';
  }
  if (normalized === 'content' || normalized === 'step' || normalized === 'journeystep' || normalized === 'node') {
    return 'content';
  }

  return undefined;
};

const coerceContentSubtype = (value: unknown): AiqJourneyContentSubtype | undefined => {
  if (typeof value !== 'string') {
    return undefined;
  }

  const normalized = normalizeToken(value);

  if (normalized === 'subflow') {
    return 'subflow';
  }
  if (normalized === 'question' || normalized === 'closed') {
    return 'question';
  }
  if (normalized === 'statement') {
    return 'statement';
  }
  if (normalized === 'message') {
    return 'message';
  }
  if (normalized === 'tool' || normalized === 'taskselector' || normalized === 'task' || normalized === 'action') {
    return 'tool';
  }
  if (normalized === 'agent') {
    return 'agent';
  }
  if (normalized === 'skillset' || normalized === 'skill' || normalized === 'skillgroup') {
    return 'skillset';
  }
  if (normalized === 'authenticate' || normalized === 'authentication' || normalized === 'verify') {
    return 'authenticate';
  }

  return undefined;
};

const coerceEndSubtype = (value: unknown): AiqJourneyEndSubtype | undefined => {
  if (typeof value !== 'string') {
    return undefined;
  }

  const normalized = normalizeToken(value);

  if (normalized === 'positive' || normalized === 'success') {
    return 'positive';
  }
  if (normalized === 'negative' || normalized === 'failure' || normalized === 'alert') {
    return 'negative';
  }
  if (normalized === 'neutral' || normalized === 'default') {
    return 'neutral';
  }

  return undefined;
};

const coerceContentDisplayMode = (value: unknown): AiqJourneyContentDisplayMode | undefined => {
  if (typeof value !== 'string') {
    return undefined;
  }

  const normalized = normalizeToken(value);

  if (normalized === 'collapsed' || normalized === 'compact') {
    return 'collapsed';
  }
  if (normalized === 'expanded' || normalized === 'full') {
    return 'expanded';
  }

  return undefined;
};

const coerceLayoutDirection = (value: unknown): AiqJourneyLayoutDirection | undefined => {
  if (typeof value !== 'string') {
    return undefined;
  }

  const normalized = normalizeToken(value);

  if (normalized === 'toptobottom' || normalized === 'tb' || normalized === 'vertical') {
    return 'top-to-bottom';
  }
  if (normalized === 'lefttoright' || normalized === 'lr' || normalized === 'horizontal') {
    return 'left-to-right';
  }

  return undefined;
};

const asNodeData = (data: unknown): AiqJourneyNodeData => {
  return (data ?? {}) as AiqJourneyNodeData;
};

const asEdgeData = (data: unknown): AiqJourneyEdgeData => {
  return (data ?? {}) as AiqJourneyEdgeData;
};

const getNodeTitle = (id: string, type: AiqJourneyNodeType, data: AiqJourneyNodeData) => {
  return data.title ?? data.label ?? fallbackTitleByType[type] ?? id;
};

const getNodeDescription = (data: AiqJourneyNodeData) => {
  return data.description ?? data.subtitle;
};

const getMiniMapSwatch = (node: Node): MiniMapSwatch => {
  const nodeData = asNodeData(node.data);
  const nodeType = resolveNodeType(node, nodeData);

  if (nodeType === 'start') {
    return miniMapSwatches.start;
  }

  if (nodeType === 'add') {
    return miniMapSwatches.add;
  }

  if (nodeType === 'end') {
    return miniMapSwatches.end;
  }

  if (nodeType === 'goto') {
    return miniMapSwatches.goto;
  }

  if (nodeType === 'transfer') {
    return miniMapSwatches.transfer;
  }

  return miniMapSwatches[resolveContentSubtype(nodeData)];
};

export const getAiqJourneyMiniMapNodeColor = (node: Node) => {
  return getMiniMapSwatch(node).fill;
};

export const getAiqJourneyMiniMapNodeStrokeColor = (node: Node) => {
  return getMiniMapSwatch(node).stroke;
};

export const AiqJourneyMiniMapNode = ({
  x,
  y,
  width,
  height,
  color,
  strokeColor,
  strokeWidth,
  className,
  style,
  onClick,
  id,
}: MiniMapNodeProps) => {
  const diameter = Math.max(10, Math.min(width, height));
  const radius = Math.max(4, diameter / 2 - (strokeWidth ?? 0) / 2);

  return (
    <circle
      cx={x + width / 2}
      cy={y + height / 2}
      r={radius}
      fill={color}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      className={className}
      style={style}
      onClick={event => onClick?.(event, id)}
    />
  );
};

const isEndNode = (node: Node, data: AiqJourneyNodeData): boolean => {
  return (
    node.type === AIQ_JOURNEY_END_NODE_TYPE ||
    data.nodeType === 'end' ||
    data.kind === 'end' ||
    data.nodeKind === 'end' ||
    data.isEnd === true
  );
};

const resolveNodeType = (node: Node, data: AiqJourneyNodeData): AiqJourneyNodeType => {
  const explicitType =
    coerceNodeType(data.nodeType) ??
    coerceNodeType(data.kind) ??
    coerceNodeType(data.nodeKind) ??
    coerceNodeType(node.type);

  if (explicitType) {
    return explicitType;
  }

  if (isEndNode(node, data)) {
    return 'end';
  }

  if (data.compact || data.tone === 'start') {
    return 'start';
  }

  if (data.tone === 'action') {
    return 'transfer';
  }

  return 'content';
};

const resolveContentSubtype = (data: AiqJourneyNodeData): AiqJourneyContentSubtype => {
  const explicitSubtype = coerceContentSubtype(data.contentSubtype) ?? coerceContentSubtype(data.kind);

  if (explicitSubtype) {
    return explicitSubtype;
  }

  if (data.tone === 'start') {
    return 'statement';
  }

  if (data.tone === 'agent' || data.tone === 'subflow' || data.tone === 'action' || data.tone === 'neutral') {
    const mappedSubtype = legacyToneMap[data.tone];

    if (mappedSubtype && mappedSubtype !== 'transfer') {
      return mappedSubtype;
    }
  }

  return 'statement';
};

const resolveEndSubtype = (data: AiqJourneyNodeData): AiqJourneyEndSubtype => {
  const explicitSubtype = coerceEndSubtype(data.endSubtype) ?? coerceEndSubtype(data.kind);

  if (explicitSubtype) {
    return explicitSubtype;
  }

  return 'neutral';
};

const toIconGlyph = (nodeType: AiqJourneyNodeType, subtype?: AiqJourneyContentSubtype): IconGlyph => {
  if (nodeType === 'start') {
    return 'start';
  }
  if (nodeType === 'end') {
    return 'end';
  }
  if (nodeType === 'transfer') {
    return 'transfer';
  }
  if (nodeType === 'goto') {
    return 'goto';
  }

  switch (subtype) {
    case 'subflow':
      return 'subflow';
    case 'question':
      return 'question';
    case 'message':
      return 'message';
    case 'tool':
      return 'tool';
    case 'agent':
      return 'agent';
    case 'skillset':
      return 'skillset';
    case 'authenticate':
      return 'authenticate';
    case 'statement':
    default:
      return 'statement';
  }
};

const parseNodePaletteTemplate = (value: string): AiqJourneyPaletteNodeTemplate | null => {
  try {
    const parsed = JSON.parse(value) as Partial<AiqJourneyPaletteNodeTemplate>;

    const nodeType = coerceNodeType(parsed.nodeType);
    const contentSubtype = parsed.contentSubtype ? coerceContentSubtype(parsed.contentSubtype) : undefined;
    const endSubtype = parsed.endSubtype ? coerceEndSubtype(parsed.endSubtype) : undefined;

    if (!nodeType || nodeType === 'start' || nodeType === 'add') {
      return null;
    }

    return {
      nodeType,
      contentSubtype,
      endSubtype,
      title: typeof parsed.title === 'string' ? parsed.title : undefined,
      description: typeof parsed.description === 'string' ? parsed.description : undefined,
    };
  } catch {
    return null;
  }
};

const NodeGlyph = ({ glyph }: { glyph: IconGlyph }) => {
  switch (glyph) {
    case 'start':
      return (
        <svg viewBox="0 0 20 20" aria-hidden>
          <path d="M7 5.5L15 10L7 14.5V5.5Z" fill="currentColor" />
        </svg>
      );
    case 'end':
      return (
        <svg viewBox="0 0 20 20" aria-hidden>
          <rect x="5" y="5" width="10" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case 'transfer':
      return (
        <svg viewBox="0 0 20 20" aria-hidden>
          <path d="M12 2L6 10H10L8 18L14 9.5H10L12 2Z" fill="currentColor" />
        </svg>
      );
    case 'goto':
      return (
        <svg viewBox="0 0 20 20" aria-hidden>
          <path d="M6 7.2L3.6 9.5L6 11.8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
          <path
            d="M4 9.5H11C13.5 9.5 15.5 11.4 15.5 13.9V15.5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.75"
          />
        </svg>
      );
    case 'subflow':
      return (
        <svg viewBox="0 0 20 20" aria-hidden>
          <circle cx="6" cy="6" r="2" fill="none" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="14" cy="6" r="2" fill="none" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="10" cy="14" r="2" fill="none" stroke="currentColor" strokeWidth="1.75" />
          <path d="M7.6 7.4L9 11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M12.4 7.4L11 11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case 'question':
      return (
        <svg viewBox="0 0 20 20" aria-hidden>
          <circle cx="10" cy="10" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case 'statement':
      return (
        <svg viewBox="0 0 20 20" aria-hidden>
          <path
            d="M4.5 5.5H15.5V12.5H9.4L6.6 15.5V12.5H4.5V5.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'message':
      return (
        <svg viewBox="0 0 20 20" aria-hidden>
          <rect x="4.5" y="5.5" width="11" height="9" rx="2" fill="none" stroke="currentColor" strokeWidth="1.75" />
          <path d="M6 7.5L10 10.5L14 7.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
        </svg>
      );
    case 'tool':
      return (
        <svg viewBox="0 0 20 20" aria-hidden>
          <rect x="5" y="4" width="10" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.75" />
          <path d="M7.5 7.5H12.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M7.5 10.5H12.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M7.8 13L8.9 14.1L12.3 10.7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case 'skillset':
      return (
        <svg viewBox="0 0 20 20" aria-hidden>
          <circle cx="6.5" cy="7" r="2" fill="none" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="13.5" cy="7" r="2" fill="none" stroke="currentColor" strokeWidth="1.75" />
          <path d="M4.5 14.5H8.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
          <path d="M11.5 14.5H15.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
        </svg>
      );
    case 'authenticate':
      return (
        <svg viewBox="0 0 20 20" aria-hidden>
          <path
            d="M6.5 8V6.8C6.5 4.9 8 3.4 10 3.4C12 3.4 13.5 4.9 13.5 6.8V8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <rect x="5.5" y="8" width="9" height="8" rx="1.8" fill="none" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="10" cy="12" r="1.1" fill="currentColor" />
        </svg>
      );
    case 'agent':
    default:
      return (
        <svg viewBox="0 0 20 20" aria-hidden>
          <path
            d="M4.5 10.2C4.5 7 7.1 4.4 10.3 4.4C13.4 4.4 16 7 16 10.2"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.75"
          />
          <rect x="4.2" y="9.4" width="2.8" height="4.8" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <rect
            x="13.1"
            y="9.4"
            width="2.8"
            height="4.8"
            rx="1.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M8.1 14.8H12.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
        </svg>
      );
  }
};

const JourneyIcon = ({ className, glyph, icon }: { className: string; glyph: IconGlyph; icon?: ReactNode }) => {
  return <div className={className}>{icon ?? <NodeGlyph glyph={glyph} />}</div>;
};

const getTemplateGlyph = (template: AiqJourneyPaletteNodeTemplate): IconGlyph => {
  if (template.nodeType === 'end') {
    return 'end';
  }
  if (template.nodeType === 'transfer') {
    return 'transfer';
  }
  if (template.nodeType === 'goto') {
    return 'goto';
  }

  return toIconGlyph('content', template.contentSubtype ?? 'statement');
};

const getTemplateToneModifier = (template: AiqJourneyPaletteNodeTemplate) => {
  if (template.nodeType === 'end') {
    return template.endSubtype ?? 'neutral';
  }
  if (template.nodeType === 'transfer') {
    return 'transfer';
  }
  if (template.nodeType === 'goto') {
    return 'goto';
  }

  return contentSubtypeVisualMap[template.contentSubtype ?? 'statement'];
};

export const AiqJourneyTemplateIcon = ({
  template,
  className,
}: {
  template: AiqJourneyPaletteNodeTemplate;
  className?: string;
}) => {
  const toneModifier = getTemplateToneModifier(template);

  return (
    <span
      className={classNames(
        'uni-react-flow-journey-action-palette__item-icon',
        `uni-react-flow-journey-action-palette__item-icon--${toneModifier}`,
        className
      )}
      aria-hidden
    >
      <NodeGlyph glyph={getTemplateGlyph(template)} />
    </span>
  );
};

const AiqJourneyActionPalette = ({
  items,
  onSelect,
  variant,
}: {
  items: AiqJourneyPaletteActionItem[];
  onSelect: (template: AiqJourneyPaletteNodeTemplate) => void;
  variant: 'append' | 'branch';
}) => {
  return (
    <div
      className={classNames(
        'uni-react-flow-journey-action-palette',
        `uni-react-flow-journey-action-palette--${variant}`
      )}
      onPointerDown={event => event.stopPropagation()}
      role="menu"
      tabIndex={-1}
    >
      {items.map((item, index) => {
        const showDivider =
          index > 0 && items[index - 1]?.template.nodeType === 'content' && item.template.nodeType !== 'content';

        return (
          <div key={item.id}>
            {showDivider ? <div className="uni-react-flow-journey-action-palette__divider" /> : null}
            <button
              type="button"
              className="uni-react-flow-journey-action-palette__item"
              title={item.description}
              onClick={event => {
                event.stopPropagation();
                onSelect(item.template);
              }}
            >
              <AiqJourneyTemplateIcon template={item.template} />
              <span className="uni-react-flow-journey-action-palette__item-label">{item.label}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export const AiqJourneyNode = ({ id, type, selected, data }: NodeProps) => {
  const nodeData = asNodeData(data);
  const [isDropActive, setIsDropActive] = useState(false);
  const [activePalette, setActivePalette] = useState<'append' | 'branch' | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const nodeType =
    coerceNodeType(nodeData.nodeType) ??
    coerceNodeType(type) ??
    (nodeData.isEnd
      ? 'end'
      : nodeData.tone === 'start'
        ? 'start'
        : nodeData.tone === 'action'
          ? 'transfer'
          : 'content');
  const contentSubtype = nodeType === 'content' ? resolveContentSubtype(nodeData) : undefined;
  const endSubtype = nodeType === 'end' ? resolveEndSubtype(nodeData) : 'neutral';
  const contentDisplayMode =
    nodeType === 'content' ? (coerceContentDisplayMode(nodeData.contentDisplayMode) ?? 'expanded') : 'collapsed';
  const layoutDirection = coerceLayoutDirection(nodeData.layoutDirection) ?? 'top-to-bottom';
  const targetHandlePosition = layoutDirection === 'left-to-right' ? Position.Left : Position.Top;
  const sourceHandlePosition = layoutDirection === 'left-to-right' ? Position.Right : Position.Bottom;
  const collapsedNodeTargetHandleStyle: CSSProperties =
    layoutDirection === 'left-to-right'
      ? {
          ...hiddenHandleStyle,
          top: COLLAPSED_NODE_ICON_CENTER,
        }
      : {
          ...hiddenHandleStyle,
          left: COLLAPSED_NODE_ICON_CENTER,
        };
  const collapsedNodeSourceHandleStyle: CSSProperties =
    layoutDirection === 'left-to-right'
      ? {
          ...hiddenHandleStyle,
          top: COLLAPSED_NODE_ICON_CENTER,
          right: 'auto',
          left: COLLAPSED_NODE_ICON_SIZE,
        }
      : {
          ...hiddenHandleStyle,
          left: COLLAPSED_NODE_ICON_CENTER,
        };
  const expandedContentTargetHandleStyle: CSSProperties =
    layoutDirection === 'left-to-right'
      ? {
          ...hiddenHandleStyle,
          top: 'auto',
          bottom: EXPANDED_NODE_PORT_BOTTOM_OFFSET,
          transform: 'translate(-50%, 50%)',
        }
      : {
          ...hiddenHandleStyle,
          left: EXPANDED_NODE_ICON_CENTER_X,
        };
  const expandedContentSourceHandleStyle: CSSProperties =
    layoutDirection === 'left-to-right'
      ? {
          ...hiddenHandleStyle,
          top: 'auto',
          bottom: EXPANDED_NODE_PORT_BOTTOM_OFFSET,
          transform: 'translate(50%, 50%)',
        }
      : {
          ...hiddenHandleStyle,
          left: EXPANDED_NODE_ICON_CENTER_X,
        };
  const title = getNodeTitle(id, nodeType, nodeData);
  const description = getNodeDescription(nodeData);
  const appendPaletteItems = nodeData.appendPaletteItems ?? [];
  const branchPaletteItems = nodeData.branchPaletteItems ?? [];
  const canAppendFromToolbar = Boolean(nodeData.appendTargetId && appendPaletteItems.length && nodeData.onPaletteDrop);
  const canEditNode = Boolean(nodeData.onEditNode);
  const canDeleteNode = Boolean(nodeData.onDeleteNode);
  const canOpenBranchPalette = nodeType === 'content' && Boolean(branchPaletteItems.length && nodeData.onPaletteDrop);
  const isCollapsedContent = nodeType === 'content' && contentDisplayMode === 'collapsed';

  useEffect(() => {
    if (!activePalette) {
      return undefined;
    }

    const handlePointerDown = () => {
      setActivePalette(null);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [activePalette]);

  const handleAddNodeDragOver: DragEventHandler<HTMLDivElement> = event => {
    if (nodeType !== 'add') {
      return;
    }

    const hasPaletteData = Array.from(event.dataTransfer.types).includes(AIQ_JOURNEY_NODE_PALETTE_MIME);
    if (!hasPaletteData) {
      return;
    }

    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    setIsDropActive(true);
  };

  const handleAddNodeDragLeave: DragEventHandler<HTMLDivElement> = () => {
    if (nodeType === 'add') {
      setIsDropActive(false);
    }
  };

  const handleAddNodeDrop: DragEventHandler<HTMLDivElement> = event => {
    if (nodeType !== 'add') {
      return;
    }

    event.preventDefault();
    setIsDropActive(false);

    const rawTemplate = event.dataTransfer.getData(AIQ_JOURNEY_NODE_PALETTE_MIME);
    if (!rawTemplate) {
      return;
    }

    const template = parseNodePaletteTemplate(rawTemplate);
    if (!template) {
      return;
    }

    nodeData.onPaletteDrop?.(id, template, 'add-point');
  };

  const handleContentNodeDragOver: DragEventHandler<HTMLDivElement> = event => {
    if (nodeType !== 'content') {
      return;
    }

    const hasPaletteData = Array.from(event.dataTransfer.types).includes(AIQ_JOURNEY_NODE_PALETTE_MIME);
    if (!hasPaletteData) {
      return;
    }

    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    setIsDropActive(true);
  };

  const handleContentNodeDragLeave: DragEventHandler<HTMLDivElement> = () => {
    if (nodeType === 'content') {
      setIsDropActive(false);
    }
  };

  const handleContentNodeDrop: DragEventHandler<HTMLDivElement> = event => {
    if (nodeType !== 'content') {
      return;
    }

    event.preventDefault();
    setIsDropActive(false);

    const rawTemplate = event.dataTransfer.getData(AIQ_JOURNEY_NODE_PALETTE_MIME);
    if (!rawTemplate) {
      return;
    }

    const template = parseNodePaletteTemplate(rawTemplate);
    if (!template) {
      return;
    }

    nodeData.onPaletteDrop?.(id, template, 'branch');
  };

  const handleAppendTemplateSelect = (template: AiqJourneyPaletteNodeTemplate) => {
    if (!nodeData.appendTargetId) {
      return;
    }

    nodeData.onPaletteDrop?.(nodeData.appendTargetId, template, 'add-point');
    setActivePalette(null);
  };

  const handleBranchTemplateSelect = (template: AiqJourneyPaletteNodeTemplate) => {
    nodeData.onPaletteDrop?.(id, template, 'branch');
    setActivePalette(null);
  };

  const renderNodeChrome = (
    nodeCard: ReactNode,
    { showBranchAdd = false, shellClassName }: { showBranchAdd?: boolean; shellClassName?: string } = {}
  ) => {
    const showInlineToolbar =
      (selected || activePalette === 'append') && (canAppendFromToolbar || canEditNode || canDeleteNode);
    const showBranchButton = showBranchAdd && (selected || isHovered || activePalette === 'branch');
    const hasInteractiveChrome = canAppendFromToolbar || canEditNode || canDeleteNode || showBranchAdd;

    if (!hasInteractiveChrome) {
      return nodeCard;
    }

    return (
      <div
        className={classNames('uni-react-flow-journey-node-shell', shellClassName)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {nodeCard}
        {showInlineToolbar ? (
          <div className="uni-react-flow-journey-node-toolbar" onPointerDown={event => event.stopPropagation()}>
            {canAppendFromToolbar ? (
              <button
                type="button"
                className={classNames('uni-react-flow-journey-node-toolbar__button', {
                  'is-active': activePalette === 'append',
                })}
                title="Add node below"
                onClick={event => {
                  event.stopPropagation();
                  setActivePalette(current => (current === 'append' ? null : 'append'));
                }}
              >
                <svg viewBox="0 0 20 20" aria-hidden>
                  <path d="M10 4V16" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
                  <path d="M4 10H16" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
                </svg>
              </button>
            ) : null}
            {canEditNode ? (
              <button
                type="button"
                className="uni-react-flow-journey-node-toolbar__button"
                title="Configure node"
                onClick={event => {
                  event.stopPropagation();
                  setActivePalette(null);
                  nodeData.onEditNode?.(id);
                }}
              >
                <svg viewBox="0 0 20 20" aria-hidden>
                  <circle cx="10" cy="4.5" r="1.6" fill="currentColor" />
                  <circle cx="10" cy="10" r="1.6" fill="currentColor" />
                  <circle cx="10" cy="15.5" r="1.6" fill="currentColor" />
                </svg>
              </button>
            ) : null}
            {canDeleteNode ? (
              <button
                type="button"
                className="uni-react-flow-journey-node-toolbar__button uni-react-flow-journey-node-toolbar__button--danger"
                title="Delete node"
                onClick={event => {
                  event.stopPropagation();
                  setActivePalette(null);
                  nodeData.onDeleteNode?.(id);
                }}
              >
                <svg viewBox="0 0 20 20" aria-hidden>
                  <path d="M5.5 6.5H14.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
                  <path
                    d="M7 6.5V5.4C7 4.63 7.63 4 8.4 4H11.6C12.37 4 13 4.63 13 5.4V6.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  />
                  <path
                    d="M7.1 8V13.9C7.1 14.73 7.77 15.4 8.6 15.4H11.4C12.23 15.4 12.9 14.73 12.9 13.9V8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  />
                </svg>
              </button>
            ) : null}
            {activePalette === 'append' && canAppendFromToolbar ? (
              <AiqJourneyActionPalette
                items={appendPaletteItems}
                onSelect={handleAppendTemplateSelect}
                variant="append"
              />
            ) : null}
          </div>
        ) : null}
        {showBranchButton ? (
          <div className="uni-react-flow-journey-branch-action" onPointerDown={event => event.stopPropagation()}>
            <button
              type="button"
              className={classNames('uni-react-flow-journey-branch-action__button', {
                'is-active': activePalette === 'branch',
              })}
              title="Add branch node"
              onClick={event => {
                event.stopPropagation();
                setActivePalette(current => (current === 'branch' ? null : 'branch'));
              }}
            >
              <svg viewBox="0 0 20 20" aria-hidden>
                <path d="M10 4V16" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
                <path d="M4 10H16" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
              </svg>
            </button>
            {activePalette === 'branch' ? (
              <AiqJourneyActionPalette
                items={branchPaletteItems}
                onSelect={handleBranchTemplateSelect}
                variant="branch"
              />
            ) : null}
          </div>
        ) : null}
      </div>
    );
  };

  const renderCollapsedNode = ({
    iconClassName,
    glyph,
    icon = nodeData.icon,
    onDragOver,
    onDragLeave,
    onDrop,
    showSourceHandle = true,
    showBranchAdd = false,
  }: {
    iconClassName: string;
    glyph: IconGlyph;
    icon?: ReactNode;
    onDragOver?: DragEventHandler<HTMLDivElement>;
    onDragLeave?: DragEventHandler<HTMLDivElement>;
    onDrop?: DragEventHandler<HTMLDivElement>;
    showSourceHandle?: boolean;
    showBranchAdd?: boolean;
  }) =>
    renderNodeChrome(
      <div
        className={classNames('uni-react-flow-journey-collapsed-node', {
          'is-selected': selected,
          'is-drop-active': isDropActive,
          'uni-react-flow-journey-collapsed-node--vertical': layoutDirection === 'top-to-bottom',
          'uni-react-flow-journey-collapsed-node--horizontal': layoutDirection === 'left-to-right',
        })}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <Handle id={`${id}-top`} type="target" position={targetHandlePosition} style={collapsedNodeTargetHandleStyle} />
        <JourneyIcon className={iconClassName} glyph={glyph} icon={icon} />
        <div className="uni-react-flow-journey-collapsed-node__label">{title}</div>
        {showSourceHandle ? (
          <Handle
            id={`${id}-bottom`}
            type="source"
            position={sourceHandlePosition}
            style={collapsedNodeSourceHandleStyle}
          />
        ) : null}
      </div>,
      {
        showBranchAdd,
        shellClassName: showBranchAdd ? 'uni-react-flow-journey-node-shell--collapsed-content' : undefined,
      }
    );

  if (nodeType === 'start') {
    return renderCollapsedNode({
      iconClassName: 'uni-react-flow-journey-collapsed-node__icon uni-react-flow-journey-collapsed-node__icon--start',
      glyph: 'start',
    });
  }

  if (nodeType === 'end') {
    return renderCollapsedNode({
      iconClassName: classNames(
        'uni-react-flow-journey-collapsed-node__icon',
        `uni-react-flow-journey-collapsed-node__icon--end-${endSubtype}`
      ),
      glyph: 'end',
      showSourceHandle: false,
    });
  }

  if (nodeType === 'transfer') {
    return renderCollapsedNode({
      iconClassName:
        'uni-react-flow-journey-collapsed-node__icon uni-react-flow-journey-node__icon uni-react-flow-journey-node__icon--transfer',
      glyph: 'transfer',
    });
  }

  if (nodeType === 'goto') {
    return renderCollapsedNode({
      iconClassName:
        'uni-react-flow-journey-collapsed-node__icon uni-react-flow-journey-node__icon uni-react-flow-journey-node__icon--goto',
      glyph: 'goto',
    });
  }

  if (nodeType === 'add') {
    return (
      <div
        className={classNames('uni-react-flow-journey-add-node', {
          'is-selected': selected,
          'is-drop-active': isDropActive,
        })}
        onDragOver={handleAddNodeDragOver}
        onDragLeave={handleAddNodeDragLeave}
        onDrop={handleAddNodeDrop}
        role="button"
        tabIndex={0}
        aria-label="Add node drop target"
      >
        <Handle id={`${id}-top`} type="target" position={targetHandlePosition} style={hiddenHandleStyle} />
        <div className="uni-react-flow-journey-add-node__button" aria-hidden>
          <svg viewBox="0 0 20 20">
            <path d="M10 4V16" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
            <path d="M4 10H16" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
          </svg>
        </div>
        <Handle id={`${id}-bottom`} type="source" position={sourceHandlePosition} style={hiddenHandleStyle} />
      </div>
    );
  }

  const subtype = contentSubtype ?? 'statement';
  const visualTone = contentSubtypeVisualMap[subtype];
  const connectorTone = connectorToneMap[subtype];

  if (isCollapsedContent) {
    return renderCollapsedNode({
      iconClassName: classNames(
        'uni-react-flow-journey-collapsed-node__icon',
        'uni-react-flow-journey-node__icon',
        `uni-react-flow-journey-node__icon--${visualTone}`
      ),
      glyph: toIconGlyph('content', subtype),
      onDragOver: handleContentNodeDragOver,
      onDragLeave: handleContentNodeDragLeave,
      onDrop: handleContentNodeDrop,
      showBranchAdd: canOpenBranchPalette,
    });
  }

  return renderNodeChrome(
    <div
      className={classNames('uni-react-flow-journey-content-node', {
        'is-selected': selected,
        'is-drop-active': isDropActive,
        'uni-react-flow-journey-content-node--vertical': layoutDirection === 'top-to-bottom',
        'uni-react-flow-journey-content-node--horizontal': layoutDirection === 'left-to-right',
      })}
      onDragOver={handleContentNodeDragOver}
      onDragLeave={handleContentNodeDragLeave}
      onDrop={handleContentNodeDrop}
    >
      <Handle id={`${id}-top`} type="target" position={targetHandlePosition} style={expandedContentTargetHandleStyle} />

      <div className="uni-react-flow-journey-content-node__header">
        <JourneyIcon
          className={classNames(
            'uni-react-flow-journey-node__icon',
            `uni-react-flow-journey-node__icon--${visualTone}`
          )}
          glyph={toIconGlyph('content', subtype)}
          icon={nodeData.icon}
        />
        <div className="uni-react-flow-journey-content-node__title">{title}</div>
      </div>

      <div className="uni-react-flow-journey-content-node__description-shell">
        <div className="uni-react-flow-journey-content-node__description">{description ?? ''}</div>
      </div>

      <div className="uni-react-flow-journey-content-node__connector-wrap">
        <div
          className={classNames(
            'uni-react-flow-journey-content-node__connector',
            `uni-react-flow-journey-content-node__connector--${connectorTone}`
          )}
        >
          <span className="uni-react-flow-journey-content-node__connector-dot" />
        </div>
      </div>

      <Handle
        id={`${id}-bottom`}
        type="source"
        position={sourceHandlePosition}
        style={expandedContentSourceHandleStyle}
      />
    </div>,
    { showBranchAdd: canOpenBranchPalette }
  );
};

const buildRoundedPath = (
  sourceX: number,
  sourceY: number,
  targetX: number,
  targetY: number,
  bendPoints: XYPosition[]
) => {
  const controlPoints = [{ x: sourceX, y: sourceY }, ...bendPoints, { x: targetX, y: targetY }];

  if (controlPoints.length < 2) {
    return '';
  }

  let pathData = `M ${controlPoints[0].x} ${controlPoints[0].y}`;

  for (let index = 1; index < controlPoints.length - 1; index += 1) {
    const previous = controlPoints[index - 1];
    const current = controlPoints[index];
    const next = controlPoints[index + 1];

    const previousDirection = { x: current.x - previous.x, y: current.y - previous.y };
    const nextDirection = { x: next.x - current.x, y: next.y - current.y };

    const previousLength = Math.hypot(previousDirection.x, previousDirection.y);
    const nextLength = Math.hypot(nextDirection.x, nextDirection.y);

    if (!previousLength || !nextLength) {
      pathData += ` L ${current.x} ${current.y}`;
      continue;
    }

    const offset = Math.min(EDGE_BORDER_RADIUS, previousLength / 2, nextLength / 2);

    const startPoint = {
      x: current.x - (previousDirection.x / previousLength) * offset,
      y: current.y - (previousDirection.y / previousLength) * offset,
    };

    const endPoint = {
      x: current.x + (nextDirection.x / nextLength) * offset,
      y: current.y + (nextDirection.y / nextLength) * offset,
    };

    pathData += ` L ${startPoint.x} ${startPoint.y}`;
    pathData += ` Q ${current.x} ${current.y} ${endPoint.x} ${endPoint.y}`;
  }

  const lastPoint = controlPoints[controlPoints.length - 1];
  pathData += ` L ${lastPoint.x} ${lastPoint.y}`;

  return pathData;
};

const getMidpoint = (
  sourceX: number,
  sourceY: number,
  targetX: number,
  targetY: number,
  bendPoints: XYPosition[],
  fallbackX: number,
  fallbackY: number
) => {
  const controlPoints = [{ x: sourceX, y: sourceY }, ...bendPoints, { x: targetX, y: targetY }];

  if (controlPoints.length < 2) {
    return { x: fallbackX, y: fallbackY };
  }

  const midpointIndex = Math.floor((controlPoints.length - 1) / 2);
  const start = controlPoints[midpointIndex];
  const end = controlPoints[midpointIndex + 1] ?? start;

  return {
    x: (start.x + end.x) / 2,
    y: (start.y + end.y) / 2,
  };
};

export const AiqJourneyEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  selected,
  data,
}: EdgeProps) => {
  const [isHover, setIsHover] = useState(false);
  const edgeData = asEdgeData(data);

  const bendPoints = edgeData.bendPoints ?? [];
  const [smoothPath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const edgePath =
    bendPoints.length > 0 ? buildRoundedPath(sourceX, sourceY, targetX, targetY, bendPoints) : smoothPath;
  const midpoint = getMidpoint(sourceX, sourceY, targetX, targetY, bendPoints, labelX, labelY);

  const isHighlighted = Boolean(edgeData.highlight || selected);
  const canInsert = Boolean(edgeData.canInsert);
  const canDelete = Boolean(edgeData.canDelete);
  const isHiddenUntilSourceHover = Boolean(edgeData.hiddenUntilSourceHover);
  const isSourceHovered = Boolean(edgeData.isSourceHovered);
  const hideEdge = isHiddenUntilSourceHover && !isSourceHovered && !selected;

  const stroke = isHighlighted
    ? 'var(--ut-color-border-brand-emphasis, #15808c)'
    : 'var(--ut-color-border-default, #e0e0e0)';
  const strokeDasharray = isHighlighted ? undefined : '4 4';
  const strokeWidth = isHighlighted ? 2 : 1.5;

  const showInsertAction = !hideEdge && canInsert && isHover;
  const showDeleteAction = !hideEdge && canDelete && selected;

  const actionStyle: CSSProperties = {
    transform: `translate(-50%, -50%) translate(${midpoint.x}px, ${midpoint.y}px)`,
  };

  const splitLabelStyle: CSSProperties = {
    transform: `translate(0, -50%) translate(${targetX + 14}px, ${targetY - 10}px)`,
  };

  return (
    <g onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <BaseEdge
        id={id}
        path={edgePath}
        interactionWidth={hideEdge ? 0 : 10}
        style={{
          stroke,
          strokeWidth,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeDasharray,
          opacity: hideEdge ? 0 : 1,
        }}
      />
      <EdgeLabelRenderer>
        {showInsertAction ? (
          <button
            type="button"
            className="uni-react-flow-journey-edge__action"
            style={actionStyle}
            onClick={() => edgeData.onInsertEdge?.(id)}
            aria-label="Insert step"
          >
            +
          </button>
        ) : null}
        {showDeleteAction ? (
          <button
            type="button"
            className="uni-react-flow-journey-edge__action uni-react-flow-journey-edge__action--danger"
            style={actionStyle}
            onClick={() => edgeData.onDeleteEdge?.(id)}
            aria-label="Delete path"
          >
            -
          </button>
        ) : null}
        {edgeData.branchLabel && !hideEdge ? (
          <div
            className={classNames(
              'uni-react-flow-journey-edge__chip',
              branchToneClassMap[edgeData.branchTone ?? 'neutral']
            )}
            style={splitLabelStyle}
            title={typeof edgeData.branchDescription === 'string' ? edgeData.branchDescription : undefined}
          >
            {edgeData.branchLabel}
          </div>
        ) : null}
      </EdgeLabelRenderer>
    </g>
  );
};

export const aiqJourneyNodeTypes = {
  [AIQ_JOURNEY_NODE_TYPE]: AiqJourneyNode,
  [AIQ_JOURNEY_STEP_NODE_TYPE]: AiqJourneyNode,
  [AIQ_JOURNEY_END_NODE_TYPE]: AiqJourneyNode,
};

export const aiqJourneyEdgeTypes = {
  [AIQ_JOURNEY_EDGE_TYPE]: AiqJourneyEdge,
};

export const mapToAiqJourneySkin = (nodes: Node[], edges: Edge[]): { nodes: Node[]; edges: Edge[] } => {
  const nextNodes = nodes.map(node => {
    if (
      node.type &&
      node.type !== 'default' &&
      node.type !== AIQ_JOURNEY_STEP_NODE_TYPE &&
      node.type !== AIQ_JOURNEY_END_NODE_TYPE &&
      node.type !== AIQ_JOURNEY_NODE_TYPE
    ) {
      return node;
    }

    const nodeData = asNodeData(node.data);
    const nodeType = resolveNodeType(node, nodeData);
    const contentSubtype = nodeType === 'content' ? resolveContentSubtype(nodeData) : undefined;
    const endSubtype = nodeType === 'end' ? resolveEndSubtype(nodeData) : undefined;

    const mappedData: AiqJourneyNodeData = {
      ...nodeData,
      nodeType,
      contentSubtype,
      endSubtype,
      title: getNodeTitle(node.id, nodeType, nodeData),
      description: getNodeDescription(nodeData),
    };

    return {
      ...node,
      type: AIQ_JOURNEY_NODE_TYPE,
      data: mappedData,
    };
  });

  const nextEdges = edges.map(edge => {
    if (edge.type && edge.type !== 'default') {
      return edge;
    }

    const edgeData = asEdgeData(edge.data);

    return {
      ...edge,
      type: AIQ_JOURNEY_EDGE_TYPE,
      data: {
        ...edgeData,
        branchTone: edgeData.branchTone ?? 'neutral',
      },
    };
  });

  return {
    nodes: nextNodes,
    edges: nextEdges,
  };
};
