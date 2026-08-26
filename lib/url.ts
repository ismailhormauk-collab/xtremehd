import { SITE_URL } from './contact';

/**
 * Returns the full canonical URL for a given path.
 * Home → https://iptvxtremehd.net  (no trailing slash)
 */
export function absoluteUrl(path: string = '/'): string {
  const p = path === '' ? '/' : path.startsWith('/') ? path : `/${path}`;
  return p === '/' ? SITE_URL : `${SITE_URL}${p}`;
}
