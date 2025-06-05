import type { NextConfig } from 'next';
import { NextConfigComplete } from 'next/dist/server/config-shared';

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.pdf$/,
      type: 'asset/resource', // permet d'importer les PDF comme URLs
    });

    return config;
  },
  images: {
    domains: [
      'pagead2.googlesyndication.com',
      'googleads.g.doubleclick.net',
      'images.unsplash.com',
      'img.freepik.com',
      'images.radio-canada.ca'
    ],
  },
};

export default nextConfig;
