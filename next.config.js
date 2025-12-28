/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for nginx deployment
  output: 'export',
  // basePath: '/portfolio',  // Removed for root domain deployment
  // assetPrefix: '/portfolio',  // Removed for root domain deployment
  trailingSlash: true,

  // Image optimization
  images: {
    unoptimized: true,
  },

  // Performance optimizations
  swcMinify: true,
  compress: true,
  poweredByHeader: false,

  // Production optimizations
  reactStrictMode: true,
  productionBrowserSourceMaps: false,

  // Reduce bundle size
  webpack: (config, { isServer }) => {
    // Don't bundle server-only packages
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
}

module.exports = nextConfig
