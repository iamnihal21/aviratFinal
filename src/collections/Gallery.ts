import { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'date', type: 'text', admin: { placeholder: 'e.g. 2024' } },
    { 
      name: 'category', 
      type: 'select', 
      required: true,
      options: [
        { label: 'Infrastructure', value: 'infrastructure' },
        { label: 'Events', value: 'events' },
        { label: 'Achievements', value: 'achievements' },
      ] 
    },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'alt', type: 'text', required: true },
    { 
      name: 'span', 
      type: 'select', 
      defaultValue: 'md:col-span-1',
      options: [
        { label: 'Normal', value: 'md:col-span-1' },
        { label: 'Wide', value: 'md:col-span-2' },
        { label: 'Large (Square)', value: 'md:col-span-2 md:row-span-2' }
      ] 
    }
  ]
}