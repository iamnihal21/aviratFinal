import { CollectionConfig } from 'payload'

export const Recruiters: CollectionConfig = {
  slug: 'recruiters',
  admin: { useAsTitle: 'name' },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'industry', type: 'text' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
  ]
}