/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ["localhost", "media.graphassets.com"] },
  reactStrictMode: true,
  webpack: (config) => {
    config.experiments = config.experiments || {}
    config.experiments.topLevelAwait = true
    return config
  }
}

module.exports = nextConfig
