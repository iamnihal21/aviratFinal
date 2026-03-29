// import type { CollectionConfig } from 'payload'

// export const Media: CollectionConfig = {
//   slug: 'media',
//   upload: {
//     disableLocalStorage: true,
//   },
//   access: {
//     read: () => true,
//     create: ({ req }) => !!req.user,
//     update: ({ req }) => !!req.user,
//     delete: ({ req }) => !!req.user,
//   },
//   fields: [
//     {
//       name: 'alt',
//       type: 'text',
//       required: false,
//     },
//   ],
// }

import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    // Crucial: Payload needs this to internalize the pathing 
    // even if local storage is disabled.
    staticDir: 'media', 
    disableLocalStorage: true,
    // Optional: add admin thumbnail support for a better UI experience
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
    ],
  },
  access: {
    read: () => true,
    // Simple auth check for mutations
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      // Kept false to avoid the NULL value error we saw earlier
      required: false, 
    },
  ],
}