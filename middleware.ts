import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware to enforce canonical host (www + https)
 * All traffic must go through https://www.lesepavistespro.fr
 */
export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Force https + www
  const isHttp = url.protocol === 'http:';
  const isNonWww = !url.hostname.startsWith('www.');

  if (isHttp || isNonWww) {
    url.protocol = 'https:';
    if (isNonWww && !url.hostname.includes('localhost')) {
      url.hostname = `www.${url.hostname}`;
    }
    return NextResponse.redirect(url.toString(), 308); // Permanent redirect
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
