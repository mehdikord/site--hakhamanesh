import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Intentionally a Node.js server build; NOT output: 'export'.
  poweredByHeader: false,
  reactStrictMode: true,
  allowedDevOrigins: ['*.e2b.app'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};
export default nextConfig;
