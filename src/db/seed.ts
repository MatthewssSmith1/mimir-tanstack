import { nodes } from '@db/schema.js'
import { faker } from '@faker-js/faker'
import { db } from '@db/index.js'

async function seed() {
  console.log('🌱 Seeding database...')

  await db.delete(nodes)

  const sampleTodos = Array.from({ length: 5 }, (_, i) => ({
    content: faker.lorem.sentences({ min: 2, max: 5 }),
    isComplete: faker.datatype.boolean(),
    insertedAt: faker.date.recent({ days: 30 }),
  }))

  await db.insert(nodes).values(sampleTodos)

  console.log('✅ Database seeded successfully!')
}

seed().catch((err) => {
  console.error('❌ Error seeding database:', err)
})