import type { Meta, StoryObj } from '@storybook/react-vite';
import { UniMarkdownRenderer } from './UniMarkdownRenderer';
import { MARKED_CONFIGS } from './UniMarkdownType';

const SAMPLE_MARKDOWN = `# Welcome to UniMarkdownRenderer

This is a **powerful** markdown renderer component with GitHub-flavored styling.

## Features

- 🎨 Beautiful styling (GitHub-flavored)
- 🔧 Highly customizable with marked.js options
- ✅ Support for tables, strikethrough, and more
- 🎯 Read-only preview component

## Code Example

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

## Table Example

| Feature | Status | Notes |
|---------|--------|-------|
| Rendering | ✅ | Beautiful markdown rendering |
| Styling | ✅ | GitHub-flavored markdown |
| Custom Options | ✅ | Full marked.js support |

---

Happy markdown editing!
`;

const meta = {
  title: 'Components/Markdown/UniMarkdownRenderer',
  component: UniMarkdownRenderer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A read-only markdown renderer component. Renders formatted markdown content powered by marked.js with GitHub Flavored Markdown support.',
      },
    },
  },
} satisfies Meta<typeof UniMarkdownRenderer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: SAMPLE_MARKDOWN,
    containerClass: 'p-6 border rounded-lg bg-white shadow-sm',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default renderer with card-style container showing headings, lists, code blocks, tables, blockquotes, and more.',
      },
    },
  },
};

export const Empty: Story = {
  args: {
    content: '',
    containerClass: 'p-4 border rounded-lg bg-gray-50',
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state showing how the renderer handles no content gracefully with a light gray container.',
      },
    },
  },
};

export const WithCustomOptions: Story = {
  args: {
    content: SAMPLE_MARKDOWN,
    markedOptions: MARKED_CONFIGS.github,
    breaks: true,
    containerClass: 'p-6 bg-blue-50 border-l-4 border-blue-500 rounded',
  },
  parameters: {
    docs: {
      description: {
        story: 'Renderer with custom GitHub Flavored Markdown configuration and left-accent container styling.',
      },
    },
  },
};
