import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_HOST: process.env.API_HOST,
    API_PORT: process.env.API_PORT,
    IMAGE_URL: process.env.IMAGE_URL,
    OTEL_COLLECTOR_HOST: process.env.OTEL_COLLECTOR_HOST,
    OTEL_COLLECTOR_PORT: process.env.OTEL_COLLECTOR_PORT,
  },
  images: {
    remotePatterns: [new URL(process.env.IMAGE_URL + "/**")],
  },
  output: "standalone",
};

export default nextConfig;
