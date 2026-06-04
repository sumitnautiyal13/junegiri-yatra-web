import type { NextConfig } from 'next';

// Content-Security-Policy — allows Next.js inline scripts (needed for JSON-LD + __NEXT_DATA__),
// GTM/GA, WhatsApp widget, and standard CDN assets.
// 'unsafe-inline' on script-src is required while Next.js uses inline hydration scripts.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https: http:",
  "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://stats.g.doubleclick.net",
  "frame-src https://www.google.com https://www.youtube.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://wa.me https://api.whatsapp.com",
  "upgrade-insecure-requests",
].join('; ');

const SECURITY_HEADERS = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // Strengthened HSTS: 2 years, include subdomains, eligible for preload list
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Content-Security-Policy', value: CSP },
];

const nextConfig: NextConfig = {
  compress: true,
  trailingSlash: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    remotePatterns: [
      { protocol: 'https', hostname: 'junegiriyatra.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'source.unsplash.com' },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: SECURITY_HEADERS,
      },
      {
        source: '/admin/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/p/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/api/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        // Cache static assets for 1 year
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Cache fonts for 1 year
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // ISR HTML pages: serve stale for 24 h while revalidating in background
        // Vercel edge cache will pick this up via s-maxage
        source: '/((?!_next|images|api|admin|p).*)',
        headers: [
          { key: 'Cache-Control', value: 's-maxage=86400, stale-while-revalidate=604800' },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // www → non-www canonical redirect (301, not Vercel's default 308)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.junegiriyatra.com' }],
        destination: 'https://junegiriyatra.com/:path*',
        permanent: true,
      },
      // Legacy/wrong package slugs → correct slugs (permanent 308)
      // NOTE: char-dham-yatra, rishikesh-adventures, golden-triangle are HUB CONTENT PAGES
      // — redirect rules removed so generateStaticParams serves the hub page correctly.
      // himalayan-treks has a dedicated top-level route (/himalayan-treks/) so redirect stays.
      { source: '/packages/himalayan-treks/', destination: '/himalayan-treks/', permanent: true },
      { source: '/packages/international/', destination: '/packages/thailand-tour-7n-8d/', permanent: true },
      // Blog-post related_package slugs that were wrong — redirect old crawled URLs
      { source: '/packages/kedarnath-yatra-5n-6d/', destination: '/packages/kedarnath-yatra-3n-4d/', permanent: true },
      { source: '/packages/kedarkantha-trek-5d/', destination: '/packages/kedarkantha-trek-5n-6d/', permanent: true },
      { source: '/packages/valley-of-flowers-trek-4d/', destination: '/packages/valley-of-flowers-trek-4n-5d/', permanent: true },
      { source: '/packages/valley-of-flowers-4n-5d/', destination: '/packages/valley-of-flowers-trek-4n-5d/', permanent: true },
      { source: '/packages/rishikesh-adventure-3n-4d/', destination: '/packages/rishikesh-adventure-pack-2n-3d/', permanent: true },
      { source: '/packages/rishikesh-adventure-2n-3d/', destination: '/packages/rishikesh-adventure-pack-2n-3d/', permanent: true },
      { source: '/packages/rishikesh-haridwar-weekend-2n-3d/', destination: '/packages/haridwar-rishikesh-spiritual-3n-4d/', permanent: true },
      { source: '/packages/auli-skiing-5d/', destination: '/packages/auli-snow-trip-3n-4d/', permanent: true },
      { source: '/packages/golden-triangle-5d/', destination: '/packages/golden-triangle-tour-5n-6d/', permanent: true },
      { source: '/packages/rishikesh-yoga-retreat-7d/', destination: '/packages/rishikesh-yoga-retreat-5n-6d/', permanent: true },
      { source: '/packages/braj-bhoomi-yatra/', destination: '/packages/braj-bhoomi-yatra-5n-6d/', permanent: true },
      { source: '/packages/mussoorie-tour-2n-3d/', destination: '/packages/mussoorie-dehradun-3n-4d/', permanent: true },
      { source: '/packages/nainital-tour-3n-4d/', destination: '/packages/nainital-jim-corbett-4n-5d/', permanent: true },
    ];
  },
};

export default nextConfig;
