import { CollectionConfig } from 'payload'

export const ResearchAreas: CollectionConfig = {
  slug: 'research-areas',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { 
      name: 'iconType', 
      type: 'select', 
      options: [
        { label: 'CPU', value: 'cpu' },
        { label: 'Heart', value: 'heart' },
        { label: 'Leaf', value: 'leaf' },
        { label: 'Rocket', value: 'rocket' },
        { label: 'Zap', value: 'zap' },
        { label: 'Globe', value: 'globe' },
      ] 
    },
    { 
      name: 'colorTheme', 
      type: 'select', 
      options: [
        { label: 'Blue', value: 'from-blue-500 to-cyan-500' },
        { label: 'Red', value: 'from-red-500 to-rose-500' },
        { label: 'Green', value: 'from-green-500 to-emerald-500' },
        { label: 'Purple', value: 'from-purple-500 to-indigo-500' },
        { label: 'Amber', value: 'from-amber-500 to-orange-500' },
      ] 
    },
  ],
}