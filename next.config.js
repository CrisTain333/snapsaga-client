/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "i.ibb.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
