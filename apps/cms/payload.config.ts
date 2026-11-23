import path from 'path';
import { buildConfig } from 'payload/config';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { Users } from './src/collections/Users';
import { Classes } from './src/collections/Classes';
import { Coaches } from './src/collections/Coaches';
import { MembershipPlans } from './src/collections/MembershipPlans';
import { Announcements } from './src/collections/Announcements';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- IronWorks Gym CMS',
      favicon: '/favicon.ico',
      ogImage: '/og-image.png',
    },
  },
  editor: lexicalEditor({}),
  collections: [Users, Classes, Coaches, MembershipPlans, Announcements],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || 'postgresql://ironworks:ironworks_dev@localhost:5432/ironworks_gym',
    },
  }),
});
