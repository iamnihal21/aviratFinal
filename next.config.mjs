
// import { withPayload } from '@payloadcms/next/withPayload'

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },

//   experimental: {
//     serverActions: {
//       bodySizeLimit: '2mb',
//     },
//   },

//   webpack: (config) => {
//     config.resolve.extensionAlias = {
//       '.cjs': ['.cts', '.cjs'],
//       '.js': ['.ts', '.tsx', '.js', '.jsx'],
//       '.mjs': ['.mts', '.mjs'],
//     }
//     return config
//   },

//   typescript: {
//     ignoreBuildErrors: true,
//   },

//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         // This covers your Supabase Storage API
//         hostname: 'qutylhbebwbmqjpwdovd.supabase.co',
//         pathname: '/storage/v1/**', 
//       },
//       {
//         protocol: 'https',
//         // Fixed: Added the specific hostname from your error log
//         hostname: 'aviratfinal.vercel.app', 
//       },
//       {
//         protocol: 'https',
//         // Keep this if you use the hyphenated version as well
//         hostname: 'avirat-final.vercel.app', 
//       },
//       {
//         protocol: 'http',
//         hostname: 'localhost',
//       },
//     ],
//   },
// }

// export default withPayload(nextConfig, {
//   // Set to false to speed up development builds
//   devBundleServerPackages: false,
// })

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
      // ✅ Supabase storage (MAIN)
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },

      // ✅ Your Vercel domain (fallback)
      {
        protocol: 'https',
        hostname: 'aviratfinal.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'avirat-final.vercel.app',
      },

      // ✅ Local dev
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