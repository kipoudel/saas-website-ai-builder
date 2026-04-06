import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'menuItems',
      type: 'array',
      label: 'Menu Items',
      maxRows: 10,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Menu Label',
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          label: 'Link to Page',
        },
        {
          name: 'externalUrl',
          type: 'text',
          label: 'Or External URL',
        },
        {
          name: 'order',
          type: 'number',
          label: 'Order',
          defaultValue: 0,
        },
      ],
    },
  ],
}

