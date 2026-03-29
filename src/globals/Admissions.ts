import { GlobalConfig } from 'payload'

export const Admissions: GlobalConfig = {
  slug: 'admissions',
  access: { read: () => true },
  fields: [
    {
      name: 'highlights',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
        { name: 'iconType', type: 'select', options: [
          { label: 'Graduation', value: 'graduation' },
          { label: 'Users', value: 'users' },
          { label: 'Trophy', value: 'trophy' },
          { label: 'Clock', value: 'clock' },
        ]},
      ],
    },
    {
      name: 'timeline',
      type: 'array',
      fields: [
        { name: 'step', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'color', type: 'text' }, // e.g., "from-blue-500 to-cyan-500"
      ],
    },
    {
      name: 'deadlines',
      type: 'group',
      fields: [
        {
          name: 'undergraduate',
          type: 'array',
          fields: [
            { name: 'type', type: 'text' },
            { name: 'deadline', type: 'text' },
            { name: 'notification', type: 'text' },
          ]
        },
        {
          name: 'graduate',
          type: 'array',
          fields: [
            { name: 'type', type: 'text' },
            { name: 'deadline', type: 'text' },
            { name: 'notification', type: 'text' },
          ]
        }
      ]
    }
  ],
}