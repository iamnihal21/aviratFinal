import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import CampusClient from './CampusClient'

export const revalidate = 60

export default async function CampusPage() {
  const payload = await getPayloadHMR({ config: configPromise })
  
  const settings = await payload.findGlobal({ slug: 'campus-settings' })
  const galleryRes = await payload.find({ collection: 'gallery', limit: 10 })

  return <CampusClient settings={settings} gallery={galleryRes.docs} />
}