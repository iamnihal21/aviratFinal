import { CollectionConfig } from 'payload'

export const StudentAchievements: CollectionConfig = {
  slug: 'student-achievements',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'studentName', type: 'text', required: true },
    { 
        name: 'category', 
        type: 'select', 
        options: ['Technical', 'Cultural', 'Sports', 'Research'] 
    },
    { name: 'date', type: 'text' },
    { name: 'prize', type: 'text' },
    { name: 'color', type: 'text' }, // Same select options as above
    { name: 'iconType', type: 'text' }, // Same select options as above
  ],
}