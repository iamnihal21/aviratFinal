import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import PlacementsClient from './PlacementsClient'
import { notFound } from 'next/navigation'

export const revalidate = 60

export default async function PlacementsPage() {
  const payload = await getPayload({ config: configPromise })

  // Fetching the Global Settings for Placements (Stats, Highlights, etc.)
  const settings = await payload.findGlobal({
    slug: 'placements-settings',
    draft: false,
  })

  // Fetching the Recruiters Collection for the Logo Grid
  // We set a high limit or use pagination if you have 50+ recruiters
  const recruitersRes = await payload.find({
    collection: 'recruiters',
    sort: 'name',
    depth: 1,
  })
  if (!settings) {
    return notFound()
  }

  return <PlacementsClient settings={settings} recruiters={recruitersRes.docs} />
}
