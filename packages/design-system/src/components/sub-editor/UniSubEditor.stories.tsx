import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { UniButton } from '../button/UniButton';
import { UniMaterialIcon } from '../icon';
import { UniDraggableContent } from '../draggable-content/UniDraggableContent';

import { UniSubEditor } from './UniSubEditor';
import { UniInlineEdit } from './UniInlineEdit';

const meta = {
  title: 'UNI-COMPONENTS/SubEditor',
  component: UniSubEditor,
  tags: ['autodocs'],
} satisfies Meta<typeof UniSubEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SubEditorWithInlineEdit: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: '1', title: 'What is your favorite flavor of ice cream?', subtitle: 'Voice: Default', deletable: true, inlineEditable: true },
      { id: '2', title: 'Pick a time to follow up with the user.', subtitle: 'Voice: Repaired', deletable: true, inlineEditable: true },
    ]);

    return (
      <UniSubEditor
        info={{ title: 'Sub Editor with Inline Edit' }}
        toolbar={<UniMaterialIcon iconName="add_circle" size={18} colorClass="cursor-pointer text-neutral-100" />}
      >
        <div className="flex flex-col gap-4">
          {items.map(item => (
            <div className="inline-content-wrap flex justify-between" key={item.id}>
              <UniInlineEdit
                data={item}
                id={item.id}
                onConfirmDelete={id => setItems(current => current.filter(entry => entry.id !== id))}
              />
            </div>
          ))}
        </div>
      </UniSubEditor>
    );
  },
};

export const SubEditorWithDraggableContent: Story = {
  render: () => {
    const [rows, setRows] = useState([
      { name: 'Item 1', type: 'Allocation' },
      { name: 'Item 2', type: 'Integration Point' },
      { name: 'Item 3', type: 'Allocation' },
    ]);
    const [dragIndex, setDragIndex] = useState<number | null>(null);

    const handleDrop = (index?: number) => {
      if (dragIndex === null || index === undefined || dragIndex === index) {
        setDragIndex(null);
        return;
      }
      const next = [...rows];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(index, 0, moved);
      setRows(next);
      setDragIndex(null);
    };

    return (
      <UniSubEditor
        info={{ title: 'Sub Editor with Draggable Content' }}
        toolbar={
          <UniButton type="text" size="small">
            Add Row
          </UniButton>
        }
      >
        <div className="flex flex-col gap-3">
          {rows.map((row, index) => (
            <UniDraggableContent
              key={row.name}
              index={index}
              content={
                <div>
                  <div className="item-title">{row.name}</div>
                  <div className="item-type text-xs text-neutral-500">{row.type}</div>
                </div>
              }
              actions={<UniButton type="text">Delete</UniButton>}
              onDragStart={setDragIndex}
              onDrop={handleDrop}
            />
          ))}
        </div>
      </UniSubEditor>
    );
  },
};
