/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      { source: '/index.html', destination: '/' },
    ];
  },
};

module.exports = nextConfig;
