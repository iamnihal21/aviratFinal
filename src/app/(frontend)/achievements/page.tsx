import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import AchievementsClient from './AchievementsClient'

export const revalidate = 60

export default async function AchievementsPage() {
  const payload = await getPayloadHMR({ config: configPromise })
  
  const collegeRes = await payload.find({ collection: 'college-achievements', limit: 100 })
  const studentRes = await payload.find({ collection: 'student-achievements', limit: 100 })

  return (
    <AchievementsClient 
      collegeData={collegeRes.docs} 
      studentData={studentRes.docs} 
    />
  )
}