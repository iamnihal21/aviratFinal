import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  webpack: (config) => {
    config.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return config
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },

      {
        protocol: 'https',
        hostname: 'aviratfinal.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'avirat-final.vercel.app',
      },

      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
}

export default withPayload(nextConfig, {
  devBundleServerPackages: false,
})
