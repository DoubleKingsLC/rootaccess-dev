/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // `npm run dev` (Webpack): disable filesystem pack cache to reduce ENOENT on
  // .next/cache/webpack/**/*.pack.gz on Windows.
  // Use `npm run dev:turbo` if you explicitly want Turbopack.
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
