import { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'course', 'email', 'createdAt'],
    group: 'Submissions',
  },
  access: {
    // Only allow the public to create inquiries, but not read them
    create: () => true,
    read: ({ req: { user } }) => !!user, // Only logged-in admins can see them
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'email',
          type: 'email',
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          type: 'text',
          required: true,
        },
        {
          name: 'course',
          type: 'select',
          required: true,
          options: [
            { label: 'BCA (Computer Applications)', value: 'bca' },
            { label: 'BBA (Business Admin)', value: 'bba' },
          ],
        },
      ],
    },
    {
      name: 'lastQualification',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
    },
  ],
  timestamps: true,
}