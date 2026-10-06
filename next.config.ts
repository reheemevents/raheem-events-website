import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // One canonical host: www.raheemevents.com currently serves a duplicate copy of the site
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.raheemevents.com" }],
        destination: "https://raheemevents.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
