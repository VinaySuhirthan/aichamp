import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
  // Enable strict mode for better React error detection
  reactStrictMode: true,
};

export default nextConfig;
