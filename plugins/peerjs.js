import Vue from 'vue'

let Peer = ''

if (typeof navigator !== 'undefined') {
  Peer = require('peerjs').default
  Vue.use(Peer)
}

export default Peer
