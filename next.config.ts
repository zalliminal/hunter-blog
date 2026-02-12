import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable ESLint during production builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Allow production builds to successfully complete even if
  // there are TypeScript type errors.
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
