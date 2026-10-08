import pg from 'pg'

const url = process.env.TEST_URL
const cfg = new URL(url)
const client = new pg.Client({
  host: cfg.hostname,
  port: Number(cfg.port || 5432),
  user: decodeURIComponent(cfg.username),
  password: decodeURIComponent(cfg.password),
  database: cfg.pathname.slice(1),
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 15000,
})
const t0 = Date.now()
try {
  await client.connect()
  const r = await client.query('select current_user, count(*)::int as visitors from "Visitor"')
  console.log(`✅ AUTH OK (${Date.now() - t0}ms) user=${r.rows[0].current_user} visitors=${r.rows[0].visitors}`)
} catch (e) {
  console.log(`❌ ${e.message.slice(0, 200)}`)
} finally {
  try { await client.end() } catch {}
}
