import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ── Desativa cache de página no servidor (App Router) ──
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },

  // ── Headers HTTP para cada resposta ──
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co',       port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos',      port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'ibb.co',             port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'i.ibb.co',           port: '', pathname: '/**' },
    ],
  },
};

export default nextConfig;