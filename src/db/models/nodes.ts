
import { pgPolicy, pgRole, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createServerFn } from '@tanstack/react-start'
import { getUser } from '~/lib/utils'
import { nodes } from '@db/schema'
import { sql } from 'drizzle-orm'
import { db } from '@db/index'
import z from 'zod'

const authCheck = sql`select auth.user_id() = user_id`

export const createNodesTable = (authenticated: ReturnType<typeof pgRole>) => pgTable('nodes', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()::text`),
  ownerId: text('user_id').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (_) => [
  pgPolicy("create nodes", { for: "insert", to: authenticated, withCheck: authCheck }),
  pgPolicy("select nodes", { for: "select", to: authenticated, using: authCheck }),
  pgPolicy("update nodes", { for: "update", to: authenticated, using: authCheck }),
  pgPolicy("delete nodes", { for: "delete", to: authenticated, using: authCheck })
])

const insertSchema = z.object({ 
  content: z.string()
})

export const insertNode = createServerFn({ method: 'POST'})
  .validator(insertSchema)
  .handler(async ({ data }) => {
    const { userId } = await getUser()

    if (!userId) return false

    await db.insert(nodes).values({ ...data, ownerId: userId })

    return true
  })

