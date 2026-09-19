import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * URL canonicalisation — ONE hop, always.
 *
 * Previously the trailing-slash rule lived in next.config.ts redirects AND the
 * www/https/lowercase rules lived in middleware.ts, so a URL like
 * http://lesepavistespro.com/Epaviste/ took several hops before reaching its
 * canonical form. This computes the final URL in one pass and issues a single
 * 308, in this order:
 *   1. .com → .fr          (domain consolidation)
 *   2. http → https
 *   3. apex → www
 *   4. lowercase path
 *   5. strip trailing slash (except the root)
 *
 * The target is built as a PLAIN URL rather than by mutating req.nextUrl:
 * NextURL.toString() re-appends a trailing slash that its own pathname setter
 * reports as removed, which would redirect a trailing-slash URL to itself
 * forever.
 *
 * Renamed from middleware.ts: Next 16 deprecates the "middleware" file
 * convention in favour of "proxy". Same matcher, same behaviour.
 */
export function proxy(req: NextRequest) {
  const { hostname, protocol, pathname, search } = req.nextUrl;

  // Local development is never canonicalised.
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.includes('.local')) {
    return NextResponse.next();
  }

  // 1. Domain consolidation: .com → .fr
  let host = hostname.includes('lesepavistespro.com') ? 'www.lesepavistespro.fr' : hostname;

  // 3. Force the www subdomain
  if (!host.startsWith('www.')) host = `www.${host}`;

  // 4 + 5. Lowercase the path, then drop the trailing slash (except on the root).
  //        Mixed case and a stray slash each duplicate every URL on the site.
  let path = pathname.toLowerCase();
  if (path.length > 1) path = path.replace(/\/+$/, '') || '/';

  // 2. https is enforced by building the target with it.
  const target = `https://${host}${path}${search}`;
  const current = `${protocol}//${hostname}${pathname}${search}`;

  // A single permanent redirect straight to the canonical URL.
  return target === current ? NextResponse.next() : NextResponse.redirect(target, 308);
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
