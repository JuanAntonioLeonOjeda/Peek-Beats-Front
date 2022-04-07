let Peer = ''

if (typeof navigator !== 'undefined') {
  Peer = require('peerjs').default
}

export default Peer
