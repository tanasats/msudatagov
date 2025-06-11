import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pd.msu.ac.th',
        //pathname: '**',
        pathname: '/staff/picture/*',
      },
    ],
  }
};

export default nextConfig;
