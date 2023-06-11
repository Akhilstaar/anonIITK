// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig


// /** @type {import('next').NextConfig} */

module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8000/api/:path*',
        },
      ]
    }
  }