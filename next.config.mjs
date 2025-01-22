/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    domains: ['via.placeholder.com','localhost'], // Add the domain here
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
