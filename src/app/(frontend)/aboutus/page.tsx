import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import AboutClient from './AboutClient'

export const revalidate = 60

export default async function Page() {
  const payload = await getPayloadHMR({ config: configPromise })
  
  const data = await payload.findGlobal({
    slug: 'about',
  })

  return <AboutClient data={data} />
}