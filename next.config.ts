import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Modern replacement for serverComponentsExternalPackages
  serverExternalPackages: ['mongoose'],
  
  // Remove all experimental flags for Turbopack compatibility
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), { mongoose: 'mongoose' }];
    }
    return config;
  },
  typescript: {
    ignoreBuildErrors: true, // Temporary during setup
  }
};

export default nextConfig;