import { CollectionConfig } from 'payload'

export const Faculty: CollectionConfig = {
  slug: 'faculty',
  admin: { useAsTitle: 'name' },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'title', type: 'text', required: true }, // e.g., Professor of CS
    { name: 'specialty', type: 'text' },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'researchArea', type: 'relationship', relationTo: 'research-areas' },
  ],
}