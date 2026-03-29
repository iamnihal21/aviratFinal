import { CollectionConfig } from 'payload'

export const Students: CollectionConfig = {
  slug: 'students',

  auth: true, // ✅ keep as-is (hashing works)

  admin: {
    useAsTitle: 'name',
    group: 'Academic',
  },

  access: {
    create: ({ req: { user } }) => user?.collection === 'users',

    read: ({ req: { user } }) => {
      if (user?.collection === 'users') return true
      if (user?.collection === 'students') {
        return { id: { equals: user.id } }
      }
      return false
    },

    update: ({ req: { user } }) => {
      if (user?.collection === 'students') {
        return { id: { equals: user.id } }
      }
      if (user?.collection === 'users') return true
      return false
    },
  },

  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (
          operation === 'create' &&
          data?.phoneNumber &&
          data?.enrollmentNumber
        ) {
          const last4 = data.phoneNumber.slice(-4)
          const password = `College@${last4}`

          console.log('Generated Password:', password)

          // ✅ IMPORTANT: mutate directly (do NOT return new object)
          data.password = password
          data.email = `${data.enrollmentNumber}@college.com`
          data.needsPasswordChange = true
        }

        return data
      },
    ],

    afterChange: [
      ({ doc }) => {
        console.log(
          `--- VERIFICATION: Student ID ${doc.id} | Hash Present: ${!!doc.hash} ---`
        )
      },
    ],
  },

  fields: [
    { name: 'name', type: 'text', required: true },

    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      admin: {
        readOnly: true, // 👈 auto-generated
      },
    },

    {
      name: 'enrollmentNumber',
      type: 'text',
      required: true,
      unique: true,
    },

    {
      name: 'phoneNumber',
      type: 'text',
      required: true,
    },

    {
      name: 'course',
      type: 'select',
      required: true,
      options: [
        { label: 'BCA', value: 'bca' },
        { label: 'BBA', value: 'bba' },
      ],
    },

    {
      name: 'needsPasswordChange',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}