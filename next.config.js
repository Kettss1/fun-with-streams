/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        hostname: "loremflickr.com"
      }
    ]
  }
}

module.exports = nextConfig
