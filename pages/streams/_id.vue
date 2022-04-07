<template>
  <div>
    Your stream room is: {{ roomId }}
    <StreamVideo />
    <v-btn color="error" @click="stopStream">
      Stop Stream
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'StreamPage',
  data () {
    return {
      roomId: this.$route.params.id
    }
  },
  methods: {
    async stopStream () {
      await this.$store.dispatch('stopStream')
      this.$router.push({ path: '/home' })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
