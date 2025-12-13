/** @type {import('next').NextConfig} */

// Temporarily disable SSL verification for WordPress API
// TODO: Remove once Cloudways SSL certificate is properly configured
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wordpress-1097675-6067353.cloudwaysapps.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
}

module.exports = nextConfig
