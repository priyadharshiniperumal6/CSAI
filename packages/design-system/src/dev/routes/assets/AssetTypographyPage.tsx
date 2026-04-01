import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

import { UniBreadcrumb } from '../../../components/breadcrumb/UniBreadcrumb';
import { UniCard } from '../../../components/card/UniCard';
import { UniTag } from '../../../components/tag/UniTag';
import type { TypographySample } from '../../assets/assetCatalog';
import { typographySamples } from '../../assets/assetCatalog';
import { TOKEN_DOC_ROUTE_PATH } from './tokenFilters';
import { ViewRouteShell } from '../shared/ViewRouteShell';

type TypographyExample = {
  id: string;
  label: string;
  sampleText: string;
  fontSizeVar: string;
  fontSizeFallback: number;
  lineHeightVar: string;
  lineHeightFallback: number;
  fontWeight: number;
  helper?: string;
};

const headingExamples: TypographyExample[] = [
  {
    id: 'h1',
    label: 'Display Heading',
    sampleText: 'Observability Console',
    fontSizeVar: '--btypography-font-size-900',
    fontSizeFallback: 36,
    lineHeightVar: '--btypography-line-height-900',
    lineHeightFallback: 48,
    fontWeight: 700,
    helper: 'Hero-level route heading',
  },
  {
    id: 'h2',
    label: 'Section Heading',
    sampleText: 'Workflow Performance',
    fontSizeVar: '--btypography-font-size-700',
    fontSizeFallback: 28,
    lineHeightVar: '--btypography-line-height-700',
    lineHeightFallback: 40,
    fontWeight: 600,
    helper: 'Primary section title',
  },
  {
    id: 'h3',
    label: 'Panel Heading',
    sampleText: 'Recent Incidents',
    fontSizeVar: '--btypography-font-size-500',
    fontSizeFallback: 20,
    lineHeightVar: '--btypography-line-height-500',
    lineHeightFallback: 32,
    fontWeight: 600,
    helper: 'Card and panel header',
  },
];

const bodyExamples: TypographyExample[] = [
  {
    id: 'body-default',
    label: 'Body Default',
    sampleText: 'Monitor conversations, triage regressions, and track SLA adherence across teams.',
    fontSizeVar: '--btypography-font-size-300',
    fontSizeFallback: 14,
    lineHeightVar: '--btypography-line-height-300',
    lineHeightFallback: 24,
    fontWeight: 400,
    helper: 'Primary body copy',
  },
  {
    id: 'body-emphasis',
    label: 'Body Emphasis',
    sampleText: 'Escalation required: latency exceeded 900ms in two production regions.',
    fontSizeVar: '--btypography-font-size-300',
    fontSizeFallback: 14,
    lineHeightVar: '--btypography-line-height-300',
    lineHeightFallback: 24,
    fontWeight: 600,
    helper: 'Inline emphasis and alerts',
  },
  {
    id: 'caption',
    label: 'Caption / Metadata',
    sampleText: 'Updated 2m ago · Source: analytics-stream',
    fontSizeVar: '--btypography-font-size-200',
    fontSizeFallback: 12,
    lineHeightVar: '--btypography-line-height-200',
    lineHeightFallback: 20,
    fontWeight: 500,
    helper: 'Supporting metadata',
  },
];

const weightExamples: Array<{ id: string; label: string; weight: number }> = [
  { id: 'weight-400', label: 'Regular 400', weight: 400 },
  { id: 'weight-500', label: 'Medium 500', weight: 500 },
  { id: 'weight-600', label: 'Semibold 600', weight: 600 },
  { id: 'weight-700', label: 'Bold 700', weight: 700 },
];

const buildTokenTypographyStyle = (example: TypographyExample): CSSProperties => {
  return {
    fontFamily: 'var(--btypography-font-family-inter, Inter), sans-serif',
    fontSize: `calc(var(${example.fontSizeVar}, ${example.fontSizeFallback}) * 1px)`,
    lineHeight: `calc(var(${example.lineHeightVar}, ${example.lineHeightFallback}) * 1px)`,
    fontWeight: example.fontWeight,
    color: 'var(--ut-color-text-primary)',
    margin: 0,
  };
};

const buildTypographyStyle = (sample: TypographySample): CSSProperties => {
  return buildTokenTypographyStyle({
    id: sample.id,
    label: sample.label,
    sampleText: sample.sampleText,
    fontSizeVar: sample.fontSizeVar,
    fontSizeFallback: sample.fontSizeFallback,
    lineHeightVar: sample.lineHeightVar,
    lineHeightFallback: sample.lineHeightFallback,
    fontWeight: sample.fontWeight,
    helper: sample.helper,
  });
};

export const AssetTypographyPage = () => {
  return (
    <ViewRouteShell
      title="Typography Explorer"
      description="Tokenized typography scale used by route pages and shell-level metadata."
      breadcrumbs={
        <UniBreadcrumb
          items={[{ title: <Link to={TOKEN_DOC_ROUTE_PATH}>Design Tokens</Link> }, { title: 'Typography' }]}
        />
      }
    >
      <div className="dev-asset-route-scroll">
        <UniCard
          className="dev-route-shell__panel"
          title="Type Specimens"
          extra={<UniTag>{`${typographySamples.length} styles`}</UniTag>}
        >
          {typographySamples.map(sample => (
            <div key={sample.id} className="dev-token-ref-type-row">
              <div>
                <div className="dev-token-ref-type-token">{sample.label}</div>
                <div className="dev-route-shell__meta">{sample.helper}</div>
                <code>{`${sample.fontSizeVar} / ${sample.lineHeightVar}`}</code>
              </div>
              <p style={buildTypographyStyle(sample)}>{sample.sampleText}</p>
              <div className="dev-token-ref-type-value">{`${sample.fontSizeFallback}px`}</div>
            </div>
          ))}
        </UniCard>

        <UniCard
          className="dev-route-shell__panel"
          title="Hierarchy Examples"
          extra={<UniTag>{`${headingExamples.length} examples`}</UniTag>}
        >
          <div className="dev-typography-example-grid">
            {headingExamples.map(example => (
              <div key={example.id} className="dev-typography-example">
                <div className="dev-typography-example__label">{example.label}</div>
                {example.helper ? <div className="dev-route-shell__meta">{example.helper}</div> : null}
                <p className="dev-typography-example__sample" style={buildTokenTypographyStyle(example)}>
                  {example.sampleText}
                </p>
                <code>{`${example.fontSizeVar} / ${example.lineHeightVar}`}</code>
              </div>
            ))}
          </div>
        </UniCard>

        <UniCard
          className="dev-route-shell__panel"
          title="Body and Utility Examples"
          extra={<UniTag>{`${bodyExamples.length} examples`}</UniTag>}
        >
          <div className="dev-typography-example-grid">
            {bodyExamples.map(example => (
              <div key={example.id} className="dev-typography-example">
                <div className="dev-typography-example__label">{example.label}</div>
                {example.helper ? <div className="dev-route-shell__meta">{example.helper}</div> : null}
                <p className="dev-typography-example__sample" style={buildTokenTypographyStyle(example)}>
                  {example.sampleText}
                </p>
                <code>{`${example.fontSizeVar} / ${example.lineHeightVar}`}</code>
              </div>
            ))}
          </div>
        </UniCard>

        <UniCard
          className="dev-route-shell__panel"
          title="Weight Scale"
          extra={<UniTag>{`${weightExamples.length} weights`}</UniTag>}
        >
          <div className="dev-typography-example-grid">
            {weightExamples.map(weightSample => (
              <div key={weightSample.id} className="dev-typography-example">
                <div className="dev-typography-example__label">{weightSample.label}</div>
                <p
                  className="dev-typography-example__sample"
                  style={{
                    fontFamily: 'var(--btypography-font-family-inter, Inter), sans-serif',
                    fontSize: 'calc(var(--btypography-font-size-400, 16) * 1px)',
                    lineHeight: 'calc(var(--btypography-line-height-400, 28) * 1px)',
                    fontWeight: weightSample.weight,
                    color: 'var(--ut-color-text-primary)',
                    margin: 0,
                  }}
                >
                  The quick brown fox jumps over the lazy dog.
                </p>
                <code>{`--btypography-font-weight-normal-${weightSample.weight}`}</code>
              </div>
            ))}
          </div>
        </UniCard>
      </div>
    </ViewRouteShell>
  );
};
