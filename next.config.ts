import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    HOST: "http://localhost:3000",
  },
  /* config options here */
};

export default nextConfig;
