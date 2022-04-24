/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    images: { layoutRaw: true }
  },
  images: { domains: ["img.stadiumgoods.com", "localhost"] },
  reactStrictMode: true
}

module.exports = nextConfig
