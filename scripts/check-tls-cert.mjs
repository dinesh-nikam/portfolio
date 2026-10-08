import net from 'node:net'
import tls from 'node:tls'

// Proper PG flow: plain TCP -> SSLRequest -> 'S' -> TLS upgrade WITH validation, print cert chain
const probe = (port) =>
  new Promise((resolve) => {
    const SSL_REQUEST = Buffer.from([0, 0, 0, 8, 0x04, 0xd2, 0x16, 0x2f])
    const sock = net.connect({ host: 'aws-1-ap-south-1.pooler.supabase.com', port, timeout: 10000 })
    sock.once('connect', () => sock.write(SSL_REQUEST))
    sock.once('data', (d) => {
      if (d[0] !== 0x53) return resolve(`port ${port}: server did not offer SSL ('${String.fromCharCode(d[0])}')`)
      const tlsSock = tls.connect({ socket: sock, servername: 'aws-1-ap-south-1.pooler.supabase.com', rejectUnauthorized: true }, () => {
        const cert = tlsSock.getPeerCertificate(true)
        const chain = []
        let c = cert
        while (c && c.issuer) {
          chain.push(`  subject=${c.subject.CN} | issuer=${c.issuer.CN} | valid=${c.valid_from}..${c.valid_to}`)
          if (!c.issuerCertificate || c.issuerCertificate === c) break
          c = c.issuerCertificate
        }
        resolve(`✅ port ${port}: TLS handshake OK with FULL validation\n${chain.join('\n')}`)
        tlsSock.end()
      })
      tlsSock.once('error', (e) => resolve(`❌ port ${port}: TLS error (validated): ${e.message}`))
    })
    sock.once('error', (e) => resolve(`❌ port ${port}: ${e.message}`))
    sock.once('timeout', () => resolve(`❌ port ${port}: timeout`))
  })

console.log(await probe(6543))
console.log(await probe(5432))
