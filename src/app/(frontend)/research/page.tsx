import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import ResearchClient from './ResearchClient'

export const revalidate = 60

export default async function ResearchPage() {
  const payload = await getPayloadHMR({ config: configPromise })
  
  const [areas, faculty, pubs] = await Promise.all([
    payload.find({ collection: 'research-areas', limit: 10 }),
    payload.find({ collection: 'faculty', limit: 3 }),
    payload.find({ collection: 'publications', limit: 5, sort: '-createdAt' }),
  ])

  return (
    <ResearchClient 
      areas={areas.docs} 
      faculty={faculty.docs} 
      publications={pubs.docs} 
    />
  )
}