import { todos } from '@db/schema'
import { eq } from 'drizzle-orm'
import { db } from '@db/index'

export async function getTodos() {
  return db.query.todos.findMany({
    orderBy: (todos, { desc }) => [desc(todos.createdAt)]
  });
}

export async function createTodo(content: string) {
  return db.insert(todos).values({
    content,
    isComplete: false
  }).returning();
}

export async function toggleTodo(id: string, isComplete: boolean) {
  return db.update(todos)
    .set({ isComplete })
    .where(eq(todos.id, id))
    .returning();
}

export async function deleteTodo(id: string) {
  return db.delete(todos)
    .where(eq(todos.id, id))
    .returning();
}
