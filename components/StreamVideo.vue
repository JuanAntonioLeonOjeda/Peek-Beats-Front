<template>
  <div id="video-grid" />
</template>

<script>
export default {
  name: 'StreamVideo',
  data () {
    return {

    }
  },
  mounted () {
    const peer = new Peer(undefined, {
      path: '/peerjs',
      host: '/',
      port: 5000
    })

    this.socket = this.$nuxtSocket({
      name: 'stream'
    })

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
      // eslint-disable-next-line no-console
      console.log(`myId: ${id}`)
      this.socket.emit('join-room', this.$route.params.id, id)
    })

    this.socket.on('user-connected', (userId) => {
      console.log(`User ${userId} connected`)
      if (this.$store.state.role === 'streamer') {
        const stream = this.$store.state.streamVideo
        connectToNewUser(userId, stream, peer)
        console.log(peer)
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
