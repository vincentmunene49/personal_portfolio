import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Simple Icons CDN — used for tech stack logos in the Stack section.
      // No npm package needed; SVGs are fetched at build time via next/image.
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
    ],
  },
};

export default nextConfig;
