import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { UniPhraseAnnotator } from './UniPhraseAnnotator';

const sampleSlots = [
  {
    intentSlotId: 23770,
    intentSlotName: 'Account Number',
  },
  {
    intentSlotId: 23768,
    intentSlotName: 'Mobile Number',
  },
];

const samplePhrase = {
  trainingPhraseId: 1,
  trainingPhraseText: 'Call me at ${23768~slotkey}',
  trainingPhraseDisplay: '',
  trainingPhraseRegexTxt: '',
  intentSlotMapPojos: [
    {
      position: '23768~slotkey',
      value: '555-0100',
      intentSlot: {
        intentSlotId: 23768,
        intentSlotName: 'Mobile Number',
      },
      intentSlotId: 23768,
    },
  ],
};

const meta = {
  title: 'REACT-ONLY/Components/PhraseAnnotator',
  component: UniPhraseAnnotator,
  tags: ['autodocs'],
} satisfies Meta<typeof UniPhraseAnnotator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [phrase, setPhrase] = useState(samplePhrase);
    return (
      <div style={{ maxWidth: 640 }}>
        <UniPhraseAnnotator
          value={phrase}
          slots={sampleSlots}
          placeholder="Type your training phrase"
          showEnterIcon
          onPhraseAnnotatorSave={updated => setPhrase(updated)}
        />
      </div>
    );
  },
};
