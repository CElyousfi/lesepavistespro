import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * URL canonicalisation — ONE hop, always.
 *
 * Previously the trailing-slash rule lived in next.config.ts redirects AND the
 * www/https/lowercase rules lived here, so a URL like
 * http://lesepavistespro.com/Epaviste/ took several hops before reaching its
 * canonical form. This computes the final URL in one pass and issues a single
 * 308, in this order:
 *   1. .com → .fr          (domain consolidation)
 *   2. http → https
 *   3. apex → www
 *   4. lowercase path
 *   5. strip trailing slash (except the root)
 *
 * Renamed from middleware.ts: Next 16 deprecates the "middleware" file
 * convention in favour of "proxy". Same matcher, same behaviour.
 */
export function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = url.hostname;

  // Local development is never canonicalised.
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.includes('.local')) {
    return NextResponse.next();
  }

  let changed = false;

  // 1. Domain consolidation: .com → .fr
  if (hostname.includes('lesepavistespro.com')) {
    url.hostname = 'www.lesepavistespro.fr';
    changed = true;
  }

  // 2. Force https
  if (url.protocol === 'http:') {
    url.protocol = 'https:';
    changed = true;
  }

  // 3. Force the www subdomain
  if (!url.hostname.startsWith('www.')) {
    url.hostname = `www.${url.hostname}`;
    changed = true;
  }

  // 4. Lowercase the path (mixed case would otherwise duplicate every URL)
  const lowercased = url.pathname.toLowerCase();
  if (url.pathname !== lowercased) {
    url.pathname = lowercased;
    changed = true;
  }

  // 5. Strip the trailing slash (except on the root)
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.replace(/\/+$/, '') || '/';
    changed = true;
  }

  // A single permanent redirect straight to the canonical URL.
  return changed ? NextResponse.redirect(url, 308) : NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, icon.png, apple-icon.png (icons)
     * - sitemap files
     * - robots.txt
     */
    '/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|sitemap|robots.txt).*)',
  ],
};
