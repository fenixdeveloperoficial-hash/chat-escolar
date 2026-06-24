import DOMPurify from 'isomorphic-dompurify';

export function sanitizeText(raw: string): string {
  return DOMPurify.sanitize(raw, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
}
