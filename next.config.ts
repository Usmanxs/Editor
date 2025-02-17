import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['next-mdx-remote'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'pdfjs-dist': require.resolve('pdfjs-dist'),
    };
    return config;
  },
};

export default nextConfig;
