import { CollectionConfig } from 'payload/types';

export const MembershipPlans: CollectionConfig = {
  slug: 'membership-plans',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'tier', 'priceMonthly', 'isFeatured', 'isActive'],
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
      name: 'tier',
      type: 'select',
      required: true,
      options: [
        { label: 'Standard', value: 'STANDARD' },
        { label: 'Unlimited', value: 'UNLIMITED' },
        { label: 'Founding Member', value: 'FOUNDING_MEMBER' },
      ],
    },
    {
      name: 'priceMonthly',
      type: 'number',
      required: true,
    },
    {
      name: 'setupFee',
      type: 'number',
      defaultValue: 0,
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
        },
      ],
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'stripePriceId',
      type: 'text',
    },
    {
      name: 'gocardlessPlanId',
      type: 'text',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
};
