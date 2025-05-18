import { boolean, pgPolicy, pgRole, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { InferSelectModel, sql } from 'drizzle-orm';

const authenticated = pgRole('authenticated').existing()

export const todos = pgTable('todos', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()::text`),
  content: text('content').notNull(),
  isComplete: boolean('is_complete').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (_) => [
  pgPolicy("create todos", {
    for: "insert",
    to: authenticated,
    withCheck: sql`(select auth.user_id() = user_id)`,
  }),
  pgPolicy("view todos", {
    for: "select",
    to: authenticated,
    using: sql`(select auth.user_id() = user_id)`,
  }),
  pgPolicy("update todos", {
    for: "update",
    to: authenticated,
    using: sql`(select auth.user_id() = user_id)`,
  }),
  pgPolicy("delete todos", {
    for: "delete",
    to: authenticated,
    using: sql`(select auth.user_id() = user_id)`,
  })
]);

export type Todo = InferSelectModel<typeof todos>;
