import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import GalleryClient from './GalleryClient'

export const revalidate = 60

export default async function GalleryPage() {
  const payload = await getPayloadHMR({ config: configPromise })
  const galleryData = await payload.find({
    collection: 'gallery',
    limit: 100,
    sort: '-createdAt',
  })

  return <GalleryClient items={galleryData.docs} />
}