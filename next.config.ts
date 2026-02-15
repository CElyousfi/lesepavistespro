import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React strict mode for better development experience
  reactStrictMode: true,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year cache for immutable images
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compression
  compress: true,

  // Remove X-Powered-By header (security)
  poweredByHeader: false,

  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@phosphor-icons/react', 'lucide-react'],
  },

  // Security & SEO headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // DNS prefetch
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          // HSTS - force HTTPS (Google ranking factor)
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          // Prevent clickjacking
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Prevent MIME sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // XSS protection
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          // Referrer policy
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Permissions policy
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()' },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com https://va.vercel-scripts.com",
              "frame-ancestors 'self'",
              "frame-src 'self' https://www.google.com https://maps.google.com",
            ].join('; '),
          },
        ],
      },
      // Aggressive caching for static assets
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/blog/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
    ];
  },

  // SEO redirects
  async redirects() {
    return [
      // Trailing slashes (prevent duplicate content)
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
      // Common typos / old URLs
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/rachat',
        destination: '/rachat-voiture',
        permanent: true,
      },
      {
        source: '/destruction',
        destination: '/conformite-vhu',
        permanent: true,
      },
      {
        source: '/vhu',
        destination: '/conformite-vhu',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
