import { PrismaClient } from '@prisma/client'

type GlobalWithPrisma = typeof globalThis & { prisma?: PrismaClient }

const globalWithPrisma = globalThis as GlobalWithPrisma

const client = globalWithPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalWithPrisma.prisma = client
}

export default client