import type { Meta, StoryObj } from '@storybook/react-vite';

import { UniButton } from '../button/UniButton';
import { UNI_CARD_COLOR_PAIRS, UNI_CARD_VARIANTS, UniCard } from './UniCard';

const meta = {
  title: 'ANT/Card',
  component: UniCard,
  tags: ['autodocs'],
  argTypes: {
    cardVariant: {
      control: { type: 'select' },
      options: UNI_CARD_VARIANTS,
    },
    cardColorConfig: {
      control: 'object',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Use `cardVariant` + `variantData` for GuidedFlow-inspired layouts and `cardColorConfig` for header/card color treatments with manual or random 300/700 pair selection.',
      },
    },
  },
} satisfies Meta<typeof UniCard>;

const buttonIcon = {
  colorClass: 'text-neutral1 ant-button-icon',
  iconName: 'edit',
  size: '16',
  isAfter: false,
};

export default meta;

type Story = StoryObj<typeof meta>;

const verifiedBadgeIcon = (
  <svg className="uni-card-variant__badge-icon" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M3.5 8L6.5 11L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const communityBadgeIcon = (
  <svg className="uni-card-variant__badge-icon" viewBox="0 0 16 16" fill="none" aria-hidden>
    <circle cx="8" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.2" />
    <path d="M4.2 12.5C5 10.8 6.3 10 8 10C9.7 10 11 10.8 11.8 12.5" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export const Basic: Story = {
  render: function Render() {
    return (
      <div style={{ padding: '20px' }}>
        <UniCard title="Title" style={{ width: '320px' }} extra={<UniButton type="link">More</UniButton>}>
          <p>card content</p>
          <p>card content</p>
          <p>card content</p>
        </UniCard>
      </div>
    );
  },
};

export const SmallCard: Story = {
  render: function Render() {
    return (
      <div style={{ padding: '20px' }}>
        <UniCard size="small" title="Title" style={{ width: '320px' }} extra={<UniButton type="link">More</UniButton>}>
          <p>card content</p>
          <p>card content</p>
          <p>card content</p>
        </UniCard>
      </div>
    );
  },
};

export const CardWithActions: Story = {
  render: function Render() {
    return (
      <div style={{ padding: '20px' }}>
        <UniCard
          size="small"
          title="Title"
          style={{ width: '320px' }}
          extra={<UniButton type="link">More</UniButton>}
          actions={[
            <UniButton key="edit" type="text" className="ant-btn-with-icon flex" materialIcon={buttonIcon as any}>
              Edit
            </UniButton>,
          ]}
        >
          <p>card content</p>
          <p>card content</p>
          <p>card content</p>
        </UniCard>
      </div>
    );
  },
};

export const ToolRegistryVariant: Story = {
  render: function Render() {
    return (
      <div style={{ padding: '20px', maxWidth: '360px' }}>
        <UniCard
          cardVariant="tool-registry"
          variantData={{
            title: 'Slack Integration',
            description:
              'Connect your agent to Slack to send messages, create channels, and handle interactive workflows.',
            version: 'v1.2.0',
            badges: [{ label: 'Verified', tone: 'verified', icon: verifiedBadgeIcon }],
            chips: ['sendMessage', 'createChannel', 'listUsers'],
            usageLabel: 'Usage',
            usageValue: '12 Projects',
            relatedLabel: 'Used in',
            relatedItems: ['Support Bot', 'Internal Ops'],
          }}
        />
      </div>
    );
  },
};

export const ProjectOverviewVariant: Story = {
  render: function Render() {
    return (
      <div style={{ padding: '20px', maxWidth: '360px' }}>
        <UniCard
          cardVariant="project-overview"
          variantData={{
            title: 'Customer Onboarding AI',
            description: 'Streamlined onboarding workflows with intelligent document routing and agent handoffs.',
            statusLabel: 'Design',
            footerMeta: 'Last modified: 2 days ago',
            actionLabel: 'Open',
          }}
        />
      </div>
    );
  },
};

export const PlatformComponentVariant: Story = {
  render: function Render() {
    return (
      <div style={{ padding: '20px', maxWidth: '360px' }}>
        <UniCard
          cardVariant="platform-component"
          variantData={{
            title: 'RAG Management',
            description:
              'Try out various RAG pipelines, embedding models, ingestion strategies, and evaluation workflows.',
            metric: '475 workflows',
            actionLabel: 'Explore',
          }}
        />
      </div>
    );
  },
};

export const SpotlightVariant: Story = {
  render: function Render() {
    return (
      <div style={{ padding: '20px', maxWidth: '360px' }}>
        <UniCard
          cardVariant="spotlight"
          variantData={{
            title: 'Agentic Workflow Builder',
            description: 'Build and orchestrate multi-agent workflows with production-ready deployment paths.',
            statusLabel: 'Beta',
            footerMeta: 'Last updated: 2 days ago',
            actionLabel: 'Open Experience',
          }}
        />
      </div>
    );
  },
};

export const ColorOptions: Story = {
  render: function Render() {
    return (
      <div style={{ padding: '20px', maxWidth: '360px' }}>
        <UniCard
          cardVariant="tool-registry"
          variantData={{
            title: 'Color Configurable Card',
            description: 'This card uses custom color pairs with random 300/700 selection and header-only application.',
            version: 'v2.3.1',
            chips: ['config', 'theme', 'tokens'],
            usageValue: '6 Projects',
          }}
          cardColorConfig={{
            mode: 'random',
            applyTo: 'header',
            pairs: UNI_CARD_COLOR_PAIRS,
            randomSeed: 'storybook-color-options',
          }}
        />
      </div>
    );
  },
};

export const VariantGallery: Story = {
  render: function Render() {
    return (
      <div
        style={{
          padding: '20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
        }}
      >
        <UniCard
          cardVariant="project-overview"
          variantData={{
            title: 'Help Desk Q&A Assistant',
            description: 'AI-powered support assistant with semantic retrieval and escalation workflows.',
            statusLabel: 'Testing',
            footerMeta: 'Last modified: Today',
            actionLabel: 'Open',
          }}
        />

        <UniCard
          cardVariant="tool-registry"
          variantData={{
            title: 'PostgreSQL Connector',
            description: 'High-performance connector for secure read/write workflows and transaction control.',
            version: 'v2.0.1',
            badges: [
              { label: 'Verified', tone: 'verified', icon: verifiedBadgeIcon },
              { label: 'Community', tone: 'community', icon: communityBadgeIcon },
            ],
            chips: ['query', 'execute', 'transaction'],
            usageValue: '8 Projects',
            relatedItems: ['CRM Sync', 'Data Warehouse'],
          }}
        />

        <UniCard
          cardVariant="platform-component"
          variantData={{
            title: 'Fine Tuning Studio',
            description: 'Retrieval-augmented fine tuning for enterprise-specific model adaptation.',
            metric: '140k curated prompt/response sets',
            actionLabel: 'Explore',
          }}
        />

        <UniCard
          cardVariant="spotlight"
          variantData={{
            title: 'Kickstart AI Journey',
            description: 'Go from ingestion to deployment in a guided multi-step workflow.',
            statusLabel: 'Recommended',
            footerMeta: 'Last updated: Now',
            actionLabel: 'Start Workflow',
          }}
        />
      </div>
    );
  },
};
