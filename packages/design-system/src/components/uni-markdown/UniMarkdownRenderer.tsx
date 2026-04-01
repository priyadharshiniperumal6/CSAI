import { useMemo } from 'react';
import classNames from 'classnames';
import { marked, type MarkedOptions } from 'marked';
import DOMPurify from 'dompurify';

export type UniMarkdownRendererProps = {
  content?: string;
  markedOptions?: MarkedOptions;
  containerClass?: string;
  breaks?: boolean;
  renderer?: any;
  tokenizer?: any;
  hooks?: any;
  extensions?: any;
  async?: boolean;
  gfm?: boolean;
  pedantic?: boolean;
  silent?: boolean;
  walkTokens?: ((token: any) => void | Promise<void>) | undefined;
  sanitize?: boolean;
};

const buildMarkedOptions = (props: UniMarkdownRendererProps): MarkedOptions => {
  const options: MarkedOptions = {
    breaks: props.breaks ?? true,
    gfm: props.gfm ?? true,
    pedantic: props.pedantic ?? false,
    async: props.async ?? false,
    silent: props.silent ?? false,
    ...props.markedOptions,
  };

  if (props.extensions) options.extensions = props.extensions;
  if (props.renderer) options.renderer = props.renderer;
  if (props.tokenizer) options.tokenizer = props.tokenizer;
  if (props.hooks) options.hooks = props.hooks;
  if (props.walkTokens) options.walkTokens = props.walkTokens;

  return options;
};

export const UniMarkdownRenderer = ({
  content = '',
  containerClass,
  sanitize = true,
  ...rest
}: UniMarkdownRendererProps) => {
  const renderedHtml = useMemo(() => {
    try {
      if (!content || content.trim() === '') {
        return '';
      }
      const options = buildMarkedOptions({ content, sanitize, ...rest });
      let html = marked.parse(content, options) as string;

      if (sanitize) {
        html = DOMPurify.sanitize(html, {
          ALLOWED_TAGS: [
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'p',
            'a',
            'strong',
            'em',
            'code',
            'pre',
            'blockquote',
            'ul',
            'ol',
            'li',
            'table',
            'thead',
            'tbody',
            'tfoot',
            'tr',
            'th',
            'td',
            'hr',
            'br',
            'img',
            'del',
            's',
            'input',
          ],
          ALLOWED_ATTR: ['href', 'title', 'alt', 'src', 'type', 'checked', 'disabled'],
        });
      }

      return html;
    } catch (error) {
      return `<p class="text-sm text-red">Error rendering markdown: ${String(error)}</p>`;
    }
  }, [content, rest, sanitize]);

  return (
    <div className={classNames(containerClass)}>
      {renderedHtml ? (
        <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: renderedHtml }} />
      ) : (
        <div className="italic">
          <p className="text-sm">No content to render</p>
        </div>
      )}
    </div>
  );
};
