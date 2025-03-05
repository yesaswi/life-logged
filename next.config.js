/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: false, // Disable Next.js font optimization since we're using Geist
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig 