import type { MarkedOptions } from 'marked';

export const MARKDOWN_PRESETS = {
  minimal: {
    breaks: false,
    gfm: true,
  } as MarkedOptions,
  standard: {
    breaks: true,
    gfm: true,
    pedantic: false,
  } as MarkedOptions,
  extended: {
    breaks: true,
    gfm: true,
    pedantic: false,
  } as MarkedOptions,
};

export const MARKED_CONFIGS = {
  github: {
    breaks: true,
    gfm: true,
  } as MarkedOptions,
  commonmark: {
    breaks: false,
    gfm: false,
    pedantic: true,
  } as MarkedOptions,
  relaxed: {
    breaks: true,
    gfm: true,
    pedantic: false,
  } as MarkedOptions,
};
