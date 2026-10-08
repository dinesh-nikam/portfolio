import net from 'node:net'

// Minimal PG wire stub: accepts connections, answers SSLRequest with 'N',
// completes startup, and replies to queries with a recognizable error message.
const server = net.createServer((sock) => {
  let buf = Buffer.alloc(0)
  sock.on('data', (d) => {
    buf = Buffer.concat([buf, d])
    while (buf.length >= 8) {
      // SSLRequest / GSSENC are length-prefixed without a tag byte
      const len = buf.readUInt32BE(0)
      if (buf.length < len) break
      const msg = buf.subarray(0, len)
      buf = buf.subarray(len)

      if (len === 8 && msg.readUInt32BE(4) === 80877103) {
        sock.write('N') // no SSL
        continue
      }
      if (len === 8 && msg.readUInt32BE(4) === 80877102) {
        sock.write('N')
        continue
      }
      // StartupMessage (protocol 196608)
      if (msg.readUInt32BE(4) === 196608) {
        sock.write(Buffer.from([0x52, 0, 0, 0, 8, 0, 0, 0, 0])) // AuthenticationOk
        sock.write(Buffer.from([0x5a, 0, 0, 0, 5, 0x49])) // ReadyForQuery 'I'
        continue
      }
      // Regular messages have a tag byte; but after startup we parsed raw...
      const tag = msg[0]
      if (tag === 0x51 || tag === 0x50 || tag === 0x44) {
        const err = Buffer.concat([
          Buffer.from([0x45, 0, 0, 0, 0]), // placeholder length
          Buffer.from('SFATAL\0CXX000\0MSTUB_CONNECTION_OK__ENGINE_REACHED_STUB\0\0'),
        ])
        err.writeUInt32BE(err.length, 1)
        sock.write(err)
        sock.write(Buffer.from([0x5a, 0, 0, 0, 5, 0x49]))
      }
    }
  })
  sock.on('error', () => {})
})

server.listen(15432, '127.0.0.1', () => {
  console.log('stub listening on 127.0.0.1:15432')
  setTimeout(() => process.exit(0), 60000)
})
