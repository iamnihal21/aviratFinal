import { GlobalConfig } from 'payload'

export const Contact: GlobalConfig = {
  slug: 'contact',
  access: { read: () => true },
  fields: [
    {
      name: 'contactInfo',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'details', type: 'array', fields: [{ name: 'line', type: 'text' }] },
        { name: 'action', type: 'text' },
        { name: 'link', type: 'text' },
        { 
          name: 'color', 
          type: 'select', 
          options: [
            { label: 'Blue', value: 'from-blue-500 to-cyan-500' },
            { label: 'Green', value: 'from-green-500 to-emerald-500' },
            { label: 'Purple', value: 'from-purple-500 to-pink-500' },
            { label: 'Orange', value: 'from-orange-500 to-red-500' },
          ] 
        },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
  ],
}