/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  swcMinify: false,
  experimental: {
    esmExternals: false,
  },
  output: "standalone",
}

module.exports = nextConfig
