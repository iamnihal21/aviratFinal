import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import AdmissionsClient from './AdmissionsClient'

export const revalidate = 60

export default async function AdmissionsPage() {
  const payload = await getPayloadHMR({ config: configPromise })
  
  // Fetch both Admission and Contact (for FAQs) globals
  const [admissionsData, contactData] = await Promise.all([
    payload.findGlobal({ slug: 'admissions' }),
    payload.findGlobal({ slug: 'contact' })
  ])

  return <AdmissionsClient data={admissionsData} faqData={contactData?.faqs || []} />
}