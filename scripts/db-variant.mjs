import { PrismaClient } from '@prisma/client'

const p = new PrismaClient()
const t0 = Date.now()
try {
  await p.$queryRaw`SELECT 1`
  console.log(`OK (${Date.now() - t0}ms)`)
  process.exit(0)
} catch (e) {
  const m = (e.message || 'unknown').replace(/\s+/g, ' ')
  console.log(`FAIL: ${m.slice(0, 200)}`)
  process.exit(0)
}
