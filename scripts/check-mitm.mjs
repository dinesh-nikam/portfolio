import net from 'node:net'
import tls from 'node:tls'

const HOST = 'aws-1-ap-south-1.pooler.supabase.com'

// 1) Who is intercepting? Print cert chain WITHOUT validation.
await new Promise((resolve) => {
  const SSL_REQUEST = Buffer.from([0, 0, 0, 8, 0x04, 0xd2, 0x16, 0x2f])
  const sock = net.connect({ host: HOST, port: 5432, timeout: 10000 })
  sock.once('connect', () => sock.write(SSL_REQUEST))
  sock.once('data', (d) => {
    const t = tls.connect({ socket: sock, servername: HOST, rejectUnauthorized: false }, () => {
      const cert = t.getPeerCertificate(true)
      console.log('=== Certificate chain (port 5432) ===')
      let c = cert
      let i = 0
      while (c && c.subject && i < 5) {
        console.log(`[${i}] CN=${c.subject.CN} | O=${c.subject.O || '-'} | issuer CN=${c.issuer.CN}`)
        if (i === 0) console.log(`    SAN: ${(c.subjectaltname || '').split(',').slice(0, 4).join(', ')}`)
        if (!c.issuerCertificate || c.issuerCertificate === c) break
        c = c.issuerCertificate
        i++
      }
      console.log(`    serial=${cert.serialNumber}  valid=${cert.valid_from} .. ${cert.valid_to}`)
      t.end()
      resolve()
    })
    t.once('error', (e) => { console.log('tls error:', e.message); resolve() })
  })
  sock.once('error', (e) => { console.log('tcp error:', e.message); resolve() })
})

// 2) Does the server allow plaintext (no SSLRequest) Postgres startup?
await new Promise((resolve) => {
  const user = 'postgres.qgrfcgrywonpcbeprssk'
  const params = Buffer.from(`user\0${user}\0database\0postgres\0\0`)
  const len = 8 + params.length
  const buf = Buffer.alloc(len)
  buf.writeUInt32BE(len, 0)
  buf.writeUInt32BE(196608, 4)
  params.copy(buf, 8)
  const sock = net.connect({ host: HOST, port: 6543, timeout: 10000 })
  let bufIn = Buffer.alloc(0)
  sock.once('connect', () => sock.write(buf))
  sock.on('data', (d) => {
    bufIn = Buffer.concat([bufIn, d])
    const tag = String.fromCharCode(bufIn[0])
    if (tag === 'R') { console.log(`plaintext startup port 6543: auth request type=${bufIn.readUInt32BE(8)} → server allows non-TLS`); sock.destroy(); resolve() }
    else if (tag === 'N') { console.log('plaintext startup port 6543: server sent N (SSL required, no plaintext)'); sock.destroy(); resolve() }
    else if (tag === 'E') { console.log(`plaintext startup port 6543: PG error: ${bufIn.toString('utf8', 0, 160).replace(/\0/g, ' ')}`); sock.destroy(); resolve() }
  })
  sock.once('error', (e) => { console.log('plaintext probe error:', e.message); resolve() })
  sock.once('timeout', () => { console.log('plaintext probe: timeout'); resolve() })
})
