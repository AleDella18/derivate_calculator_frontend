import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/backend/:path*",
        destination:
          "https://www.api-derivative-calculator.duckdns.org/:path*",
      },
    ];
  },
};

export default nextConfig;