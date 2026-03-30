import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import AdmissionsClient from './AdmissionsClient'

export const revalidate = 60

export default async function AdmissionsPage() {
  const payload = await getPayloadHMR({ config: configPromise })
  const data = await payload.findGlobal({ slug: 'admissions' })

  return <AdmissionsClient data={data} />
}