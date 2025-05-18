import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@db/schema.js'
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export const db = drizzle(pool, { 
  schema,
  logger: process.env.NODE_ENV !== 'production'
});

export type Database = typeof db;
