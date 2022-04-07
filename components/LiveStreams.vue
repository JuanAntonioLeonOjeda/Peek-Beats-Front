<template>
  <div>
    <div>
      <client-only placeholder="Loading...">
        <div v-if="typeof liveStreams === 'string'">
          {{ liveStreams }}
        </div>
        <div v-else-if="loading" class="progress">
          <v-progress-circular indeterminate :size="100" color="green" />
        </div>
        <div v-else-if="liveStreams.length !== 0">
          Current Streams: {{ liveStreams.length }}
          <carousel-3d :autoplay="true" :autoplay-timeout="5000" :clickable="true" :display="5">
            <slide v-for="(stream, idx) in liveStreams" :key="idx" :index="idx">
              <span class="title">Author: {{ stream.streamer.userName }}</span>
              <p>Genre: {{ stream.genre.name }}</p>
              <p>Current Viewers: {{ stream.currentViewers.length }}</p>
              <p>Likes: {{ stream.likes.length }}</p>
              <p>{{ stream.description }}</p>
              <v-btn
                class="ml-2 mt-5"
                outlined
                rounded
                small
                @click="joinStream(stream._id)"
              >
                <v-icon>mdi-play</v-icon>
                WATCH STREAM
              </v-btn>
            </slide>
          </carousel-3d>
        </div>
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LiveStreams',
  data () {
    return {
      loading: true,
      liveStreams: [],
      cycle: false,
      card: {
        src: 'https://images.pexels.com/photos/5082567/pexels-photo-5082567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      }
    }
  },
  async mounted () {
    try {
      const stream = await this.$store.dispatch('liveStreams')
      this.liveStreams = stream
      this.loading = false
    } catch (error) {
      throw new Error(error)
    }
  },
  methods: {
    async joinStream (streamId) {
      const stream = await this.$store.dispatch('joinStream', streamId)
      console.log(stream)
      this.$router.push({ path: `/streams/${stream.room}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.carousel-3d-container {
  .carousel-3d-slide {
    padding: 20px;

    .title { font-size: 22px; }
  }
}
</style>

      // <v-card max-width="400" class="mx-auto">
      //   <v-container>
      //     <v-row dense>
      //       <v-col
      //         v-for="(item, i) in liveStreams"
      //         :key="i"
      //         cols="12"
      //       >
      //         <v-card
      //           color="#1F7087"
      //           dark
      //         >
      //           <div class="d-flex flex-no-wrap justify-space-between">
      //             <div>
      //               <v-card-title
      //                 class="text-h5"
      //                 v-text="item"
      //               />
      //               <v-card-subtitle v-text="item.description" />

      //               <v-card-actions>
                      // <v-btn
                      //   class="ml-2 mt-5"
                      //   outlined
                      //   rounded
                      //   small
                      // >
                      //   <v-icon>mdi-play</v-icon>
                      //   WATCH STREAM
                      // </v-btn>
      //               </v-card-actions>
      //             </div>

      //             <v-avatar
      //               class="ma-3"
      //               size="125"
      //               tile
      //             >
      //               <v-img :src="card.src" />

      //               <!-- <v-card-subtitle v-text="item.description" /> -->
      //             </v-avatar>
      //           </div>
      //         </v-card>
      //       </v-col>
      //     </v-row>
      //   </v-container>
      // </v-card>
