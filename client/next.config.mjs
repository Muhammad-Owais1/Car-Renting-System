/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Match any route starting with /api
        destination: "https://car-renting-system-api.vercel.app/api/:path*", // Proxy to your backend
      },
    ];
  },
};

export default nextConfig;
