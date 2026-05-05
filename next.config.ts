import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'junegiriyatra.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  // Output for Vercel deployment (default) — or use 'export' for static
  // output: 'export', // Uncomment for pure static export
};

export default nextConfig;
