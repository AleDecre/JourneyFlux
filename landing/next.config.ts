import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: '/JourneyFlux',
  assetPrefix: '/JourneyFlux/',
};

export default nextConfig;
