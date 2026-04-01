import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import tokenFile from '../../../generated/uni-token.generated';
import { UniBreadcrumb } from '../../../components/breadcrumb/UniBreadcrumb';
import { UniCard } from '../../../components/card/UniCard';
import { UniTag } from '../../../components/tag/UniTag';
import { TOKEN_DOC_ROUTE_PATH, parseTokenSetFromPathname } from './tokenFilters';
import { ViewRouteShell } from '../shared/ViewRouteShell';

type PrimitiveTokenValue = string | number;
interface TokenObject {
  [key: string]: PrimitiveTokenValue | TokenObject;
}
type TokenSet = 'semantic' | 'base';

type ColorChip = {
  key: string;
  step: string;
  valueLabel: string;
  colorValue: string;
  cssVar: string;
  mark?: boolean;
};

type ScaleFamily = {
  key: string;
  name: string;
  note?: string;
  chips: ColorChip[];
};

type ColorSubsection = {
  id: string;
  label: string;
  callout?: string;
  badge?: string;
  families: ScaleFamily[];
};

type ScaleRow = {
  key: string;
  value: number;
  cssVar: string;
};

type ScaleSection = {
  id: string;
  label: string;
  rows: ScaleRow[];
};

const tokenSource = tokenFile as unknown as TokenObject;

const asTokenObject = (value: PrimitiveTokenValue | TokenObject | undefined): TokenObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value) ? value : {};

const titleFromTokenKey = (value: string): string =>
  value
    .replace(/^(fill|border|text|icon)-/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, letter => letter.toUpperCase());

const toValueLabel = (value: string): string => (value.toLowerCase().endsWith('73') ? '45% black' : value);

const toFamilyFromBcolor = (familyName: string): ScaleFamily => {
  const source = asTokenObject(asTokenObject(tokenSource.bcolor)[familyName]);
  const noteMap: Record<string, string> = {
    primary: 'Brand teal',
    neutral: 'Blue-tinted grays',
    'uni-black': '22-step true gray',
    red: 'Error / destructive',
    orange: 'Brand / warning',
    gold: 'Warning',
    green: 'Success',
  };

  return {
    key: familyName,
    name: familyName,
    note: noteMap[familyName],
    chips: Object.entries(source).map(([step, value]) => ({
      key: `${familyName}-${step}`,
      step,
      valueLabel: toValueLabel(String(value)),
      colorValue: String(value),
      cssVar: `--bcolor-${familyName}-${step}`,
      mark: familyName === 'primary' && step === '600',
    })),
  };
};

const toBaseSubsections = (): ColorSubsection[] => {
  const brandSource = asTokenObject(asTokenObject(tokenSource.bcolor).brand);

  return [
    {
      id: 'base-brand-primary',
      label: 'Brand Primary',
      callout:
        'colorPrimary in the Ant Design theme is bcolor.primary.600 (#15808C). The .500 value (#449CA7) is a lighter mid-step, not the primary. The outlined swatch below marks .600.',
      families: [toFamilyFromBcolor('primary')],
    },
    {
      id: 'base-neutrals',
      label: 'Neutrals',
      families: [toFamilyFromBcolor('neutral'), toFamilyFromBcolor('uni-black')],
    },
    {
      id: 'base-status-accent',
      label: 'Status & Accent',
      families: [
        toFamilyFromBcolor('red'),
        toFamilyFromBcolor('orange'),
        toFamilyFromBcolor('yellow'),
        toFamilyFromBcolor('gold'),
        toFamilyFromBcolor('green'),
        toFamilyFromBcolor('magenta'),
      ],
    },
    {
      id: 'base-brand-accent',
      label: 'Brand Accent Singles — bcolor.brand',
      families: [
        {
          key: 'brand',
          name: 'brand',
          chips: Object.entries(brandSource).map(([step, value]) => ({
            key: `brand-${step}`,
            step,
            valueLabel: String(value),
            colorValue: String(value),
            cssVar: `--bcolor-brand-${step}`,
          })),
        },
      ],
    },
    {
      id: 'base-orphaned',
      label: 'Orphaned Scales',
      badge: 'Decision needed',
      families: [
        toFamilyFromBcolor('lime'),
        toFamilyFromBcolor('teal'),
        toFamilyFromBcolor('cyan'),
        toFamilyFromBcolor('blue'),
        toFamilyFromBcolor('indigo'),
      ],
    },
    {
      id: 'base-deprecated',
      label: 'Deprecated',
      badge: 'Legacy v1',
      callout: 'Purple was the v1 brand primary and is retained only for migration compatibility.',
      families: [toFamilyFromBcolor('purple')],
    },
  ];
};

const toSemanticSubsections = (): ColorSubsection[] => {
  const ucolor = asTokenObject(tokenSource.ucolor);
  const content = asTokenObject(ucolor.content);

  const toSemanticFamily = (
    key: string,
    prefix: string,
    source: Array<[string, PrimitiveTokenValue | TokenObject]>
  ): ScaleFamily => ({
    key,
    name: key,
    chips: source
      .filter(([, value]) => typeof value === 'string')
      .map(([tokenKey, tokenValue]) => ({
        key: `${key}-${tokenKey}`,
        step: titleFromTokenKey(tokenKey),
        valueLabel: toValueLabel(String(tokenValue)),
        colorValue: String(tokenValue),
        cssVar: `${prefix}${tokenKey}`,
      })),
  });

  const rootEntries = Object.entries(ucolor);

  return [
    {
      id: 'semantic-fill',
      label: 'Fill — ucolor.fill',
      callout:
        'A higher-level CSS variable intent layer also exists in base.semantic.scss (--ut-color-bg-*, --ut-color-text-*, --ut-color-border-*).',
      families: [
        toSemanticFamily(
          'fill',
          '--ucolor-',
          rootEntries.filter(([tokenKey]) => tokenKey.startsWith('fill-'))
        ),
      ],
    },
    {
      id: 'semantic-text',
      label: 'Text — ucolor.text',
      families: [
        toSemanticFamily(
          'text',
          '--ucolor-content-',
          Object.entries(content).filter(([tokenKey]) => tokenKey.startsWith('text-'))
        ),
      ],
    },
    {
      id: 'semantic-border',
      label: 'Border — ucolor.border',
      families: [
        toSemanticFamily(
          'border',
          '--ucolor-',
          rootEntries.filter(([tokenKey]) => tokenKey.startsWith('border-'))
        ),
      ],
    },
    {
      id: 'semantic-icon',
      label: 'Icon — ucolor.icon',
      families: [
        toSemanticFamily(
          'icon',
          '--ucolor-content-',
          Object.entries(content).filter(([tokenKey]) => tokenKey.startsWith('icon-'))
        ),
      ],
    },
    {
      id: 'semantic-brand',
      label: 'Brand — ucolor.brand',
      families: [toSemanticFamily('brand', '--ucolor-brand-', Object.entries(asTokenObject(ucolor.brand)))],
    },
  ];
};

const toScaleSection = (id: string, label: string, sourceKey: string, cssPrefix: string): ScaleSection => {
  const source = asTokenObject(tokenSource[sourceKey]);
  return {
    id,
    label,
    rows: Object.entries(source)
      .map(([tokenKey, value]) => ({
        key: tokenKey,
        value: Number(value),
        cssVar: `${cssPrefix}${tokenKey.replace(/^.*?-/, '')}`,
      }))
      .filter(row => Number.isFinite(row.value)),
  };
};

const getScaleWidth = (id: string, value: number): number => {
  if (value <= 0) return 2;
  if (id === 'screen') return Math.max(12, Math.min(250, value / 7));
  if (id === 'linewidth') return Math.max(12, Math.min(250, value * 18));
  if (id === 'radius') return Math.max(8, Math.min(250, value * 6));
  return Math.max(8, Math.min(250, value * 3));
};

export const AssetTokensPage = () => {
  const location = useLocation();
  const tokenSet = useMemo(() => parseTokenSetFromPathname(location.pathname) as TokenSet, [location.pathname]);

  const isBase = tokenSet === 'base';
  const tokenSetLabel = isBase ? 'Base' : 'Semantic';

  const colorSubsections = useMemo(() => (isBase ? toBaseSubsections() : toSemanticSubsections()), [isBase]);

  const scaleSections = useMemo(
    () =>
      isBase
        ? [
            toScaleSection('size', 'Sizing — bsize', 'bsize', '--bsize-'),
            toScaleSection('radius', 'Radius — bradius', 'bradius', '--bradius-'),
            toScaleSection('linewidth', 'Border Width — blinewidth', 'blinewidth', '--blinewidth-'),
            toScaleSection('screen', 'Breakpoints — bscreen', 'bscreen', '--bscreen-'),
          ]
        : [
            toScaleSection('spacing', 'Spacing — uspacing', 'uspacing', '--uspacing-'),
            toScaleSection('size', 'Sizing — usize', 'usize', '--usize-'),
            toScaleSection('radius', 'Radius — uradius', 'uradius', '--uradius-'),
            toScaleSection('linewidth', 'Border Width — ulinewidth', 'ulinewidth', '--ulinewidth-'),
            toScaleSection('screen', 'Breakpoints — uscreen', 'uscreen', '--uscreen-'),
          ],
    [isBase]
  );

  const colorChipCount = colorSubsections.reduce(
    (count, subsection) =>
      count + subsection.families.reduce((familyCount, family) => familyCount + family.chips.length, 0),
    0
  );

  return (
    <ViewRouteShell
      title="Tokens"
      description={`${tokenSetLabel} color and scale reference with HTML-matched subsection order and chip layout.`}
      breadcrumbs={
        <UniBreadcrumb
          items={[{ title: <Link to={TOKEN_DOC_ROUTE_PATH}>Design Tokens</Link> }, { title: tokenSetLabel }]}
        />
      }
    >
      <div className="dev-token-route-scroll">
        <UniCard
          className="dev-route-shell__panel"
          title={`${tokenSetLabel} Token Reference`}
          extra={<UniTag>{`${colorChipCount} chips`}</UniTag>}
        >
          <div className="dev-token-ref-layout">
            <aside className="dev-token-ref-sidebar-card">
              <p className="dev-token-ref-sidebar-label">Contents</p>
              <nav className="dev-token-ref-sidebar-nav">
                {colorSubsections.map(subsection => (
                  <a key={subsection.id} href={`#${subsection.id}`}>
                    {subsection.label}
                  </a>
                ))}
                {scaleSections.map(section => (
                  <a key={section.id} href={`#scale-${section.id}`}>
                    {section.label}
                  </a>
                ))}
              </nav>
            </aside>

            <main className="dev-token-ref-content">
              <section className="dev-token-html-section" id={isBase ? 'colors-base' : 'colors-semantic'}>
                <div className="dev-token-html-section-hd">
                  <h2>{isBase ? 'Base Colour Palette — bcolor' : 'Semantic Colour Layer — ucolor'}</h2>
                  <p>
                    {isBase
                      ? 'The full primitive palette. Use semantic tokens (ucolor) in components; these base scales are for theme building.'
                      : 'Use semantic tokens in components. They express intent rather than raw colour values.'}
                  </p>
                </div>

                {colorSubsections.map(subsection => (
                  <div key={subsection.id} className="dev-token-html-subsection" id={subsection.id}>
                    <p className="dev-token-html-sub-label">
                      {subsection.label}
                      {subsection.badge ? <span className="dev-token-html-badge">{subsection.badge}</span> : null}
                    </p>
                    {subsection.callout ? <div className="dev-token-ref-callout">{subsection.callout}</div> : null}

                    {subsection.families.map(family => (
                      <div key={family.key} className="dev-token-scale-row">
                        <div className="dev-token-scale-lbl">
                          <p className="dev-token-scale-name">{family.name}</p>
                          {family.note ? <p className="dev-token-scale-note">{family.note}</p> : null}
                        </div>
                        <div className="dev-token-swatches">
                          {family.chips.map(chip => (
                            <div key={chip.key} className={`dev-token-sw ${chip.mark ? 'dev-token-sw--mark' : ''}`}>
                              <span
                                className="dev-token-sw-block"
                                style={{ backgroundColor: `var(${chip.cssVar}, ${chip.colorValue})` }}
                              />
                              <span className="dev-token-sw-step">{chip.mark ? `${chip.step} ✦` : chip.step}</span>
                              <span className="dev-token-sw-hex">{chip.valueLabel}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </section>

              <section className="dev-token-html-section" id="scale-section">
                <div className="dev-token-html-section-hd">
                  <h2>{isBase ? 'Scale Tokens — Base' : 'Scale Tokens — Semantic'}</h2>
                  <p>
                    Spacing, sizing, radius, border width, and breakpoint scales displayed in the same chip-first
                    reference style.
                  </p>
                </div>
                {scaleSections.map(section => (
                  <div key={section.id} className="dev-token-html-subsection" id={`scale-${section.id}`}>
                    <p className="dev-token-html-sub-label">{section.label}</p>
                    <div className="dev-token-ref-row-list">
                      {section.rows.map(row => (
                        <div key={row.key} className="dev-token-ref-scale-row">
                          <div className="dev-token-ref-meta">
                            <span className="dev-token-ref-name">{row.key}</span>
                            <code>{row.cssVar}</code>
                          </div>
                          <div className="dev-token-ref-scale-track">
                            <span
                              className="dev-token-ref-scale-fill"
                              style={{ width: `${getScaleWidth(section.id, row.value)}px` }}
                            />
                          </div>
                          <span className="dev-token-ref-type-value">{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            </main>
          </div>
        </UniCard>
      </div>
    </ViewRouteShell>
  );
};
