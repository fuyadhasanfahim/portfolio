import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Hide the on-screen Next.js dev indicator ("N" badge) during development.
  devIndicators: false,
};

export default nextConfig;
