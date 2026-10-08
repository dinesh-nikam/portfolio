import net from 'node:net'

// Postgres SSLRequest message: length=8, code=80877103
const SSL_REQUEST = Buffer.from([0, 0, 0, 8, 0x04, 0xd2, 0x16, 0x2f])

const probe = (host, port) =>
  new Promise((resolve) => {
    const sock = net.connect({ host, port, timeout: 10000 })
    let buf = Buffer.alloc(0)
    const done = (msg) => { try { sock.destroy() } catch {} ; resolve(msg) }
    sock.on('connect', () => sock.write(SSL_REQUEST))
    sock.on('data', (d) => {
      buf = Buffer.concat([buf, d])
      const first = buf[0]
      if (first === 0x53) done(`✅ real Postgres: server replied 'S' (SSL supported) — ${host}:${port} is a live PG endpoint`)
      else if (first === 0x4e) done(`⚠️  server replied 'N' (SSL not supported)`)
      else if (first === 0x45) done(`❌ server sent Error message: ${buf.toString('utf8', 0, 120)}`)
      else done(`❓ unexpected first byte 0x${first.toString(16)}: ${buf.toString('hex', 0, 16)}`)
    })
    sock.on('timeout', () => done('❌ TCP accepted but NO response to SSLRequest within 10s → fake accept (interceptor/firewall) or dead endpoint'))
    sock.on('error', (e) => done(`❌ socket error: ${e.message}`))
    sock.on('close', () => { if (!buf.length) done('❌ connection closed with no data after connect') })
  })

console.log(await probe('aws-1-ap-south-1.pooler.supabase.com', 6543))
console.log(await probe('aws-1-ap-south-1.pooler.supabase.com', 5432))
