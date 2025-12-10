/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com',
        protocol: 'https',
      },
      {
        hostname: '*.googleusercontent.com',
        protocol: 'https',
      },
      {
        hostname: 'avatar.vercel.sh',
        protocol: 'https',
      },
    ],
  },
  transpilePackages: ['@workspace/ui'],
}

export default nextConfig
