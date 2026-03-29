import { CollectionConfig } from 'payload'

export const Results: CollectionConfig = {
  slug: 'results',
  admin: {
    group: 'Academic',
    defaultColumns: ['student', 'semester', 'sgpa'],
  },
  access: {
    // Admins see all; Students see only theirs
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.collection === 'users') return true
      if (user.collection === 'students') {
        return { student: { equals: user.id } }
      }
      return false
    },
    // Only Admins can manage results
    create: ({ req: { user } }) => user?.collection === 'users',
    update: ({ req: { user } }) => user?.collection === 'users',
    delete: ({ req: { user } }) => user?.collection === 'users',
  },
  fields: [
    {
      name: 'student',
      type: 'relationship',
      relationTo: 'students',
      required: true,
      index: true,
    },
    { name: 'semester', type: 'number', required: true },
    { name: 'sgpa', type: 'number', required: true },
  ],
}