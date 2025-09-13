import { PrismaClient } from "@prisma/client"

declare global {
  // prevent multiple instances in dev mode
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"], // optional: logs SQL queries
  })

if (process.env.NODE_ENV !== "production") global.prisma = prisma
