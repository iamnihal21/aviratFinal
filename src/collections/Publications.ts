import { CollectionConfig } from 'payload'

export const Publications: CollectionConfig = {
  slug: 'publications',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'journal', type: 'text', required: true },
    { name: 'publishDate', type: 'text', admin: { placeholder: 'e.g., Jan 2026' } },
    { name: 'link', type: 'text' },
  ],
}