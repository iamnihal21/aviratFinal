
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import ContactClient from './ContactClient'

export const revalidate = 60

export default async function ContactPage() {
  const payload = await getPayloadHMR({ config: configPromise })
  const data = await payload.findGlobal({ slug: 'contact' })

  return <ContactClient data={data} />
}