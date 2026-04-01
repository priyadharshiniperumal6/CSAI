import type { Meta, StoryObj } from '@storybook/react-vite';

import { UniCodeSnippet } from './UniCodeSnippet';

const meta = {
  title: 'REACT-ONLY/Components/UniCodeSnippet',
  component: UniCodeSnippet,
  tags: ['autodocs'],
  args: {
    languageCode: 'language-html',
    codeSnippet: '<div>Hello World</div>',
  },
} satisfies Meta<typeof UniCodeSnippet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
