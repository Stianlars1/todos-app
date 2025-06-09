import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "node:path";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: false,
    serverMinification: true,
    serverActions: {
      bodySizeLimit: "200mb",
    },
    reactCompiler: true,
    viewTransition: true,
    optimizePackageImports: [],
  },
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.resolve(process.cwd(), "src")],
  },
  compress: true,
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "storage.cloud.google.com",
        port: "",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
