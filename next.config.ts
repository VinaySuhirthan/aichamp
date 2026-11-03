import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["169.254.181.71", "localhost"],
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
  // Enable strict mode for better React error detection
  reactStrictMode: true,
};

export default nextConfig;
