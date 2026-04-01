import { fireEvent, render, screen } from '@testing-library/react';

import { KnowledgeSearchContainer } from './KnowledgeSearchContainer';
import type { KnowledgeSearchResult } from './types';

const sampleResult: KnowledgeSearchResult = {
  query: 'What is the vision?',
  isLoading: false,
  response: 'We focus on AI.',
  id: '1',
  key: '1',
  sources: [
    { importance: 0.9, content: 'Vision deck', parentDocName: 'Vision.pdf' },
  ],
  factualityScore: 0.9,
  disableThumbsUpDown: false,
  actionClickedType: undefined,
  isCollapsed: false,
  borderColor: '#e7e7e7',
  iconConfig: {
    icon: 'flare',
    iconColor: '#8C53CF',
    iconBgColor: '#F8F0FE',
    iconBorderColor: '#e7e7e7',
    tooltip: 'Search Result',
  },
};

describe('KnowledgeSearchContainer', () => {
  it('triggers search callbacks', () => {
    const onSearch = vi.fn();
    render(
      <KnowledgeSearchContainer
        searchResults={[sampleResult]}
        actionBtnProps={{ showThumbsUpDown: true }}
        onSearch={onSearch}
      />
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'roadmap' } });
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
    expect(onSearch).toHaveBeenCalledWith({ searchQuery: 'roadmap', searchMethod: 'TYPE', option: undefined });
  });

  it('opens feedback modal when configured', () => {
    render(
      <KnowledgeSearchContainer
        searchResults={[sampleResult]}
        actionBtnProps={{ showThumbsUpDown: true }}
        feedbackProps={{ showFeedbackModal: true }}
      />
    );

    fireEvent.click(screen.getAllByRole('button', { name: /thumb_up/i })[0]);
    expect(screen.getByRole('dialog', { name: /Feedback/i })).toBeInTheDocument();
  });
});
