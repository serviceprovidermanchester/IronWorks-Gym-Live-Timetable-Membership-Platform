import { CollectionConfig } from 'payload/types';

export const Announcements: CollectionConfig = {
  slug: 'announcements',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'priority', 'publishedAt', 'expiresAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'priority',
      type: 'select',
      defaultValue: 'NORMAL',
      options: [
        { label: 'Low', value: 'LOW' },
        { label: 'Normal', value: 'NORMAL' },
        { label: 'High', value: 'HIGH' },
      ],
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      defaultValue: () => new Date(),
      required: true,
    },
    {
      name: 'expiresAt',
      type: 'date',
    },
  ],
};
