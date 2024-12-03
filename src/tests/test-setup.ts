import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'
import { v4 as uuidv4 } from 'uuid'
import { beforeAll, afterAll } from 'vitest'

const generateDatabaseURL = (schema: string) => {
  if (!process.env.DATABASE_URL) {
    throw new Error('please provide a database url')
  }
  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.append('schema', schema)
  return url.toString()
}

export const setupTestDatabase = () => {
  const schema = `test_${uuidv4()}`
  const dbUrl = generateDatabaseURL(schema)
  process.env.DATABASE_URL = dbUrl
  process.env.DATABASE_DIRECT_URL = dbUrl

  beforeAll(() => {
    execSync('npx prisma migrate deploy')
  })

  afterAll(async () => {
    const prisma = new PrismaClient()
    await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
    await prisma.$disconnect()
  })
}

setupTestDatabase()