// Utility helpers to expose design tokens to the React bundle.
// This reads generated runtime artifacts built from packages/tokens/src/uni-token.js.
import tokenFile from '../generated/uni-token.generated';

interface TokenRecord {
  [key: string]: string | number | TokenRecord | Array<string | number | TokenRecord>;
}

const collectTokens = (source: TokenRecord | undefined, base = '-', target: Record<string, string | number> = {}) => {
  if (!source) {
    return target;
  }
  Object.entries(source).forEach(([key, value]) => {
    const nextBase = `${base}${Array.isArray(source) ? '' : `-${key}`}`;
    if (value !== null && typeof value === 'object') {
      collectTokens(value as TokenRecord, nextBase, target);
      return;
    }
    target[nextBase] = value as string | number;
  });
  return target;
};

export const getAllColors = () => {
  const allColors: Record<string, string | number> = {};
  collectTokens(
    {
      color: (tokenFile as any).color,
      bcolor: (tokenFile as any).bcolor,
      ucolor: (tokenFile as any).ucolor,
    },
    '-',
    allColors
  );
  return allColors;
};

export const getAllSizes = () => {
  const allSizes: Record<string, string | number> = {};
  collectTokens({ bsize: (tokenFile as any).bsize }, '-', allSizes);
  return allSizes;
};

export const getAllRadius = () => {
  const allRadius: Record<string, string | number> = {};
  collectTokens({ bradius: (tokenFile as any).bradius }, '-', allRadius);
  return allRadius;
};

export const getAllLineWidth = () => {
  const allLineWidth: Record<string, string | number> = {};
  collectTokens(
    {
      linewidth: (tokenFile as any).linewidth,
      blinewidth: (tokenFile as any).blinewidth,
    },
    '-',
    allLineWidth
  );
  return allLineWidth;
};

export const allColors = getAllColors();
export const allSizes = getAllSizes();
export const allRadius = getAllRadius();
export const allLineWidth = getAllLineWidth();
