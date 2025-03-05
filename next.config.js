/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: false, // Disable Next.js font optimization since we're using Geist
  experimental: {
    // Removing optimizeCss as it's causing build failures
  },
}

module.exports = nextConfig 