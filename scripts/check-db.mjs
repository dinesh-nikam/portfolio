import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const label = (u) => {
  try {
    const { protocol, host, port, pathname, username } = new URL(u)
    return `${protocol}//${username}:****@${host}:${port}${pathname}`
  } catch {
    return '(unparsable)'
  }
}

console.log('DATABASE_URL →', label(process.env.DATABASE_URL))
console.log('DIRECT_URL   →', label(process.env.DIRECT_URL))

try {
  const t0 = Date.now()
  const rows = await prisma.$queryRaw`SELECT current_database() AS db, current_user AS usr, version() AS ver`
  console.log(`✅ Pooled query OK in ${Date.now() - t0}ms`)
  console.log('   db:', rows[0].db, '| user:', rows[0].usr)
  console.log('   ', String(rows[0].ver).split(',')[0])
} catch (e) {
  console.error('❌ DATABASE_URL query failed:', e.message.slice(0, 300))
  process.exitCode = 1
}

try {
  const counts = await prisma.$queryRaw`
    SELECT
      (SELECT COUNT(*) FROM "Visitor") AS visitors,
      (SELECT COUNT(*) FROM "PageView") AS page_views,
      (SELECT COUNT(*) FROM "ContactMessage") AS contact_messages`
  console.log('✅ Table counts:', counts[0])
} catch (e) {
  console.error('⚠️  Table count query failed (schema may need `prisma db push`):', e.message.slice(0, 300))
}

await prisma.$disconnect()
