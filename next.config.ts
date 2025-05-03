import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_HOST: process.env.API_HOST,
    API_PORT: process.env.API_PORT,
    IMAGE_URL: process.env.IMAGE_URL,
  },
  images: {
    remotePatterns: [new URL("https://media.formula1.com/**")],
  },
};

export default nextConfig;
