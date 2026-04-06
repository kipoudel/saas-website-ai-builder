import type { CollectionConfig } from 'payload'

/**
 * Alternative approach: Menu Items as a Collection
 * Useful if you want more control and filtering per menu item
 */
export const MenuItems: CollectionConfig = {
  slug: 'menu-items',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'menu', 'order', 'active'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      label: 'Menu Label',
    },
    {
      name: 'menu',
      type: 'select',
      options: [
        { label: 'Main Navigation', value: 'main' },
        { label: 'Footer', value: 'footer' },
        { label: 'Mobile', value: 'mobile' },
      ],
      required: true,
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
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: 'Icon (optional)',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

