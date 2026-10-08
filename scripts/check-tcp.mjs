import net from 'node:net'

const HOST = 'aws-1-ap-south-1.pooler.supabase.com'
const PORTS = [6543, 5432]

const tryPort = (port) =>
  new Promise((resolve) => {
    const t0 = Date.now()
    const sock = net.connect({ host: HOST, port, timeout: 8000 })
    sock.on('connect', () => { sock.destroy(); resolve(`✅ port ${port}: TCP connect OK (${Date.now() - t0}ms)`) })
    sock.on('timeout', () => { sock.destroy(); resolve(`❌ port ${port}: timed out after 8s`) })
    sock.on('error', (e) => resolve(`❌ port ${port}: ${e.message}`))
  })

console.log('Resolving', HOST, '...')
const { lookup } = await import('node:dns/promises')
try {
  const addrs = await lookup(HOST, { all: true })
  console.log('DNS:', addrs.map((a) => `${a.address} (${a.family})`).join(', '))
} catch (e) {
  console.log('DNS lookup failed:', e.message)
}

for (const p of PORTS) console.log(await tryPort(p))

// baseline: does general HTTPS work from this machine?
await new Promise((resolve) => {
  const sock = net.connect({ host: '1.1.1.1', port: 443, timeout: 5000 })
  sock.on('connect', () => { sock.destroy(); console.log('✅ baseline 1.1.1.1:443 reachable (internet OK)') })
  sock.on('timeout', () => { sock.destroy(); console.log('❌ baseline 1.1.1.1:443 timed out') })
  sock.on('error', (e) => console.log('❌ baseline failed:', e.message))
  sock.on('close', resolve)
})
