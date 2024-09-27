/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.js$/,
  //     exclude: /node_modules/,
  //     use: {
  //       loader: 'babel-loader',
  //       options: {
  //         // Configure babel presets and plugins here
  //       },
  //     },
  //   });
  //   return config;
  // },
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
