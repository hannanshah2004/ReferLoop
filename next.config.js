/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export configuration
  images: {
    unoptimized: true, // Unoptimized images (optional)
  },
};

module.exports = nextConfig;
