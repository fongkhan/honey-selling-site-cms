import { buildConfig } from 'payload';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { Users } from './src/collections/Users';
import { Media } from './src/collections/Media';
import { Pages } from './src/collections/Pages';
import { Posts } from './src/collections/Posts';
import { ProductsMetadata } from './src/collections/ProductsMetadata';
import { Settings } from './src/globals/Settings';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const DATABASE_URI =
  process.env.DATABASE_URI ?? `file:${path.resolve(dirname, 'data/payload.db')}`;

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  collections: [Users, Media, Pages, Posts, ProductsMetadata],
  globals: [Settings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET ?? '',
  typescript: { outputFile: path.resolve(dirname, 'src/payload-types.ts') },
  db: sqliteAdapter({
    client: { url: DATABASE_URI },
  }),
});
