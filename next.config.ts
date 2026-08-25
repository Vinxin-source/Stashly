import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  // Prevent build from failing on eslint during deploy
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Show TS errors but don't block deploy while we iterate
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
