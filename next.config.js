/** @type {import('next').NextConfig} */
const nextConfig = {
  
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.sanity.io',
            port: '',
            pathname:'/images/rot78pr5/production/**',
          },
          {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
            port: '',
            pathname:'/v0/b/**',
          },
        ],
      },
}

module.exports = nextConfig
