import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from '@db/schema.js'
import { neon } from '@neondatabase/serverless'

export const db = drizzle(
  neon(process.env.DATABASE_URL!), 
  { schema, logger: process.env.NODE_ENV !== 'production' }
);

export type Database = typeof db;
