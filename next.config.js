/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
    minimumCacheTTL: 60,
  },
  serverExternalPackages: ['@supabase/ssr'],
}

module.exports = nextConfig