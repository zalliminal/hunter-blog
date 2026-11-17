import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for the Docker image: emits .next/standalone with a minimal
  // server.js (no node_modules needed at runtime).
  output: "standalone",
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
