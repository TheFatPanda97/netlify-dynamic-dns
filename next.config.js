/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(graphql|gql)/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader"
    });

    return config;
  },
  env: {
    NETLIFY_API_KEY: process.env.NETLIFY_API_KEY
  }
}

module.exports = nextConfig
