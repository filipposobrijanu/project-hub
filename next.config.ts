import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // μόνο αν είσαι σίγουρος ότι είναι ψευδή errors
  },
};

export default nextConfig;
