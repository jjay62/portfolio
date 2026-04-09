import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin project root so Turbopack does not pick up a parent folder package-lock.json
    root: process.cwd(),
  },
};

export default nextConfig;
