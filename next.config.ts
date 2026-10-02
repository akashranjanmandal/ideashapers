import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Old template pages — the real content lives in homepage sections.
    return [
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/work", destination: "/#work", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },
};

export default nextConfig;
