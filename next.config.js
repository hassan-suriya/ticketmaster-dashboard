/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      's1.ticketm.net',
      'content.ticketmaster.com',
    ],
    unoptimized: true
  },
  experimental: {
    esmExternals: true,
  },
  env: {
    TICKETMASTER_API_KEY: process.env.TICKETMASTER_API_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
  }
}

module.exports = nextConfig
