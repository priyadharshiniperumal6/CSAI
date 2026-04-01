import type { Meta, StoryObj } from '@storybook/react-vite';
import { UniMarkdownEditor } from './UniMarkdownEditor';

const SAMPLE_MARKDOWN = `# Welcome to UniMarkdownEditor

This is a **lightweight** markdown editor component.

## Features

- 📝 Lightweight textarea-based editor
- 🎨 Monospace font for better code readability
- 🔧 Flexible row sizing configuration
- 📦 Two-way binding support
- ⚡ Use independently or with UniMarkdownRenderer

## Code Example

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

## Lists

- Item A
- Item B
- Item C

Start editing!
`;

const meta = {
  title: 'Components/Markdown/UniMarkdownEditor',
  component: UniMarkdownEditor,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A lightweight markdown editor component using UniTextarea. Perfect for editing markdown content with configurable rows.',
      },
    },
  },
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'The markdown content to edit',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the textarea',
    },
    rows: {
      control: 'number',
      description: 'Number of rows for the textarea',
      min: 1,
      max: 50,
    },
  },
} satisfies Meta<typeof UniMarkdownEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: SAMPLE_MARKDOWN,
    placeholder: 'Enter markdown content...',
    rows: 20,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default editor with sample markdown content and 20 rows of visible text in a card-style container.',
      },
    },
  },
};

export const Empty: Story = {
  args: {
    modelValue: '',
    placeholder: 'Enter your markdown here...',
    rows: 12,
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty editor showing the initial state with placeholder text in a light container.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    modelValue: '# Quick Note\n\nEdit this content...',
    placeholder: 'Quick note...',
    rows: 5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact editor with 5 rows - ideal for inline editing or quick notes.',
      },
    },
  },
};
