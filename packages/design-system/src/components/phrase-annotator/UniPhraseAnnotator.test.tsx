import { fireEvent, render } from '@testing-library/react';

import { UniPhraseAnnotator } from './UniPhraseAnnotator';

const slots = [
  {
    intentSlotId: 1,
    intentSlotName: 'Email',
  },
];

const phrase = {
  trainingPhraseId: 0,
  trainingPhraseText: 'Send me a confirmation email',
  trainingPhraseDisplay: '',
  trainingPhraseRegexTxt: '',
  intentSlotMapPojos: [],
};

describe('UniPhraseAnnotator', () => {
  it('renders editor with placeholder', () => {
    const { container } = render(
      <UniPhraseAnnotator value={phrase} slots={slots} placeholder="Enter text" />
    );
    const editable = container.querySelector('.editable-content');
    expect(editable).toBeInTheDocument();
    expect(editable).toHaveAttribute('data-placeholder', 'Enter text');
  });

  it('emits save event on enter when configured', () => {
    const onSave = vi.fn();
    const { container } = render(
      <UniPhraseAnnotator
        value={phrase}
        slots={slots}
        showEnterIcon
        onPhraseAnnotatorSave={onSave}
      />
    );
    const editable = container.querySelector('.editable-content');
    expect(editable).toBeTruthy();
    if (editable) {
      fireEvent.keyDown(editable, { key: 'Enter' });
    }
    expect(onSave).toHaveBeenCalledTimes(1);
  });
});
