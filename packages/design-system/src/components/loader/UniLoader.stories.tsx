import type { Meta, StoryObj } from '@storybook/react-vite';
import { UniLoader } from './UniLoader';
import type { UniLoaderSize } from './UniLoader';

const meta = {
  title: 'UNI-COMPONENTS/Loader',
  component: UniLoader,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
      description: 'Size of the loader',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
  },
} satisfies Meta<typeof UniLoader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
  },
};

const sizes: { size: UniLoaderSize; label: string; px: number }[] = [
  { size: 'sm', label: 'Small', px: 20 },
  { size: 'md', label: 'Medium', px: 24 },
  { size: 'lg', label: 'Large', px: 32 },
  { size: 'xl', label: 'Extra Large', px: 48 },
  { size: '2xl', label: '2XL', px: 64 },
  { size: '3xl', label: '3XL', px: 128 },
  { size: '4xl', label: '4XL', px: 256 },
];

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 32 }}>
      {sizes.map(({ size, label, px }) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <UniLoader size={size} />
          <span style={{ fontSize: 12, color: '#666' }}>
            {label} ({px}px)
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Medium: Story = {
  args: { size: 'md' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const ExtraLarge: Story = {
  args: { size: 'xl' },
};

export const TwoXL: Story = {
  args: { size: '2xl' },
};

export const ThreeXL: Story = {
  args: { size: '3xl' },
};

export const FourXL: Story = {
  args: { size: '4xl' },
};
