import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: Request) {
  const payload = await getPayload({ config })

  const { enrollmentNumber, password } = await req.json()

  try {
    // 🔍 Find student by enrollment number
    const student = await payload.find({
      collection: 'students',
      where: {
        enrollmentNumber: {
          equals: enrollmentNumber,
        },
      },
    })

    if (!student.docs.length) {
      return Response.json({ error: 'Student not found' }, { status: 404 })
    }

    const email = student.docs[0].email

    // 🔐 Login using Payload
    const loginRes = await payload.login({
      collection: 'students',
      data: {
        email,
        password,
      },
    })

    return Response.json(loginRes)
  } catch (err) {
    console.error(err)
    return Response.json({ error: 'Login failed' }, { status: 500 })
  }
}