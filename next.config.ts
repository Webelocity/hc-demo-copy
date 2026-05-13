import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Parent folder (D:\Webelocity) has its own package-lock.json; without this,
  // Next infers the wrong workspace root for output file tracing.
  outputFileTracingRoot: path.join(__dirname),
  /* config options here */
  env: {
    EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
    EMAILJS_USER_ID: process.env.EMAILJS_USER_ID,
  },
  transpilePackages: ['mui-tel-input'],
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'shippo-static.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'toolswift.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'strapi.hcinc.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'toolswift.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      // Add your production Strapi domain here:
      // {
      //   protocol: 'https',
      //   hostname: 'your-strapi-domain.com',
      //   pathname: '/uploads/**',
      // },
    ],
  },
};

export default nextConfig;
