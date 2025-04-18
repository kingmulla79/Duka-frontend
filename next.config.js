/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: false,
  minify: false,
  productionBrowserSourceMaps: false,
  concurrentFeatures: true,
  fastRefresh: false,
  swcMinify: true,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
