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
    HOST: "https://minerva-app.netlify.app",
  },
  /* config options here */
};

export default nextConfig;
