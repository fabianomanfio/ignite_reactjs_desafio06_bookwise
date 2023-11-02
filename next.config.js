/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['page.tsx', 'api.ts', 'api.tsx'],
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'localhost',
      'lh3.googleusercontent.com',
      'github.com',
    ],
  },
}

module.exports = nextConfig
