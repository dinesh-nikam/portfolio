import net from 'node:net'
import tls from 'node:tls'

// Full Postgres startup: SSLRequest -> TLS -> StartupMessage (user only; Supabase pooler needs tenant-aware user anyway)
function pgStartupProbe(host, port) {
  return new Promise((resolve) => {
    let stage = 'tcp'
    const fail = (m) => { try { sock.destroy() } catch {} ; resolve(m) }
    const sock = tls.connect({ host, port, timeout: 15000, rejectUnauthorized: false, servername: host }, () => {
      stage = 'tls'
      // StartupMessage: len | protocol 3.0 | "user\0postgres.qgrfcgrywonpcbeprssk\0\0"
      const user = 'postgres.qgrfcgrywonpcbeprssk'
      const params = Buffer.from(`user\0${user}\0\0`)
      const len = 4 + 4 + params.length
      const buf = Buffer.alloc(len)
      buf.writeUInt32BE(len, 0)
      buf.writeUInt32BE(196608, 4)
      params.copy(buf, 8)
      sock.write(buf)
    })
    sock.on('data', (d) => {
      const tag = String.fromCharCode(d[0])
      if (tag === 'R') {
        const authType = d.readUInt32BE(8)
        if (authType === 10) resolve(`✅ ${host}:${port} — TLS OK, server requests SASL auth (live Postgres, full startup works)`)
        else if (authType === 3 || authType === 7) resolve(`✅ ${host}:${port} — TLS OK, cleartext/MD5 password auth requested`)
        else resolve(`✅ ${host}:${port} — auth type ${authType}`)
      } else if (tag === 'E') {
        fail(`❌ ${host}:${port} — PG error: ${d.toString('utf8', 0, 150).replace(/\0/g, ' ')}`)
      } else {
        resolve(`❓ ${host}:${port} — unexpected tag '${tag}'`)
      }
    })
    sock.on('error', (e) => fail(`❌ ${stage} error: ${e.message}`))
    sock.on('timeout', () => fail(`❌ timeout during '${stage}' stage`))
  })
}

console.log(await pgStartupProbe('aws-1-ap-south-1.pooler.supabase.com', 6543))
console.log(await pgStartupProbe('aws-1-ap-south-1.pooler.supabase.com', 5432))
