import { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { 
      name: 'category', 
      type: 'select', 
      required: true,
      options: ['Academic', 'Cultural', 'Sports'] 
    },
    { name: 'date', type: 'text', required: true }, // or 'date' type if preferred
    { name: 'time', type: 'text', required: true },
    { name: 'location', type: 'text', required: true },
    { name: 'capacity', type: 'text' },
    { name: 'registrationDeadline', type: 'text' },
    { 
      name: 'iconType', 
      type: 'select', 
      options: [
        { label: 'Laptop', value: 'laptop' },
        { label: 'Music', value: 'music' },
        { label: 'Microscope', value: 'microscope' },
        { label: 'Trophy', value: 'trophy' },
        { label: 'Palette', value: 'palette' },
      ] 
    },
    { 
      name: 'color', 
      type: 'select', 
      options: [
        { label: 'Blue', value: 'from-blue-500 to-cyan-500' },
        { label: 'Purple', value: 'from-purple-500 to-pink-500' },
        { label: 'Green', value: 'from-green-500 to-emerald-500' },
        { label: 'Orange', value: 'from-orange-500 to-red-500' },
        { label: 'Pink', value: 'from-pink-500 to-rose-500' },
      ] 
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}