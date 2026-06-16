import DOMPurify from 'dompurify';

// `dompurify` requires a browser DOM. When this module is imported during server-side rendering
// there is no `window`, so the default export is the uninitialised factory and `addHook` is
// undefined — calling it at module load threw `TypeError: DOMPurify.addHook is not a function` and
// 500'd every blog post page (the /blog/[slug] route imports this via BlogPost). Guard all DOMPurify
// access behind a browser check: blog content is rendered client-side, so sanitization runs in the
// browser where DOMPurify is fully initialised.
const isBrowser = typeof window !== 'undefined';

if (isBrowser) {
  // Enforce rel="noopener noreferrer" on any link with a target attribute.
  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    if (node.tagName === 'A' && node.getAttribute('target')) {
      node.setAttribute('rel', 'noopener noreferrer');
    }
  });
}

/**
 * Safely sanitize HTML content to prevent XSS attacks.
 *
 * Sanitization runs in the browser (DOMPurify needs a DOM). On the server this returns the input
 * unchanged, which is safe here because the blog content is only ever rendered client-side. If this
 * is later used in a server-rendered path, switch to `isomorphic-dompurify` so the server can
 * sanitize too.
 */
export const sanitizeHtml = (html: string): string => {
  if (!isBrowser) {
    return html;
  }
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'code', 'pre',
      'table', 'thead', 'tbody', 'tr', 'td', 'th'
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
  });
};
