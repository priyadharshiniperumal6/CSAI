import { Link } from 'react-router-dom';

import { UniBreadcrumb } from '../../../components/breadcrumb/UniBreadcrumb';
import { UniCard } from '../../../components/card/UniCard';
import { UniTag } from '../../../components/tag/UniTag';
import { ViewRouteShell } from '../shared/ViewRouteShell';
import { TOKEN_DOC_ROUTE_PATH } from './tokenFilters';

const tokenCommands = [
  {
    command: 'pnpm tokens:generate',
    summary: 'Generates runtime token artifacts from the canonical token source.',
    details: [
      'Writes packages/core/src/generated/uni-token.generated.ts.',
      'Writes packages/core/src/styles/base.tokens.generated.scss.',
      'Run after editing packages/tokens/src/uni-token.js.',
    ],
  },
  {
    command: 'pnpm tokens:check',
    summary: 'Validates token artifact consistency for local checks and CI.',
    details: [
      'Runs token generation.',
      'Fails if generated artifacts differ from committed files.',
      'Use before opening a PR to prevent token drift.',
    ],
  },
  {
    command: 'pnpm tokens:figma:export',
    summary: 'Exports JSON for importing code-authored tokens into Figma.',
    details: [
      'Writes packages/tokens/dist/uni-token.figma.json.',
      'Supports design review and variable import flows in Figma.',
      'Does not change the canonical source token file.',
    ],
  },
  {
    command: 'pnpm -C packages/core build',
    summary: 'Runs the full design-system package build pipeline.',
    details: [
      'Runs token generation as part of the build.',
      'Builds JS/CSS bundles and type declarations into packages/core/dist.',
      'Use for release validation and publish readiness checks.',
    ],
  },
];

const figmaImportSteps = [
  'Update tokens in packages/tokens/src/uni-token.js and commit the change.',
  'Run pnpm tokens:generate to rebuild runtime artifacts used by the design system.',
  'Run pnpm tokens:figma:export to produce packages/tokens/dist/uni-token.figma.json.',
  'In Figma, import the JSON file into your token/variable workflow and review the diff.',
  'Verify Semantic and Base token pages in Dev Runtime and Storybook before merging.',
];

export const AssetTokenDocumentationPage = () => {
  return (
    <ViewRouteShell
      title="Token Management"
      description="Code-first token governance: one canonical token file, generated runtime artifacts, and optional Figma import/export."
      breadcrumbs={
        <UniBreadcrumb
          items={[{ title: <Link to={TOKEN_DOC_ROUTE_PATH}>Design Tokens</Link> }, { title: 'Documentation' }]}
        />
      }
    >
      <div className="dev-token-route-scroll">
        <UniCard className="dev-route-shell__panel" title="Code as Source of Truth" extra={<UniTag>Canonical</UniTag>}>
          <div className="dev-token-doc-grid">
            <div>
              <p className="dev-token-ref-summary-label">Canonical source</p>
              <code>packages/tokens/src/uni-token.js</code>
            </div>
            <div>
              <p className="dev-token-ref-summary-label">Generated runtime token object</p>
              <code>packages/core/src/generated/uni-token.generated.ts</code>
            </div>
            <div>
              <p className="dev-token-ref-summary-label">Generated base CSS variables</p>
              <code>packages/core/src/styles/base.tokens.generated.scss</code>
            </div>
            <div>
              <p className="dev-token-ref-summary-label">Semantic + legacy runtime aliases</p>
              <code>packages/core/src/styles/base.semantic.scss</code>
            </div>
          </div>
          <p className="dev-route-shell__meta">
            Theory: the token object in code is versioned, reviewable, and deterministic. Every runtime output is
            generated from that file to eliminate drift between docs, components, and CSS variables.
          </p>
        </UniCard>

        <UniCard
          className="dev-route-shell__panel"
          title="Commands"
          extra={<UniTag>{`${tokenCommands.length} commands`}</UniTag>}
        >
          <div className="dev-token-doc-command-list">
            {tokenCommands.map(commandDoc => (
              <div key={commandDoc.command} className="dev-token-doc-command-item">
                <code>{commandDoc.command}</code>
                <p className="dev-token-ref-section-description">{commandDoc.summary}</p>
                <ul className="dev-token-doc-command-details">
                  {commandDoc.details.map(detail => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </UniCard>

        <UniCard
          className="dev-route-shell__panel"
          title="Import Tokens to Figma"
          extra={<UniTag>{`${figmaImportSteps.length} steps`}</UniTag>}
        >
          <ol className="dev-token-doc-steps">
            {figmaImportSteps.map(step => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="dev-route-shell__meta">
            Export path: <code>packages/tokens/dist/uni-token.figma.json</code>
          </p>
        </UniCard>
      </div>
    </ViewRouteShell>
  );
};
