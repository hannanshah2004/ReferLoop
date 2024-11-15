/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
  images: {
    unoptimized: true, // Unoptimized images (optional)
  },
};

module.exports = nextConfig;
