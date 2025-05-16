/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/posts/**",
      },
    ],
  },
  swcMinify: false,
};

export default nextConfig;
