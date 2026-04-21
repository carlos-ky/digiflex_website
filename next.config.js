/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
    qualities: [75, 80, 85, 90],
  },
  serverExternalPackages: ['@supabase/ssr'],
}

module.exports = nextConfig