import net from 'node:net'
import tls from 'node:tls'
import dns from 'node:dns/promises'

const SSL_REQUEST = Buffer.from([0, 0, 0, 8, 0x04, 0xd2, 0x16, 0x2f])

function probeIP(ip, port) {
  return new Promise((resolve) => {
    const sock = net.connect({ host: ip, port, timeout: 8000 })
    let out = `${ip}:${port} → `
    const done = (m) => { try { sock.destroy() } catch {} ; resolve(out + m) }
    sock.once('connect', () => {
      out += `TCP OK, `
      sock.write(SSL_REQUEST)
    })
    sock.once('data', (d) => {
      if (d[0] === 0x53) {
        const t = tls.connect({ socket: sock, servername: 'aws-1-ap-south-1.pooler.supabase.com', rejectUnauthorized: false }, () => {
          const c = t.getPeerCertificate()
          done(`SSL 'S' → TLS OK, leaf CN=${c.subject.CN}, issuer=${c.issuer.CN}`)
          t.end()
        })
        t.once('error', (e) => done(`SSL 'S' → TLS FAIL: ${e.message}`))
      } else if (d[0] === 0x45) {
        done(`PG error frame: ${d.toString('utf8', 0, 100).replace(/\0/g, ' ')}`)
      } else {
        done(`unexpected first byte 0x${d[0].toString(16)}`)
      }
    })
    sock.once('error', (e) => done(`socket error: ${e.message}`))
    sock.once('timeout', () => done(`TIMEOUT (no response after connect)`))
  })
}

const ips = await dns.resolve4('aws-1-ap-south-1.pooler.supabase.com')
console.log('Pooler A records:', ips.join(', '))
for (const ip of ips) console.log(await probeIP(ip, 6543))

// Direct (non-pooler) hostname
const directHost = 'db.qgrfcgrywonpcbeprssk.supabase.co'
try {
  const dip = await dns.resolve4(directHost)
  console.log(`\n${directHost} resolves to:`, dip.join(', '))
  const sock = net.connect({ host: directHost, port: 5432, timeout: 8000 })
  sock.once('connect', () => {
    console.log(`✅ ${directHost}:5432 TCP connect OK`)
    sock.write(SSL_REQUEST)
  })
  sock.once('data', (d) => console.log(`   SSLRequest reply: '${String.fromCharCode(d[0])}' (${d[0] === 0x53 ? 'SSL supported' : 'no SSL'})`))
  sock.once('error', (e) => console.log(`❌ ${directHost}:5432 error: ${e.message}`))
  sock.once('timeout', () => console.log(`❌ ${directHost}:5432 timeout`))
} catch (e) {
  console.log(`\n${directHost} does not resolve:`, e.code)
}
