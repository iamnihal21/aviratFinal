
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import EventsClient from './EventsClient'

export const revalidate = 60

export default async function EventsPage() {
  const payload = await getPayloadHMR({ config: configPromise })
  
  const eventsRes = await payload.find({
    collection: 'events',
    limit: 100,
    sort: '-date',
  })

  return <EventsClient eventsData={eventsRes.docs} />
}