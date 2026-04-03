import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { StudentAchievements } from './collections/StudentAchievements'
import { CollegeAchievements } from './collections/CollegeAchievements'
import { Gallery } from './collections/Gallery'
import { Events } from './collections/Events'
import { Recruiters } from './collections/Recruiters'
import { Publications } from './collections/Publications'
import { Faculty } from './collections/Faculty'
import { ResearchAreas } from './collections/ResearchAreas'
import { Payments } from './collections/Payments'
import { Students } from './collections/Student'
import { Results } from './collections/Results'

import { About } from './globals/About'
import { Contact } from './globals/Contact'
import { Admissions } from './globals/Admissions'
import { Campus } from './globals/Campus'
import { PlacementsSettings } from './globals/PlacementsSettings'
import { HomeSettings } from './globals/HomeSettings'
import { Inquiries } from './collections/Inquires'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  // ✅ FIXED: NEVER keep this empty
  serverURL:
    process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',

  cookiePrefix: 'college-app',

  collections: [
    Users,
    Media,
    CollegeAchievements,
    StudentAchievements,
    Gallery,
    Events,
    Recruiters,
    ResearchAreas,
    Faculty,
    Publications,
    Payments,
    Students,
    Results,
    Inquiries,                                                            
  ],

  globals: [
    About,
    Contact,
    Admissions,
    Campus,
    PlacementsSettings,
    HomeSettings,
  ],

  editor: lexicalEditor(),

  // ✅ FIXED: NEVER empty
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-key',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),

  sharp,

  plugins: [
    s3Storage({
      collections: {
        media: {
          // ✅ BEST PRACTICE: Direct Supabase URL
          generateFileURL: ({ filename }) => {
            return `https://${process.env.SUPABASE_HOSTNAME}.supabase.co/storage/v1/object/public/${process.env.SUPABASE_BUCKET}/${filename}`
          },
        },
      },

      bucket: process.env.SUPABASE_BUCKET!,

      config: {
        credentials: {
          accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.SUPABASE_S3_SECRET_ACCESS_KEY!,
        },
        region: process.env.SUPABASE_REGION || 'ap-south-1',
        endpoint: process.env.SUPABASE_S3_ENDPOINT!,
        forcePathStyle: true,
      },
    }),
  ],
})