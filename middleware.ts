import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware for SEO canonicalization
 * 1. Force https + www (canonical host)
 * 2. Remove trailing slashes (prevent duplicate content)
 * 3. Lowercase URL paths (prevent duplicate content)
 */
export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = url.hostname;

  // Skip middleware for localhost and development
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.includes('.local')) {
    return NextResponse.next();
  }

  // Force https + www in production
  const isHttp = url.protocol === 'http:';
  const isNonWww = !hostname.startsWith('www.');

  if (isHttp || isNonWww) {
    url.protocol = 'https:';
    if (isNonWww) {
      url.hostname = `www.${hostname}`;
    }
    return NextResponse.redirect(url, 308); // Permanent redirect
  }

  // Remove trailing slashes (except root /)
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.replace(/\/+$/, '');
    return NextResponse.redirect(url, 308);
  }

  // Lowercase URL paths (prevent duplicate content from mixed case)
  const lowercasePath = url.pathname.toLowerCase();
  if (url.pathname !== lowercasePath) {
    url.pathname = lowercasePath;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
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
