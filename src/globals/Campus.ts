import { GlobalConfig } from 'payload'

export const Campus: GlobalConfig = {
  slug: 'campus-settings',
  access: { read: () => true },
  fields: [
    {
      name: 'stats',
      type: 'array',
      fields: [
        { name: 'count', type: 'text' },
        { name: 'label', type: 'text' },
        { name: 'iconType', type: 'select', options: ['users', 'dumbbell', 'heart', 'palette'] }
      ]
    },
    {
      name: 'facilities',
      type: 'array',
      fields: [
        { name: 'category', type: 'text' },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'name', type: 'text' },
            { name: 'description', type: 'textarea' },
            { name: 'iconType', type: 'select', options: ['library', 'building', 'home', 'utensils', 'coffee', 'dumbbell', 'music', 'palette'] },
            { name: 'features', type: 'array', fields: [{ name: 'feature', type: 'text' }] }
          ]
        }
      ]
    },
    {
      name: 'amenities',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'description', type: 'text' },
        { name: 'iconType', type: 'select', options: ['wifi', 'shield', 'wind', 'calendar', 'clock', 'star'] }
      ]
    }
  ]
}