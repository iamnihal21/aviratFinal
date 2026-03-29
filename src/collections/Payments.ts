import { CollectionConfig } from 'payload'

export const Payments: CollectionConfig = {
  slug: 'payments',
  admin: {
    group: 'Academic',
    defaultColumns: ['student', 'amount', 'status', 'category'],
  },
  access: {
    // Same logic: Students see only their own fees
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.collection === 'users') return true
      if (user.collection === 'students') {
        return { student: { equals: user.id } }
      }
      return false
    },
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
    { name: 'amount', type: 'number', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Tuition Fee', value: 'tuition' },
        { label: 'Exam Fee', value: 'exam' },
        { label: 'Hostel Fee', value: 'hostel' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
      ],
    },
    { name: 'paymentDate', type: 'date' },
    { name: 'transactionId', type: 'text' },
  ],
}