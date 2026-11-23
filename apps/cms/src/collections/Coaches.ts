import { CollectionConfig } from 'payload/types';

export const Coaches: CollectionConfig = {
  slug: 'coaches',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', 'isActive'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'bio',
      type: 'textarea',
      required: true,
    },
    {
      name: 'avatarUrl',
      type: 'text',
    },
    {
      name: 'instagram',
      type: 'text',
    },
    {
      name: 'specialties',
      type: 'array',
      fields: [
        {
          name: 'specialty',
          type: 'text',
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
};
