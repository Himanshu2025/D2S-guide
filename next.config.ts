import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.formula1.com",
        pathname: "/content/dam/**",
      },
    ],
  },
};

export default nextConfig;
