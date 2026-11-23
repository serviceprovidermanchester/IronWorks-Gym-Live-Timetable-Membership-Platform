import { CollectionConfig } from 'payload/types';
import { isPublic, isAdminOrEditor } from '../access/roles';
import { revalidateTimetableAfterChange, revalidateTimetableAfterDelete } from '../hooks/revalidate';

export const Classes: CollectionConfig = {
  slug: 'classes',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'dayOfWeek', 'startTime', 'capacity', 'isActive'],
  },
  access: {
    read: isPublic,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  hooks: {
    afterChange: [revalidateTimetableAfterChange],
    afterDelete: [revalidateTimetableAfterDelete],
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
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'HIIT', value: 'HIIT' },
        { label: 'Strength', value: 'STRENGTH' },
        { label: 'Boxing', value: 'BOXING' },
        { label: 'Yoga', value: 'YOGA' },
        { label: 'Cardio', value: 'CARDIO' },
        { label: 'Recovery', value: 'RECOVERY' },
      ],
    },
    {
      name: 'dayOfWeek',
      type: 'select',
      required: true,
      options: [
        { label: 'Monday', value: 'MONDAY' },
        { label: 'Tuesday', value: 'TUESDAY' },
        { label: 'Wednesday', value: 'WEDNESDAY' },
        { label: 'Thursday', value: 'THURSDAY' },
        { label: 'Friday', value: 'FRIDAY' },
        { label: 'Saturday', value: 'SATURDAY' },
        { label: 'Sunday', value: 'SUNDAY' },
      ],
    },
    {
      name: 'startTime',
      type: 'text',
      required: true,
      admin: {
        description: 'Format HH:mm (e.g. 06:30, 18:00)',
      },
    },
    {
      name: 'durationMins',
      type: 'number',
      defaultValue: 45,
      required: true,
    },
    {
      name: 'capacity',
      type: 'number',
      defaultValue: 20,
      required: true,
    },
    {
      name: 'coach',
      type: 'relationship',
      relationTo: 'coaches',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
  ],
};
