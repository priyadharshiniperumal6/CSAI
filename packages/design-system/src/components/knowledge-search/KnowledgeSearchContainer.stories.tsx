import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { KnowledgeSearchContainer } from './KnowledgeSearchContainer';
import type { KnowledgeSearchResult } from './types';

const sampleResults: KnowledgeSearchResult[] = [
  {
    query: 'Tell me about the product roadmap',
    isLoading: false,
    response: '<strong>Roadmap:</strong> Q1 focuses on AI enhancements, Q2 on integrations.',
    id: '1',
    key: '1',
    sources: [
      {
        importance: 0.92,
        content: 'Quarterly planning document',
        parentDocName: 'Roadmap.pdf',
      },
    ],
    factualityScore: 0.87,
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
  },
];

const meta: Meta<typeof KnowledgeSearchContainer> = {
  title: 'REACT-ONLY/Components/KnowledgeSearchContainer',
  component: KnowledgeSearchContainer,
  tags: ['autodocs'],
  args: {
    actionBtnProps: { showThumbsUpDown: true, showSources: true, disableThumbsUpDownAfterClick: false },
    sourceProps: { displayScore: true },
  },
};

export default meta;

type Story = StoryObj<typeof KnowledgeSearchContainer>;

export const Default: Story = {
  render: args => {
    const [results, setResults] = useState<KnowledgeSearchResult[]>(sampleResults);
    return (
      <KnowledgeSearchContainer
        {...args}
        searchResults={results}
        onSearch={({ searchQuery }) => {
          setResults(prev => [
            ...prev,
            {
              ...sampleResults[0],
              key: String(prev.length + 1),
              id: prev.length + 1,
              query: searchQuery,
              response: `You searched for ${searchQuery}`,
            },
          ]);
        }}
      />
    );
  },
};
