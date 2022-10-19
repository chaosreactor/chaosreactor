/** @type {import('next').NextConfig} */

// next.config.js
const withTM = require('next-transpile-modules')(['@chaosreactor/ui']); // pass the modules you would like to see transpiled

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
};

module.exports = withTM(nextConfig);
