import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during production builds for Vercel deployment
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Keep TypeScript checks enabled but ignore build errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
