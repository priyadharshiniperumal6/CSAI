import tokenFile from '../../../generated/uni-token.generated';
import type { TokenSet } from './tokenFilters';

type PrimitiveTokenValue = string | number;
interface TokenObject {
  [key: string]: PrimitiveTokenValue | TokenObject;
}

type ColorCategoryId = 'brand' | 'border' | 'content-text' | 'content-icon' | 'fill';
type ScaleCategoryId = 'linewidth' | 'radius' | 'size' | 'spacing' | 'screen';

export type TokenAuditToken = {
  name: string;
  cssVar: string;
  value: PrimitiveTokenValue;
};

export type TokenAuditCategory = {
  id: `color-${ColorCategoryId}` | ScaleCategoryId;
  label: string;
  description: string;
  kind: 'color' | 'scale';
  tokens: TokenAuditToken[];
};

export type TokenAuditModel = {
  tokenSet: TokenSet;
  tokenSetLabel: string;
  summary: string;
  uniqueTokenCount: number;
  totalDisplayedTokens: number;
  categories: TokenAuditCategory[];
};

const tokenSource = tokenFile as TokenObject;

const COLOR_CATEGORY_ORDER: Array<{
  id: ColorCategoryId;
  label: string;
  description: string;
}> = [
  { id: 'brand', label: 'Color · Brand', description: 'Identity and accent palettes.' },
  { id: 'border', label: 'Color · Border', description: 'Strokes, outlines, and separators.' },
  { id: 'content-text', label: 'Color · Content (Text)', description: 'Text-forward content colors.' },
  { id: 'content-icon', label: 'Color · Content (Icon)', description: 'Icon-forward content colors.' },
  { id: 'fill', label: 'Color · Fill', description: 'Background and surface fill colors.' },
];

const SCALE_CATEGORY_ORDER: Array<{
  id: ScaleCategoryId;
  label: string;
  description: string;
}> = [
  { id: 'linewidth', label: 'Linewidth', description: 'Stroke thickness scale.' },
  { id: 'radius', label: 'Radius', description: 'Corner radius scale.' },
  { id: 'size', label: 'Size', description: 'Core size scale.' },
  {
    id: 'spacing',
    label: 'Spacing',
    description: 'Layout spacing scale (base uses the shared `bsize` scale).',
  },
  { id: 'screen', label: 'Screen', description: 'Responsive breakpoint scale.' },
];

const BASE_COLOR_FAMILY_CATEGORY: Record<string, ColorCategoryId> = {
  brand: 'brand',
  primary: 'brand',
  magenta: 'brand',
  neutral: 'border',
  'uni-black': 'border',
  blue: 'content-text',
  indigo: 'content-text',
  purple: 'content-text',
  teal: 'content-icon',
  cyan: 'content-icon',
  lime: 'content-icon',
  red: 'fill',
  orange: 'fill',
  yellow: 'fill',
  gold: 'fill',
  green: 'fill',
};

const isTokenObject = (value: PrimitiveTokenValue | TokenObject | undefined): value is TokenObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isPrimitiveTokenValue = (value: PrimitiveTokenValue | TokenObject | undefined): value is PrimitiveTokenValue =>
  typeof value === 'string' || typeof value === 'number';

const asTokenObject = (value: PrimitiveTokenValue | TokenObject | undefined): TokenObject =>
  isTokenObject(value) ? value : {};

const toTitleCase = (value: string): string =>
  value
    .split('-')
    .map(segment => {
      if (/^\d+$/.test(segment)) {
        return segment;
      }
      if (segment.length <= 2) {
        return segment.toUpperCase();
      }
      return `${segment.charAt(0).toUpperCase()}${segment.slice(1)}`;
    })
    .join(' ');

const buildTokenName = (prefix: string, rawValue: string): string => `${prefix} ${toTitleCase(rawValue)}`.trim();

const sortTokens = (tokens: TokenAuditToken[]): TokenAuditToken[] =>
  [...tokens].sort((leftToken, rightToken) =>
    leftToken.cssVar.localeCompare(rightToken.cssVar, undefined, { numeric: true })
  );

const createColorBuckets = (): Record<ColorCategoryId, TokenAuditToken[]> => ({
  brand: [],
  border: [],
  'content-text': [],
  'content-icon': [],
  fill: [],
});

const buildScaleName = (categoryLabel: string, rawKey: string): string => {
  const formattedKey = toTitleCase(rawKey);
  return formattedKey.toLowerCase().startsWith(categoryLabel.toLowerCase())
    ? formattedKey
    : `${categoryLabel} ${formattedKey}`;
};

const buildScaleTokens = (sourceKey: string, cssVarPrefix: string, categoryLabel: string): TokenAuditToken[] => {
  const source = asTokenObject(tokenSource[sourceKey]);
  return sortTokens(
    Object.entries(source).flatMap(([tokenKey, tokenValue]) => {
      if (!isPrimitiveTokenValue(tokenValue)) {
        return [];
      }
      return [
        {
          name: buildScaleName(categoryLabel, tokenKey),
          cssVar: `${cssVarPrefix}${tokenKey}`,
          value: tokenValue,
        },
      ];
    })
  );
};

const buildSemanticColorBuckets = (): Record<ColorCategoryId, TokenAuditToken[]> => {
  const buckets = createColorBuckets();
  const semanticColors = asTokenObject(tokenSource.ucolor);

  Object.entries(asTokenObject(semanticColors.brand)).forEach(([tokenKey, tokenValue]) => {
    if (!isPrimitiveTokenValue(tokenValue)) {
      return;
    }
    buckets.brand.push({
      name: buildTokenName('Brand', tokenKey),
      cssVar: `--ucolor-brand-${tokenKey}`,
      value: tokenValue,
    });
  });

  Object.entries(semanticColors).forEach(([tokenKey, tokenValue]) => {
    if (!isPrimitiveTokenValue(tokenValue)) {
      return;
    }
    if (tokenKey.startsWith('border-')) {
      buckets.border.push({
        name: buildTokenName('Border', tokenKey.replace(/^border-/, '')),
        cssVar: `--ucolor-${tokenKey}`,
        value: tokenValue,
      });
      return;
    }

    if (tokenKey.startsWith('fill-')) {
      buckets.fill.push({
        name: buildTokenName('Fill', tokenKey.replace(/^fill-/, '')),
        cssVar: `--ucolor-${tokenKey}`,
        value: tokenValue,
      });
    }
  });

  Object.entries(asTokenObject(semanticColors.content)).forEach(([tokenKey, tokenValue]) => {
    if (!isPrimitiveTokenValue(tokenValue)) {
      return;
    }

    if (tokenKey.startsWith('text-')) {
      buckets['content-text'].push({
        name: buildTokenName('Text', tokenKey.replace(/^text-/, '')),
        cssVar: `--ucolor-content-${tokenKey}`,
        value: tokenValue,
      });
      return;
    }

    if (tokenKey.startsWith('icon-')) {
      buckets['content-icon'].push({
        name: buildTokenName('Icon', tokenKey.replace(/^icon-/, '')),
        cssVar: `--ucolor-content-${tokenKey}`,
        value: tokenValue,
      });
    }
  });

  return {
    brand: sortTokens(buckets.brand),
    border: sortTokens(buckets.border),
    'content-text': sortTokens(buckets['content-text']),
    'content-icon': sortTokens(buckets['content-icon']),
    fill: sortTokens(buckets.fill),
  };
};

const buildBaseColorBuckets = (): Record<ColorCategoryId, TokenAuditToken[]> => {
  const buckets = createColorBuckets();
  const baseColors = asTokenObject(tokenSource.bcolor);

  Object.entries(baseColors).forEach(([familyKey, familyTokenValue]) => {
    const familyTokens = asTokenObject(familyTokenValue);
    const targetCategory = BASE_COLOR_FAMILY_CATEGORY[familyKey] ?? 'fill';

    Object.entries(familyTokens).forEach(([tokenKey, tokenValue]) => {
      if (!isPrimitiveTokenValue(tokenValue)) {
        return;
      }
      buckets[targetCategory].push({
        name: `${toTitleCase(familyKey)} ${toTitleCase(tokenKey)}`,
        cssVar: `--bcolor-${familyKey}-${tokenKey}`,
        value: tokenValue,
      });
    });
  });

  return {
    brand: sortTokens(buckets.brand),
    border: sortTokens(buckets.border),
    'content-text': sortTokens(buckets['content-text']),
    'content-icon': sortTokens(buckets['content-icon']),
    fill: sortTokens(buckets.fill),
  };
};

const buildColorCategories = (colorBuckets: Record<ColorCategoryId, TokenAuditToken[]>): TokenAuditCategory[] =>
  COLOR_CATEGORY_ORDER.map(category => ({
    id: `color-${category.id}`,
    label: category.label,
    description: category.description,
    kind: 'color',
    tokens: colorBuckets[category.id],
  }));

const buildScaleCategories = (tokenSet: TokenSet): TokenAuditCategory[] => {
  const scaleSourceKeys: Record<TokenSet, Record<ScaleCategoryId, string>> = {
    semantic: {
      linewidth: 'ulinewidth',
      radius: 'uradius',
      size: 'usize',
      spacing: 'uspacing',
      screen: 'uscreen',
    },
    base: {
      linewidth: 'blinewidth',
      radius: 'bradius',
      size: 'bsize',
      spacing: 'bsize',
      screen: 'bscreen',
    },
  };

  const scalePrefixes: Record<TokenSet, Record<ScaleCategoryId, string>> = {
    semantic: {
      linewidth: '--ulinewidth-',
      radius: '--uradius-',
      size: '--usize-',
      spacing: '--uspacing-',
      screen: '--uscreen-',
    },
    base: {
      linewidth: '--blinewidth-',
      radius: '--bradius-',
      size: '--bsize-',
      spacing: '--bsize-',
      screen: '--bscreen-',
    },
  };

  return SCALE_CATEGORY_ORDER.map(category => ({
    id: category.id,
    label: category.label,
    description: category.description,
    kind: 'scale',
    tokens: buildScaleTokens(
      scaleSourceKeys[tokenSet][category.id],
      scalePrefixes[tokenSet][category.id],
      category.label
    ),
  }));
};

const getUniqueTokenCount = (categories: TokenAuditCategory[]): number =>
  new Set(categories.flatMap(category => category.tokens.map(token => token.cssVar))).size;

const getTotalDisplayedTokenCount = (categories: TokenAuditCategory[]): number =>
  categories.reduce((count, category) => count + category.tokens.length, 0);

export const buildTokenAuditModel = (tokenSet: TokenSet): TokenAuditModel => {
  const tokenSetLabel = tokenSet === 'semantic' ? 'Semantic' : 'Base';
  const colorBuckets = tokenSet === 'semantic' ? buildSemanticColorBuckets() : buildBaseColorBuckets();
  const categories = [...buildColorCategories(colorBuckets), ...buildScaleCategories(tokenSet)];

  return {
    tokenSet,
    tokenSetLabel,
    summary: `Complete ${tokenSetLabel.toLowerCase()} token audit grouped by color and scale categories.`,
    uniqueTokenCount: getUniqueTokenCount(categories),
    totalDisplayedTokens: getTotalDisplayedTokenCount(categories),
    categories,
  };
};
