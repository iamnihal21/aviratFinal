import { GlobalConfig } from 'payload'

export const HomeSettings: GlobalConfig = {
  slug: 'home-settings',
  admin: { group: 'Pages' },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'slides',
              type: 'array',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'highlight', type: 'text', required: true },
                { name: 'subtitle', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
              ],
            },
          ],
        },
        {
          label: 'Stats & Sanskrit',
          fields: [
            { name: 'sanskritQuote', type: 'text' },
            { name: 'quoteTranslation', type: 'text' },
            {
              name: 'stats',
              type: 'array',
              maxRows: 3,
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
                { name: 'description', type: 'text' },
                {
                  name: 'color',
                  type: 'select',
                  options: [
                    { label: 'Blue', value: 'from-blue-500 to-cyan-500' },
                    { label: 'Green', value: 'from-green-500 to-emerald-500' },
                    { label: 'Purple', value: 'from-purple-500 to-pink-500' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Courses (BCA/BBA)',
          fields: [
            {
              name: 'courses',
              type: 'array',
              labels: {
                singular: 'Course Detail',
                plural: 'Course Details',
              },
              fields: [
                {
                  name: 'courseKey',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'BCA', value: 'bca' },
                    { label: 'BBA', value: 'bba' },
                  ],
                },
                { name: 'title', type: 'text', required: true },
                { name: 'shortTitle', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
                { name: 'duration', type: 'text', defaultValue: '3 Years (6 Semesters)' },
                { name: 'totalCredits', type: 'number' },
                { name: 'eligibility', type: 'text' },
                {
                  name: 'careers',
                  type: 'array',
                  fields: [{ name: 'role', type: 'text' }],
                },
                {
                  name: 'semesters',
                  type: 'array',
                  fields: [
                    { name: 'semesterName', type: 'text', required: true },
                    {
                      name: 'subjects',
                      type: 'array',
                      fields: [
                        { name: 'code', type: 'text' },
                        { name: 'name', type: 'text', required: true },
                        { name: 'credits', type: 'number' },
                        { name: 'type', type: 'text' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Testimonials',
          fields: [
            {
              name: 'testimonials',
              type: 'array',
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'role', type: 'text', required: true },
                { name: 'quote', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          label: 'Map & Footer',
          fields: [
            { name: 'mapUrl', type: 'text' },
            { name: 'address', type: 'text' },
          ],
        },
        {
          label: 'Why Choose Us',
          fields: [
            {
              name: 'whyChooseUs',
              type: 'array',
              admin: {
                description:
                  'Highlight the key benefits of Avirat BBA & BCA College (Location, Faculty, etc.)',
              },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
                {
                  name: 'iconType',
                  type: 'select',
                  options: [
                    { label: 'Location', value: 'MapPin' },
                    { label: 'Peace', value: 'Wind' },
                    { label: 'Industry', value: 'Briefcase' },
                    { label: 'Faculty', value: 'Users' },
                    { label: 'Practical', value: 'Cpu' },
                    { label: 'Admission', value: 'ShieldCheck' },
                    { label: 'Growth', value: 'Sparkles' },
                    { label: 'Infrastructure', value: 'Building' },
                  ],
                  defaultValue: 'Sparkles',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
