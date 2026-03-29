import { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'year', type: 'text', defaultValue: '1892' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'visionMission',
      type: 'group',
      fields: [
        {
          name: 'vision',
          type: 'group',
          fields: [
            { name: 'description', type: 'textarea' },
            { name: 'points', type: 'array', fields: [{ name: 'point', type: 'text' }] },
          ],
        },
        {
          name: 'mission',
          type: 'group',
          fields: [
            { name: 'description', type: 'textarea' },
            { name: 'points', type: 'array', fields: [{ name: 'point', type: 'text' }] },
          ],
        },
      ],
    },
    {
      name: 'trustees',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'title', type: 'text' },
        { name: 'message', type: 'textarea' },
        { name: 'qualification', type: 'text' },
        { name: 'experience', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'faculty',
      type: 'group',
      fields: [
        { name: 'description', type: 'textarea' },
        { name: 'additional', type: 'textarea' },
        {
          name: 'stats',
          type: 'array',
          fields: [
            { name: 'value', type: 'text' },
            { name: 'label', type: 'text' },
          ],
        },
      ],
    },
  ],
}