<template>
  <div id="video-grid" />
</template>

<script>
// import Peer from 'peerjs'

export default {
  name: 'StreamVideo',
  data () {
    return {
      lastPeerId: ''
    }
  },
  mounted () {
    const peer = new Peer(undefined, {
      path: '/peerjs',
      host: '/',
      port: 443
    })

    this.socket = this.$nuxtSocket({
      name: 'stream'
    })
    this.socket.emit('hello', 'world', (response) => {
      console.log(response) // "got it"
    })
    console.log(`socket: ${this.socket}`)
    console.log(`peer: ${this.peer}`)

    if (this.$store.state.role === 'streamer') {
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then((stream) => {
        this.$store.commit('getStream', stream)
        addStream(stream)
      })
    } else {
      watchStream(peer)
    }

    peer.on('open', (id) => {
      this.lastPeerId = id
      // eslint-disable-next-line no-console
      console.log(`myId: ${id}`)
      this.socket.emit('join-room', this.$route.params.id, id)
    })

    peer.on('disconnected', function () {
      console.log('Connection Lost')

      // Workaround for peer.reconnect deleting previous id
      peer.id = this.lastPeerId
      peer._lastServerId = this.lastPeerId
      peer.reconnect()
    })

    this.socket.on('user-connected', (userId) => {
      console.log(`User ${userId} connected`)
      if (this.$store.state.role === 'streamer') {
        const stream = this.$store.state.streamVideo
        connectToNewUser(userId, stream, peer)
      }
    })
  }
}

const addStream = (stream) => {
  const grid = document.getElementById('video-grid')
  const video = document.createElement('video')
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  grid.appendChild(video)
}

const watchStream = (peer) => {
  peer.on('call', (call) => {
    call.answer()
    let counter = 0
    call.on('stream', (stream) => {
      if (counter === 0) {
        addStream(stream)
      }
      counter++
    })
  })
}

const connectToNewUser = (userId, stream, peer) => {
  // eslint-disable-next-line no-console
  peer.call(userId, stream)
  peer.on('error', (error) => {
    console.log(`Peer error: ${error}`)
  })
}

</script>

<style lang="scss" scoped>

</style>
