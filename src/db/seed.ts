import { todos } from '@db/schema.js'
import { faker } from '@faker-js/faker'
import { db } from '@db/index.js'

async function seed() {
  console.log('🌱 Seeding database...')

  await db.delete(todos)

  const sampleTodos = Array.from({ length: 5 }, (_, i) => ({
    content: faker.lorem.sentences({ min: 2, max: 5 }),
    isComplete: faker.datatype.boolean(),
    insertedAt: faker.date.recent({ days: 30 }),
  }))

  await db.insert(todos).values(sampleTodos)

  console.log('✅ Database seeded successfully!')
}

seed().catch((err) => {
  console.error('❌ Error seeding database:', err)
})