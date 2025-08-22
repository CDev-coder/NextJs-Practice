/* @type {import('next').NextConfig} */

const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
  experimental: {
    serverActions: true, // Required for database operations
    serverComponentsExternalPackages: ["@neondatabase/serverless"], // For Neon PostgreSQL
  },
  output: "standalone", // Best for serverless deployments
  // Optional: Add if using NextAuth.js
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.example.com", // Replace with your image host
      },
    ],
  },
};

module.exports = nextConfig;
