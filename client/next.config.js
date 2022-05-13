/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/getData/:path*",
        destination: "http://localhost:5000/:path*", // Proxy to Backend
      },
    ];
  },
};
