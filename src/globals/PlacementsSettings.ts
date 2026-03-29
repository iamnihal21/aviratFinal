  import { GlobalConfig } from 'payload'

  export const PlacementsSettings: GlobalConfig = {
    slug: 'placements-settings',
    access: { read: () => true },
    fields: [
      {
        name: 'stats',
        type: 'array',
        maxRows: 4,
        fields: [
          { name: 'value', type: 'text', required: true },
          { name: 'label', type: 'text', required: true },
          { name: 'iconType', type: 'select', options: ['trending', 'dollar', 'award', 'building'] }
        ]
      },
      {
        name: 'highlights',
        type: 'array',
        fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'count', type: 'text', required: true },
          { name: 'description', type: 'textarea', required: true },
          { name: 'iconType', type: 'select', options: ['award', 'briefcase', 'map-pin'] },
          { 
            name: 'colorTheme', 
            type: 'select', 
            options: [
              { label: 'Yellow', value: 'from-yellow-500 to-orange-500' },
              { label: 'Blue', value: 'from-blue-500 to-cyan-500' },
              { label: 'Green', value: 'from-green-500 to-emerald-500' }
            ] 
          }
        ]
      },
      // --- New Recruiters Section ---
      {
        name: 'recruiters',
        label: 'Top Recruiters',
        type: 'array',
        admin: {
          description: 'Add the companies that frequently recruit from our campus.'
        },
        fields: [
          {
            name: 'name',
            type: 'text',
            required: true,
          },
          {
            name: 'industry',
            type: 'text',
            required: true,
            admin: {
              placeholder: 'e.g. IT Services, Banking, E-commerce'
            }
          },
          {
            name: 'logo',
            type: 'upload',
            relationTo: 'media', // Ensure you have a 'media' collection
            required: false,
            admin: {
              description: 'Optional: Upload the company logo.'
            }
          }
        ]
      }
    ]
  }