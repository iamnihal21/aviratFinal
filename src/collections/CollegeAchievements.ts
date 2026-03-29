import { CollectionConfig } from 'payload'

export const CollegeAchievements: CollectionConfig = {
  slug: 'college-achievements',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'category', type: 'text', required: true },
    { name: 'date', type: 'text', required: true },
    { 
        name: 'color', 
        type: 'select', 
        options: [
            { label: 'Purple/Pink', value: 'from-purple-500 to-pink-500' },
            { label: 'Blue/Cyan', value: 'from-blue-500 to-cyan-500' },
            { label: 'Yellow/Orange', value: 'from-yellow-500 to-orange-500' },
            { label: 'Green/Emerald', value: 'from-green-500 to-emerald-500' },
            { label: 'Red/Rose', value: 'from-red-500 to-rose-500' },
        ] 
    },
    { 
        name: 'iconType', 
        type: 'select', 
        options: [
            { label: 'Trophy', value: 'trophy' },
            { label: 'Award', value: 'award' },
            { label: 'Ranking', value: 'ranking' },
            { label: 'Target', value: 'target' },
            { label: 'Microscope', value: 'microscope' },
        ] 
    },
  ],
}