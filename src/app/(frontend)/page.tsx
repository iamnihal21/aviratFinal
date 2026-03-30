import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import HomeClient from '../(frontend)/components/HomeClient'

export const revalidate = 60

export default async function Page() {
  const payload = await getPayloadHMR({ config: configPromise })

  // 1. Add depth: 1 to get image objects instead of IDs
  const homeData = await payload.findGlobal({
    slug: 'home-settings',
    depth: 1, 
  })

  // 2. Add depth: 1 for the gallery images
  const gallery = await payload.find({
    collection: 'gallery',
    limit: 4,
    depth: 1,
  })

  return (
    <HomeClient
      homeData={homeData}
      galleryImages={gallery.docs}
    />
  )
}