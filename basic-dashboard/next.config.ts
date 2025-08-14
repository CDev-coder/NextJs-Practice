/* @type {import('next').NextConfig} */

const nextConfig = {
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
