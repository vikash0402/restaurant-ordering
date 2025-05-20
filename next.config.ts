import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "www.cubesnjuliennes.com",
      "www.onceuponachef.com",
      "www.foodnetwork.com",
      "cdn.loveandlemons.com",
      "images.immediate.co.uk",
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
