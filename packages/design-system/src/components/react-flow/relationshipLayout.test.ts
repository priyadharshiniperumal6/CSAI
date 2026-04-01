import type { Edge, Node, NodeChange } from '@xyflow/react';

import {
  applyRelationshipLayout,
  filterLockedNodePositionChanges,
  horizontalDisplayRuleset,
  verticalDisplayRuleset,
} from './relationshipLayout';

describe('relationshipLayout', () => {
  const nodes: Node[] = [
    { id: 'start', position: { x: 0, y: 0 }, data: { nodeType: 'start', title: 'Start' } },
    { id: 'question', position: { x: 0, y: 0 }, data: { nodeType: 'content', title: 'Question' } },
    { id: 'approved', position: { x: 0, y: 0 }, data: { nodeType: 'content', title: 'Approved' } },
    { id: 'declined', position: { x: 0, y: 0 }, data: { nodeType: 'transfer', title: 'Declined' } },
    { id: 'end', position: { x: 0, y: 0 }, data: { nodeType: 'end', title: 'End' } },
  ];

  const edges: Edge[] = [
    { id: 'e-start-question', source: 'start', target: 'question', data: { canInsert: true } },
    { id: 'e-question-approved', source: 'question', target: 'approved', data: { branchLabel: 'Approved' } },
    {
      id: 'e-question-declined',
      source: 'question',
      target: 'declined',
      data: {
        branchLabel: 'Declined',
        bendPoints: [{ x: 200, y: 200 }],
      },
    },
    { id: 'e-approved-end', source: 'approved', target: 'end' },
    { id: 'e-declined-end', source: 'declined', target: 'end' },
  ];

  it('lays out parent child and sibling relationships vertically', () => {
    const result = applyRelationshipLayout(nodes, edges, { direction: 'top-to-bottom' });
    const nodeById = new Map(result.nodes.map(node => [node.id, node]));
    const start = nodeById.get('start')!;
    const question = nodeById.get('question')!;
    const approved = nodeById.get('approved')!;
    const declined = nodeById.get('declined')!;

    expect(start.position.y).toBe(verticalDisplayRuleset.rootY);
    expect(question.position.y).toBeGreaterThan(start.position.y);
    expect(approved.position.y).toBe(declined.position.y);
    expect(start.position.x).toBeGreaterThan(approved.position.x);
    expect(start.position.x).toBeLessThan(declined.position.x);
    expect(declined.position.x).toBeGreaterThan(approved.position.x);
    expect(result.nodes.every(node => node.draggable === false)).toBe(true);
    expect(result.edges.find(edge => edge.id === 'e-question-declined')?.data).not.toHaveProperty('bendPoints');
  });

  it('lays out parent child and sibling relationships horizontally', () => {
    const result = applyRelationshipLayout(nodes, edges, { direction: 'left-to-right' });
    const nodeById = new Map(result.nodes.map(node => [node.id, node]));
    const start = nodeById.get('start')!;
    const question = nodeById.get('question')!;
    const approved = nodeById.get('approved')!;
    const declined = nodeById.get('declined')!;

    expect(start.position.x).toBe(horizontalDisplayRuleset.rootX);
    expect(question.position.x).toBeGreaterThan(start.position.x);
    expect(approved.position.x).toBe(declined.position.x);
    expect(start.position.y).toBeGreaterThan(approved.position.y);
    expect(start.position.y).toBeLessThan(declined.position.y);
    expect(declined.position.y).toBeGreaterThan(approved.position.y);
  });

  it('filters position changes when layout locking is enabled', () => {
    const changes: NodeChange[] = [
      {
        id: 'question',
        type: 'position',
        position: { x: 320, y: 180 },
        dragging: true,
      },
      {
        id: 'question',
        type: 'select',
        selected: true,
      },
    ];

    expect(filterLockedNodePositionChanges(changes)).toEqual([
      {
        id: 'question',
        type: 'select',
        selected: true,
      },
    ]);
  });
});
