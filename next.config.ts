import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.gastronom.ru",
      },
    ],
  },
};

export default nextConfig;
