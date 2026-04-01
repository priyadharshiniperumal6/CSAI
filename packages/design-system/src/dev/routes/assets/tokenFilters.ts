export const TOKEN_DOC_ROUTE_PATH = '/assets/tokens';

export const TOKEN_SETS = ['semantic', 'base'] as const;

export type TokenSet = (typeof TOKEN_SETS)[number];

export const TOKEN_SET_ROUTE_PATHS: Record<TokenSet, string> = {
  semantic: `${TOKEN_DOC_ROUTE_PATH}/semantic`,
  base: `${TOKEN_DOC_ROUTE_PATH}/base`,
};

export const TOKEN_SECTION_KEYS = ['documentation', ...TOKEN_SETS] as const;

export type TokenSectionKey = (typeof TOKEN_SECTION_KEYS)[number];

export const TOKEN_SECTION_ROUTE_PATHS: Record<TokenSectionKey, string> = {
  documentation: TOKEN_DOC_ROUTE_PATH,
  semantic: TOKEN_SET_ROUTE_PATHS.semantic,
  base: TOKEN_SET_ROUTE_PATHS.base,
};

export const TOKEN_SECTION_LABELS: Record<TokenSectionKey, string> = {
  documentation: 'Documentation',
  semantic: 'Semantic',
  base: 'Base',
};

export const parseTokenSectionFromPathname = (pathname: string): TokenSectionKey => {
  const normalizedPath = pathname.replace(/\/+$/, '');
  if (normalizedPath.endsWith('/semantic')) {
    return 'semantic';
  }
  if (normalizedPath.endsWith('/base')) {
    return 'base';
  }
  return 'documentation';
};

export const parseTokenSetFromPathname = (pathname: string): TokenSet => {
  const tokenSection = parseTokenSectionFromPathname(pathname);
  if (tokenSection === 'base') {
    return 'base';
  }
  return 'semantic';
};
