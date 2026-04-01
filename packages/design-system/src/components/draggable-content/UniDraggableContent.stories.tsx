import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { UniButton } from '../button/UniButton';

import { UniDraggableContent } from './UniDraggableContent';

const meta = {
  title: 'UNI-COMPONENTS/DraggableContent',
  component: UniDraggableContent,
  tags: ['autodocs'],
  args: {
    content: (
      <div>
        <div className="font-medium text-sm">Example item</div>
        <div className="text-xs text-neutral-500">Drag me to reorder</div>
      </div>
    ) as any,
  },
} satisfies Meta<typeof UniDraggableContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SingleItemDraggableContent: Story = {
  render: args => {
    const [items, setItems] = useState(['Alpha', 'Beta', 'Gamma']);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const handleDrop = (index?: number) => {
      if (draggedIndex === null || index === undefined || draggedIndex === index) {
        setDraggedIndex(null);
        return;
      }
      const next = [...items];
      const [moved] = next.splice(draggedIndex, 1);
      next.splice(index, 0, moved);
      setItems(next);
      setDraggedIndex(null);
    };

    return (
      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <UniDraggableContent
            key={item}
            {...args}
            index={index}
            content={
              <div>
                <div className="font-medium text-sm">{item}</div>
                <div className="text-xs text-neutral-500">Index {index + 1}</div>
              </div>
            }
            actions={<UniButton type="text">Edit</UniButton>}
            onDragStart={idx => setDraggedIndex(idx ?? null)}
            onDrop={handleDrop}
          />
        ))}
      </div>
    );
  },
};
